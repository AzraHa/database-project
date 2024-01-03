# Database project backend

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)

## Installation

```bash
# Clone the repository
git clone https://github.com/AzraHa/database-project

# Navigate to the project directory
cd fe

# Install dependencies
yarn
```

## Folder structure

```arduino
fe/
|-- public/
|   |-- index.html
|   |-- favicon.ico
|-- src/
|   |-- components/
|       |-- CleanDatabase/
|           |-- index.js
|       |-- CreateOrder/
|           |-- index.js
|       |-- CustomerOrders/
|           |-- index.js
|       |-- Employeee/
|           |-- index.js
|       |-- HomePageComponent/
|           |-- index.js
|       |-- ModalComponent/
|           |-- index.js
|       |-- Orders/
|           |-- index.js
|   |-- constants/
|       |-- appDefault.js
|   |-- App.js
|   |-- App.css
|   |-- index.js
|   |-- index.css
|-- .gitignore
|-- package.json
|-- README.md
````

## Dependencies

```arduino
@emotion/react: Provides the core utilities for the Emotion library
@emotion/styled: Styled components for Emotion.
@mui/icons-material: Material-UI icons for your components
@mui/material:  Material-UI components for building a React UI
@testing-library/jest-dom: Jest DOM utilities for testing
@testing-library/react: Testing utilities for React
@testing-library/user-event: User events testing utilities
dotenv: Loads environment variables from a .env file.
react: The core React library
react-dom: React's package for working with the DOM
react-router-dom: Declarative routing for React.js
react-scripts: Configurations and scripts for Create React App
web-vitals: Library for tracking real-world performance of web pages.
```
