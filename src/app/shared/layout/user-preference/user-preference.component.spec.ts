import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreferenceComponent } from './user-preference.component';

xdescribe('UserPreferenceComponent', () => {
  let component: UserPreferenceComponent;
  let fixture: ComponentFixture<UserPreferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPreferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
