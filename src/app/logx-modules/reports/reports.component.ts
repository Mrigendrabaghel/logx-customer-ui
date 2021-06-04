import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { reportService } from 'src/app/logx-services/common/report-service';
import { ReportModel } from 'src/app/shared/models/reportmodel';
import { Userinfo } from '../../shared/common/common-method';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  constructor() { 
    }

  ngOnInit(): void {
    
    
  }

  }


