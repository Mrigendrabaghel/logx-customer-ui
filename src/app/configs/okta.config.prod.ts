export const oktaConfig= {
    oidc: {
        clientId: `0oapg6b8sHBOC2kLx5d6`,
        issuer: `https://crowleyplatforms.okta.com/oauth2/default`,
        redirectUri: window.location.origin +'/implicit/callback',
        scopes: ['openid', 'profile', 'email'],
        responseType: ['code']
      }
    }


//added for testing Okta prod tenant
    // export const oktaConfig= {
    //   oidc: {
    //       clientId: `0oa1kimnnw3sUz1cU0h8`,
    //       issuer: `https://crowley.okta.com/oauth2/default`,
    //       redirectUri: window.location.origin +'/implicit/callback',
    //       scopes: ['openid', 'profile', 'email'],
    //       responseType: ['code']
    //     }
    //   }
//-------------------------------------
