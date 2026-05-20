
# FreshCart E-Commerce Application

A full-featured E-commerce platform built with **Angular 17** using **Server-Side Rendering (SSR)**. The application handles user authentication, product catalog manipulation, dynamic filtering, real-time cart handling, and order placements. 

🌐 **Live Demo:** [https://e-commerse-app-mu.vercel.app](https://e-commerse-app-mu.vercel.app)

---

## Features

* **User Authentication:** Includes Register, Login, and Forgot Password features backed by route guards, interceptors, and `jwt-decode` token validation.
* **Product Discovery:** View individual brand pages, product listings, item-specific details, and categories.
* **Shopping Cart & Checkout:** Add items to cart dynamically, modify quantities, view order summaries, and process checkout.
* **UI Enhancements:** Uses `ngx-owl-carousel-o` for slider interfaces, `ngx-spinner` for loading transitions, and `ngx-toastr` for alert notifications.
* **Internationalization (i18n):** Multi-language translation support implemented with `@ngx-translate`.

---

## Built With

* **Core Framework:** Angular v17 (with SSR and SCSS support)
* **UI Layout & Styling:** Bootstrap v5.3 + FontAwesome Free Icons v7.2
* **Form Validation:** Angular Reactive Forms with `@rxweb/reactive-form-validators`
* **State & Global UI Management:** RxJS state observables, Angular Custom Services, and Route Guards

---

## Project Architecture

```text
ECOMMERSE_ANGULAR/
│
├── src/
│   ├── app/
│   │   ├── components/        # UI Standalone views 
│   │   │   ├── allorders/     # Past order records
│   │   │   ├── brands/        # Item collections grouped by manufacturer
│   │   │   ├── cart/          # Active cart summary & quantity modifier
│   │   │   ├── categories/    # Product categories grid view
│   │   │   ├── forgotpassword/# Password recovery interface
│   │   │   ├── home/          # Landing platform & promotional banners
│   │   │   ├── login/         # Secure user authentication interface
│   │   │   ├── nav-auth/      # Navigation bar for visitors
│   │   │   ├── nav-blank/     # Dynamic navigation bar for active users
│   │   │   ├── productdetails/# Deeper specification details breakdown
│   │   │   └── register/      # New account configuration portal
│   │   │
│   │   ├── core/              # Underlying Application Infrastructure
│   │   │   ├── environments/  # Production and staging base API URLs
│   │   │   ├── guards/        # Route protection mechanisms
│   │   │   ├── interceptors/  # HTTP request/response interceptors
│   │   │   ├── interfaces/    # TypeScript structural type models
│   │   │   ├── pipes/         # Text formatters and search queries 
│   │   │   └── services/      # Network API calls and business data utilities
│   │   │
│   │   └── layouts/           # Structural layout templates
│   │
│   ├── assets/                # Static asset storage (Images, local i18n JSONs)
│   ├── main.ts                # Application bootstrapper
│   └── styles.scss            # Global stylesheets
```
## ⚙️ Development Execution

> ** Local Environment Setup**
> To download all required node modules and start your local development server:
> ```bash
> npm install
> npm start
> ```

> ** Production Deployment**
> To compile and bundle the application with Server-Side Rendering (SSR) configs for production:
> ```bash
> npm run build
> ```
