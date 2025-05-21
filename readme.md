# Git-Mate

🚀 Welcome to **Git-Mate** - your friendly command-line assistant for generating and executing Git, Linux, Windows commands from natural language queries.

## Overview

Git-Mate is a Node.js command-line application designed to help users convert natural language questions into Git, Linux, Windows commands. It leverages an API to interpret user queries and generate the appropriate Git command, which can then be executed directly from the terminal.

## Features

- **Interactive CLI**: Uses `inquirer` to prompt users for input and confirmation.
- **Command Generation**: Converts natural language queries into Git, Linux, Windows commands using an API.
- **Command Execution**: Executes the generated Git, Linux, Windows commands directly in the terminal.
- **Stylish Output**: Utilizes `chalk` to enhance terminal output with colors.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Darshan2605/Git-Mate.git
   cd gitmate
   ```

2. **Install Globally**:
   ```bash
   npm install -g .
   ```
   ✅ Now you can run gitmate from anywhere in your terminal.
   ✅It packages your project and installs it into the global node_modules folder.
   ✅Any bin scripts in your package.json become globally available in your terminal.
   Out bin script in package.json-
   "bin": {
    "gitmate": "./index.js"
  }, //✅We can use "gitmate" command anywhere in our system to start our project.


3. **For Windows OS--- Open Windows CMD/Powershell**:
   - Permanently Set Environment Variable for Gemini API Key in Our Windows System:
     ```
      [Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "your-api-key-here", "User")
     ```
     ✅We can use "gitmate" command in Powershell- anywhere in our system to start our project.

4. **For Linux OS--- Open Terminal**:
      - Pre-requisites
      -Make sure the following are installed:

      -Node.js and npm
      -Check with:
      -node -v
      -npm -v

      - Clone the GitMate Repository
     ```
      git clone https://github.com/Darshan2605/Git-Mate.git
      cd Git-Mate
     ```
   
      -In Cloned Folder
      ```
       chmod +x index.js
      ```

      -Install Dependencies/Project Globally
      ```
       npm install -g .
      ```
      
   - Set Gemini API Key Permanently on System
     ```
      Step A: Open .bashrc file (for Bash shell)
      nano ~/.bashrc

      Step B: Add your Gemini API key
      Scroll to the bottom and add:
      export GEMINI_API_KEY="your-gemini-api-key-here"

      Step C: Save and apply changes
      Save the file: Ctrl + X, then Y, then Enter

      Step D: 
      source ~/.bashrc
   
     ```

## Usage

1. **Run Git-Mate**:
   ```bash
   gitmate
   ```
2. **Select Tool**:
   ```bash
   Git
   Linux
   Windows
   ```

3. **Follow the Prompts**:
   - Enter your Git/Linux/Windows-related question.
   - Confirm if you want to execute the generated command.

## Example

```bash
? Type your Git-related question: mala ak git repository banvaychi aahe

✅ Git Command:
git init

✔ Do you want to execute this command now? (Y/n)
```


## Author

- **Darshan Londhe**


