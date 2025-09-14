

# Copilot Instructions for vsc_ws_helloworld

## Project Overview
This repository is a modern, accessible, and responsive Task Manager web application. It allows users to add, delete, and mark tasks as completed. The project is structured with clear separation of concerns:

- `index.html`: Semantic HTML markup for the app UI
- `styles.css`: Modern, responsive CSS styling (mobile-friendly, accessible, visually appealing)
- `script.js`: Handles all app logic (add/delete/complete tasks, DOM updates, RESTful API calls)

## Architecture & Patterns
- Frontend: Vanilla JavaScript, HTML, CSS
- Backend: Python Flask REST API (Dockerized)
- Tasks are persisted in backend (Flask) via RESTful API:
	- GET `/tasks`: fetch all tasks
	- POST `/tasks`: add a new task
	- PUT `/tasks/<idx>`: update a task
	- DELETE `/tasks/<idx>`: delete a task
- Each task stores: text, completed state, timer (hours), due UTC timestamp, and timerUp status
- Accessibility: ARIA attributes, keyboard navigation, visually hidden labels
- Responsive design: CSS media queries for mobile
- Semantic HTML: `<main>`, `<form>`, `<ul>`, `<li>`, proper labels
- All user actions (add, delete, complete, reorder, timer adjust) update the DOM and backend state
- Timer values update every second; overdue tasks are highlighted

## Developer Workflows
- Backend: See `BACKEND_SETUP.md` for Docker/Flask setup and API details
- To run frontend: Open `index.html` in a browser
- To update styles: Edit `styles.css` and reload the page
- To update logic: Edit `script.js` and reload the page

## Conventions
- Keep markup, styles, and scripts in separate files
- Use accessible, semantic HTML and ARIA attributes
- Use modern CSS (flexbox, media queries, transitions)
- Use unobtrusive JavaScript (no inline event handlers)

## Example Extension
- To add cloud sync, replace backend API logic in `script.js` with calls to a remote service

## Next Steps for AI Agents
- Document any new features, workflows, or conventions in this file
- Update `README.md` if major changes are made

---
_Last updated: September 13, 2025_
