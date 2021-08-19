"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupDeleteAction = exports.groupGetAllAction = exports.groupGetByIdAction = exports.groupPostAction = exports.groupPutAction = void 0;
const typeorm_1 = require("typeorm");
const Group_1 = require("../entities/Group");
function groupPutAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupRepository = typeorm_1.getManager().getRepository(Group_1.Group);
        const new_person = groupRepository.create(request.body);
        yield groupRepository.save(new_person);
        response.send(new_person);
    });
}
exports.groupPutAction = groupPutAction;
function groupPostAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupRepository = typeorm_1.getManager().getRepository(Group_1.Group);
        const new_person = groupRepository.create(request.body);
        yield groupRepository.save(new_person);
        response.send(new_person);
    });
}
exports.groupPostAction = groupPostAction;
function groupGetByIdAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupRepository = typeorm_1.getManager().getRepository(Group_1.Group);
        const result = yield groupRepository.findOne(request.params.id);
        if (!result) {
            response.status(404);
            response.end();
            return;
        }
        response.send(result);
    });
}
exports.groupGetByIdAction = groupGetByIdAction;
function groupGetAllAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupRepository = typeorm_1.getManager().getRepository(Group_1.Group);
        const results = yield groupRepository.find();
        response.send(results);
    });
}
exports.groupGetAllAction = groupGetAllAction;
function groupDeleteAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupRepository = typeorm_1.getManager().getRepository(Group_1.Group);
        try {
            yield groupRepository.delete(request.params.id);
        }
        catch (error) {
            response.status(500).send({
                detauls: 'Unknown error.'
            });
        }
        response.send({
            result: request.params.id
        });
    });
}
exports.groupDeleteAction = groupDeleteAction;
//# sourceMappingURL=Group.js.map