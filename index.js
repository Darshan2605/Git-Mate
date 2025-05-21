#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { getGitCommand } from "./gemini.js";
import { exec } from "child_process";

console.log(chalk.blueBright("🚀 Welcome to Git-Mate "));

inquirer.prompt([
  {
    type: "input",
    name: "query",
    message: "Type your Git-related question:"
  }
]).then(async (answers) => {
  const gitCommand = await getGitCommand(answers.query);

  console.log(chalk.green(`\n✅ Git Command:`));
  console.log(chalk.yellowBright(gitCommand));

  const confirm = await inquirer.prompt([
    {
      type: "confirm",
      name: "execute",
      message: "Do you want to execute this command now?",
      default: false
    }
  ]);

  if (confirm.execute) {
    exec(gitCommand, (error, stdout, stderr) => {
      if (error) {
        console.log(chalk.red(`❌ Error: ${error.message}`));
        return;
      }
      if (stderr) {
        console.log(chalk.yellow(`⚠️ Warning: ${stderr}`));
      }
      console.log(chalk.green(`✅ Output:\n${stdout}`));
    });
  } else {
    console.log(chalk.cyan("👍 You chose not to run the command."));
  }
});
