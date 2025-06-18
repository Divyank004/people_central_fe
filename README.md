# PeopleCentral (people-central-fe)

HR Management Tool

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