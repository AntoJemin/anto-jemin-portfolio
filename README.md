# Anto Jemin — MES & .NET Portfolio

A responsive React + TypeScript portfolio built with Vite, Tailwind CSS, Framer Motion and Lucide React.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Personalize before publishing

Open `src/App.tsx` and update the `profile` object:

- `email`: your professional email address
- `linkedin`: your real LinkedIn URL
- `github`: your GitHub URL
- `resume`: resume PDF path
- `availability`: your preferred availability message

Add your PDF resume as `public/Anto-Jemin-Resume.pdf` (or update the `resume` path). Replace the education and certification placeholders with verified details. Add accurate employment dates and any previous employer details before publishing. No project counts, certifications, employment dates or unverified achievements have been invented.

## Contact form

The form validates required fields and email format, then opens the visitor's default email client using a `mailto:` link. For direct in-page submission, connect a backend or a form service and replace the submit handler in `src/App.tsx`.

## Project confidentiality

Project summaries are intentionally high-level. Add only screenshots and details you are authorized to share; do not include employer source code, internal system names, customer data or confidential screenshots.
