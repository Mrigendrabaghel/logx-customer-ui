import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { MaterialModule } from '../../material.module';

import { LocationSearchComponent } from './location-search.component';

xdescribe('LocationSearchComponent', () => {
  let component: LocationSearchComponent;
  let fixture: ComponentFixture<LocationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationSearchComponent ],
      imports: [HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule],
      providers: [ HttpClient, IncidentReportService, AdvanceSearchService ]
    }) 
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
