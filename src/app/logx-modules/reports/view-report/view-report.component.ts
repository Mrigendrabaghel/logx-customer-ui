import { Component, Input, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { ReportModel } from 'src/app/shared/models/reportmodel';
import { reportService } from 'src/app/logx-services/common/report-service';
import { Userinfo } from 'src/app/shared/common/common-method';
import { SafeUrl, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {
  searchCriteria: any;
  user_userName: string;
  user_userId: string;
  errorMessage: any;
  report: ReportModel =new ReportModel();
  source: any;
  trustedUrl: SafeUrl;
  kibanaReport: string;
  constructor(private dataTransfer: DataTransferService,  
    public reportService: reportService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let userInfo = Userinfo();
    this.user_userName = userInfo !== undefined ? userInfo.username : "";
    this.user_userId = userInfo !== undefined ? userInfo.userid : "";
    this.dataTransfer.obj.subscribe(data => { this.searchCriteria = data; }).closed;
      if (this.searchCriteria) {
          this.report.reportName="Reports - "+this.searchCriteria;
          this.report.userName=this.user_userName;
        this.getReports(this.report)
  }

  }

  getReports(ReportModel: ReportModel) {
    this.reportService.getReport(ReportModel).subscribe(response => {
       if (response) {
         this.source= response.reporturl;
         this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.source);
       
       }
    },error => this.errorMessage = <any>error);
  }

}
