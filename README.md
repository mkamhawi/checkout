# Checkout

Checkout is a sample microservice of an imaginary web store, this repo is used as a demo for writing unit tests and integration tests.

# Usecases

* [Place order](./docs/diagrams/place-order.md): place an order.

# Environment variables

Environment variables required for this service to run:

| Environment variable | Description | Example
| - | - | - |
| EXPRESS_PORT | port express is listening to | 3000 |
| LOG_LEVEL | logging level | 'info' |
| CART_URL | base url for cart microservice | |
| CART_API_KEY | API key for cart microservice | |
| PROMOTION_URL | base url for promotion microservice | |
| PROMOTION_API_KEY | API key for promotion microservice | |
| PAYMENT_URL | base url for payment microservice | |
| PAYMENT_API_KEY | API key for payment microservice | |
| DB_SERVICE_URL | base url for the database access microservice | |
| DBS_API_KEY | API key for the database access microservice | |
| STORE_TIMEZONE | The time-zone for the web store | 'America/New_York' |
| DEFAULT_CURRENCY | Default currency for the store | 'USD' |