import { Controller, Get, Query } from '@nestjs/common';
import { FilterSerche } from './dto/filter-serche ';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAll(@Query() query: FilterSerche) {
    return await this.usersService.getAll(query);
  }
}
