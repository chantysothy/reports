import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetPageFollowersService } from './../shared/services/get-page-followers.service';
import { GetRcsService } from './../shared/services/get-rcs.service';
import { GetPaidReachService } from './../shared/services/get-paid-reach.service';
import { GetOrganicReachService } from './../shared/services/get-organic-reach.service';
import { GetDemographicsService } from './../shared/services/get-demographics.service';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [
    GetPageFollowersService,
    GetRcsService,
    GetPaidReachService,
    GetOrganicReachService,
    GetDemographicsService
  ]
})
export class ReportsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  demographicsData: any;
  id: string;
  facebookLikes: any;
  isDataAvailable:boolean = false;

  demographicsColumns = [
    {name: 'Demographic'},
    {name: 'Female'},
    {name: 'Male'},
    {name: 'Unspecified'}
  ]

  constructor(
    private followers: GetPageFollowersService,
    private rcs: GetRcsService,
    private activatedRoute: ActivatedRoute,
    private paidReach: GetPaidReachService,
    private organicReach: GetOrganicReachService,
    private demographics: GetDemographicsService
  ) { }

  public globalChartOptions: any = {
      responsive: true,
      legend: {
        display: true,
        position: 'bottom'
      }
    }

  // Line Chart
  public lineChartData: Array < any > = [{
    label: 'Likes',
    borderWidth: 1
  }, {
    label: 'Comments',
    borderWidth: 1
  }];
  public lineChartLabels: Array < any > = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '16', '17', '18', '19', '20', '21', '22', '23', '24', '24', '25', '26', '27', '28', '29', '30'];
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
    backgroundColor: "#7986cb",
    borderColor: "#3f51b5",
    pointBackgroundColor: "#3f51b5",
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, { // dark grey
    backgroundColor: "#eeeeee",
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
  public barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '16', '17', '18', '19', '20', '21', '22', '23', '24', '24', '25', '26', '27', '28', '29', '30'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [{
    label: 'Organic Reach',
    borderWidth: 0
  }, {
    label: 'Paid Reach',
    borderWidth: 0
  }];
  public barChartOptions: any = Object.assign({
    scaleShowVerticalLines: false,
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
        position: 'left',
        ticks: {
          beginAtZero: true,
          suggestedMax: 9
        }
      }]
    }
  }, this.globalChartOptions);

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

    this.rcs.getRcsByMonthy(this.id)
      .subscribe(
        (data: any) => {
          var likesArray = [];
          var commentsArray = [];
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
            console.log(data);
            var paidReachArray = [];
            for (let key in data.data[0].values) {
              paidReachArray.push(data.data[0].values[key].value);
            }
            console.log(paidReachArray);
            this.barChartData[1].data = paidReachArray;
          }
        );

      this.organicReach.getOrganicReachMonthly(this.id)
        .subscribe(
          (data: any) => {
            var organicReachArray = [];
            for (let key in data.data[0].values) {
              organicReachArray.push(data.data[0].values[key].value);
            }
            this.barChartData[0].data = organicReachArray;
          }
        );

      this.demographics.GetDemographicsServiceMonth(this.id)
        .subscribe(
          (data: any) => {
            var demographics = data.data[0].values[0].value;
            this.demographicsData = [
              {demographic: '13-17', female: demographics['F.13-17'], male: demographics['M.13-17'], unspecified: demographics['U.13-17']},
              {demographic: '18-24', female: demographics['F.18-24'], male: demographics['M.18-24'], unspecified: demographics['U.18-24']},
              {demographic: '25-34', female: demographics['F.25-34'], male: demographics['M.25-34'], unspecified: demographics['U.25-34']},
              {demographic: '35-44', female: demographics['F.35-44'], male: demographics['M.35-44'], unspecified: demographics['U.35-44']},
              {demographic: '45-54', female: demographics['F.45-54'], male: demographics['M.45-54'], unspecified: demographics['U.45-54']},
              {demographic: '55-64', female: demographics['F.55-64'], male: demographics['M.55-64'], unspecified: demographics['U.55-64']},
              {demographic: '65+', female: demographics['F.65+'], male: demographics['M.65+'], unspecified: demographics['U.65+']},
            ]
          }
        );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe;
  }

}
