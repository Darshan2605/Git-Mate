# Git-Mate

🚀 Welcome to **Git-Mate** - your friendly command-line assistant for generating and executing Git commands from natural language queries.

## Overview

Git-Mate is a Node.js command-line application designed to help users convert natural language questions into Git commands. It leverages an API to interpret user queries and generate the appropriate Git command, which can then be executed directly from the terminal.

## Features

- **Interactive CLI**: Uses `inquirer` to prompt users for input and confirmation.
- **Command Generation**: Converts natural language queries into Git commands using an API.
- **Command Execution**: Executes the generated Git commands directly in the terminal.
- **Stylish Output**: Utilizes `chalk` to enhance terminal output with colors.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Darshan2605/Git-Mate.git
   cd git-mate
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add your API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

## Usage

1. **Run Git-Mate**:
   ```bash
   npx git-mate
   ```

2. **Follow the Prompts**:
   - Enter your Git-related question.
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


