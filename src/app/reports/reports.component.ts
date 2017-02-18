import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetPageFollowersService } from '../shared/services/get-page-followers.service';
import { GetRcsService } from '../shared/services/get-rcs.service';
import { GetPaidReachService } from '../shared/services/get-paid-reach.service';
import { GetOrganicReachService } from '../shared/services/get-organic-reach.service';
import { GetDemographicsService } from '../shared/services/get-demographics.service';
import { GetPostDataService } from '../shared/services/get-post-data.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs/Rx';
import {FacebookService} from "../shared/services/facebook.service";
import {FirebaseService} from "../shared/services/firebase.service";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [
    GetPageFollowersService,
    GetRcsService,
    GetPaidReachService,
    GetOrganicReachService,
    GetDemographicsService,
    GetPostDataService,
    FacebookService,
    FirebaseService
  ]
})
export class ReportsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  demographicsData: any;
  id: string;
  facebookLikes: any;
  isDataAvailable:boolean = false;
  topPostsData: any;
  competitors: any[] = [];
  logo: any;

  demographicsColumns = [
    {prop: 'age_group', name: 'Age Group'},
    {name: 'Female'},
    {name: 'Male'},
    {name: 'Unspecified'}
  ];

  locationColumns = [
    { name: 'Location'},
    { name: 'Following' }
  ];

  locationRows = [];

  constructor(
    private followers: GetPageFollowersService,
    private rcs: GetRcsService,
    private activatedRoute: ActivatedRoute,
    private paidReach: GetPaidReachService,
    private organicReach: GetOrganicReachService,
    private demographics: GetDemographicsService,
    private postData: GetPostDataService,
    private facebook: FacebookService,
    private firebase: FirebaseService
  ) { }

  public globalChartOptions: any = {
      responsive: true,
      legend: {
        display: true,
        position: 'bottom'
      }
    };

  // Line Chart
  public lineChartData: Array < any > = [{
    label: 'Likes',
    borderWidth: 1
  }, {
    label: 'Comments',
    borderWidth: 1
  }];
  public lineChartLabels: Array < any > = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '16', '17', '18', '19', '20', '21', '22', '23', '24', '24', '25', '26', '27', '28', '29', '30', '31'];
  public lineChartOptions: any = Object.assign({
    animation: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: false,
          suggestedMax: 100,
        }
      }]
    }
  }, this.globalChartOptions);
  public lineChartColors: Array < any > = [{ // grey
    backgroundColor: "#f79600",
    borderColor: "#de8700",
    pointBackgroundColor: "#de8700",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { // dark grey
    backgroundColor: "#ffca87",
    borderColor: "#e0e0e0",
    pointBackgroundColor: "#e0e0e0",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  }, { // grey
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  // Bar
  public barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '16', '17', '18', '19', '20', '21', '22', '23', '24', '24', '25', '26', '27', '28', '29', '30', '31'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{
    label: 'Organic Reach',
    borderWidth: 0
  }, {
    label: 'Paid Reach',
    borderWidth: 0
  }];

  // Bar Chart Stacked
  public barChartStackedOptions: any = Object.assign({
    scaleShowVerticalLines: false,
    tooltips: {
      mode: 'index',
      intersect: false
    },
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        stacked: true
      }]
    }
  }, this.globalChartOptions);


  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => this.id = param['id']
    );

    // Get Number of Followers.
    this.followers.getFbFollowersToday(this.id)
      .subscribe(
        (data: any) => this.facebookLikes = data.data[0].values[0].value
      );

    this.facebook.getPageFollowersLM(this.id).then((data: any) => {
      console.log(data);
    });

    this.rcs.getRcsByMonthy(this.id)
      .subscribe(
        (data: any) => {
          let likesArray = [];
          let commentsArray = [];
          for (let key in data.data[0].values) {
            likesArray.push(data.data[0].values[key].value.like);
            commentsArray.push(data.data[0].values[key].value.comment);
          }
          this.lineChartData[0].data = likesArray;
          this.lineChartData[1].data = commentsArray;
        }
      );

    this.paidReach.getPaidReachMonthly(this.id)
      .subscribe(
        (data: any) => {
          let paidReachArray = [];
          for (let key in data.data[0].values) {
            paidReachArray.push(data.data[0].values[key].value);
          }
          this.barChartData[1].data = paidReachArray;
        }
      );

    this.organicReach.getOrganicReachMonthly(this.id)
      .subscribe(
        (data: any) => {
          let organicReachArray = [];
          for (let key in data.data[0].values) {
            organicReachArray.push(data.data[0].values[key].value);
          }
          this.barChartData[0].data = organicReachArray;
        }
      );

    this.demographics.GetDemographicsServiceMonth(this.id)
      .subscribe(
        (data: any) => {
          let demographics = data.data[0].values[0].value;
          this.demographicsData = [
            {age_group: '13-17', female: demographics['F.13-17'], male: demographics['M.13-17'], unspecified: demographics['U.13-17']},
            {age_group: '18-24', female: demographics['F.18-24'], male: demographics['M.18-24'], unspecified: demographics['U.18-24']},
            {age_group: '25-34', female: demographics['F.25-34'], male: demographics['M.25-34'], unspecified: demographics['U.25-34']},
            {age_group: '35-44', female: demographics['F.35-44'], male: demographics['M.35-44'], unspecified: demographics['U.35-44']},
            {age_group: '45-54', female: demographics['F.45-54'], male: demographics['M.45-54'], unspecified: demographics['U.45-54']},
            {age_group: '55-64', female: demographics['F.55-64'], male: demographics['M.55-64'], unspecified: demographics['U.55-64']},
            {age_group: '65+', female: demographics['F.65+'], male: demographics['M.65+'], unspecified: demographics['U.65+']},
          ]
        }
      );

    this.facebook.getTopPosts(this.id)
      .then((likes: any[]) => {
        setTimeout(() => {
          let topThree = [
            {
              likes: 0,
              post: 0
            },
            {
              likes: 0,
              post: 0
            },
            {
              likes: 0,
              post: 0
            }
          ];
          for (let i = 0; i < likes.length; i++) {
            if (likes[i][1] > topThree[0].likes) {
              topThree[0].likes = likes[i][1];
              topThree[0].post = likes[i][0];
            } else if (likes[i][1] > topThree[1].likes) {
              topThree[1].likes = likes[i][1];
              topThree[1].post = likes[i][0];
            } else if (likes[i][1] > topThree[2].likes) {
              topThree[2].likes = likes[i][1];
              topThree[2].post = likes[i][0];
            }
          }
          this.postData.getPostData(topThree).then((posts: any) => { this.topPostsData = posts; console.log(this.topPostsData); });
          this.isDataAvailable = true;
        }, 2000);
      });

    this.firebase.getCompetitors(this.id).then((data: any[]) => {
      for (let competitor of data) {
        this.facebook.getCompetitorStats(competitor).then((competitorData: any) => this.competitors.push(competitorData));
      }
    });

    this.firebase.getBrandImage(this.id).then((data: any) => {
      this.logo = data.url;
    });

    this.facebook.getLocationDemographics(this.id).then((data: any) => {
      let unsorted = data.data[0].values[0].value;
      let sorted = Object.keys(unsorted).sort((a, b) => {return unsorted[b]-unsorted[a]});

      for (let i=0; i<3; i++) {
        this.locationRows.push({ location: sorted[i], following: unsorted[sorted[i]] });
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
