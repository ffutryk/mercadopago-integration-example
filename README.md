# MercadoPago Integration Example

[![GitHub License](https://img.shields.io/github/license/ffutryk/mercadopago-integration-example?color=%233158ce)](./LICENSE)
[![en](https://img.shields.io/badge/lang-en-red)](./README.md)
[![es](https://img.shields.io/badge/lang-es-blue)](./README.es.md)

An example MercadoPago integration for learning purposes — receive and handle payment notifications.

> [!IMPORTANT]
> This project is for demonstration and learning purposes. **Do not use in production** without adapting security and error handling for your needs.

## Folder Structure

```
📦 mercadopago-integration-example
├─ prisma          // Contains Prisma schema and database migration files.
└─ src
   ├─ config       // Application configuration (e.g., environment variables, clients).
   ├─ controllers  // Express route handlers that receive HTTP requests and invoke services.
   ├─ di           // Dependency injection setup and service bindings.
   ├─ errors       // Custom error classes.
   ├─ middlewares  // Express middlewares for authentication, validation, error handling, etc.
   ├─ repositories // Data access layer with abstraction over the database.
   │  └─ prisma    // Concrete Prisma-based repository implementations.
   ├─ routes       // Data access layer with abstraction over the database.
   ├─ services     // Business logic and application use cases.
   └─ utils        // General-purpose helper functions and utilities.
```

## Getting Started

### Prerequisites

- Node.js
- npm/pnpm/yarn
- A [MercadoPago](https://www.mercadopago.com/) account with a Checkout Pro integration

---

### Setup (Server)

1. **Clone the repository:**

```bash
git clone https://github.com/ffutryk/mercadopago-integration-example.git
cd mercadopago-integration-example
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables:**

Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env
```

Example `.env` file values:

```dotenv
PORT=3000                               # Server port
TOKEN=your_jwt_secret                   # JWT signing token
BASE_URL=http://localhost:3000          # Public server URL (used in webhooks)

MERCADOPAGO_AUTHENTICITY_SECRET=secret  # Webhook authenticity token
MERCADOPAGO_ACCESS_TOKEN=access_token   # MercadoPago private access token

EXAMPLE_DB_NAME=example                 # (Optional) Used in Docker
EXAMPLE_DB_USER=postgres                # (Optional) Used in Docker
EXAMPLE_DB_PASSWORD=postgres            # (Optional) Used in Docker

DATABASE_URL="postgresql://postgres:postgres@localhost:5469/example?schema=public"
```

4. **Start the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Expose your local server for webhook testing:**

```bash
ngrok http 3000
```

> [!IMPORTANT]
> Don't forget to update both your MercadoPago webhook URL and the BASE_URL in .env with the public URL provided by ngrok.

---

## How It Works — Data Flow

### 1. Order Creation Flow

#### Client Action:

The frontend sends a `POST` request to `/orders` with a list of items:

```
POST /orders
Authorization: Bearer <JWT>
Content-Type: application/json

[
  { "uid": "product-uid-1", "quantity": 2 },
  { "uid": "product-uid-2", "quantity": 1 }
]
```

#### Backend Flow:

1. **`OrderController.create()`**

   - Validates the item array.
   - Constructs a DTO with the authenticated user and items.
   - Delegates to the `OrderService`.

2. **`OrderService.create(dto)`**

   - Persists the order using `OrderRepository`.
   - Enriches the order with items.
   - Calls `MercadoPagoService.createOrder()` to create a payment preference.

3. **`MercadoPagoService.createOrder()`**

   - Fetches product data for each item.
   - Builds a MercadoPago payment preference using `mercadopago` SDK.
   - Sets `notification_url` to the webhook endpoint.
   - Returns the full preference object.

4. **`OrderController`**
   - Responds to the client with the payment preference to make the payment.

---

### 2. Payment & Webhook Flow

Once the user completes the checkout:

#### MercadoPago calls the webhook:

```
POST /mercadopago/webhook
...
```

#### Webhook Flow:

1. **`validateWebhookRequest` middleware**

   - Validates the authenticity of the request, preventing unauthorized or spoofed requests.

2. **`MercadoPagoController.handleWebhook()`**

   - Delegates to `MercadoPagoService.handleEvent()`.

3. **`MercadoPagoService.handleEvent(event)`**
   - Depending on `event.action`, handles the event accordingly.

> [!TIP]
> Use this hook to update order status, notify users, or trigger any other post-payment logic.

---

## License

This project is licensed under the [MIT License](./LICENSE).
