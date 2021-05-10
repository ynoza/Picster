import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';

import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import {FileHolder} from 'angular2-image-upload';
import { OnInit } from '@angular/core';
import { environment } from '@environments/environment'

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    user: User;
    isAdmin: Boolean;
    uploadForm: FormGroup; 
    variableName=[];

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

        this.http.post<any>(`${environment.apiUrl}/delete`, body).subscribe(
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
   
        this.http.post<any>(`${environment.apiUrl}/upload`, formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }

    onUploadStateChanged(event){
        console.log(event.file);
    }

    getImages(){
        this.variableName=[];
        let body = new HttpParams();
        body = body.set('username', this.user.username);

        this.http.post<any>(`${environment.apiUrl}/getUploads`, body).subscribe(
            (res) => {
                console.log(res);
                this.variableName=res;
            },
            (err) => console.log(err),
          );
    }

}

