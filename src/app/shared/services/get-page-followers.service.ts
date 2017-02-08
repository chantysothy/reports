import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GetPageFollowersService {

  fbAccessToken = 'EAAPfAr1tZCuoBADQXEkSvt8jlwNLO1sZB9VYRnWmikMneSElDtjqZC2G8ZBn7e6KV9ZCsZB0OzF9gqJ92ZBM0NdrJUYB35QtcFcDCRuKsxaBo8aUrV2DfcCKg8zLgHlJ2GJZCjtOApGMFZBWehIMCJYOfaBNqUlzYU8kZD';

  constructor(private http: Http) { }

  getFbFollowersToday(pageId) {
    return this.http.get('https://graph.facebook.com/v2.8/'+pageId+'/insights/page_fans?since=2017-01-31&until=2017-01-31&access_token='+this.fbAccessToken)
      .map((response: Response) => response.json());
  }

}
