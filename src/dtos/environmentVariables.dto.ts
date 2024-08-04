import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class EnvironmentVariablesDTO {
  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number;

  @IsNotEmpty()
  REFRESH_SECRET_KEY: string;

  @IsNotEmpty()
  ACCESS_SECRET_KEY: string;

  @IsNotEmpty()
  REFRESH_TOKEN_EXPIRES_IN: string;

  @IsNotEmpty()
  ACCESS_TOKEN_EXPIRES_IN: string;
}
