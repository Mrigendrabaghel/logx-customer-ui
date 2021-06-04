import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './logx-modules/home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { DashboardComponent } from './logx-modules/dashboard/dashboard.component';
import { SearchreportComponent } from './logx-modules/reports/searchreport.component';
import { AccessdocumentsComponent } from './logx-modules/documents/accessdocuments/accessdocuments.component';
import { VieworderdetailComponent } from './logx-modules/trackTrace/vieworderdetail/vieworderdetail.component';
import { SecuretrackorderComponent } from './logx-modules/trackTrace/securetrackorder/securetrackorder/securetrackorder.component';
import { TrackOrderDetailsComponent } from './logx-modules/home/trackorderdetails.component';
import { OrderdetailsComponent } from './logx-modules/trackTrace/vieworderdetail/orderdetails/orderdetails.component';
import {AdvanceSearchAccessDocumentComponent} from 'src/app/logx-modules/documents/advance-search-access-document/advance-search-access-document.component'
import { OktaAuthGuard,OktaCallbackComponent } from '@okta/okta-angular';
import { ReportincidentComponent } from './logx-modules/reportIncident/reportincident/reportincident.component';
import { ReportIncidentAdvanceSearchComponent } from './logx-modules/reportIncident/reportincidents-advancesearch/report-incident-advance-search/report-incident-advance-search.component';
import { ReportIncidentDisplayRecordComponent } from './logx-modules/reportIncident/report-incident-display-record/report-incident-display-record.component';
import { ApproveAccessorialsComponent } from './logx-modules/Accessorials/approve-accessorials/approve-accessorials.component'
import { ReportIncidentSearchResultsComponent } from './logx-modules/reportIncident/report-incident-search-results/report-incident-search-results.component';
import { ApproveAccessorialsDetailsComponent } from './logx-modules/Accessorials/approve-accessorials-details/approve-accessorials-details.component';
import { TrackCriteriaBulkSearchComponent } from './logx-modules/trackTrace/track-criteria-bulk-search/track-criteria-bulk-search.component';
import { SubmitOrderGridComponent } from './logx-modules/SubmitOrders/submit-order-grid/submit-order-grid.component';
import { SubmitordermaincomponentComponent } from './logx-modules/SubmitOrders/submit-order-grid/submitordermaincomponent/submitordermaincomponent.component';
import { UserPreferenceComponent } from './shared/layout/user-preference/user-preference.component';
import { ReportIncidentGridComponent } from './logx-modules/reportIncident/report-incident-grid/report-incident-grid.component';
import { RegistrationComponent } from './logx-modules/auth/components/registration/registration.component';
import { ReportsComponent } from './logx-modules/reports/reports.component';
import { ViewReportComponent } from './logx-modules/reports/view-report/view-report.component';
import { ViewNotificationsComponent } from './shared/notification/view-notifications.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    component: HomeComponent
  } ,   
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent,
  },
  {path:'publicorderdetails',component:TrackOrderDetailsComponent},
  {path: 'login', loadChildren: () =>
                import('src/app/logx-modules/auth/auth.module').then(m => m.AuthModule)},
               
  {path:'dashboard',component:LayoutComponent, 
  data: { breadcrumb: 'Dashboard' },
  children: [
    { path: '', component: DashboardComponent ,canActivate:[OktaAuthGuard]},
    { path: 'searchandreport', component: SearchreportComponent ,canActivate:[OktaAuthGuard], data: { breadcrumb: 'Order Lookup' }},
   
    {path:'accessdocument',component:AccessdocumentsComponent,canActivate:[OktaAuthGuard], data: { breadcrumb: 'Access Documents' }},
    {path:'vieworderdetails',component:VieworderdetailComponent,canActivate:[OktaAuthGuard], data: { breadcrumb: 'Order Tracking'}},
    {path:'securetrackorder',component:SecuretrackorderComponent, canActivate:[OktaAuthGuard], data: { breadcrumb: 'Track & Trace'}},
     {path:'approve-accessorials',component:ApproveAccessorialsComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Accessorials Pending Approval' }},
    {path:'orderdetails',component:OrderdetailsComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Order Details'}},
    //{path:'adavancesearch',component:AdvanceSearchAccessDocumentComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Advance Search'}},
    {path:'advancesearchorder',component:AdvanceSearchAccessDocumentComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Advance Search'}},
    {path:'advancesearchdocument',component:AdvanceSearchAccessDocumentComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Advance Search'}},
    {path:'reportincident',component:ReportincidentComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Report an Incident'}},
    {path:'reportincidentadvancesearch',component:ReportIncidentAdvanceSearchComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Report Incident Advance Search'}},
    {path:'reportincidentdisplayrecord',component:ReportIncidentDisplayRecordComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Report Incident Display Record'}},
    {path:'approveaccessorialDetails',component:ApproveAccessorialsDetailsComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Approve Accessorial Details'}},
    {path:'reportsearchresults',component:ReportIncidentSearchResultsComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Report Search Result'}},
    {path:'bulksearch',component:TrackCriteriaBulkSearchComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Bulk search'}},
    {path:'submitordergrid',component:SubmitOrderGridComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Submit Orders'}},
    {path:'submitordermain',component:SubmitordermaincomponentComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Submit Orders'}},
    {path:'userPreference',component:UserPreferenceComponent,canActivate:[OktaAuthGuard]},
    {path:'incidentgrid', component:ReportIncidentGridComponent,canActivate:[OktaAuthGuard],data: { breadcrumb: 'Report an Incident'}},
    {path:'viewallnotifications', component:ViewNotificationsComponent,canActivate:[OktaAuthGuard]},
    {path:'reports', component:ReportsComponent,  
    children: [
      {path: 'documents', component: ViewReportComponent},
      {path: 'claims', component: ViewReportComponent}, 
      {path: 'monthend', component: ViewReportComponent},
      {path: 'inbound', component: ViewReportComponent}, 
      {path: 'incidents', component: ViewReportComponent},
      {path: 'outbound', component: ViewReportComponent}, 
    ],
    canActivate:[OktaAuthGuard]},
  
    {path:'viewallnotifications', component:ViewNotificationsComponent,canActivate:[OktaAuthGuard]}
  ]},
  { path: 'registration', component: RegistrationComponent, canActivate: [OktaAuthGuard] },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
