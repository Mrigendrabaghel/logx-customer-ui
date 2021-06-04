import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrefLocDialogComponent } from './user-pref-loc-dialog.component';

xdescribe('UserPrefLocDialogComponent', () => {
  let component: UserPrefLocDialogComponent;
  let fixture: ComponentFixture<UserPrefLocDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPrefLocDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPrefLocDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
