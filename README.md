# Web Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [End-to-End Tests](#end-to-end-tests)
- [Linting and Formatting](#linting-and-formatting)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or 20.x)
- [Yarn](https://yarnpkg.com/) package manager

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd your-repo/frontend/web
   ```

3. **Install dependencies:**

   ```bash
   yarn install
   ```

4. **Create a `.env` file:**

   Create a `.env` file in the `frontend/web` directory and add the necessary environment variables:

   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_BACKEND_URL=http://localhost:3001/api/login
   NEXTAUTH_URL=http://localhost:3001
   ```

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the development server with Turbopack.

```bash
yarn dev
```

### `yarn build`

Builds the application for production.

```bash
yarn build
```

### `yarn start`

Starts the production server.

```bash
yarn start
```

### `yarn format`

Formats the codebase using Biome.

```bash
yarn format
```

### `yarn format:check`

Checks the code formatting without making changes.

```bash
yarn format:check
```

### `yarn lint`

Runs the linter to check for code issues.

```bash
yarn lint
```

### `yarn test`

Runs all tests using Vitest.

```bash
yarn test
```

### `yarn test:unit`

Runs unit tests.

```bash
yarn test:unit
```

### `yarn test:coverage`

Generates test coverage reports.

```bash
yarn test:coverage
```

### `yarn test:e2e`

Opens the Cypress end-to-end testing UI.

```bash
yarn test:e2e
```

### `yarn test:e2e:run`

Runs Cypress end-to-end tests in headless mode.

```bash
yarn test:e2e:run
```

### `yarn cypress:run`

Runs Cypress tests.

```bash
yarn cypress:run
```

## Testing

### Unit Tests

Unit tests are written using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

To run unit tests:

```bash
yarn test:unit
```

To generate test coverage reports:

```bash
yarn test:coverage
```

### End-to-End Tests

End-to-end tests are implemented using [Cypress](https://www.cypress.io/).

To open the Cypress testing UI:

```bash
yarn test:e2e
```

To run Cypress tests in headless mode:

```bash
yarn test:e2e:run
```

## Linting and Formatting

This project uses [Biome](https://biomejs.dev/) for code formatting and linting.

- **Format the codebase:**

  ```bash
  yarn format
  ```

- **Check code formatting:**

  ```bash
  yarn format:check
  ```

- **Run the linter:**

  ```bash
  yarn lint
  ```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

To learn more about deploying your Next.js application, refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Project Structure

```plaintext
frontend/web/
├── .github/
│   └── workflows/
│       └── ci.yml
├── cypress/
│   ├── e2e/
│   │   └── signin.cy.ts
│   ├── fixtures/
│   │   └── example.json
│   └── support/
│       ├── commands.ts
│       └── e2e.ts
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   └── login/
│   │   │       └── route.ts
│   │   ├── auth/
│   │   │   ├── error/
│   │   │   │   └── page.tsx
│   │   │   ├── signin/
│   │   │   │   └── page.tsx
│   │   │   └── signout/
│   │   │       └── page.tsx
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Header.tsx
│   │   │   └── Login.tsx
│   │   ├── __tests__/
│   │   │   ├── Header.test.tsx
│   │   │   └── Login.test.tsx
│   │   ├── lib/
│   │   │   └── api.ts
│   │   ├── page.tsx
│   │   ├── providers.tsx
│   │   └── layout.tsx
│   ├── styles/
│   │   └── globals.css
│   └── tests/
│       └── setup.ts
├── biome.json
├── cypress.config.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.mts
└── .gitignore
```

## Environment Variables

The application requires the following environment variables:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXTAUTH_BACKEND_URL` (e.g., `http://localhost:3001/api/login`)
- `NEXTAUTH_URL` (e.g., `http://localhost:3001`)

Ensure these variables are set in your `.env` file.

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **State Management:** [React Query](https://tanstack.com/query/latest)
- **Testing:** [Vitest](https://vitest.dev/) & [Cypress](https://www.cypress.io/)
- **Linting & Formatting:** [Biome](https://biomejs.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**

2. **Create a new branch:**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make your changes**

4. **Commit your changes:**

   ```bash
   git commit -m "Add some feature"
   ```

5. **Push to the branch:**

   ```bash
   git push origin feature/YourFeature
   ```

6. **Open a pull request**

Please ensure your code follows the project's linting and formatting guidelines.

## License

This project is open source and available under the [MIT License](LICENSE).
