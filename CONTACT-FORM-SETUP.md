# Contact form setup

The contact form sends submissions to `jeminanto1602@gmail.com` using EmailJS.

1. Create an EmailJS account and connect the email service you want to receive messages at.
2. Create an email template. Set its **To Email** to `{{to_email}}`; use `{{from_name}}`, `{{from_email}}`, `{{subject}}` and `{{message}}` in the template body. Set Reply-To to `{{reply_to}}`.
3. Copy `.env.example` to `.env.local`.
4. Fill in your EmailJS Service ID, Template ID and Public Key in `.env.local`.
5. Restart the development server (`npm run dev`) after changing environment variables.

The portfolio form validates the fields and displays success only after EmailJS confirms the send request. Until EmailJS is configured, it displays a clear setup message and provides the direct email address.

Do not put an EmailJS private key or other secret in frontend environment variables. The browser integration uses only the EmailJS public key.
