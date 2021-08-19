"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const Person_1 = require("./controllers/Person");
/**
 * All application routes.
 */
exports.AppRoutes = [
    {
        path: '/person/list',
        method: 'get',
        action: Person_1.personGetAllAction
    },
    {
        path: '/person/:id',
        method: 'get',
        action: Person_1.personGetByIdAction
    },
    {
        path: '/person/:id/',
        method: 'post',
        action: Person_1.personPostAction
    },
    {
        path: '/person/:id/',
        method: 'delete',
        action: Person_1.personDeleteAction
    },
    {
        path: '/person/',
        method: 'post',
        action: Person_1.personPutAction
    }
];
//# sourceMappingURL=routes.js.map