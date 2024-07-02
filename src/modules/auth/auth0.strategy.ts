import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor() {
    super({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/callback',
      scope: 'openid email profile',
      state: false,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    extraParams: any,
    profile: any,
  ): Promise<any> {
    console.log('AccessToken:', accessToken);
    console.log('RefreshToken:', refreshToken);
    console.log('ExtraParams:', extraParams);
    console.log('Profile:', profile);

    if (extraParams.error) {
      console.error('Error received from Auth0:', extraParams.error);
      throw new Error(extraParams.error);
    }

    try {
      const user = {
        idToken: accessToken,
        extraParams,
      };
      return user;
    } catch (err) {
      console.error('Error in validate function:', err);
      throw err;
    }
  }
}
