import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  template: `
    <div>{{ error }}</div>
  `
})
export class CustomCallbackComponent implements OnInit {
  error: string;

  constructor(private okta: OktaAuthService, private router: Router) {}

  async ngOnInit() {
    /**
     * Handles the response from Okta and parses tokens.
     */
    return this.okta
      .handleAuthentication()
      .then(() => {
        /**
         * Navigate back to the saved uri, or root of application.
         */
        const fromUri = this.okta.getFromUri();
        // window.location.replace(fromUri);    <-- OLD CODE
        this.router.navigate([fromUri]);     // <-- NEW CODE 
      })
      .catch(e => {
        this.error = e.toString();
      });
  }
}