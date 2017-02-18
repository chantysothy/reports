import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";

@Injectable()
export class FirebaseService {

  constructor(private http: Http) { }

  getCompetitors(pageId) {
    return new Promise((resolve) => {
      this.http.get('https://tnr-test.firebaseio.com/competitors/'+pageId+'.json')
        .map((response: Response) => response.json())
        .subscribe((data: any) => resolve(data));
    });
  }

  getBrandImage(pageId) {
    return new Promise((resolve) => {
      this.http.get('https://tnr-test.firebaseio.com/logos/'+pageId+'.json')
        .map((response: Response) => response.json())
        .subscribe((data: any) => resolve(data));
    });
  }

}
