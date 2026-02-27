<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

# Admin Panel

This project includes a **MERN‑stack admin panel** for product management.

### Backend structure
```
backend/
  index.js            # express app + mongo connection
  seeder.js           # helper to create default admin
  .env.example        # environment variables
  models/
    Product.js
    Admin.js
  controllers/
    productController.js
    authController.js
  routes/
    productRoutes.js
    authRoutes.js
  middleware/
    authMiddleware.js  # JWT admin guard
    errorMiddleware.js
```

### Frontend structure
```
src/
  context/
    AdminContext.jsx   # auth token storage
  pages/
    Admin/
      Login.jsx
      ProductList.jsx
      AddProduct.jsx
      EditProduct.jsx
      Admin.css
  components/
    admin/
      AdminLayout.jsx
```

### Setup & running
1. **Backend:**
   - `cd backend`
   - `npm install` (includes express, mongoose, jsonwebtoken, bcryptjs, dotenv)
   - set your `.env` (see `.env.example`)
   - `node seeder.js` to create default admin (`admin`/`password123`)
   - `npm run dev` (or `node index.js`)
2. **Frontend:**
   - install in root: `npm install` (includes axios)
   - `npm run dev` to start Vite dev server
   - admin UI available at `http://localhost:5173/admin/login` (adjust port)
   - log in, then manage products (add/edit/delete)

### Security notes
- All `/api/products` POST/PUT/DELETE are protected by JWT middleware.
- Input is validated on the server; errors are passed through middleware.
- Tokens stored in `localStorage` and added to requests on the client.
- Use strong secrets for `JWT_SECRET` and secure your MongoDB.

=======
# e-commerce
>>>>>>> 0f1a6745e16997d3a4c2aa0a3eaf9ff7f0090271
