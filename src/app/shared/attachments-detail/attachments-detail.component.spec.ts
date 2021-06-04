import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import { AttachmentsDetailComponent } from './attachments-detail.component';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('AttachmentsDetailComponent', () => {
  let component: AttachmentsDetailComponent;
  let fixture: ComponentFixture<AttachmentsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule  ,
        BrowserAnimationsModule     
      ],
      providers: [AccessorialsService,UploadAndLookupDetailService],
      declarations: [ AttachmentsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
