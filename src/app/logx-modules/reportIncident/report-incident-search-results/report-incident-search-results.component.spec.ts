import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncidentSearchResultsComponent } from './report-incident-search-results.component';

describe('ReportIncidentSearchResultsComponent', () => {
  let component: ReportIncidentSearchResultsComponent;
  let fixture: ComponentFixture<ReportIncidentSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIncidentSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncidentSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
