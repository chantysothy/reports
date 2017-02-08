import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MdCardModule, MdIconModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpModule } from "@angular/http";

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ReportsComponent } from './reports.component';
import { ReportRoutes } from './reports.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRoutes),
    ChartsModule,
    MdCardModule,
    MdIconModule,
    FlexLayoutModule,
    HttpModule,
    NgxDatatableModule
  ],
  declarations: [
    ReportsComponent
  ]
})
export class ReportsModule { }
