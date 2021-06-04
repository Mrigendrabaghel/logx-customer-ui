import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExportData } from 'src/app/shared/models/order/export-data.model';
import { ExportDataConst,CommonConst,DocumentsConst,commonNumbers } from 'src/app/configs/constants';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent implements OnInit {

  commonNumbers = commonNumbers;
  ExportDataConst = ExportDataConst;
  CommonConst = CommonConst;
  DocumentsConst = DocumentsConst;
  @Output() exportOrderDetailData: EventEmitter<any> = new EventEmitter();
  exportDataForm: FormGroup;
  isPdf: boolean = false;
  exportData: ExportData = <ExportData>{};
  error: string = '';
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ExportDataComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
    this.exportData = data;
    this.exportDataForm = this.fb.group({
      documentType: [this.exportData.documentType, Validators.required],
      orderDetails: false,
      comments: false,
      items: false,
      attachmentSummary: false,
      linesofRouting: false,
    });
  }

  ngOnInit(): void {


  }

  get f() { return this.exportDataForm.controls; }

  closePopup() {
    this.dialogRef.close({ event: CommonConst.close })
  }

  onExportTypeChange(event: any) {
    try {
      this.error = '';
      if ((event.value as string).toLowerCase() === DocumentsConst.AccessDocuments.pdf) {
        this.isPdf = true;
        this.exportDataForm.patchValue({
          documentType: ExportDataConst.exportPdf,
          orderDetails: (this.exportData.orderDetails) ? true : false,
          comments: (this.exportData.comments) ? true : false,
          items: (this.exportData.items) ? true : false,
          attachmentSummary: (this.exportData.attachmentSummary) ? true : false,
          linesofRouting: (this.exportData.linesofRouting) ? true : false,
        });
      }
      else if ((event.value as string).toLowerCase() === ExportDataConst.expCsv) {
        this.isPdf = false;
        this.exportDataForm.patchValue({
          documentType: ExportDataConst.exportCSV,
          orderDetails: (this.exportData.orderDetails) ? true : false,
          comments: (this.exportData.comments) ? true : false,
          items: (this.exportData.items) ? true : false,
          attachmentSummary: (this.exportData.attachmentSummary) ? true : false,
          linesofRouting: (this.exportData.linesofRouting) ? true : false,
        });
      }
    }
    catch (error) {
      throw error;
    }
  }

  ExportData() {
    try {
      this.error = '';
      if (!this.exportDataForm.controls.documentType.value) {
        this.error = ExportDataConst.docType;
      }
      else if (this.exportDataForm.controls.documentType.value === ExportDataConst.exportCSV ||
        this.exportDataForm.controls.documentType.value === ExportDataConst.exportPdf) {
        let selCoun: number = 0;
        if (this.exportData.items && this.exportDataForm.controls.items.value) {
          selCoun = commonNumbers.one;
        }
        else if (selCoun === 0 && this.exportData.orderDetails && this.exportDataForm.controls.orderDetails.value) {
          selCoun = commonNumbers.one;
        }
        else if (selCoun === 0 && this.exportData.attachmentSummary && this.exportDataForm.controls.attachmentSummary.value) {
          selCoun = commonNumbers.one;
        }
        else if (selCoun === 0 && this.exportData.linesofRouting && this.exportDataForm.controls.linesofRouting.value) {
          selCoun = commonNumbers.one;
        }
        else if (selCoun === 0 && this.exportData.comments && this.exportDataForm.controls.comments.value) {
          selCoun = commonNumbers.one;
        }
        if (selCoun === 0) {
          this.error = ExportDataConst.itemSel;
        }

      }
      if (this.error.length === 0)
        this.dialogRef.close({ event: ExportDataConst.exportData, data: this.exportDataForm.value });
    }
    catch (error) {
      throw error;
    }
  }


}
