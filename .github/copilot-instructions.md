
# Copilot Instructions for vsc_ws_helloworld

## Project Overview
This repository is a modern, accessible, and responsive Task Manager web application. It allows users to add, delete, and mark tasks as completed. The project is structured with clear separation of concerns:

- `index.html`: Semantic HTML markup for the app UI
- `styles.css`: Modern, responsive CSS styling (mobile-friendly, accessible, visually appealing)
- `script.js`: Handles all app logic (add/delete/complete tasks, DOM updates)



## Architecture & Patterns
- All logic is client-side JavaScript; no backend or build system is present
- Tasks are managed in-memory and persisted in browser localStorage as JSON
- Each task stores: text, completed state, timer (hours), due UTC timestamp, and timerUp status
- Accessibility: ARIA attributes, keyboard navigation, visually hidden labels
- Responsive design: CSS media queries for mobile
- Semantic HTML: `<main>`, `<form>`, `<ul>`, `<li>`, proper labels
- All user actions (add, delete, complete, reorder, timer adjust) update the DOM and task state
- Timer values update every second; overdue tasks are highlighted


## Developer Workflows
- No build, test, or deployment scripts required
- To run: Open `index.html` in a browser
- To update styles: Edit `styles.css` and reload the page
- To update logic: Edit `script.js` and reload the page

## Conventions
- Keep markup, styles, and scripts in separate files
- Use accessible, semantic HTML and ARIA attributes
- Use modern CSS (flexbox, media queries, transitions)
- Use unobtrusive JavaScript (no inline event handlers)


## Example Extension
- To add cloud sync, replace localStorage logic in `script.js` with backend API calls

## Next Steps for AI Agents
- Document any new features, workflows, or conventions in this file
- Update `README.md` if major changes are made

---
_Last updated: September 9, 2025_
