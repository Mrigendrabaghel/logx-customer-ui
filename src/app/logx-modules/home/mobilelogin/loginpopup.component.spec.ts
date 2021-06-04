import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginpopupComponent } from './loginpopup.component';

xdescribe('LoginpopupComponent', () => {
  let component: LoginpopupComponent;
  let fixture: ComponentFixture<LoginpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
