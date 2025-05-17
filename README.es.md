# Ejemplo de Integración con MercadoPago

[![Licencia GitHub](https://img.shields.io/github/license/ffutryk/mercadopago-integration-example?color=%233158ce)](./LICENSE)
[![en](https://img.shields.io/badge/lang-en-blue)](./README.md)
[![es](https://img.shields.io/badge/lang-es-red)](./README.es.md)

Un ejemplo de integración con MercadoPago con fines educativos — recibir y manejar notificaciones de pago.

> [!IMPORTANT]
> Este proyecto es solo para fines demostrativos y de aprendizaje. **No usar en producción** sin antes adaptar la seguridad y el manejo de errores a tus necesidades.

## Estructura de Carpetas

```
📦 mercadopago-integration-example
├─ prisma          // Contiene el esquema de Prisma y archivos de migración de base de datos.
└─ src
   ├─ config       // Configuración de la aplicación (por ejemplo, variables de entorno, clientes).
   ├─ controllers  // Manejadores de rutas de Express que reciben solicitudes HTTP e invocan servicios.
   ├─ di           // Configuración de inyección de dependencias y vinculación de servicios.
   ├─ errors       // Clases de errores personalizados.
   ├─ middlewares  // Middlewares de Express para autenticación, validación, manejo de errores, etc.
   ├─ repositories // Capa de acceso a datos con abstracción sobre la base de datos.
   │  └─ prisma    // Implementaciones concretas del repositorio basadas en Prisma.
   ├─ routes       // Definición de rutas de la aplicación.
   ├─ services     // Lógica de negocio y casos de uso de la aplicación.
   └─ utils        // Funciones auxiliares de propósito general.
```

## Primeros Pasos

### Requisitos Previos

- Node.js
- npm/pnpm/yarn
- Una cuenta de [MercadoPago](https://www.mercadopago.com/) con integración de Checkout Pro

---

### Configuración (Servidor)

1. **Clonar el repositorio:**

```bash
git clone https://github.com/ffutryk/mercadopago-integration-example.git
cd mercadopago-integration-example
```

2. **Instalar dependencias:**

```bash
npm install
# o
yarn install
# o
pnpm install
```

3. **Configurar las variables de entorno:**

Copiar el archivo de entorno de ejemplo y actualizar con tus credenciales:

```bash
cp .env.example .env
```

Ejemplo de valores para el archivo `.env`:

```dotenv
PORT=3000                               # Puerto del servidor
TOKEN=your_jwt_secret                   # Token de firma JWT
BASE_URL=http://localhost:3000          # URL pública del servidor (usada en webhooks)

MERCADOPAGO_AUTHENTICITY_SECRET=secret  # Token de autenticidad del webhook
MERCADOPAGO_ACCESS_TOKEN=access_token   # Token privado de acceso a MercadoPago

EXAMPLE_DB_NAME=example                 # (Opcional) Usado en Docker
EXAMPLE_DB_USER=postgres                # (Opcional) Usado en Docker
EXAMPLE_DB_PASSWORD=postgres            # (Opcional) Usado en Docker

DATABASE_URL="postgresql://postgres:postgres@localhost:5469/example?schema=public"
```

4. **Iniciar el servidor de desarrollo:**

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. **Exponer tu servidor local para pruebas de webhook:**

```bash
ngrok http 3000
```

> [!IMPORTANT]
> No te olvides de actualizar tanto la URL del webhook en MercadoPago como la variable BASE_URL en el archivo `.env` con la URL pública que te proporciona ngrok.

---

## Cómo Funciona — Flujo de Datos

### 1. Flujo de Creación de Orden

#### Acción del Cliente:

El frontend envía una solicitud `POST` a `/orders` con una lista de ítems:

```
POST /orders
Authorization: Bearer <JWT>
Content-Type: application/json

[
  { "uid": "product-uid-1", "quantity": 2 },
  { "uid": "product-uid-2", "quantity": 1 }
]
```

#### Flujo en el Backend:

1. **`OrderController.create()`**

   - Valida la lista de ítems.
   - Construye un DTO con el usuario autenticado y los ítems.
   - Delega al `OrderService`.

2. **`OrderService.create(dto)`**

   - Persiste la orden usando `OrderRepository`.
   - Enriquece la orden con ítems.
   - Llama a `MercadoPagoService.createOrder()` para crear una preferencia de pago.

3. **`MercadoPagoService.createOrder()`**

   - Obtiene los datos de cada producto.
   - Construye una preferencia de pago con el SDK de `mercadopago`.
   - Establece `notification_url` al endpoint del webhook.
   - Devuelve el objeto completo de preferencia.

4. **`OrderController`**
   - Responde al cliente con la preferencia de pago para completar la transacción.

---

### 2. Flujo de Pago y Webhook

Una vez que el usuario completa el pago:

#### MercadoPago llama al webhook:

```
POST /mercadopago/webhook
...
```

#### Flujo del Webhook:

1. **Middleware `validateWebhookRequest`**

   - Valida la autenticidad de la solicitud, evitando solicitudes no autorizadas o suplantadas.

2. **`MercadoPagoController.handleWebhook()`**

   - Delega a `MercadoPagoService.handleEvent()`.

3. **`MercadoPagoService.handleEvent(event)`**
   - Según `event.action`, maneja el evento adecuadamente.

> \[!TIP]
> Usa este hook para actualizar el estado de la orden, notificar a usuarios o disparar cualquier lógica posterior al pago.

---

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](./LICENSE).
