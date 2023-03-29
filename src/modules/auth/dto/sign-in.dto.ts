import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsString()
  @IsNotEmpty()
  // @Validate(IsExist, ['User'], {
  //   message: 'Email Not Exists',
  // })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
