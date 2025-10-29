# Github User Finder

Find users and their repositories by entering their github username

---

## Tech Stack

- **Frontend Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Linting:** ESLint (`@typescript-eslint`)
- **Formatting:** Prettier
- **Git Hooks:** Husky + lint-staged

---

## Project Structure

```bash
root/
├─ src/ # Source code (TS/TSX files)
├─ .husky/ # Husky git hooks
├─ .eslintrc.js # ESLint configuration
├─ .prettierrc # Prettier configuration
├─ package.json
└─ ...
```

## 2. Environment Variables

Create a .env file in the root directory and add your environment-specific variables. Example:

```bash
VITE_GITHUB_TOKEN=your_github_token
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the project

```bash
npm run dev
```

## Unit Testing with Vitest

### This project uses Vitest to test utilities and other non-UI logic.

#### 1. Install Vitest

`bash npm install --save-dev vitest @types/node`

#### 2. Run following commands

```bash
npm run test → Run all unit tests once.

npm run test:watch → Run in watch mode for development.

npm run test:coverage → Generate coverage report.
```

## ESLint & Prettier

This project uses ESLint and Prettier to maintain consistent code style.

### Lint all TS/TSX files:

```bash
npm run lint
```

### Format all TS/TSX files:

```bash
npm run format
```

### Example scripts in package.json:

```bash
"scripts": {
  "lint": "eslint 'src/**/*.{ts,tsx}' --fix",
  "format": "prettier --write 'src/**/*.{ts,tsx}'"
}
```

### Husky + lint-staged Setup

Husky ensures that linting and formatting run automatically on staged files before committing.

#### 1. Install Husky & lint-staged

`bash npm install --save-dev husky lint-staged`

#### 2. Enable Husky

`bash npm run prepare`

#### 3. Add pre-commit hook

````bash npx husky set .husky/pre-commit "npx lint-staged"
chmod +x .husky/pre-commit```
````
