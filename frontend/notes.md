# hot-toast is used to send notifications

npm i react-router-dom react-hot-toast

# this below cmd is used to install tailwind css

npm install -D tailwindcss@3 postcss auto-prefixer
npx tailwindcss init -p

# for installing daisyUI

npm i -D daisyui@latest

# after that import daisyui from "daisyui" in tailwind.config.js file and add it in plugins

# for global state management we use zustand:

npm install axios zustand

<!-- ✅ 1. What is Global State Management?
🧠 Definition:
Global state management is the technique of sharing and managing state (data) across multiple components in a React app from a central place, instead of passing data via props manually through many layers.
💡 Why it’s needed:
When your app gets bigger, some data (like user info, auth status, cart items, theme, etc.) needs to be accessed/updated by many components — not just parent/child. Global state management avoids prop drilling and helps with better organization.
🧾 Example use cases:
Logged-in user info
Theme mode (dark/light)
Shopping cart items
Notification system
AI prediction results shared across pages -->

<!-- ✅ 2. What is a Promise-based HTTP client?
🧠 Definition:
An HTTP client lets you send requests to servers (APIs). If it’s "promise-based", it means it uses JavaScript Promises to handle asynchronous operations (like API calls). -->

# 1. Axios 📡

# Axios is a promise-based HTTP client for making API requests.

# ✅ Why use Axios?

# Easier and cleaner syntax than fetch

# Supports interceptors, automatic JSON parsing, request cancellation, and more

# Works in both the browser and Node.js

# 2. Zustand 🧠

# Zustand is a small, fast, and scalable state management library for React.

# ✅ Why use Zustand?

# Simpler and more intuitive than Redux or Context API

# Lightweight (just a few KB)

# No boilerplate — just pure JavaScript functions

# Ideal for both global and local state in React apps
