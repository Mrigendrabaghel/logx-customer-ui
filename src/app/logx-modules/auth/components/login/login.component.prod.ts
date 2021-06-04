import { Component, OnInit, NgZone } from '@angular/core';
import { Router,ActivatedRoute, NavigationStart} from '@angular/router';

import { OktaAuthService } from '@okta/okta-angular';

import * as OktaSignIn from '@okta/okta-signin-widget';
import { LayoutConst } from 'src/app/configs/constants';
import { oktaConfig } from 'src/app/configs/okta.config';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';


@Component({
  // selector: 'app-login',
  selector: 'app-secure',
  templateUrl: './login.component.html',
 })


export class LoginComponent implements OnInit {

isAuthenticated: boolean;
signIn;
public resultUrl:string;
public orderNum:string='';
errorMessage: any;
  favoritemenulist:any;
  favoritemenulistVal:any;
  isFavoriteVisible:boolean;
  favoriteiconview:any;
  userfavmenuvalue:any;
  constants=LayoutConst;
//added for testing prod tenant
// widget = new OktaSignIn({
//   //baseUrl: 'https://crowley.okta.com',//oktaConfig.oidc.issuer.split('/oauth2')[0],
//   baseUrl: oktaConfig.oidc.issuer.split('/oauth2')[0],
//   authParams: {
//     issuer: 'https://crowley.okta.com',
//     clientId: oktaConfig.oidc.clientId,
//     responseType: 'code'
//   },
//-----------------------------
widget = new OktaSignIn({
  baseUrl: oktaConfig.oidc.issuer.split('/oauth2')[0],
  authParams: {
    issuer: 'https://crowley.okta.com',
    clientId: oktaConfig.oidc.clientId,
    responseType: 'code'
  },
  clientId: oktaConfig.oidc.clientId,
  redirectUri: oktaConfig.oidc.redirectUri,
  logo: 'assets/crowley_logo.png',
  features: {
    registration: true,
  },
  i18n: {
    //Overrides default text when using English. Override other languages by adding additional sections.
    'en': {
      'primaryauth.title': 'Sign In',   
      'primaryauth.submit': 'Sign In'
    }
  }
});

  


  constructor(public oktaAuth: OktaAuthService,
    private ngZone: NgZone,
     public router: Router,
     public userPreferenceService: UserPreferenceService,
     private activatedRoute: ActivatedRoute) {
       this.widget.remove();
       
  }

  async ngOnInit() {
    this.resultUrl=  decodeURIComponent(this.activatedRoute.snapshot.queryParams['urlPath'])
    this.orderNum=  decodeURIComponent(this.activatedRoute.snapshot.queryParams['orderNum'])
    this.widget.renderEl({
      el: '#okta-signin-container'},
      (res) => {
        if (res.status === 'SUCCESS') {
          
          this.widget.hide();
          if(this.resultUrl!=="undefined")
          {
            localStorage.removeItem('searchCriteria')
            localStorage.setItem('searchCriteria',this.orderNum);
            this.oktaAuth.loginRedirect(this.resultUrl);
            //for testing okta-angular 3.0.1
            //this.oktaAuth.loginRedirect({originalUri: this.resultUrl});
          }
          else{
       
            this.oktaAuth.loginRedirect('/dashboard');
            //for testing okta-angular 3.0.1
            //this.oktaAuth.signInWithRedirect({originalUri: '/dashboard'});
            // let userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
            // this.userFav();
          }
        }
      },
      (err) => {
        throw err;
      }
    );
  }


}

