"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(Users) {
        this.Users = Users;
    }
    async addUser(body) {
        const hash = bcrypt.hashSync(body.password, 3);
        body.password = hash;
        let user = null;
        try {
            const newUser = await this.Users.create(body);
            user = await newUser.save();
        }
        catch (error) {
            if (error.keyPattern.email) {
                throw new common_1.HttpException('Email Found', common_1.HttpStatus.CONFLICT);
            }
            console.log(error);
        }
        return user.toObject();
    }
    async foundByEmail(email) {
        return await this.Users.findOne({ email: email }).lean();
    }
    async foundById(id) {
        return await this.Users.findById(id)
            .populate({
            path: 'requestsFriends',
            model: 'Users',
            select: '_id firstName lastName email ',
            options: { lean: true },
        })
            .populate({
            path: 'requestSend',
            model: 'Users',
            select: '_id firstName lastName email ',
            options: { lean: true },
        })
            .lean();
    }
    async updateUser(id, payload) {
        return await this.Users.findByIdAndUpdate(id, Object.assign({}, payload));
    }
    async getAll(query) {
        let res = [];
        if (query === null || query === void 0 ? void 0 : query.name) {
            res = await this.Users.find({
                firstName: { $regex: '.*' + query.name + '.*' },
            }).select(['-password', '-refreshToken']);
        }
        else {
            res = await this.Users.find().select(['-password', '-refreshToken']);
        }
        return [...res];
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map