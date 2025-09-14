
# Task Manager Web Application

A modern, accessible, and responsive web app for managing tasks. Users can add, delete, and mark tasks as completed. Built with semantic HTML, modern CSS, unobtrusive JavaScript, and a Python Flask backend (Dockerized).

## Features

- Add new tasks
- Delete tasks
- Mark tasks as completed
- Reorder tasks (move up/down)
- Adjustable timer for each task (default 24hr, floating point, down to zero)
- Timer values update every second; overdue tasks are highlighted in red
- Pause timer updates while editing timer value
- All tasks and timers are persisted in backend (Flask API, Docker)
- Responsive design (mobile-friendly)
- Accessible: ARIA attributes, keyboard navigation, visually hidden labels
- Clean separation of markup, styles, and scripts

## File Structure

- `index.html` — Main HTML markup
- `styles.css` — CSS for layout, colors, and responsiveness
- `script.js` — Handles all app logic, DOM updates, and RESTful API calls
- `BACKEND_SETUP.md` — Backend setup instructions (Flask/Docker)

## Backend API

- Python Flask REST API (Dockerized)
- Endpoints:
  - GET `/tasks`: fetch all tasks
  - POST `/tasks`: add a new task
  - PUT `/tasks/<idx>`: update a task
  - DELETE `/tasks/<idx>`: delete a task

## Usage

1. Clone or download this repository.
2. Set up the backend by following `BACKEND_SETUP.md` (Docker/Flask).
3. Open `index.html` in your web browser.
4. Start adding and managing your tasks!

## Customization

- To change styles, edit `styles.css`.
- To modify logic or add features (e.g., cloud sync), edit `script.js`.

## Accessibility & Conventions

- Semantic HTML elements (`<main>`, `<form>`, `<ul>`, `<li>`, etc.)
- ARIA attributes for improved accessibility
- No inline event handlers; all logic in `script.js`
- Mobile-friendly via CSS media queries

## Extending

- To add cloud sync, replace backend API logic in `script.js` with calls to a remote service.
- Document any major changes in `.github/copilot-instructions.md`.

---

© 2025 Task Manager Web App
