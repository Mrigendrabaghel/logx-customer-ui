import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlineitemsComponent } from './orderlineitems.component';

xdescribe('OrderlineitemsComponent', () => {
  let component: OrderlineitemsComponent;
  let fixture: ComponentFixture<OrderlineitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderlineitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlineitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
