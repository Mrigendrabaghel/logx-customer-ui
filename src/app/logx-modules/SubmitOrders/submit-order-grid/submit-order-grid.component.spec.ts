import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitOrderGridComponent } from './submit-order-grid.component';

xdescribe('SubmitOrderGridComponent', () => {
  let component: SubmitOrderGridComponent;
  let fixture: ComponentFixture<SubmitOrderGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitOrderGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitOrderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
