import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { SubmitordermaincomponentComponent } from './submitordermaincomponent.component';

xdescribe('SubmitordermaincomponentComponent', () => {
  let component: SubmitordermaincomponentComponent;
  let fixture: ComponentFixture<SubmitordermaincomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialog
      ],
      declarations: [ SubmitordermaincomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitordermaincomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
