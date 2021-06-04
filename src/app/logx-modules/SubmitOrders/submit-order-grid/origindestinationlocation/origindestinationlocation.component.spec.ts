import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigindestinationlocationComponent } from './origindestinationlocation.component';

xdescribe('OrigindestinationlocationComponent', () => {
  let component: OrigindestinationlocationComponent;
  let fixture: ComponentFixture<OrigindestinationlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrigindestinationlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrigindestinationlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
