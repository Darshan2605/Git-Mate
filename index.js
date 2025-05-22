#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { getCommand } from "./gemini.js";
import { exec } from "child_process";
import os from "os";

console.log(chalk.blueBright("🚀 Welcome to Git-Mate"));

const { category } = await inquirer.prompt([
  {
    type: "list",
    name: "category",
    message: "📂 What kind of command do you want?",
    choices: ["Git", "Linux", "Windows"]
  }
]);

const { query } = await inquirer.prompt([
  {
    type: "input",
    name: "query",
    message: `🤔 Type your ${category}-related question:`
  }
]);

let command = await getCommand(query, category);

// If Gemini refuses the query
if (command.startsWith("❌")) {
  console.log(chalk.red(`\n${command}`));
  process.exit(1);
}

// If on Windows and Linux command is chosen, wrap with `wsl`
if (category === "Linux" && os.platform() === "win32") {
  console.log(chalk.yellow("⚠️ Running a Linux command on Windows. Wrapping with WSL."));
  command = `wsl ${command}`;
}

// Detect and replace placeholders like <dir_name>, <file>
const placeholders = [...command.matchAll(/<([^>]+)>/g)].map(m => m[1]);

if (placeholders.length > 0) {
  const placeholderAnswers = await inquirer.prompt(
    placeholders.map(ph => ({
      type: "input",
      name: ph,
      message: `Please provide a value for "${ph}":`
    }))
  );

  placeholders.forEach(ph => {
    const regex = new RegExp(`<${ph}>`, "g");
    command = command.replace(regex, placeholderAnswers[ph]);
  });
}

console.log(chalk.green(`\n✅ ${category} Command:`));
console.log(chalk.yellowBright(command));

const confirm = await inquirer.prompt([
  {
    type: "confirm",
    name: "execute",
    message: "⚙️ Do you want to execute this command now?",
    default: false
  }
]);

if (confirm.execute) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(chalk.red(`❌ Error: ${error.message}`));
      return;
    }
    if (stderr) {
      console.log(chalk.yellow(`⚠️ Warning:\n${stderr}`));
    }
    if (stdout) {
      console.log(chalk.green(`✅ Output:\n${stdout}`));
    }
  });
} else {
  console.log(chalk.cyan("👍 You chose not to run the command. Thank you for using Git-Mate!"));
}
