import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCustomizeGridDialogComponent } from './order-customize-grid-dialog.component';

xdescribe('OrderCustomizeGridDialogComponent', () => {
  let component: OrderCustomizeGridDialogComponent;
  let fixture: ComponentFixture<OrderCustomizeGridDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCustomizeGridDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCustomizeGridDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
