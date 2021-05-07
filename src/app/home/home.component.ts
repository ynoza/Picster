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
    variableName=['http://localhost:4000/public/uploads/cat.png', 'http://localhost:4000/public/uploads/cat_2.0.png']

    constructor(private accountService: AccountService, private formBuilder: FormBuilder, private http: HttpClient) {
        this.user = this.accountService.userValue;
        if (this.user && this.user.username === "admin") this.isAdmin=true;
        else this.isAdmin=false;
        
    }

    ngOnInit() {
        this.uploadForm = this.formBuilder.group({
          profile: ['']
        });
        
      }
      

    onRemoved(event){
        console.log(event.file);

        const file = event.file;
        this.uploadForm.get('profile').setValue(file);
        let body = new HttpParams();
        body = body.set('fileName', file.name);
        // const formData = new FormData();
        // formData.append('myImage', this.uploadForm.get('profile').value);
        console.log(file.name);
        this.http.post<any>(this.SERVER_URL+'/delete', body).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
    }

    onUploadFinished(event) {
        console.log(event);
        // if (event.target.files.length > 0) {
        const file = event.file;
        this.uploadForm.get('profile').setValue(file);
        // }

        const formData = new FormData();
        formData.append('myImage', this.uploadForm.get('profile').value);
        console.log(formData);
        this.http.post<any>(this.SERVER_URL+'/upload', formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }

    onUploadStateChanged(event){
        console.log(event.file);
    }

    // getImages(){
    //     this.http.get<any>(this.SERVER_URL+'/getUploads').subscribe(
    //         (res) => console.log(res),
    //         (err) => console.log(err)
    //       );
    // }

}

