import { Routes } from "@angular/router";

import { ReportsComponent } from './reports.component';

export const ReportRoutes: Routes = [{
  path: ':id',
  component: ReportsComponent
}];