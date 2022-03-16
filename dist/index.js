"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const core_1 = __importDefault(require("./core"));
function cli(r) {
    new core_1.default(r);
}
exports.cli = cli;
