
# Aidan Bilon — Campaign Site

This repository is a small React + Vite site used for the Aidan Bilon EngSoc campaign landing page.

Local development
---------------

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open http://localhost:5173/ to view the site.

Building for production
-----------------------

```bash
npm run build
npm run preview
```

Deployment
----------

This site can be hosted on GitHub Pages, Netlify, Vercel, or any static hosting provider. Push to the `main` branch and use your provider's instructions for deployment. The repo already contains a `public/` folder for static assets (hero image, portrait, memes).

Remind-me email collection
-------------------------

The site includes a small modal form to collect emails for voting reminders. Submissions are POSTed to a Google Apps Script web app (you provided the deployment ID). Emails are also stored in localStorage as a fallback.

If you'd like to change the endpoint, edit the `endpoint` variable in `src/App.jsx` inside `submitRemind`.

Privacy & security
------------------

- Consider adding an explicit consent checkbox to the remind form and storing a timestamp.
- To reduce spam, protect your Apps Script endpoint with a simple secret token checked server-side, or deploy a serverless function that validates requests before writing to your sheet.

Notes for maintainers
---------------------

- The hero is defined in `src/App.jsx` and styled in `src/index.css`.
- Portrait: `public/portrait.png` is placed at the far right of the hero.
- Buttons: `.btn` classes live in `src/index.css`.

If you need help wiring emails to another provider (Supabase, Netlify Function, Mailgun, etc.) I can add an example serverless endpoint and client-side code.

```
