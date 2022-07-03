import { IsNotEmpty, Length } from 'class-validator';

export class DtoAddChat {
  @IsNotEmpty()
  @Length(24, 24, {
    message: 'Id Error',
  })
  friendId: string;
}
