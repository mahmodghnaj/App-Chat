import { IsNotEmpty, Length } from 'class-validator';

export class MessageDto {
  @IsNotEmpty()
  @Length(24, 24, {
    message: 'Id Error',
  })
  chatId: string;
  @IsNotEmpty()
  message: string;
}
