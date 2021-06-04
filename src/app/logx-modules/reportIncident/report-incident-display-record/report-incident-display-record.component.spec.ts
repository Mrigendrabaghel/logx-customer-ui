import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncidentDisplayRecordComponent } from './report-incident-display-record.component';

xdescribe('ReportIncidentDisplayRecordComponent', () => {
  let component: ReportIncidentDisplayRecordComponent;
  let fixture: ComponentFixture<ReportIncidentDisplayRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIncidentDisplayRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncidentDisplayRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
