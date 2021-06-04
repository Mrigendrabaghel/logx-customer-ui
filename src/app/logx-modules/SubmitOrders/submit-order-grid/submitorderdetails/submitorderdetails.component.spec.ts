import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitorderdetailsComponent } from './submitorderdetails.component';

xdescribe('SubmitorderdetailsComponent', () => {
  let component: SubmitorderdetailsComponent;
  let fixture: ComponentFixture<SubmitorderdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitorderdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitorderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
