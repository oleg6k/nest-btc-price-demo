### Build & Run:
```bash
cp example.env .env
```

```bash
export $(grep APP_PORT .env | xargs)
```

```bash
docker build -t pricer-img .
```

```bash
docker run -d -p ${APP_PORT}:${APP_PORT} pricer-img
```

### Usage:
`
GET http://localhost:<APP_PORT>/price
`