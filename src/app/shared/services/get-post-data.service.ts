import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class GetPostDataService {

  fbAccessToken = 'EAAPfAr1tZCuoBADQXEkSvt8jlwNLO1sZB9VYRnWmikMneSElDtjqZC2G8ZBn7e6KV9ZCsZB0OzF9gqJ92ZBM0NdrJUYB35QtcFcDCRuKsxaBo8aUrV2DfcCKg8zLgHlJ2GJZCjtOApGMFZBWehIMCJYOfaBNqUlzYU8kZD';

  constructor(private http: Http) { }

  getPostData(posts: any[]) {
    return new Promise ((resolve) => {
      let postData = [];
      posts.forEach((post) => {
        this.http.get('https://graph.facebook.com/v2.8/'+post.post+'/attachments?access_token='+this.fbAccessToken)
          .map((response: Response) => response.json())
          .subscribe((data: any) => {
            postData.push({data, likes: post.likes});
          });
      });
      resolve(postData);
    });
  }

}
