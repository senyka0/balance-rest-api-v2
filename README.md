# balance-rest-api-v2

## Clone this repository
```sh
gh repo clone senyka0/balance-rest-api-v2
```
## Then install the dependencies
```sh
npm install
```
## Start the server

### Run in development mode
```sh
npm run dev
```
### Run in production mode
```sh
npm run prod
```
## API Request
| Endpoint | HTTP Method | Description |
| ------ | ------ | ------ |
| /api/healthcheck	| GET |	Check if server is working |
| /api/balance/:address |	GET	| Get address balance |
| /api/track |	GET	| Start tracking addresses from config file |
