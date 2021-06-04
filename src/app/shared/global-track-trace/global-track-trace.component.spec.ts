import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTrackTraceComponent } from './global-track-trace.component';

xdescribe('GlobalTrackTraceComponent', () => {
  let component: GlobalTrackTraceComponent;
  let fixture: ComponentFixture<GlobalTrackTraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalTrackTraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalTrackTraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
