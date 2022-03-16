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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const inquirer_1 = __importDefault(require("inquirer"));
const commander_1 = require("commander");
const STYLESHEET = ["css", "less", "scss"];
class ReactCli {
    constructor(args) {
        this.program = new commander_1.Command();
        this.projectName = "";
        this.initCommands(args);
    }
    initCommands(args) {
        this.program.version(require("../../package").version, "-v, --version", "查看React-cli的版本号");
        this.program
            .command("new")
            .argument("<name>", "项目名称")
            .action((name) => {
            this.projectName = name;
            this.handleNew();
        });
        this.program.parse(args);
    }
    handleNew() {
        return __awaiter(this, void 0, void 0, function* () {
            const answers = yield inquirer_1.default.prompt([
                {
                    name: "typescript",
                    message: "是否需要TypeScript？",
                    type: "confirm",
                },
                {
                    name: "css",
                    message: "需要使用哪种CSS预处理器？",
                    type: "checkbox",
                    choices: STYLESHEET,
                },
            ]);
            const projectPath = path_1.default.resolve("./", this.projectName);
            yield promises_1.default.mkdir(projectPath).catch((err) => {
                console.error(`创建项目文件夹失败：${err}`);
            });
        });
    }
}
exports.default = ReactCli;
