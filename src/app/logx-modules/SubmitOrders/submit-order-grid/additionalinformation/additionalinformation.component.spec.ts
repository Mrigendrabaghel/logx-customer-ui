import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalinformationComponent } from './additionalinformation.component';

xdescribe('AdditionalinformationComponent', () => {
  let component: AdditionalinformationComponent;
  let fixture: ComponentFixture<AdditionalinformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalinformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
