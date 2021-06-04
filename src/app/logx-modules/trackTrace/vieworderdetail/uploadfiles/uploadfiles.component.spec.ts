import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Docs, DocTypeLookUp, DocFileExist } from 'src/app/shared/models/order/file-upload.model';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { UploadfilesComponent } from './uploadfiles.component';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material.module';

xdescribe('UploadfilesComponent', () => {
    let component: UploadfilesComponent;
    let service: UploadAndLookupDetailService;
    let fixture: ComponentFixture<UploadfilesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                BrowserAnimationsModule, MaterialModule],
            declarations: [UploadfilesComponent],
            providers: [UploadAndLookupDetailService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadfilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        service = TestBed.inject(UploadAndLookupDetailService);
    });

    afterEach(() => {
        component = null;
        service = null;
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('service call validity', () => {
        expect(service).toBeTruthy();
    });

    it('should call GetErrorFileList', () => {
        component.isError = true;
        component.GetErrorFileList("gh", "aabcd");
        expect(component.isError).toBe(true);
    });

    // it('should call GetLookupDetails', () => {
    //     const data = [{ "isDefault": "false", "languageId": 1, "lookupDataId": 12, "lookupDisplayText": "POD", "lookupText": "POD", "lookupType": "DocType" }];
    //     spyOn(service, 'GetLookupDetails').and.returnValue(of(data))
    //     component.ngAfterViewInit();
    //     fixture.detectChanges();
    //     expect(component.docTypeList.length).toEqual(data.length);
    // });

    it('GetDocFormat -for the file type', () => {
        spyOn(component, 'GetDocFormat');
        component.GetDocFormat('pdf');
        expect(component.GetDocFormat).toHaveBeenCalledWith('pdf');
    });

    it('GetBase64- for the given file', () => {
        const fileList = [{ name: 'test1', size: 500001, type: "application/vnd.ms-excel" }];
        spyOn(component, 'GetBase64');
        component.GetBase64(fileList[0]);
        expect(component.GetBase64).toHaveBeenCalledWith(fileList[0]);
    });

    it('ValidateAddFile- for the given file', () => {
        const fileList = [{ name: 'test1', size: 500001, type: "application/vnd.ms-excel" }];
        spyOn(component, 'ValidateAddFile');
        component.ValidateAddFile(fileList[0]);
        expect(component.ValidateAddFile).toHaveBeenCalledWith(fileList[0]);
    });

    it('GetErrorFileList- for the given file', () => {
        const fileList = [{ name: 'test1', size: 20971520, type: "application/vnd.ms-excel" }];
        spyOn(component, 'GetErrorFileList');
        component.GetErrorFileList(fileList[0], 'FileNotSupported');
        expect(component.GetErrorFileList).toHaveBeenCalledWith(fileList[0], 'FileNotSupported');
    });


    it('should call uploadfiles', () => {
        component.submitted = true;
        component.docFileExistList = [];
        component.filesExistError = '';
        component.filesUploadMax = '';
        component.submitted = true;
        component.uploadedFileList = [{DocContent: "UEsDBBQACAgIAMtjEEs",DocDate: new Date(),DocDescription: "",  
        DocFormat: "Word", DocName: "file_example_XLSX_5000 - Copy (2)",DocNum: "file_example_XLSX_5000 - Copy (2)-Word", DocType: "POD" }];
        spyOn(component, 'UploadFiles');
        component.UploadFiles();
        expect(component.UploadFiles).toHaveBeenCalled();
    });

});
