import inquirer from 'inquirer';

export const prompter = {
  confirm: async (message: string): Promise<boolean> => {
    const { answer } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'answer',
        message,
        default: false,
      },
    ]);
    return answer;
  },

  input: async (message: string, defaultValue?: string): Promise<string> => {
    const { answer } = await inquirer.prompt([
      {
        type: 'input',
        name: 'answer',
        message,
        default: defaultValue,
      },
    ]);
    return answer;
  },

  select: async <T extends string>(message: string, choices: T[]): Promise<T> => {
    const { answer } = await inquirer.prompt([
      {
        type: 'list',
        name: 'answer',
        message,
        choices,
      },
    ]);
    return answer;
  },
}; 