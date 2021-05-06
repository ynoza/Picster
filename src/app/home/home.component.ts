import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    SERVER_URL = "http://localhost:4000/upload";
    uploadForm: FormGroup; 

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
      

    // onFileSelect(event) {
    //     if (event.target.files.length > 0) {
    //         const file = event.target.files[0];
    //         this.uploadForm.get('profile').setValue(file);
    //     }
    // }

    // onSubmit() {
    //     const formData = new FormData();
    //     formData.append('myImage', this.uploadForm.get('profile').value);
    //     console.log(formData);
    //     this.http.post<any>(this.SERVER_URL, formData).subscribe(
    //       (res) => console.log(res),
    //       (err) => console.log(err)
    //     );
    //   }

    onRemoved(event){
        console.log(event.file);
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
        this.http.post<any>(this.SERVER_URL, formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }

    onUploadStateChanged(event){
        console.log(event.file);
    }

}

