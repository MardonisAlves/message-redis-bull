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
exports.AppModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const bull_board_1 = require("bull-board");
const conssumer_email_1 = require("./conssumer/conssumer-email");
const app_controller_1 = require("./controller/app.controller");
const app_service_1 = require("./services/app.service");
const bullAdapter_1 = require("bull-board/bullAdapter");
let AppModule = class AppModule {
    constructor(emailqueue) {
        this.emailqueue = emailqueue;
    }
    configure(conssumer) {
        const { router } = (0, bull_board_1.createBullBoard)([
            new bullAdapter_1.BullAdapter(this.emailqueue)
        ]);
        conssumer.apply(router).forRoutes('/admin/queue');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            bull_1.BullModule.forRoot({
                redis: {
                    host: 'localhost',
                    port: 62388
                }
            }),
            bull_1.BullModule.registerQueue({
                name: 'email'
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, conssumer_email_1.default],
    }),
    __param(0, (0, bull_1.InjectQueue)('email')),
    __metadata("design:paramtypes", [Object])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map