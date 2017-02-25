import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class FacebookService {

  private api = 'https://graph.facebook.com/v2.8/';
  private apiKey = 'EAAPfAr1tZCuoBADQXEkSvt8jlwNLO1sZB9VYRnWmikMneSElDtjqZC2G8ZBn7e6KV9ZCsZB0OzF9gqJ92ZBM0NdrJUYB35QtcFcDCRuKsxaBo8aUrV2DfcCKg8zLgHlJ2GJZCjtOApGMFZBWehIMCJYOfaBNqUlzYU8kZD';

  constructor(private http: Http) { }

  getPageFollowersLM(pageId) {
    return new Promise((resolve) => {
      this.http.get(this.api+pageId+'/insights/page_fans?since=2017-01-01&until=2017-01-01&access_token='+this.apiKey)
        .map((response: Response) => response.json())
        .subscribe((data: any) => resolve(data));
    });
  }

  // Get follower count for a pages competition:
  getCompetitorStats(pageId) {
    return new Promise((resolve) => {
      this.http.get(this.api+pageId+'?fields=fan_count,name,picture,location&access_token='+this.apiKey)
        .map((response: Response) => response.json())
        .subscribe((data: any) => resolve(data));
    });
  }

  // Get demographics by location for a page:
  getLocationDemographics(pageId) {
    return new Promise((resolve) => {
      this.http.get(this.api+pageId+'/insights/page_fans_city?since=2017-01-31&until=2017-01-31&access_token='+this.apiKey)
        .map((response: Response) => response.json())
        .subscribe((data: any) => resolve(data));
    });
  }

  // Get top posts for a page:
  getTopPosts(pageId) {
    let likes =[];
    return new Promise ((resolve) => {
      this.http.get(this.api+pageId+'/feed?since=2017-01-01&until=2017-01-31&limit=100&access_token='+this.apiKey)
        .map((response: Response) => response.json())
        .subscribe(
          (data: any) => {
            for (let key in data.data) {
              this.http.get(this.api+data.data[key].id+'/likes?summary=true&access_token='+this.apiKey)
                .map((likesResponse: Response) => likesResponse.json())
                .subscribe(
                  (likesData: any) => {
                    likes.push([
                      data.data[key].id,
                      likesData.summary.total_count
                    ]);
                  }
                )
            }
            resolve(likes);

          }
        )
    });
  }

  getPostData(posts: any[]) {
    return new Promise ((resolve, reject) => {
      let postData = [];
      posts.forEach((post) => {
        this.http.get('https://graph.facebook.com/v2.8/'+post.post+'/attachments?access_token='+this.apiKey)
          .map((response: Response) => response.json())
          .subscribe((data: any) => {
            postData.push(data);
          });
      });
      resolve(postData);
    });
  }

}
