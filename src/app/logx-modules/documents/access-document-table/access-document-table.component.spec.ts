/*import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material.module';
import { AccessDocumentModel } from 'src/app/shared/models/document/access-document-model';
import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';

import { AccessDocumentTableComponent } from './access-document-table.component';
import { of } from 'rxjs';

describe('AccessDocumentTableComponent', () => {
  let component: AccessDocumentTableComponent;
  let service: AccessDocumentService;
  let fixture: ComponentFixture<AccessDocumentTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,
        MaterialModule,FormsModule,BrowserAnimationsModule],
      declarations: [ AccessDocumentTableComponent ],
      providers:[AccessDocumentService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDocumentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service= TestBed.inject(AccessDocumentService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should call openfile function', ()=>{
//       const response = AccessDocumentModel ['abd'] = [];
//       spyOn(service,'OpenFile').and.returnValue(of(response))
//       component.OpenDocument;
//       fixture.detectChanges();
//       expect(component.PreviewData).toEqual(response);
//   })

});
*/