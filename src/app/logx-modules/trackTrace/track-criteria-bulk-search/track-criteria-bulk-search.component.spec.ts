import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCriteriaBulkSearchComponent } from './track-criteria-bulk-search.component';

xdescribe('TrackCriteriaBulkSearchComponent', () => {
  let component: TrackCriteriaBulkSearchComponent;
  let fixture: ComponentFixture<TrackCriteriaBulkSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackCriteriaBulkSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCriteriaBulkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
