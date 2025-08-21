# PeopleCentral

## Description

People central is a HR management tool. Where HR can manage employees timesheets, vacations, payrolls. And employees can apply for vacation, see their team mates vacations, fill timesheets. Backend is deployed in AWS EC2 instance and can be accessed at the URL: https://peoplecentralbe.com/api

### Current Userflow:

Employee:

- Can login with credentials
- Look at the dashboard that shows number of vacation days left, list of
  documents, number of vacations taken in different categories, apply for
  vacation.
- Can go to Absence page to look vacation history and apply for vacation if
  needed.
- Can go to MyTeam page to look at the team members and their vacation
  calendar.
- Can go to timesheets page to update the working hours daily.


## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

### Build docker image
docker build -t people-central-fe .

### RUN Docker container in Dev mode
docker-compose up --build

### RUN Docker container in production
docker run -it -p 8080:80 --rm --name people-central-fe-container people-central-fe
