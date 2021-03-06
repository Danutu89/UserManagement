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
exports.Person = void 0;
const typeorm_1 = require("typeorm");
const Group_1 = require("./Group");
let Person = class Person {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Person.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Person.prototype, "first_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Person.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Person.prototype, "job_title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Person.prototype, "created_on", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Person.prototype, "updated_on", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Group_1.Group, (group) => group.users),
    __metadata("design:type", Group_1.Group)
], Person.prototype, "group", void 0);
Person = __decorate([
    typeorm_1.Entity()
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map