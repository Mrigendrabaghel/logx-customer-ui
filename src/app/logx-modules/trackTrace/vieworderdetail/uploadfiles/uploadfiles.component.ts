import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Docs, DocTypeLookUp, DocFileExist } from 'src/app/shared/models/order/file-upload.model';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { formatDate } from '@angular/common';
import { DocumentsConst, UploadConst, CommonConst,docTypeListConst } from 'src/app/configs/constants';

const MAX_FILE_SIZE_UPLOAD: number = 20971520; //20 MB maximum

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.scss']
})
export class UploadfilesComponent implements AfterViewInit {

  @Output() closeUploadFile: EventEmitter<boolean> = new EventEmitter();
  @Input() filesSelected: FileList = null;
  @Input() IsMobile:boolean;
  @Output() uploadFile: EventEmitter<any> = new EventEmitter();
  @Output() desc:EventEmitter<any> = new EventEmitter();
  UploadConst = UploadConst;
  CommonConst = CommonConst;
  DocumentsConst = DocumentsConst;
  uploadFileForm: FormGroup;
  docTypeListConst=docTypeListConst;
  docTypeList: DocTypeLookUp[] = [];
  docType: string = 'DocType';
  uploadedFileList: Docs[] = [];
  submitted: boolean = false;
  filesFormatNotSupport: string = '';
  filesMaxErrorList: string = '';
  filesExistError: string = '';
  //fileExtensionsSupport: string = '.pdf,.doc,.docx,.xls,.xlsx,.msg,.jpeg,.jpg,.png,.txt';
  isError: boolean = false;
  docFileExistList: DocFileExist[] = [];
  @Input() uploadFrom: string;
  maxFileError: string = '';
  filesUploadMax: string = '';
  finalCss: string;
  DocDescriptions: any;
  DocTypeList: DocTypeLookUp[];
  DocTypeListAdd: DocTypeLookUp[];
  constructor(private fb: FormBuilder, private uploadService: UploadAndLookupDetailService,
    private dialog: MatDialog,
    private detectchanges: ChangeDetectorRef,) {

    this.uploadFileForm = this.fb.group({
      files: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    switch (this.uploadFrom) {
      case CommonConst.incidentreports:
        this.finalCss = 'incidentcss';
        break;
      case CommonConst.orderAdditionalInfo:
        this.finalCss = 'orderAddInfocss';
        break;

      default:
        this.finalCss = 'ordercss'
        break;
    }
  }

  ngAfterViewInit() {
    try {
      this.uploadService.GetLookupDetails(this.docType).subscribe(async data => {
        if (data && data.length > 0) {
          this.docTypeList = data;
          this.DocTypeList = this.docTypeList.filter(item => item.lookupText !== docTypeListConst.lookUpIncident 
            && item.lookupText !== docTypeListConst.serviceExceptionDocs && item.lookupText !== docTypeListConst.accessorialForm).sort((a, b) => a.lookupDisplayText.localeCompare(b.lookupDisplayText));
          this.DocTypeListAdd=this.DocTypeList.filter(item => item.lookupText !== docTypeListConst.pod && item.lookupText !== docTypeListConst.reWeighTicket).sort((a, b) => a.lookupDisplayText.localeCompare(b.lookupDisplayText));;
         
          //this.DocTypeListAdd.sort((a, b) => a.lookupDisplayText.localeCompare(b.lookupDisplayText))
          if (this.filesSelected) {
            await this.ValidateAddFile(this.filesSelected);
          }
        }
      })
    }
    catch (error) {
      throw error;
    }
if(this.uploadFrom == CommonConst.incidentreports){
  if (this.IsMobile==true){
    this.uploadFileForm.valueChanges.subscribe( () => {
    this.DocDescriptions=this.uploadFileForm.value.files;
      this.detectchanges.detectChanges();
      if(this.DocDescriptions!=undefined)
      this.desc.emit(this.DocDescriptions);
    });
  }
}
  }

  files(): FormArray {
    return this.uploadFileForm.get(UploadConst.files) as FormArray
  }

  async newFile(file: any) {
    let docFormat = ((file.name && file.name.length > 0 && (file.name).lastIndexOf('.')) ? file.name.split('.').pop() : '').toLowerCase();
    let docName = ((file.name && file.name.length > 0 && (file.name).indexOf('.')) ? file.name.substr(0, file.name.indexOf(".")) : '');
    let data = this.uploadFileForm.value.files.filter(res => res.DocName.toLowerCase() === file.name.toLowerCase());
    if (data.length > 0) {
      this.GetErrorFileList(file, UploadConst.fileExist);
      return;
    }

    if (UploadConst.fileExtensionsSupport.indexOf(docFormat) == -1) {
      this.GetErrorFileList(file, UploadConst.FileNotSupported);
    }
    else {
      docFormat = this.GetDocFormat(docFormat);
      var IncidentIndex = (this.uploadFrom != UploadConst.incidentreports) ? 0 : this.docTypeList.findIndex((item => item.lookupText == UploadConst.lookUpIncident));
      this.files().push(this.fb.group({
        docNum: (file.name && file.name.length > 0) ? file.name : '',
        docType: [this.docTypeList[IncidentIndex].lookupDisplayText],
        docFormat: docFormat,
        docContent: await this.GetBase64(file),
        DocName: (file.name && file.name.length > 0) ? file.name : '',//(this.uploadFrom != UploadConst.incidentreports) ? ((file.name && file.name.length > 0 && (file.name).indexOf('.')) ? file.name.substr(0, file.name.indexOf(".")) : '') : file.name,
        DocDescription: '',
        DocDate: formatDate(new Date(), UploadConst.dateFormat, UploadConst.en)
      }));
    }
  }

  //Based on file extention we need to send DocFormat which TMS api accepts
  GetDocFormat(docFormat: string): string {
    switch (docFormat.toLowerCase()) {
      case DocumentsConst.AccessDocuments.pdf:
        docFormat = DocumentsConst.AccessDocuments.pdfDocFormat;
        break;
      case DocumentsConst.AccessDocuments.doc:
      case DocumentsConst.AccessDocuments.docx:
        docFormat = DocumentsConst.AccessDocuments.Word;
        break;
      case DocumentsConst.AccessDocuments.xls:
      case DocumentsConst.AccessDocuments.xlsx:
        docFormat = DocumentsConst.AccessDocuments.Text;
        break;
      case DocumentsConst.AccessDocuments.jpg:
      case DocumentsConst.AccessDocuments.jpeg:
      case DocumentsConst.AccessDocuments.png: docFormat = DocumentsConst.AccessDocuments.Jpg;
        break;
      case DocumentsConst.AccessDocuments.msg: docFormat = DocumentsConst.AccessDocuments.Html;
        break;
      case DocumentsConst.AccessDocuments.txt: docFormat = DocumentsConst.AccessDocuments.Text

    }
    return docFormat;
  }

  GetBase64(file: any) {
    return new Promise((resolve, reject) => {
      let fileData: string = '';
      const reader = new FileReader();
      reader.onload = () => {
        fileData = reader.result.toString();
        fileData = ((fileData.length > 0 && fileData.indexOf(',')) ? fileData.substr(fileData.indexOf(",") + 1, fileData.length) : '');
        resolve(fileData);
      };

      reader.onerror = () => {
        reject(new Error(UploadConst.readError));
      };

      reader.readAsDataURL(file);
    });
  }

  ValidateAddFile(filesSelected: any) {
    this.isError = false;
    this.filesFormatNotSupport = '';
    this.filesMaxErrorList = '';
    this.filesExistError = '';
    for (let count = 0; count < filesSelected.length; count++) {
      let file = filesSelected[count];

      if (file) {
        if (file.size <= MAX_FILE_SIZE_UPLOAD) {
          this.newFile(file);
        }
        else {
          this.GetErrorFileList(file, UploadConst.maxSize);
        }
      }
    }
  }

  GetErrorFileList(file: any, errorType: string) {
    this.isError = true;
    switch (errorType) {
      case UploadConst.maxSize: this.filesMaxErrorList = this.filesMaxErrorList.concat(",", file.name);
        break;
      case UploadConst.fileExist:
        this.filesExistError = this.filesExistError.concat(",", file.name);
        break;
      case UploadConst.FileNotSupported: this.filesFormatNotSupport = this.filesFormatNotSupport.concat(",", file.name);
        break;
      case UploadConst.uploadFilesMax: this.filesUploadMax = UploadConst.maxUploadMsg;
        break;
    }
  }

  removeFile(i: number, DocName: string) {
    try {
      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          message: UploadConst.deleteMsg + DocName + UploadConst.question,
          buttonText: {
            ok: UploadConst.deleteYes,
            cancel: UploadConst.deleteCancel
          }
        }
      });
      dialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          this.files().removeAt(i);
        }
      })
    }
    catch (error) {
      throw error;
    }
  }

  AddFiles(event: any) {
    debugger
    try {
      if (event && event.target && event.target.files) {
        let filesSel = event.target.files;
        this.ValidateAddFile(filesSel);
      }
    }
    catch (error) {
      throw error;
    }
  }
  UploadFilesMobile(DocDesc,mob){
    this.DocDescriptions=DocDesc;
    this.IsMobile=mob;
    this.UploadFiles()
  }
  UploadFiles() {
    try {
      this.docFileExistList = [];
      this.filesExistError = '';
      this.filesUploadMax = '';
      this.submitted = true;
      this.uploadedFileList = this.uploadFileForm.value.files;
       if(this.IsMobile==true){
        this.uploadedFileList = this.DocDescriptions
       }
      if (this.uploadedFileList.length <= UploadConst.maxUploadSize) {
        this.uploadedFileList.forEach((fileDetail) => {
          if (fileDetail.DocType) {
            if (this.docFileExistList && this.docFileExistList.length === 0) {
              this.docFileExistList.push({ DocNum: fileDetail.DocNum, DocType: fileDetail.DocType });
            }
            else {
              let data = this.docFileExistList.find(item => item.DocNum === fileDetail.DocNum && item.DocType === fileDetail.DocType);
              if (data === undefined) {
                this.docFileExistList.push({ DocNum: fileDetail.DocNum, DocType: fileDetail.DocType });
              }
              else {
                this.GetErrorFileList(fileDetail, UploadConst.fileExist);
              }
            }

          }
        });
        //Upload files if no errors
        if (this.filesExistError.length === 0) {
          this.uploadFile.emit(this.uploadedFileList);
        }
      }
      else {
        this.GetErrorFileList(null, UploadConst.uploadFilesMax);
      }
    }
    catch (error) {
      throw error;
    }
  }

  closeUploadSection() {
    this.closeUploadFile.emit(true);
  }

}
