import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { customizeGridConstant } from 'src/app/configs/constants';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { PaginationCriteria } from 'src/app/shared/models/accessorials/accessorials.model';

@Component({
  selector: 'app-order-customize-grid-dialog',
  templateUrl: './order-customize-grid-dialog.component.html',
  styleUrls: ['./order-customize-grid-dialog.component.scss']
})
export class OrderCustomizeGridDialogComponent implements OnInit {
  viewMoreOrigin: boolean = false;
  viewMoreDestination: boolean = false;
  viewMoreTransit: boolean = false;
  errorMessage: any;
  identifyingNumbers = [];
  checkboxGridData = [];
  financialItems = [];
  otherInfo = [];
  transitInfo = [];
  destinationInfo = [];
  originInfo = [];
  transitInfoOne = [];
  transitInfoTwo = [];
  transitInfoThree = [];
  originInfoLength: number;
  originInfoOne = [];
  originInfoTwo = [];
  destinationInfoLength: number;
  destinationInfoOne = [];
  destinationInfoTwo = [];
  customizeGridModel: PaginationCriteria = <PaginationCriteria>{};
  searchReportColumns = [];
  gridColumns: string;
  constructor(private accessorialService: AccessorialsService, public dialog: MatDialog,
    private dataTransfer: DataTransferService, private dialogRef: MatDialogRef<OrderCustomizeGridDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
  }

  ngOnInit(): void {
    this.getDynamicChecklistData();
  }

  viewOrigin() {
    this.viewMoreOrigin = !this.viewMoreOrigin
  }

  viewDestination() {
    this.viewMoreDestination = !this.viewMoreDestination;
  }

  viewTransit() {
    this.viewMoreTransit = !this.viewMoreTransit;
  }

  getDynamicChecklistData() {
    this.accessorialService.GetAccessorialGridColumns(customizeGridConstant.reportFilter).subscribe(response => {
      if (response) {
        this.checkboxGridData = response;
        console.log(this.checkboxGridData);
        for (var j = 0; j < this.checkboxGridData.length; j++) {
          if (this.checkboxGridData[j].isDefault == true) {
            this.searchReportColumns.push(this.checkboxGridData[j].headingDBColumn);
          }
        }
        this.checkboxGridData.filter(element => {
          if (element.headingSubCategory == customizeGridConstant.indentifyingNumber) {
            this.identifyingNumbers.push(element);
          } else if (element.headingSubCategory == customizeGridConstant.financial) {
            this.financialItems.push(element);
          } else if (element.headingSubCategory == customizeGridConstant.otherInfo) {
            this.otherInfo.push(element);
          } else if (element.headingSubCategory == customizeGridConstant.transitInfo) {
            this.transitInfo.push(element);
          } else if (element.headingSubCategory == customizeGridConstant.destinationInfo) {
            this.destinationInfo.push(element);
          } else if (element.headingSubCategory == customizeGridConstant.originInfo) {
            this.originInfo.push(element);
          }
        });
        for (var i = 0; i < this.transitInfo.length; i++) {
          if (i == 0 || i == 1 || i == 2 || i == 3) {
            this.transitInfoOne.push(this.transitInfo[i]);
          } else if (i == 4 || i == 5) {
            this.transitInfoTwo.push(this.transitInfo[i]);
          } else if (i == 6 || i == 7) {
            this.transitInfoThree.push(this.transitInfo[i]);
          }
        }
        this.destinationInfoLength = this.destinationInfo.length / 2;
        for (var i = 0; i < this.destinationInfo.length; i++) {
          if (i <= this.destinationInfoLength) {
            this.destinationInfoOne.push(this.destinationInfo[i]);
          } else {
            this.destinationInfoTwo.push(this.destinationInfo[i]);
          }
        }
        this.originInfoLength = this.originInfo.length / 2;
        for (var i = 0; i < this.originInfo.length; i++) {
          if (i <= this.originInfoLength) {
            this.originInfoOne.push(this.originInfo[i]);
          } else {
            this.originInfoTwo.push(this.originInfo[i]);
          }
        }
      }

    }, error => {
      this.errorMessage = <any>error
    })
  }

  checkedValue(item, checked) {
    if (checked.checked) {
      this.searchReportColumns.push(item);
    } else {
      for (var i=0; i<this.searchReportColumns.length; i++) {
        if (this.searchReportColumns[i] == item) {
          this.searchReportColumns.splice(i, 1);
        }
      }
    }
  }

  cancel() {
    this.dialog.closeAll();
  }

  apply() {
    this.gridColumns = this.searchReportColumns.join(', ');
    this.dialogRef.close(this.gridColumns);
  }

}
