1️⃣ Folder Structure

my-react-ui-components/
├─ node_modules/
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │  ├─ InputField.tsx
│  │  ├─ DataTable.tsx
│  │  └─ __tests__/
│  │     └─ InputField.test.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ package.json
├─ tsconfig.json
├─ tailwind.config.js
├─ vite.config.ts
└─ README.md

# React UI Components Library

A demo project showcasing two React components built with **TypeScript**, **TailwindCSS**, and **Storybook**:

1. **InputField** – Flexible input with validation, variants, sizes, and optional features.
2. **DataTable** – Tabular data display with sorting, row selection, loading, and empty states.

---

## 🚀 Features

### InputField
- Label, placeholder, helper text, error message
- States: disabled, invalid, loading
- Variants: filled, outlined, ghost
- Sizes: small, medium, large
- Optional clear button & password toggle
- Light & dark theme support

### DataTable
- Display tabular data
- Column sorting
- Row selection (single/multiple)
- Loading state
- Empty state
- Responsive & accessible (ARIA labels)

---

## 🛠 Tech Stack
- React 18
- TypeScript
- TailwindCSS
- Storybook
- Vite

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/nickfree4437x/react-ui-component
cd my-react-ui-components

# Install dependencies
npm install

# Run development server
npm run dev

# Run Storybook
npm run storybook

🌟 Usage
InputField Example
<InputField
  label="Username"
  placeholder="Enter username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  showClearButton
  variant="outlined"
  size="md"
/>

DataTable Example
<DataTable
  data={sampleData}
  columns={columns}
  selectable
  onRowSelect={setSelectedRows}
/>

📖 Storybook

View components in isolation using Storybook:

npm run storybook

🔗 Deployment

---

### **3️⃣ Push to GitHub**

1. Initialize git if not already:

```bash
git init
git add .
git commit -m "Initial commit - React UI Components"


git branch -M main
git remote add origin https://github.com/<your-username>/my-react-ui-components.git
git push -u origin main
