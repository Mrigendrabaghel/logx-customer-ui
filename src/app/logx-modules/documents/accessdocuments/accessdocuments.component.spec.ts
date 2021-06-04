import { HttpClientModule } from '@angular/common/http';
import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import { AccessdocumentsComponent } from './accessdocuments.component';
import { AccessDocumentModel } from '../../../shared/models/document/access-document-model';
import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';
import { of } from 'rxjs';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';

xdescribe('Access Documents Component', () => {
  let component: AccessdocumentsComponent;
  let service: AccessDocumentService;
  
  let service1: AdvanceSearchService;
  let fixture: ComponentFixture<AccessdocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [AccessDocumentService, AdvanceSearchService],
      declarations: [ AccessdocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit(); 
    service = TestBed.inject(AccessDocumentService);
    service1 = TestBed.inject(AdvanceSearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('service call validity',() =>{
    expect(service).toBeTruthy();
  });

  it('Service1 call validity', () => {
    expect(service1).toBeTruthy();
  });
  // it('should call ChangeSearchCreteria', () =>{
  //   expect(component.ChangeSearchCreteria).toBeTruthy();
  // })

  it('Access Document form invalid when empty', () => {
    expect(component.accessDocumentForm.valid).toBeFalsy();
  });

  it('Access Document form  valid when search box as value', () => {
    component.accessDocumentForm.controls['searchAccessDocument'].setValue("123456");
        expect(component.accessDocumentForm.valid).toBeTruthy();
  });

  it('searchAccessDocument field validity, should be required .', () => {
    let errors = {};
    let searchAccessDocument = component.accessDocumentForm.controls['searchAccessDocument'];
    errors = searchAccessDocument.errors || {};
    expect(errors['required']).toBeTruthy(); (1)
  });

  it("check Function call", fakeAsync(() => { 
    component.getAccessDocuments("123456");
    expect(component.submitted).toEqual(true);
    expect(component.getAccessDocuments).toBeTruthy();
  }));

  it('getAccessDocument should submitted to true', () =>{
    component.getAccessDocuments("123456");
    expect(component.submitted).toBeTruthy();
  });

it('openAdvanceSearch should submitted to true', () =>{
  component.openAdvanceSearch();
  expect(component.isShowDocumentAdvanceSearch).toBeTruthy();
});

it('getSearchOrderDetails should submitted to false', () =>{
  component.getSearchOrderDetails('12345');
  expect(component.isShowDocumentAdvanceSearch).toBeFalsy();
});

it('should call GetDocuments function', ()=>{
  const response = AccessDocumentModel ['abc'] = [];
  spyOn(service,'GetAccessDocument').and.returnValue(of(response))
  component.GetDocuments('abd');
  fixture.detectChanges();
  expect(component.AccessdataSource).toEqual(response);
});

it('should call getSearchOrderDetails function', ()=>{
  const response = AccessDocumentModel ['abc'] = [];
  spyOn(service1,'getDocumentAdvanceSearchGridValue').and.returnValue(of(response))
  component.getSearchOrderDetails('abd');
  fixture.detectChanges();
  expect(component.AccessdataSource).toEqual(response);
});
// it('should call ChangeSearchCreteria', () => {
//   expect(component.ChangeSearchCreteria).toBeTruthy();
// });
it('should call PasteSearchCreteria', () => {
  expect(component.PasteSearchCreteria).toBeTruthy();
});
// it('should call focusOutFunction', () => {
//   expect(component.focusOutFunction).toBeTruthy();
// });

it('should call focusOutFunction()', () => {
  let spy = spyOn(component, 'focusOutFunction').and.callThrough();
  component.focusOutFunction();
  expect(spy).toHaveBeenCalledWith();
});

it('should call ChangeSearchCreteria', () => {
  let spy = spyOn(component, 'ChangeSearchCreteria').and.callThrough();
  component.ChangeSearchCreteria('event');
  expect(spy).toHaveBeenCalledWith('event');
});

it('should call getDocumentsFromDashboard', () => {
  let spy = spyOn(component, 'getDocumentsFromDashboard').and.callThrough();
  component.getDocumentsFromDashboard('3');
  expect(spy).toHaveBeenCalledWith('3');
});

it('should call GetDocuments', () => {
  const res = [{  'orderNum':123,
          'loadNumber': "12" ,   
          'gbolNumber' :'123',
          'tcnNumber' :'123',
          'documentId':2,
          'documentName':'123',
          'refNum':'123',
          'status': "Closed",
          "documentForma":'123',
          "documentType" :'123',
          "documentDescription": '123',
          "documentDate" : "12/12/2020",
          "documentGroup" :'123',
          "docNum":'123',
          "loadDocId":123 }];
  spyOn(service, 'GetAccessDocument').and.returnValue(of(res))
  component.GetDocuments('abc');
  fixture.detectChanges();
  expect(component.isDisplayTable).toBe(true);
  expect(component.searchRecord).toEqual(component.commonNumbers.one);
});
it('should call getSearchOrderDetails', () => {
  const res = [{  'orderNum':123,
          'loadNumber': "12" ,   
          'gbolNumber' :'123',
          'tcnNumber' :'123',
          'documentId':2,
          'documentName':'123',
          'refNum':'123',
          'status': "Closed",
          "documentForma":'123',
          "documentType" :'123',
          "documentDescription": '123',
          "documentDate" : "12/12/2020",
          "documentGroup" :'123',
          "docNum":'123',
          "loadDocId":123 }];
  spyOn(service1, 'getDocumentAdvanceSearchGridValue').and.returnValue(of(res))
  component.getSearchOrderDetails('abc');
  fixture.detectChanges();
  expect(component.isDisplayTable).toBe(true);
  expect(component.searchRecord).toEqual(component.commonNumbers.one);
});
it('errorHandling -for the control error', () => {
  spyOn(component, 'errorHandling');
  component.errorHandling('abc', "def");
  expect(component.errorHandling).toHaveBeenCalledWith('abc', "def");
});

//   it('should call getDocumentsFromDashboard and return list of documents',async(()=>{
//     const response : AccessDocumentModel [] = [];
//     spyOn(service,'GetAccessDocument').and.returnValue(of(response))
//     component.getDocumentsFromDashboard("123456");
//     fixture.detectChanges();
//     expect(component.dataSource).toEqual(response);
// }));

// it('should call getAccessDocuments function',async(() =>{
//   const response : AccessDocumentModel [] = [];
//   spyOn(service,'GetAccessDocument').and.returnValue(of(response))
//   component.getAccessDocuments("123456");
//   fixture.detectChanges();
//   expect(component.dataSource).toEqual(response);
    
// }));


});