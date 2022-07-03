import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class FilterSerche {
  // @MinLength(2)
  @IsOptional()
  name?: string;
}
