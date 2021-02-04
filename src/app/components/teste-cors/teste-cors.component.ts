import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-teste-cors',
  templateUrl: './teste-cors.component.html',
  styleUrls: ['./teste-cors.component.css']
})
export class TesteCorsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getList().subscribe((data) => {
      console.log('data');
      console.log(data);
    }, (error) => {
      console.log('error');
      console.log(error);
    })
  }

  getList(): Observable<Array<any>> {
    return this.http.get(`http://192.168.0.235:8080/helloworld/registry/list-all`) as Observable<Array<any>>;
  }

}
