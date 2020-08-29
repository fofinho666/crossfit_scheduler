# CrossFit Scheduler

This project is basically a way for me to schedule my CrossFit classes automatically. It's made to schedule a class at the [REGIBOX](https://www.regibox.pt/app/app_nova/index.php) app, by running a bunch of puppeteer actions that are trigged by a cronjob that I can manage.

## Requirements

We have the following dependences to run this project:

- [Node.js](https://nodejs.org/en/) v10 or above
- [MongoDB](https://www.mongodb.com/) v2.6 or above
- [Chromium](https://www.chromium.org/) to run Puppeteer

A `.env` file is also required. Here's an example of it:
```bash
REGIBOX_URL="https://www.regibox.pt/app/app_nova/login.php"
LOGIN=
PASSWORD=
BOX_NAME="Off Limits CrossFit"
ERROR_DIR="./error"
MONGODB_URI="mongodb://127.0.0.1:27017/agenda"
PORT="3000"
AUTH_USERNAME="admin"
AUTH_PASSWORD="admin"
```

### Development

If we don't want to have a MongoDB instance running on our machine, we can use a docker container with it.

For that we need to install the [Docker](https://www.docker.com/) on our PC.

With the Docker up and running we can use the following commands:

- `npm db:start` - to start the database
- `npm db:stop` - to stop the database container

### Running

- `npm i` - to install the project dependencies
- `npm start` - to start the project

We can also install **PM2** to manage and daemonized the application.
- `$ sudo npm install -g pm2` - Install PM2 globally
- `$ pm2 start index.js --name crossfit_scheduler` - Start the application with PM2
- `$ pm2 startup systemd` - Generate the boot scripts
- `$ pm2 save` - Save our modifications

We probably will want to access it remotely on our network. For that we'll use `ufw` firewall.
- `$ sudo apt install -y ufw` - Install ufw
- `$ sudo ufw allow ssh` - Allow ssh trafic from your machine
- `$ sudo ufw allow <PORT>` - Allow the port that this project is serving, the same that we define on the .env file
- `$ sudo ufw enable` - Enable our rules to happen.
