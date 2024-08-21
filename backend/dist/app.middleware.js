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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("./services/user.service");
let isAuthenticated = class isAuthenticated {
    constructor(jwt, userService) {
        this.jwt = jwt;
        this.userService = userService;
    }
    async use(req, res, next) {
        try {
            if (req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')) {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = this.jwt.verify(token);
                console.log(token);
                const user = await this.userService.getOne(decoded.email);
                if (user) {
                    req.user = user;
                    next();
                }
                else {
                    throw new common_1.UnauthorizedException('Unauthorized');
                }
            }
            else {
                throw new common_1.NotFoundException('No token found');
            }
        }
        catch {
            throw new common_1.UnauthorizedException('Unauthorized');
        }
    }
};
exports.isAuthenticated = isAuthenticated;
exports.isAuthenticated = isAuthenticated = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], isAuthenticated);
//# sourceMappingURL=app.middleware.js.map