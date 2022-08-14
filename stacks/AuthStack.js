import * as iam from "aws-cdk-lib/aws-iam";
import { Auth, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";
import * as cognito from "aws-cdk-lib/aws-cognito";

export function AuthStack({ stack, app }) {
  const { bucket } = use(StorageStack);
  const { api } = use(ApiStack);

  
  const auth = new Auth(stack, "Auth", {
    login: ["email"],
    identityPoolFederation: {
      facebook: { appId: "610000510785236" },
      google: {
        clientId:
          "1034339941709-s0q98c6aargmn17q0dj629k3kj55kp3p.apps.googleusercontent.com",
      },
    },

    cdk: {
      userPoolClient: {
        supportedIdentityProviders: [
          cognito.UserPoolClientIdentityProvider.FACEBOOK,
          cognito.UserPoolClientIdentityProvider.GOOGLE,
        ],
        oAuth: {
          callbackUrls: ["http://localhost:3000"],
          logoutUrls: ["http://localhost:3000"]
        },
      },
    },
  });




if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET)
throw new Error("Please set FACEBOOK_APP_ID and FACEBOOK_APP_SECRET");

const provider = new cognito.UserPoolIdentityProviderFacebook(stack,"Facebook",{
  clientId: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  userPool: auth.cdk.userPool,
  attributeMapping: {
    email: cognito.ProviderAttribute.FACEBOOK_EMAIL,
    givenName: cognito.ProviderAttribute.FACEBOOK_NAME,
  },
}
);

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
  throw new Error("Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET");

// Create a Google OAuth provider
const providerg = new cognito.UserPoolIdentityProviderGoogle(stack, "Google", {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  userPool: auth.cdk.userPool,
  scopes: ["profile", "email", "openid"],
  attributeMapping: {
    email: cognito.ProviderAttribute.GOOGLE_EMAIL,
    givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
    familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
    profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
  },
});

auth.cdk.userPoolClient.node.addDependency(provider);
auth.cdk.userPoolClient.node.addDependency(providerg);




  auth.attachPermissionsForAuthUsers(stack, [

    api,
    
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
      ],
    }),
  ]);

  
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  
  return {
    auth,
  };
}