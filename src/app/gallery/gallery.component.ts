import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';
import { IMasonryGalleryImage } from 'ngx-masonry-gallery';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.less']
})
export class GalleryComponent implements OnInit{
  variableName=[];
  user: User;

  constructor(private accountService: AccountService, private formBuilder: FormBuilder, private http: HttpClient) {
    this.user = this.accountService.userValue;
    
    this.getImages();
}
  
  ngOnInit() {
    
  }

  public get images(): IMasonryGalleryImage[] {
        return this.variableName.map(m => <IMasonryGalleryImage>{
            imageUrl: m
    });
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