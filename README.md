# oneof1 custom

A premium, full-stack-ready jewellery e-commerce storefront built with modern web tooling. Designed for a luxury brand experience with a focused shopping flow, persistent cart, wishlist, checkout, and an admin-ready architecture.

This project currently ships as a complete frontend foundation. Backend integration for product management, user accounts, and South African payment processing can be layered in next.

---

## Table of contents

- [About the brand](#about-the-brand)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Environment variables](#environment-variables)
- [Roadmap](#roadmap)
- [License](#license)

---

## About the brand

**oneof1 custom** is a bespoke luxury jewellery brand built around the idea that every piece should feel one of a kind. The storefront reflects that ethos: refined typography, a restrained gold-and-charcoal palette, and photography-first product pages that let the craftsmanship speak first.

The demo catalogue includes rings, necklaces, earrings, bracelets, watches, and custom commission pieces.

---

## Features

- **Responsive luxury storefront** — hero, category highlights, testimonials, and product grid.
- **Product catalogue** — filter by category, price range, and search; sort by price, popularity, and newest.
- **Product detail pages** — size selection, quantity controls, material details, and related products.
- **Shopping cart** — add, update quantities, remove items, and view live subtotal.
- **Wishlist** — save favourite pieces with local persistence.
- **Checkout flow** — delivery-details form and secured-payment section placeholder.
- **SEO-ready** — unique page titles, meta descriptions, Open Graph tags, sitemap, and `robots.txt`.
- **Theme support** — light and dark mode with persistent preference.
- **Admin-ready structure** — the frontend is set up so an admin dashboard for product/order management can be added cleanly.

---

## Tech stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR/SSG)
- **Build tool**: Vite 7
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI primitives**: shadcn/ui components
- **State management**: React Context + `localStorage` persistence (cart, wishlist, theme)
- **Language**: TypeScript with strict mode enabled
- **Backend target**: Lovable Cloud / Supabase for auth, database, storage, and edge functions

---

## Getting started

### Prerequisites

- [Bun](https://bun.sh) installed (the project uses `bun` by default)
- Node-compatible package manager as fallback (`npm`, `pnpm`, or `yarn`)

### Install dependencies

```bash
bun install
```

### Run the development server

```bash
bun dev
```

The site will be available at `http://localhost:8080` by default.

### Build for production

```bash
bun run build
```

### Preview the production build

```bash
bun run start
```

---

## Project structure

```
public/               # Static assets (robots.txt, favicons, etc.)
src/
  assets/             # Product and brand images
  components/         # Reusable UI components (Navbar, Footer, ProductCard, etc.)
  context/            # React Context providers (StoreContext, etc.)
  data/               # Product catalogue, categories, and helpers
  hooks/              # Custom React hooks
  lib/                # Utilities and theme provider
  routes/             # TanStack Start file-based routes
  server.ts           # Server entry configuration
  start.ts            # App start configuration
  styles.css          # Global styles and Tailwind tokens
```

### Key routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage / landing page |
| `/shop` | Product catalogue with filtering and sorting |
| `/products/:id` | Individual product detail page |
| `/cart` | Shopping bag and quantity management |
| `/checkout` | Delivery and payment placeholder |
| `/wishlist` | Saved items |
| `/sitemap.xml` | Auto-generated sitemap |

---

## Environment variables

The frontend does not require environment variables to run in demo mode. When connecting Lovable Cloud / Supabase, the following will be used by server functions:

- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)

Never commit real secrets to the repository. Use the Lovable Cloud secrets manager for production keys.

---

## Roadmap

- [x] Luxury storefront with catalogue, cart, wishlist, and checkout
- [ ] Replace placeholder images with brand photography
- [ ] Admin dashboard for product and order management
- [ ] Lovable Cloud / Supabase integration for auth and database
- [ ] South African payment gateway integration (PayFast / Stripe / Paystack)
- [ ] Order lifecycle management (pending, paid, shipped, fulfilled)

---

## License

Copyright © oneof1 custom. All rights reserved.

This repository and its contents are proprietary unless otherwise stated.

---

Built with care for **oneof1 custom**.
