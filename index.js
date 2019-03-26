/* eslint-disable no-console */
const chalk = require('chalk');
const { prompt } = require('enquirer');
const emoji = require('node-emoji');


const kickStartApplication = async () => {
  console.log(chalk.blue('Welcome!, Find the server closest to you'));

  // eslint-disable-next-line no-useless-escape
  const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i;

  // Get number of servers

  const numberOfServers = {
    type: 'input',
    name: 'numberOfServers',
    message: 'How many servers do you want to compare ? \n (Minimum Number: 1 Maximum Number: 5)',
    initial: '2',
    validate: input => !isNaN(Number(input)) && Number(input) < 5 && Number(input) > 1 || 'Number of Servers should be between 2 - 5',
  };

  // Enter Server Addresses
  const serverAddresses = {
    type: 'form',
    name: 'serverAddresses',
    message: 'Enter the Websites / IP addresses of the servers',
    limit: 5,
    choices: null,
    validate: form => Object.values(form).every(address => regex.test(address)) || 'Invalid IP/Web Address',
  };

  prompt(numberOfServers)
    .then((answer) => {
      // console.log(answer);
      serverAddresses.choices = Array(Number(answer.numberOfServers)).fill(`${emoji.find('computer').emoji}  Server`);

      serverAddresses.choices.forEach((item, index, array) => {
        // eslint-disable-next-line no-param-reassign
        array[index] = `${item} ${index + 1}`;
      });

      prompt(serverAddresses)
        .then((ans) => {
          // console.log(ans);
        })
        .catch(e => console.error(e));
    })
    .catch(e => console.error(e));
};

kickStartApplication();