import { Component } from '@angular/core';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

// declare var require: any

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    user: User;
    isAdmin: Boolean;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.userValue;
        if (this.user && this.user.username === "admin") this.isAdmin=true;
        else this.isAdmin=false;
    }

    // onRemoved(event){
    //     console.log(event.file);
    // }

    // onUploadFinished(event){
    //     const multer = require('multer');
    //     // const path = require('path');

    //     // // Set The Storage Engine
    //     // const storage = multer.diskStorage({
    //     //   destination: './public/uploads/',
    //     //   filename: function(req, file, cb){
    //     //     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    //     //   }
    //     // });

    //     // // Init Upload
    //     // const upload = multer({
    //     //   storage: storage,
    //     //   limits:{fileSize: 1000000},
    //     // });

    //     // const req = event.serverResponse.status;
    //     // const res = event.serverResponse.response;
    //     // upload(req, res, (err) => {
    //     //     if(err){
    //     //       res.render('home', {
    //     //         msg: err
    //     //       });
    //     //     } else {
    //     //       if(req.file == undefined){
    //     //         res.render('home', {
    //     //           msg: 'Error: No File Selected!'
    //     //         });
    //     //       } else {
    //     //         res.render('home', {
    //     //           msg: 'File Uploaded!',
    //     //           file: `uploads/${req.file.filename}`
    //     //         });
    //     //       }
    //     //     }
    //     //   });

    //     // console.log(upload.single('image'))
    //     console.log(event)
    //     console.log(event.file);
    // }

    // onUploadStateChanged(event){
    //     console.log(event.file);
    // }

}

