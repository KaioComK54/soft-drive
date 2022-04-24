import { AuthDto } from '../dto/auth.dto';
import { authExampleValues } from '../utils/auth.constants';

export class AuthMock {
  static mockAuthDto(): AuthDto {
    const authDto = new AuthDto();

    authDto.email = authExampleValues.email;
    authDto.password = authExampleValues.password;
    authDto.ipAddress = authExampleValues.ipAddress;

    return authDto;
  }

  static mockAccessToken(): Record<string, any> {
    return { accessToken: authExampleValues.accessToken };
  }
}
