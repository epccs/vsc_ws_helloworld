
# Task Manager Web Application

A modern, accessible, and responsive web app for managing tasks. Users can add, delete, and mark tasks as completed. Built with semantic HTML, modern CSS, and unobtrusive JavaScript.

## Features

- Add new tasks
- Delete tasks
- Mark tasks as completed
- Reorder tasks (move up/down)
- Adjustable timer for each task (default 24hr, floating point, down to zero)
- Timer values update every second; overdue tasks are highlighted in red
- Pause timer updates while editing timer value
- All tasks and timers are persisted in browser localStorage
- Responsive design (mobile-friendly)
- Accessible: ARIA attributes, keyboard navigation, visually hidden labels
- Clean separation of markup, styles, and scripts

## File Structure

- `index.html` — Main HTML markup
- `styles.css` — CSS for layout, colors, and responsiveness
- `script.js` — Handles all app logic and DOM updates

## Usage

1. Clone or download this repository.
2. Open `index.html` in your web browser.
3. Start adding and managing your tasks!

## Customization

- To change styles, edit `styles.css`.
- To modify logic or add features (e.g., cloud sync), edit `script.js`.

## Accessibility & Conventions

- Semantic HTML elements (`<main>`, `<form>`, `<ul>`, `<li>`, etc.)
- ARIA attributes for improved accessibility
- No inline event handlers; all logic in `script.js`
- Mobile-friendly via CSS media queries

## Extending

- To add cloud sync, replace localStorage logic in `script.js` with backend API calls.
- Document any major changes in `.github/copilot-instructions.md`.

---

© 2025 Task Manager Web App
