import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPreferenceDeletionComponent } from './user-preference-deletion.component';

xdescribe('UserPreferenceDeletionComponent', () => {
  let component: UserPreferenceDeletionComponent;
  let fixture: ComponentFixture<UserPreferenceDeletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPreferenceDeletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPreferenceDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
