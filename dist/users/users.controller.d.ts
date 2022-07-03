import { FilterSerche } from './dto/filter-serche ';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(query: FilterSerche): Promise<any[]>;
}
