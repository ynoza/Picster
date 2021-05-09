import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showroom',
  templateUrl: './showroom.component.html',
  styleUrls: ['./showroom.component.less']
})
export class ShowroomComponent implements OnInit {
  variableName=[];
  SERVER_URL = "http://localhost:4000";
  temp = Array;
  math = Math;
  arr= [1,2,3,4,5,6,7,8,9,10,11];

  constructor(private http: HttpClient) { 
    this.getImages();
  }

  ngOnInit(): void {
  }


  getImages(){
    this.variableName=[];

    this.http.get<any>(this.SERVER_URL+'/imagesAndMapPair').subscribe(
        (res) => {
            console.log(res);
            this.variableName=res;
        },
        (err) => console.log(err),
      );
}


}
