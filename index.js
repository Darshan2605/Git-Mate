#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
import { getGitCommand } from "./gemini.js";
import { exec } from "child_process";

console.log(chalk.blueBright("🚀 Welcome to Git-Mate"));

inquirer.prompt([
  {
    type: "input",
    name: "query",
    message: "🤔 Type your Git-related question:"
  }
]).then(async (answers) => {
  let gitCommand = await getGitCommand(answers.query);

  // If Gemini refuses the query, show warning and exit
  if (gitCommand.startsWith("❌")) {
    console.log(chalk.red(`\n${gitCommand}`));
    return;
  }

  // Find placeholders like <branch_name>, <file>, etc.
  const placeholders = [...gitCommand.matchAll(/<([^>]+)>/g)].map(m => m[1]);

  // If there are placeholders, prompt user to fill each one
  if (placeholders.length > 0) {
    const placeholderAnswers = await inquirer.prompt(
      placeholders.map(ph => ({
        type: "input",
        name: ph,
        message: `Please provide a value for "${ph}":`
      }))
    );

    // Replace placeholders with user input
    placeholders.forEach(ph => {
      const value = placeholderAnswers[ph];
      // Replace all occurrences of the placeholder
      const regex = new RegExp(`<${ph}>`, "g");
      gitCommand = gitCommand.replace(regex, value);
    });
  }

  console.log(chalk.green(`\n✅ Git Command:`));
  console.log(chalk.yellowBright(gitCommand));

  const confirm = await inquirer.prompt([
    {
      type: "confirm",
      name: "execute",
      message: "⚙️ Do you want to execute this command now?",
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
        console.log(chalk.yellow(`⚠️ Warning:\n${stderr}`));
      }
      if (stdout) {
        console.log(chalk.green(`✅ Output:\n${stdout}`));
      }
    });
  } else {
    console.log(chalk.cyan("👍 You chose not to run the command. Thank you for using Git-Mate!"));
  }
});
