import { Component } from '@angular/core';
import { CommonConst, Version } from 'src/app/configs/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  today: number = Date.now();
  CommonConst = CommonConst;
  public version = Version;
}
