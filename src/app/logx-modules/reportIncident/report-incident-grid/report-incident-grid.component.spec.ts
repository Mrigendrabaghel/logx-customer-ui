import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncidentGridComponent } from './report-incident-grid.component';

xdescribe('SubmitOrderGridComponent', () => {
  let component: ReportIncidentGridComponent;
  let fixture: ComponentFixture<ReportIncidentGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIncidentGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncidentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
