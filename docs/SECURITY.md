# Security Architecture

This document describes the primary security configurations for the DevConnect project. Although the platform currently uses client-side mock architectures, several best-practice defensive measures are implemented to protect the frontend environment.

## 1. Content-Security-Policy (CSP)

A strict Content-Security-Policy meta tag protects the application against unsanctioned code execution, iframe framing (Clickjacking), and rogue data loading.

**Implementation (`index.html`):**
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' ws: wss:;">
```

- **`default-src 'self'`**: Sets the default policy to only load resources from the domain the app is running on.
- **`script-src`**: Allows `unsafe-inline` and `unsafe-eval` to support Vite's hot-module-reloading and React DevTools during local execution.
- **`img-src`**: Allows `https:` globally so dummy data profile images from services like `ui-avatars.com` operate correctly without XSS payload risks.
- **`connect-src`**: Allows WebSockets (`ws:`, `wss:`) restricted explicitly to `self` to support Vite background refreshes without permitting external WebSocket takeovers.

## 2. Cross-Site Scripting (XSS) Prevention

While React prevents DOM-based XSS automatically via string-escaping (i.e., injecting `{"<script>alert(1)</script>"}` renders as literal text rather than HTML code), React's protection **does not** cover anchor tag `href` attributes. 

If a user maliciously populates their GitHub or Portfolio link in the application state with a `javascript:alert(1)` payload, clicking the link in the standard `<a href={url}>` tag will execute the script.

### URL Sanitization

To mitigate this, the codebase uses a security utility located at `src/lib/security.js`.

The `sanitizeUrl(url)` function intercepts all User-Provided URLs. 
- It forces URLs to be evaluated through the browser's native `URL` class constructor.
- It strictly asserts that the URI Protocol is exactly `http:`, `https:`, `mailto:`, or `tel:`.
- If an attacker passes a `javascript:`, `data:`, or `vbscript:` payload, the sanitization strips the vector and returns a safe fallback anchor (`#`).

**Example Usage**:
```jsx
import { sanitizeUrl } from "@/lib/security";

// ...
<a href={sanitizeUrl(user.linkedinUrl)} target="_blank" rel="noopener noreferrer">
  LinkedIn
</a>
```

## 3. `rel="noopener noreferrer"`

Any external link mapped through target routing (`target="_blank"`) carries the `rel="noopener noreferrer"` attribute. This neutralizes Reverse Tabnabbing (where an untrusted target page attempts to hijack the `window.opener` context of our application router).

---
*Created during frontend security modernization.*
