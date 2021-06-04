import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material.module';

import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports:[MaterialModule,BrowserAnimationsModule]
    });
    
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should call openSnackBar() function of Service', () => {
    spyOn(service, 'openSnackBarWithAction');
    service.openSnackBar('msg');
    expect(service.openSnackBarWithAction).toHaveBeenCalled();
})

});