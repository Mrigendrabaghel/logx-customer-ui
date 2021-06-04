import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule, Injectable, ErrorHandler } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/layout/footer.component';
import { HeaderComponent } from './shared/layout/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { VieworderdetailComponent } from './logx-modules/trackTrace/vieworderdetail/vieworderdetail.component';
import { DashboardComponent } from './logx-modules/dashboard/dashboard.component';
import { AccessdocumentsComponent } from './logx-modules/documents/accessdocuments/accessdocuments.component';
import { SearchreportComponent } from './logx-modules/reports/searchreport.component';
import { AddSearchDialog } from './logx-modules/reports/modal-popup/addsearch-dialog.component';
import { SecuretrackorderComponent } from './logx-modules/trackTrace/securetrackorder/securetrackorder/securetrackorder.component';
import { AuthModule } from './logx-modules/auth/auth.module';
import { HomeModule } from './logx-modules/home/home.module';
import { MaterialModule } from './shared/material.module';
import { MessagepopupComponent } from './shared/common/messagepopup/messagepopup.component';
import { AccessDocumentTableComponent } from './logx-modules/documents/access-document-table/access-document-table.component';
import { AccessDocumentDialogueComponent } from './logx-modules/trackTrace/access-document-dialogue/access-document-dialogue.component';
import { OrderdetailsComponent } from './logx-modules/trackTrace/vieworderdetail/orderdetails/orderdetails.component';

import {SafePipe} from 'src/app/logx-modules/documents/access-document-table/safe';
import { OpenDocumentDialogueComponent } from './logx-modules/documents/open-document-dialogue/open-document-dialogue.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { AdvanceSearchAccessDocumentComponent } from './logx-modules/documents/advance-search-access-document/advance-search-access-document.component';
import { StatusUpdateRoutingLinesComponent } from './logx-modules/trackTrace/vieworderdetail/status-update-routing-lines/status-update-routing-lines.component';
import { TransitMapComponent } from './logx-modules/trackTrace/vieworderdetail/transit-map/transit-map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { UploadfilesComponent } from './logx-modules/trackTrace/vieworderdetail/uploadfiles/uploadfiles.component';
import { NotificationListComponent } from './shared/notification/notification.component';
import { NotificationService } from "src/app/logx-services/common/notification.service";
import { ExportDataComponent } from './logx-modules/trackTrace/vieworderdetail/export-data/export-data.component';
import { DatePipe } from '@angular/common';
import { LayoutComponent } from '../app/shared/layout/layout.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  } from '@okta/okta-angular';


import { Router } from '@angular/router';
import { TokenInterceptor } from './logx-core/interceptor/token-interceptor';
import { oktaConfig } from './configs/okta.config';
import { LoaderComponent } from './shared/common/loader/loader.component';
import { ReportincidentComponent } from './logx-modules/reportIncident/reportincident/reportincident.component';
import { ConfirmationDialog } from '../app/shared/confirmation-dialog/confirmation-dialog.component';
import { ReportIncidentAdvanceSearchComponent } from '../app/logx-modules/reportIncident/reportincidents-advancesearch/report-incident-advance-search/report-incident-advance-search.component';
//import { LocationSearchComponent } from './shared/location/location-search/location-search.component';
import { ReportIncidentSearchResultsComponent } from './logx-modules/reportIncident/report-incident-search-results/report-incident-search-results.component';
import {GlobalErrorHandlerService} from 'src/app/logx-services/common/global-error-handler.service';
import { ReportIncidentDisplayRecordComponent } from './logx-modules/reportIncident/report-incident-display-record/report-incident-display-record.component';
import { ApproveAccessorialsComponent } from './logx-modules/Accessorials/approve-accessorials/approve-accessorials.component';
import { ApproveAccessorialsDetailsComponent } from './logx-modules/Accessorials/approve-accessorials-details/approve-accessorials-details.component';
import { AddAccessorialInfoDialogComponent } from './logx-modules/Accessorials/approve-accessorials-details/add-accessorial-info-dialog/add-accessorial-info-dialog.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MY_FORMATS } from './shared/models/dateValidation/date';
import { AttachmentsDetailComponent } from './shared/attachments-detail/attachments-detail.component';
import { GlobalTrackTraceComponent } from './shared/global-track-trace/global-track-trace.component';
import { TrackCriteriaBulkSearchComponent } from './logx-modules/trackTrace/track-criteria-bulk-search/track-criteria-bulk-search.component';
import { HasPermissionDirective } from './logx-core/has-permission.directive';
import { LoginpopupComponent } from './logx-modules/home/mobilelogin/loginpopup.component';
import { OrderCustomizeGridDialogComponent } from './logx-modules/documents/advance-search-access-document/order-customize-grid-dialog/order-customize-grid-dialog.component';
import {​​ BreadcrumbComponent }​​ from './logx-modules/breadcrumb/breadcrumb.component';
import { SubmitOrderGridComponent } from './logx-modules/SubmitOrders/submit-order-grid/submit-order-grid.component';
import { OrigindestinationlocationComponent } from './logx-modules/SubmitOrders/submit-order-grid/origindestinationlocation/origindestinationlocation.component';
import { OrderlineitemsComponent } from './logx-modules/SubmitOrders/submit-order-grid/orderlineitems/orderlineitems.component';
import { SubmitorderdetailsComponent } from './logx-modules/SubmitOrders/submit-order-grid/submitorderdetails/submitorderdetails.component';
import { AdditionalinformationComponent } from './logx-modules/SubmitOrders/submit-order-grid/additionalinformation/additionalinformation.component';
import { SubmitordermaincomponentComponent } from './logx-modules/SubmitOrders/submit-order-grid/submitordermaincomponent/submitordermaincomponent.component';
import { EditlocationmodalComponent } from './logx-modules/SubmitOrders/editlocationmodal/editlocationmodal.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { UserPreferenceComponent } from './shared/layout/user-preference/user-preference.component';
import { ExportGridDataComponent } from './logx-modules/reports/export-grid-data/export-grid-data.component';
import { EditOrderNumberConfirmationModal } from './logx-modules/SubmitOrders/edit-orderNumber-confirmation-modal/edit-orderNumber-confirmation-modal.component';
import { WarningDialogComponent } from './logx-modules/SubmitOrders/warning-dialog/warning-dialog.component';
import { OrderdestionComponent } from './logx-modules/SubmitOrders/submit-order-grid/origindestinationlocation/orderdestion/orderdestion.component';
import { ReportIncidentGridComponent } from './logx-modules/reportIncident/report-incident-grid/report-incident-grid.component';
import { NotificationModalComponent } from './shared/notification/notification-modal.component';
import { UserPrefLocDialogComponent } from './shared/layout/user-preference/user-pref-loc-dialog/user-pref-loc-dialog.component';
import { UserPreferenceDeletionComponent } from './shared/layout/user-preference/user-preference-deletion/user-preference-deletion.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from './shared/shared.module';
import { RegistrationpopupComponent } from './shared/common/registrationpopup/registrationpopup.component';
import { ReportsComponent } from './logx-modules/reports/reports.component';
import { ViewReportComponent } from './logx-modules/reports/view-report/view-report.component';
import { ViewNotificationsComponent } from './shared/notification/view-notifications.component';

const oktaConfigvalue = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);
    // Redirect the user to your custom login page
    router.navigate(['/']);
  }
}, oktaConfig.oidc);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AppComponent, 
    VieworderdetailComponent,
    DashboardComponent,
    AccessdocumentsComponent,
    SearchreportComponent,
    AddSearchDialog,
    SecuretrackorderComponent,
    MessagepopupComponent,
    AccessDocumentTableComponent,
    AccessDocumentDialogueComponent,
    OrderdetailsComponent,
    SafePipe,
    OpenDocumentDialogueComponent,
    AdvanceSearchAccessDocumentComponent,
    StatusUpdateRoutingLinesComponent,
    TransitMapComponent,
    UploadfilesComponent,
    NotificationListComponent,
    NotificationModalComponent,
    ExportDataComponent,
    LoaderComponent,
    ReportincidentComponent,
    ConfirmationDialog,
    ReportIncidentAdvanceSearchComponent,HeaderComponent,FooterComponent,LayoutComponent,
    //LocationSearchComponent,
    ReportIncidentDisplayRecordComponent,
    ApproveAccessorialsComponent,
    ReportIncidentSearchResultsComponent,
    ApproveAccessorialsDetailsComponent,
    AddAccessorialInfoDialogComponent,
    AttachmentsDetailComponent,
    GlobalTrackTraceComponent,
    TrackCriteriaBulkSearchComponent,
    HasPermissionDirective,
    LoginpopupComponent,
    OrderCustomizeGridDialogComponent,
    BreadcrumbComponent,
    SubmitOrderGridComponent,
    OrigindestinationlocationComponent,
    OrderlineitemsComponent,
    SubmitorderdetailsComponent,
    AdditionalinformationComponent,
    SubmitordermaincomponentComponent,
    EditlocationmodalComponent,
    UserPreferenceComponent,
    ExportGridDataComponent,
    EditOrderNumberConfirmationModal,
    WarningDialogComponent,
    OrderdestionComponent,
    ReportIncidentGridComponent,
    UserPrefLocDialogComponent,
    UserPreferenceDeletionComponent,
    RegistrationpopupComponent,
    ReportsComponent,
    ViewReportComponent,
    ViewNotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxDocViewerModule,
    SharedModule,
    NgxMaterialTimepickerModule,
    NgxExtendedPdfViewerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDIG1oKHP3gNxJ9sh1bw44qMOnTcjHoYw'
    }),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    OktaAuthModule,
    AgmDirectionModule
  ],

  providers: [{ provide: OKTA_CONFIG, useValue: oktaConfigvalue }, { provide: ErrorHandler, useClass: GlobalErrorHandlerService }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    NotificationService,DatePipe,
    {​​provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}​​,
    {​​
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MatDialogRef, useValue: {} }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
