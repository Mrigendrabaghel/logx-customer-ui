export const oktaConfig= {
    oidc: {
        clientId: `0oao77c5onVEbDeQE1d6`,
        issuer: `https://crowleyplatforms.oktapreview.com/oauth2/default`,
        redirectUri: window.location.origin +'/implicit/callback',
        scopes: ['openid', 'profile', 'email'],
        responseType: ['code']
      }
    }
    // oidc: {
    //     clientId: `0oa13oa3kaN7EHOfs4x7`,
    //     issuer: `https://crowleysolutions.okta.com/oauth2/default`,
    //     redirectUri: window.location.origin +'/implicit/callback',
    //     scopes: ['openid', 'profile', 'email', 'logx_ui'],
    //     responseType: ['code']
    //   }
    // }

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
