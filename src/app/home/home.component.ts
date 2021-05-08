import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import {FileHolder} from 'angular2-image-upload';
import { OnInit } from '@angular/core';
// declare var require: any

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User;
    isAdmin: Boolean;
    SERVER_URL = "http://localhost:4000";
    uploadForm: FormGroup; 
    variableName=[];

    masonryItems = [
      { title: 'item 1' },
      { title: 'item 2' },
      { title: 'item 3' },
    ];

    constructor(private accountService: AccountService, private formBuilder: FormBuilder, private http: HttpClient) {
        this.user = this.accountService.userValue;
        if (this.user && this.user.username === "admin") this.isAdmin=true;
        else this.isAdmin=false;
        
        this.getImages();
    }

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
          profile: ['']
        });
        
      }
      

    onRemoved(event){
        console.log(event.file);

        const file = event.file;
        let body = new HttpParams();
        body = body.set('fileName', this.user.username+ "-" +file.name);

        this.http.post<any>(this.SERVER_URL+'/delete', body).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
    }

    onUploadFinished(event) {
        console.log(event);

        const file = event.file;
        this.uploadForm.get('profile').setValue(file);


        let newFileName = "";
        for (let i=0; i < file.name.length; i++){
          const c = file.name.charAt(i);
          if (c === '(' || c === ')' || c === '!' || c === '*' || c === '~'){
            newFileName = newFileName.concat("---");
          }
          else {
            newFileName = newFileName.concat(c);
          }
        }

        const formData = new FormData();
        formData.append('myImage', this.uploadForm.get('profile').value, this.user.username + "-" + newFileName);
   
        this.http.post<any>(this.SERVER_URL+'/upload', formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }

    onUploadStateChanged(event){
        console.log(event.file);
    }

    getImages(){

        let body = new HttpParams();
        body = body.set('username', this.user.username);

        this.http.post<any>(this.SERVER_URL+'/getUploads', body).subscribe(
            (res) => {
                console.log(res);
                this.variableName=res;
            },
            (err) => console.log(err),
          );
    }

}

