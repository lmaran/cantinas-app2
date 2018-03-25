<!-- [ ![Codeship Status for lmaran/identity-service](https://app.codeship.com/projects/2e48edb0-cf9f-0135-e213-06060185c4e3/status?branch=master)](https://app.codeship.com/projects/262255) -->

## Development

```bash
# start server:
npm start

# start browser:
http://localhost:4200 or
http://dev.appstudio.local:4200

# test with wallaby.js
ctrl-shift-R-R (start)
ctrl-shift-R-S (stop)
http://localhost:51245 or http://wallabyjs.com/app (view results)

# test with mocha
npm test
```

## Staging (from local)

```bash
npm build-prod

# start server:
NODE_ENV=staging MONGO_URI=mongodb://localhost/cantinas-stg PORT=1422 node dist/server/server.js

# start browser:
http://dev.appstudio.ro:1422
```

## Staging

```bash
# start browser:
https://stg.cantinas.ro
```

## Production

```bash
# start browser:
https://cantinas.ro
```
