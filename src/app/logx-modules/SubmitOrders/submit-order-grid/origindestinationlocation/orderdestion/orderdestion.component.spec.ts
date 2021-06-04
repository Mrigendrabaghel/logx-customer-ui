import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdestionComponent } from './orderdestion.component';

xdescribe('OrderdestionComponent', () => {
  let component: OrderdestionComponent;
  let fixture: ComponentFixture<OrderdestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
