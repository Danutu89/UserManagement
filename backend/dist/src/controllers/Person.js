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
exports.personDeleteAction = exports.personGetAllAction = exports.personGetByIdAction = exports.personPostAction = exports.personPutAction = void 0;
const typeorm_1 = require("typeorm");
const Person_1 = require("../entities/Person");
function personPutAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const personRepository = typeorm_1.getManager().getRepository(Person_1.Person);
        const new_person = personRepository.create(request.body);
        yield personRepository.save(new_person);
        response.send(new_person);
    });
}
exports.personPutAction = personPutAction;
function personPostAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const personRepository = typeorm_1.getManager().getRepository(Person_1.Person);
        const data = request.body;
        const person = yield personRepository.findOne(request.params.id);
        if (!person) {
            response.status(404);
            response.end();
            return;
        }
        Object.values(person).forEach(([key, value]) => {
            if (key in data) {
                person[key] = data[key];
            }
        });
        const updated_person = yield personRepository.save(person);
        response.send(updated_person);
    });
}
exports.personPostAction = personPostAction;
function personGetByIdAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const personRepository = typeorm_1.getManager().getRepository(Person_1.Person);
        const result = yield personRepository.findOne(request.params.id);
        if (!result) {
            response.status(404);
            response.end();
            return;
        }
        response.send(result);
    });
}
exports.personGetByIdAction = personGetByIdAction;
function personGetAllAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const personRepository = typeorm_1.getManager().getRepository(Person_1.Person);
        const results = yield personRepository.find();
        response.send(results);
    });
}
exports.personGetAllAction = personGetAllAction;
function personDeleteAction(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const personRepository = typeorm_1.getManager().getRepository(Person_1.Person);
        try {
            yield personRepository.delete(request.params.id);
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
exports.personDeleteAction = personDeleteAction;
//# sourceMappingURL=Person.js.map