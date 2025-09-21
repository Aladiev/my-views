import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthModule as AuthClientModule } from '@aladiev/auth-client';

@Module({
  imports: [
    AuthClientModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'http://localhost:3000/',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
