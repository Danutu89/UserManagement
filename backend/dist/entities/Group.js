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
var Group_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const typeorm_1 = require("typeorm");
const Person_1 = require("./Person");
let Group = Group_1 = class Group {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Group.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Group.prototype, "created_on", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Group.prototype, "updated_on", void 0);
__decorate([
    typeorm_1.OneToOne(() => Group_1, (parent_group) => parent_group.sub_group),
    __metadata("design:type", Group)
], Group.prototype, "parent_group", void 0);
__decorate([
    typeorm_1.OneToOne(() => Group_1, (sub_group) => sub_group.parent_group),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Group)
], Group.prototype, "sub_group", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Person_1.Person, (person) => person.group),
    __metadata("design:type", Array)
], Group.prototype, "users", void 0);
Group = Group_1 = __decorate([
    typeorm_1.Entity()
], Group);
exports.Group = Group;
//# sourceMappingURL=Group.js.map