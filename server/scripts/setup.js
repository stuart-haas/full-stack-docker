const dotenv = require('dotenv');
const mongoose = require('mongoose');
const chalk = require('chalk');
const { prompt } = require('enquirer');
const User = require('../src/models/user.model');

async function setup() {
  dotenv.config();

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(
      chalk.green(`Database is connected to ${process.env.DATABASE_URL}`)
    );

    const responses = await prompt([
      {
        type: 'input',
        name: 'username',
        message: 'Username:',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
      },
    ]);

    const user = await User.register(
      new User({
        username: responses.username,
        email: responses.email,
        role: 'admin',
      }),
      responses.password
    );

    const { username } = user;
    const { password } = responses;

    console.log(chalk.green('User created'));
    console.log(username, password);

    process.kill(process.pid, 'SIGTERM');
  } catch (error) {
    console.log(error);
    process.kill(process.pid, 'SIGTERM');
  }
}

setup();
