import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '@environments/environment';
@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.less']
})
export class ShowroomComponent implements OnInit {
  variableName=[];
  tempImg=`${environment.apiUrl}/public/ai.JPG`;
  temp = Array;
  math = Math;

  constructor(private http: HttpClient) { 
    this.getImages();
  }

  ngOnInit(): void {
  }


  getImages(){
    this.variableName=[];

    this.http.get<any>(`${environment.apiUrl}/imagesAndMapPair`).subscribe(
        (res) => {
            console.log(res);
            this.variableName=res;
        },
        (err) => console.log(err),
      );
}


}
