import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { expirationTimeInSecondsEnv, secretEnv } from '../../shared/config/constants';

export const getJWTConfig = async (configService: ConfigService): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get(secretEnv),
    signOptions: {
      expiresIn: `${configService.get(expirationTimeInSecondsEnv)}s`,
    },
  };
};
