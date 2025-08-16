# 🛍️ Store Project

A demo e-commerce web app built with **Next.js 15**, **React 19**, and **Tailwind CSS 4**.  
This project is designed to showcase frontend structure, reusable UI components, and a clean developer workflow **without relying on external design packages**.

---

## 🚀 Features

- ⚡ **Next.js 15** with Turbopack for fast development
- 🎨 **Tailwind CSS 4** for custom styling
- 🧩 Reusable UI components (Navbar, Sidebar, Product Cards, etc.)
- 🛒 Demo shop pages:
  - Home page with banners and product highlights
  - Category-based shop
  - Product detail pages
  - Locations page with selector
- 📱 **Responsive layout** optimized for desktop and mobile
- 🔧 ESLint + TypeScript support for type safety and clean code

---

📂 Project Structure

```markdown 
store/
├── public/                     # Static assets (images, logos, products)
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── shop/                # Shop listing page
│   │   ├── product/[id]/        # Product detail page
│   │   ├── locations/           # Locations page
│   │   └── layout.tsx           # Root layout
│   ├── components/              # Reusable UI + shop components
│   ├── data/                    # Demo product data
│   ├── lib/                     # API helpers and endpoints
│   └── types/                   # TypeScript models
├── tailwind.config.ts           # Tailwind configuration
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies

```

---

## 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/JannatBiva/store.git
cd store
```
---
Install dependencies:
```bash
npm install
```
---

Run in development mode:
```bash
npm run dev
```
---
Build for production:
```bash
npm run build
npm start
```
---
📦 Dependencies

- Next.js 15
- React 19
- Tailwind CSS 4
- Lucide React (for icons)

👉 Note: No design system (e.g., Material UI, Chakra UI, DaisyUI) is used — everything is styled with Tailwind.

---

🧑‍💻 Development Notes

- All components are written with TypeScript for type safety.
- ESLint is included for linting.
- Uses App Router (src/app) instead of Pages Router.

📜 License

MIT — free to use and modify.


---

