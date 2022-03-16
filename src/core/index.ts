import path from "path";
import fs from "fs/promises";
import inquirer from "inquirer";
import { Command } from "commander";

const STYLESHEET = ["css", "less", "scss"] as const;
type StyleSheet = typeof STYLESHEET[number];

class ReactCli {
	private program = new Command();
	private projectName = "";

	constructor(args: string[]) {
		this.initCommands(args);
	}

	initCommands(args: string[]) {
		this.program.version(
			require("../../package").version,
			"-v, --version",
			"查看React-cli的版本号"
		);
		this.program
			.command("new")
			.argument("<name>", "项目名称")
			.action((name) => {
				this.projectName = name;
				this.handleNew();
			});
		this.program.parse(args);
	}

	async handleNew() {
		const answers = await inquirer.prompt([
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
		const projectPath = path.resolve("./", this.projectName);

		await fs.mkdir(projectPath).catch((err) => {
			console.error(`创建项目文件夹失败：${err}`);
		});
	}
}

export default ReactCli;
