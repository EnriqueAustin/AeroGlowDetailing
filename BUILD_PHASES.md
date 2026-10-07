# AeroGlow Detailing — Phased Build Plan

This document turns the site audit into **14 self-contained prompts**. Feed them to an AI coding assistant **one at a time, in order**. Each phase is sized to fit in one model turn without running out of tokens.

## How to use this document

1. Open the phase you are on.
2. Copy the **CONTEXT BLOCK** (below, Section A) — paste it first, every single time.
3. Copy the phase's prompt (everything between `=== PROMPT START ===` and `=== PROMPT END ===`).
4. Paste both into the AI, let it work.
5. Run the phase's **Verify** commands yourself. If they pass, move to the next phase.
6. Commit after each phase so you can roll back one step at a time.

```bash
git add -A && git commit -m "phase N: <name>"
```

**Do not skip ahead.** Later phases assume earlier ones are done.

### Phase order and why

| # | Phase | Priority | Risk | Notes |
|---|---|---|---|---|
| 1 | Booking form actually delivers leads | **P0** | Low | Do this first. You are losing jobs today. |
| 2 | Honest photo upload + email capture | **P0** | Low | |
| 3 | Compress all images | **P1** | Low | Biggest speed win |
| 4 | Lazy-load images | **P1** | Low | Needs Phase 3 done |
| 5 | Delete dead assets and unused deps | P1 | Low | |
| 6 | Form accessibility + mobile autofill | **P1** | Low | Real conversion impact |
| 7 | Modal accessibility | P1 | Medium | |
| 8 | Before/After slider keyboard support | P2 | Low | |
| 9 | Centralise business constants | P2 | Low | Must come before Phase 10 |
| 10 | Deduplicate the two booking flows | P2 | **High** | Hardest. Optional. |
| 11 | CSS and dead-code cleanup | P2 | Low | |
| 12 | SEO metadata, robots, sitemap | P1 | Low | |
| 13 | Real URL routing (remove `#/`) | **P1** | **High** | Big SEO unlock, big change |
| 14 | Content and trust | **P0** | — | Mostly your work, not the AI's |

---

# SECTION A — CONTEXT BLOCK

Paste this at the top of **every** phase prompt.

=== CONTEXT START ===

You are working on an existing React website. Read this context carefully before doing anything.

**Project:** AeroGlow Detailing — a mobile car headlight restoration and detailing business operating in Vredenburg, Saldanha, Langebaan and Jacobsbaai on the West Coast of South Africa. Customers are mostly on mobile phones using expensive mobile data.

**Tech stack:**
- React 19 + TypeScript
- Vite 8 as the build tool
- Tailwind CSS v4 (configured via `@tailwindcss/vite`, NOT a `tailwind.config.js` file)
- `lucide-react` for icons
- No router library. Navigation is custom, via URL hash, in `src/context/NavigationContext.tsx`
- No backend, no database, no server. It is a static single-page site.

**Key file layout:**
```
index.html                              root HTML, all SEO meta tags
src/main.tsx                            React entry point
src/App.tsx                             page switch / layout shell
src/index.css                           global styles
src/context/NavigationContext.tsx       hash routing + modal open/close state
src/types/index.ts                      all TypeScript interfaces
src/data/studioData.ts                  all services, packages, prices, FAQs (802 lines)
src/data/images.ts                      central image imports
src/assets/images/                      image files
public/                                 static files copied as-is to the build
src/components/                         17 shared components
src/pages/                              11 page components
```

**Brand colours (use these exact values, never invent new ones):**
- Page background: `#080808`
- Card background: `#111111`, `#121212`, `#141414`, `#181818`
- Body text: `#F0EFEA`
- Accent cyan (primary brand): `#00D2FF`
- Accent cyan hover: `#38BDF8`
- WhatsApp green: `#25D366`, hover `#20ba59`
- Borders: Tailwind `neutral-800` / `neutral-900`

**Business facts (never change these numbers):**
- WhatsApp / phone: `073 859 5637` — international format `27738595637`
- Headlight restoration: R650 for both front headlights
- 1-Year Written Clarity Guarantee on headlights
- Payment: on completion, cash or EFT. No deposit.
- Call-out: Vredenburg FREE. Saldanha / Langebaan / Jacobsbaai R150, waived over R700. Surrounding West Coast R200, waived over R1000.
- Hours: Mon–Sat 08:00–17:00

**RULES YOU MUST FOLLOW:**

1. **Read a file before you edit it.** Never guess what is in a file. Never guess line numbers.
2. **Edit one file at a time.** Make the edit, wait for it to succeed, then move to the next file.
3. **Make the smallest change that completes the task.** Do not refactor code you were not asked to touch. Do not reformat files. Do not rename things that are not part of the task.
4. **Do not add comments** to code you did not write.
5. **Do not change the visual design.** Same colours, same spacing, same fonts, same layout — unless the task explicitly says to change them.
6. **Do not install new npm packages** unless the task explicitly tells you to.
7. **Do not hardcode any API key, password or secret** in any file.
8. **Do not run `git commit`, `git push`, or any destructive git command.** The user commits manually.
9. **Verify your work by running the commands in the Verify section.** If a command fails, read the error and fix it. Do not claim success without running them.
10. **If something in the task does not match what you find in the code, stop and say so.** Do not improvise a different change.

=== CONTEXT END ===

---

# PHASE 1 — Make the booking form actually deliver leads

**Priority: P0. This is the most important fix on the entire site.**

### The problem

The site has two booking forms. Both have a `handleSubmit` that does this and nothing else:

```
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitted(true);
};
```

No data is sent anywhere. No email, no API call, no storage. But the success screen then tells the customer *"BOOKING REQUEST SUBMITTED! … has been received"* and *"We have logged your request"*.

Nothing was received. Nothing was logged. The booking only reaches the business if the customer separately notices and taps the WhatsApp button on the success screen. Every customer who reads "received" and closes the tab is a lost job who believes they are booked.

### The fix

On submit, **immediately open WhatsApp** with the pre-filled booking message, and **change the success copy to be honest** about what just happened. This needs no backend and no new dependency.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: make the booking forms actually send the booking

There are two near-identical booking forms in this project. You must apply the same fix to **both**:

- `src/pages/BookPage.tsx` (the `/book` page)
- `src/components/MultiStepBookingModal.tsx` (the popup version)

Work on one file at a time. Finish the first completely, then do the second.

### Step 1 — Read the file

Read the whole file first. Find these three things and note their exact current text:
- the `handleSubmit` function
- the `whatsAppText` constant (it builds the WhatsApp message)
- the success screen JSX (the block rendered when `submitted` is true)

### Step 2 — Change `handleSubmit` to actually send

Replace the existing `handleSubmit` with a version that opens WhatsApp with the booking message, then shows the success screen.

The new function must:
- call `e.preventDefault()` first
- build the WhatsApp URL using the **existing** `whatsAppText` constant already in the file — do not write a new message format
- open it with `window.open(url, '_blank', 'noopener,noreferrer')`
- then call `setSubmitted(true)`

The WhatsApp URL format is: `https://wa.me/27738595637?text=` followed by `whatsAppText`.

Important: `whatsAppText` is defined **after** `handleSubmit` in the current file. A `const` cannot be used before it is defined. You must move the `whatsAppText` definition so it appears **above** `handleSubmit`. Move it — do not duplicate it.

### Step 3 — Make the success screen copy honest

The success screen currently makes false claims. Change the wording:

In `src/pages/BookPage.tsx`, find the heading `BOOKING REQUEST SUBMITTED!` and change it to:

`ONE LAST STEP`

Find the paragraph below it that says the request "has been received" and replace the whole sentence with text meaning: WhatsApp should have opened in a new tab with their booking details ready to send. They must press send in WhatsApp to confirm. If WhatsApp did not open, use the green button below.

Keep the customer name and suburb variables that are already interpolated into that paragraph.

In `src/components/MultiStepBookingModal.tsx`, find the heading `BOOKING REQUEST RECEIVED!` and change it to:

`ONE LAST STEP`

Find the paragraph below it that says "We have logged your request" and replace it with the same honest wording as above. Keep the existing interpolated variables (`booking.clientName`, `booking.suburb`, `booking.preferredDate`).

### Step 4 — Make the fallback button more prominent

On both success screens there is already a green WhatsApp link button. Change its label text:

- In `BookPage.tsx` the label is currently `Send Booking to WhatsApp (073 859 5637)` — change it to `Open WhatsApp & Send Booking`
- In `MultiStepBookingModal.tsx` the label is currently `Send Confirmation to WhatsApp (073 859 5637)` — change it to `Open WhatsApp & Send Booking`

Do not change the button's colours, size or classes.

### Constraints

- Do NOT change the pricing logic, the travel fee logic, or the step navigation.
- Do NOT change the WhatsApp message content itself — only move where it is defined.
- Do NOT add any npm package.
- Do NOT add a backend or an API call.
- Keep both files' changes identical in behaviour.

### Verify

Run both of these and make sure they pass with no errors:

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then report: which two files you changed, and confirm that `whatsAppText` is now defined above `handleSubmit` in both.

=== PROMPT END ===

### Done when
- Submitting either form opens WhatsApp in a new tab with the booking filled in.
- Neither success screen claims the booking was received or logged.
- `npx tsc --noEmit` and `npm run build` both pass.

### Optional follow-up (do later, not now)
If you want an emailed copy of every booking as a backup record, sign up for a free no-backend form service (Web3Forms or Formspree), then ask an AI to POST the booking object to that endpoint inside `handleSubmit` alongside the WhatsApp open. Keep the endpoint key in a `.env` file, never in the source.

---

# PHASE 2 — Honest photo upload and email capture

**Priority: P0.** Two smaller honesty problems in the same forms.

### The problem

1. **The photo upload is fake.** The handler reads `file.name` only. The actual image files never leave the browser. The state variable in the modal is literally called `simulatedUploadedImages`. But the UI invites customers to upload photos for assessment.
2. **No email is ever captured.** `clientEmail` exists in the `BookingState` type and in both forms' state objects, but no email input is rendered anywhere on the site.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: fix the fake photo upload and add an email field

Two files, same changes to both. One file at a time:

- `src/pages/BookPage.tsx`
- `src/components/MultiStepBookingModal.tsx`

### Part A — Be honest about photos

The photo upload does not actually upload anything. The files never leave the browser; only the filenames are stored in React state.

Find the photo upload section (it has a dashed-border `<label>` with a `<input type="file">` inside, and a camera icon). Keep the input working as-is, but change the **help text** under or near it so it tells the truth.

The new help text must say, in your own words, that photos cannot be attached through this form, and ask the customer to send photos directly on WhatsApp after submitting. Keep it short — one or two lines — and keep the existing text styling classes (small, muted neutral colour).

Also rename the misleading state variable in `src/components/MultiStepBookingModal.tsx`:
- `simulatedUploadedImages` becomes `selectedPhotoNames`
- `setSimulatedUploadedImages` becomes `setSelectedPhotoNames`
- `handleSimulatedUpload` becomes `handlePhotoSelect`

Update every usage of those three names in that file. Do not rename anything in `BookPage.tsx` — its equivalents are already named sensibly.

### Part B — Add the missing email field

Both forms already keep `clientEmail` in state but never render an input for it. Add one.

In each file, find the step that collects the customer's name and phone number (the contact details step — look for the inputs with `placeholder="Your name"` and `placeholder="e.g. 082 123 4567"`).

Add a third input directly after the phone input:
- `type="email"`
- bound to `booking.clientEmail`
- updates state the same way the name and phone inputs do
- `placeholder="you@example.com"`
- **not** required
- a visible label above it reading `EMAIL (OPTIONAL)`

Copy the exact wrapper markup, label classes and input classes from the phone number field that sits immediately above it, so it looks identical. Do not invent new styling.

### Part C — Include the email in the WhatsApp message

Find the `whatsAppText` constant in each file. It builds the booking message with lines like `*Customer:* ...`.

Add one more line to that message showing the email, only when one was entered. If the email is empty, the line must show `Not provided`. Match the existing formatting style of the surrounding lines exactly (same asterisks, same `\n` line breaks).

### Constraints

- Do NOT make email required.
- Do NOT change pricing, travel fees or step navigation.
- Do NOT add an npm package.
- Do NOT attempt to actually upload files anywhere.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Report which files you changed and confirm the email field appears in both forms.

=== PROMPT END ===

### Done when
- Both forms have an optional email input next to name and phone.
- The email appears in the WhatsApp message.
- The photo section no longer implies files are being uploaded.

---

# PHASE 3 — Compress all images

**Priority: P1. This is the biggest speed win available.**

### The problem

Measured on the live home page at 375px wide (phone size): **3.58 MB of images, 12.2 MB total page weight**. The production build ships about 9.4 MB of JPEGs. Every single image is an unoptimised full-size JPEG between 630 KB and 1 MB.

Your customers are on South African mobile data. This is the difference between a site that loads and a site they abandon.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: compress every image in the project

All images in `src/assets/images/` are oversized, unoptimised JPEGs and PNGs. They must be compressed and converted to WebP without changing how the site looks.

### Step 1 — Survey what exists

List every file in `src/assets/images/` with its size. Then read `src/data/images.ts` to see which of those files are actually imported. Note any file that is not imported — you will report those but NOT delete them in this phase.

### Step 2 — Install the conversion tool as a dev dependency

```bash
npm install --save-dev sharp
```

This is the one package you are allowed to install in this phase.

### Step 3 — Write a conversion script

Create a file at `scripts/optimize-images.mjs`.

The script must:
- Read every `.jpg` and `.png` file in `src/assets/images/`
- Skip `mainLogo.png` entirely — it is the brand logo, it is already optimised and it must keep its transparency. Leave it exactly as it is.
- For every other image: resize it so the longest edge is at most **1600 pixels** (never enlarge an image that is already smaller), then write a `.webp` version next to the original at quality 78
- Print a table showing each file's original size, new size, and the percentage saved
- Print the total saved at the end

Use `sharp` with `withoutEnlargement: true` on the resize.

Add this script to `package.json` under `"scripts"` as `"optimize-images": "node scripts/optimize-images.mjs"`.

### Step 4 — Run it

```bash
npm run optimize-images
```

Show the output table.

### Step 5 — Point the code at the new files

Edit `src/data/images.ts`. Change every import path from `.jpg` to `.webp`, **except** the `mainLogo.png` import, which stays exactly as it is.

Do not change the export names. Do not change the shape of the `IMAGES` object. Only the file extensions in the import paths change.

### Step 6 — Delete the originals that are now replaced

Once the build passes in the Verify step below, delete the original `.jpg` files in `src/assets/images/` that now have a `.webp` twin. Keep `mainLogo.png`. Keep any `.jpg` you were unable to convert.

### Constraints

- Do NOT touch `mainLogo.png`.
- Do NOT touch anything in `public/` in this phase.
- Do NOT change any component file. Only `src/data/images.ts`, `package.json`, and the new script.
- Do NOT change image names other than the extension.
- WebP is supported by every browser in use today — do not add JPEG fallbacks.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

The build output lists every asset with its size. Compare it to before: the total image weight must be dramatically lower. Report the before and after totals.

=== PROMPT END ===

### Done when
- `npm run build` shows image assets totalling well under 1.5 MB (down from ~9.4 MB).
- The site looks identical.
- `mainLogo.png` is untouched.

---

# PHASE 4 — Lazy-load images

**Priority: P1. Requires Phase 3 to be finished first.**

### The problem

There are 22 `<img>` tags across the project and **not one** has `loading="lazy"`. Every image on a page downloads immediately, even ones far below the fold. There are also no `width`/`height` attributes, so the page jumps around as images arrive.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: lazy-load all below-the-fold images

### Step 1 — Find every image tag

Search the whole `src/` directory for `<img`. There are about 22. List every file and line number before you change anything.

### Step 2 — Add lazy loading to all of them EXCEPT the two above-the-fold ones

Add these two attributes to every `<img>` tag:

```
loading="lazy"
decoding="async"
```

**Two exceptions.** These images are visible immediately when the page loads and must NOT be lazy-loaded, because lazy-loading them makes the page feel slower:

1. The hero background image in `src/components/Hero.tsx` (it uses `IMAGES.heroAutomotive`)
2. The logo image in `src/components/AeroGlowLogo.tsx` (it uses `IMAGES.logo`)

For those two, add this instead:

```
loading="eager"
decoding="async"
fetchPriority="high"
```

Note: in React the attribute is spelled `fetchPriority` with a capital P.

### Step 3 — Do not break existing attributes

Several images already have `referrerPolicy="no-referrer"` or specific `className` values. Leave all existing attributes exactly as they are. You are only adding new ones.

### Constraints

- Do NOT change any `src`, `alt`, or `className` value.
- Do NOT change any layout or styling.
- Do NOT add `width` and `height` attributes in this phase — the images use `object-cover` with CSS sizing and adding raw dimensions could break the layout.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then count your work:

```bash
grep -rc "loading=" src/ --include=*.tsx
```

Report the total number of `<img>` tags found and how many now have a `loading` attribute. Those two numbers must match.

=== PROMPT END ===

### Done when
- Every `<img>` has a `loading` attribute.
- Only the hero image and the logo are `eager`.

---

# PHASE 5 — Delete dead assets and unused dependencies

**Priority: P1. Pure deletion — low risk, good payoff.**

### The problem

- `src/assets/images/aeroglow_dark_transparent.png` (944 KB) is imported in `images.ts` as `logoDark` and used by **nothing** — so Vite bundles it into your build for no reason.
- `public/assets/images/` contains 14 duplicate copies of the src images (~9 MB). Nothing references them. Vite copies everything in `public/` into the build verbatim.
- Four unused logo JPGs sit in `src/assets/images/`.
- Four npm packages are installed and imported by nothing: `@google/genai`, `express`, `dotenv`, `motion`.
- `metadata.json` and `.env.example` are leftover Google AI Studio scaffolding.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: delete dead files and unused dependencies

This phase is almost entirely deletion. **Before deleting anything, prove it is unused.** For each item below, run a search first and show me the result. If a search finds a real usage, STOP and report it instead of deleting.

### Step 1 — Remove the unused `logoDark` image

Search for `logoDark` across `src/`:

```bash
grep -rn "logoDark" src/
```

If the only matches are the import line and the export line inside `src/data/images.ts`, then:
- Delete the `aeroglowDarkTransparent` import line from `src/data/images.ts`
- Delete the `logoDark:` entry from the `IMAGES` object
- Delete the file `src/assets/images/aeroglow_dark_transparent.png`

### Step 2 — Remove the duplicate public image folder

Search for anything referencing that path:

```bash
grep -rn "/assets/images" src/ index.html
```

If nothing references `/assets/images/` (the three matches that used to exist in `index.html` were already fixed), delete the entire folder:

```bash
rm -rf public/assets
```

**Do not delete** `public/favicon.png` or `public/og-image.jpg` — those are in active use.

### Step 3 — Remove the four orphaned logo JPGs

These four files in `src/assets/images/` are not imported anywhere:
- `aeroglow_logo_dark_bg_1790768228775.jpg`
- `aeroglow_official_brand_logo_1790768978874.jpg`
- `aeroglow_official_logo_1790768176991.jpg`
- `aeroglow_logo_transparent.png`

Verify each one is unreferenced with a grep, then delete them.

### Step 4 — Remove unused npm packages

Verify each of these four is imported nowhere in `src/`:

```bash
grep -rn "@google/genai\|from 'express'\|from \"express\"\|dotenv\|from 'motion'" src/
```

The word "express" appears in some marketing copy (a package is named "Sight & Wash Express") — that is text, not an import. Only an actual `import` statement counts.

If none are imported, remove them:

```bash
npm uninstall @google/genai express dotenv @types/express
```

Leave `motion` installed for now — it is listed but check it separately; if truly unused, uninstall it too.

### Step 5 — Clean the leftover AI Studio scaffolding

`metadata.json` still describes a different business ("AURA Automotive Studio") and declares a Gemini API capability this site does not use.

Replace the entire contents of `metadata.json` with a correct description of this project: name `AeroGlow Detailing`, a one-line description of the mobile headlight restoration and detailing service for Vredenburg / Saldanha / Langebaan / Jacobsbaai, an empty `requestFramePermissions` array, and an empty `majorCapabilities` array.

Then delete `.env.example` — it only documents Gemini keys that are no longer needed.

### Step 6 — Fix the project name

In `package.json`, change `"name": "react-example"` to `"name": "aeroglow-detailing"`.

### Constraints

- **Prove before you delete.** Show the grep output for every deletion.
- Do NOT delete anything not explicitly listed above.
- Do NOT delete `public/favicon.png` or `public/og-image.jpg`.
- Do NOT delete `mainLogo.png`.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Report the total build size before and after, and list every file and package you removed.

=== PROMPT END ===

### Done when
- `npm run build` succeeds and the `dist/` folder is several megabytes smaller.
- The site looks and behaves identically.

---

# PHASE 6 — Form accessibility and mobile autofill

**Priority: P1. This directly costs you completed bookings.**

### The problem

Across both booking forms there are **zero** `<label htmlFor>` / input `id` pairs. There are visual `<label>` elements, but none are programmatically connected to their input. Consequences:

- Screen readers announce unlabelled, unidentifiable fields.
- Tapping a label does not focus its input.
- **No `autoComplete` attributes anywhere**, so a phone's saved-contact autofill cannot fill in name, phone, email or address. On a mobile-first booking form that is pure friction at the exact moment the customer is deciding whether to finish.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: connect every form label to its input and enable mobile autofill

Two files, same treatment. One at a time:

- `src/pages/BookPage.tsx`
- `src/components/MultiStepBookingModal.tsx`

### Step 1 — Inventory the fields

Read the file and list every `<input>`, `<select>` and `<textarea>` in it, with the visible label text that sits above each one.

### Step 2 — Give every field an id and connect its label

For each field:
- Add a unique, descriptive `id` using kebab-case. Prefix it so the two files never collide: use `book-` in `BookPage.tsx` and `modal-` in `MultiStepBookingModal.tsx`. Examples: `book-client-name`, `modal-vehicle-model`.
- Add `htmlFor` to the `<label>` directly above it, matching that `id` exactly.

Careful: one `<label>` in each file is the dashed-border photo upload wrapper that **contains** its input rather than sitting above it. A wrapping label is already correctly associated — leave that one alone.

### Step 3 — Add autofill attributes

Add the correct `autoComplete` value to each field so phone browsers can autofill it:

| Field | `autoComplete` value |
|---|---|
| Customer name | `name` |
| Phone number | `tel` |
| Email | `email` |
| Street address | `street-address` |
| Suburb / area selector | `address-level2` |
| Everything else | `off` |

### Step 4 — Improve mobile keyboards

On the phone number input, add `inputMode="tel"`. On the email input, add `inputMode="email"`.

### Step 5 — Mark the genuinely required fields

Currently only name and phone are `required`. Also mark the **street address** input as `required` — you cannot drive to a job without an address.

Do not make any other field required.

### Constraints

- Do NOT change any `className`, colour, spacing or layout.
- Do NOT change the visible label text.
- Do NOT reorder fields.
- Ids must be unique within each file and must not collide across the two files.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then check the counts match:

```bash
grep -c "htmlFor=" src/pages/BookPage.tsx src/components/MultiStepBookingModal.tsx
```

```bash
grep -c "autoComplete=" src/pages/BookPage.tsx src/components/MultiStepBookingModal.tsx
```

Report the number of fields in each file and confirm every one has an id, a connected label and an `autoComplete` value.

=== PROMPT END ===

### Done when
- Every form field has a matching `id` / `htmlFor` pair.
- A phone offers to autofill name, phone, email and address.

---

# PHASE 7 — Modal accessibility

**Priority: P1. Medium risk — test carefully after.**

### The problem

There are five modal-style overlays: the booking modal, the coupon modal, two gallery lightboxes, and the mobile navigation drawer. **None** of them:
- close on the Escape key
- have `role="dialog"` or `aria-modal="true"`
- trap keyboard focus inside the modal
- lock background scrolling — so on a phone, the page behind scrolls while the modal is open

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: make all modal overlays accessible and lock background scroll

### Step 1 — Build one reusable hook

Create a new file `src/hooks/useModalBehavior.ts`.

Export a single hook: `useModalBehavior(isOpen: boolean, onClose: () => void)`.

When `isOpen` is true, the hook must:
1. Add a `keydown` listener on `document` that calls `onClose()` when the Escape key is pressed.
2. Set `document.body.style.overflow = 'hidden'` to stop the page behind from scrolling.

When `isOpen` becomes false, or the component unmounts, the hook must:
1. Remove the keydown listener.
2. Restore `document.body.style.overflow` to whatever it was before (capture the previous value — do not assume it was an empty string).

Use `useEffect` with `[isOpen, onClose]` as the dependency array. Do nothing at all when `isOpen` is false.

Keep this file short. It should be under 35 lines.

### Step 2 — Use the hook in all five overlays

Apply it in each of these files. One file at a time.

| File | `isOpen` value | close function |
|---|---|---|
| `src/components/MultiStepBookingModal.tsx` | the `isOpen` prop | the `onClose` prop |
| `src/components/CouponModal.tsx` | the `isOpen` prop | the `onClose` prop |
| `src/components/Navbar.tsx` | `mobileMenuOpen` state | a function that sets it to false |
| `src/components/WorkGallery.tsx` | whatever state opens its lightbox | whatever closes it |
| `src/pages/WorkGalleryPage.tsx` | whatever state opens its lightbox | whatever closes it |

**Important for the two modal components:** they currently do `if (!isOpen) return null;` near the top of the component. React hooks must be called before any early return. Move the `useModalBehavior(...)` call **above** that early return line.

For `WorkGallery.tsx` and `WorkGalleryPage.tsx`, read the file first to find out what state controls the lightbox — do not guess the variable names.

### Step 3 — Add the ARIA attributes

On the outermost overlay `<div>` of each of the five overlays (the one with `className` containing `fixed inset-0`), add:

```
role="dialog"
aria-modal="true"
```

Each overlay also needs an accessible name. If the overlay contains a heading element, give that heading an `id` and point to it with `aria-labelledby` on the overlay div. If it has no heading (the mobile nav drawer, for example), use `aria-label` with a short description instead, such as `aria-label="Navigation menu"`.

### Step 4 — Make the backdrop close the modal

For `MultiStepBookingModal.tsx` and `CouponModal.tsx` only: clicking the dark area outside the modal card should close it.

Add an `onClick` to the outer overlay div that calls the close function **only if** `event.target === event.currentTarget`. That check is essential — without it, clicking anything inside the modal would also close it.

Do not add this to the gallery lightboxes or the nav drawer in this phase.

### Constraints

- Do NOT implement a full focus trap in this phase — Escape, scroll lock and ARIA are the priority. Focus trapping can come later.
- Do NOT change any visual styling, colour or layout.
- Do NOT change what the modals contain.
- Do NOT install any package.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then manually confirm, and report on, each of these:
1. Opening the booking modal and pressing Escape closes it.
2. While a modal is open, the page behind does not scroll.
3. After closing a modal, the page scrolls normally again.
4. Clicking the dark backdrop closes the booking and coupon modals, but clicking inside the modal card does not.

=== PROMPT END ===

### Done when
- Escape closes every overlay.
- The background never scrolls behind an open modal.
- Scrolling is correctly restored on close.

---

# PHASE 8 — Before/After slider keyboard support

**Priority: P2. Small, self-contained.**

### The problem

`src/components/BeforeAfterSlider.tsx` is operable by mouse and touch only. It has no `role="slider"`, no `tabIndex`, and no arrow-key handling, so it is completely unusable by keyboard.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: make the before/after comparison slider keyboard accessible

Single file: `src/components/BeforeAfterSlider.tsx`

### Step 1 — Read the component

Note the existing state variable `sliderPosition` (a number from 0 to 100) and its setter, and find the draggable container div — it is the one with `ref={containerRef}` and the mouse and touch handlers.

### Step 2 — Make the container focusable and announced correctly

On that same container div, add:

```
tabIndex={0}
role="slider"
aria-valuemin={0}
aria-valuemax={100}
aria-valuenow={Math.round(sliderPosition)}
aria-label="Before and after comparison slider. Use the left and right arrow keys to compare."
```

### Step 3 — Add arrow-key handling

Add an `onKeyDown` handler to the same div that adjusts `sliderPosition`:

- Left arrow (`ArrowLeft`): decrease by 5
- Right arrow (`ArrowRight`): increase by 5
- `Home`: jump to 0
- `End`: jump to 100

Clamp the result between 0 and 100 always. Call `e.preventDefault()` for each of those four keys so the page does not scroll. Ignore every other key.

### Step 4 — Add a visible focus ring

The container currently has no focus style, so a keyboard user cannot see where they are. Add these Tailwind classes to its existing `className`:

```
focus:outline-none focus:ring-2 focus:ring-[#00D2FF] focus:ring-offset-2 focus:ring-offset-black
```

Append them to the existing class string. Do not remove or reorder any existing class.

### Constraints

- Do NOT change the mouse or touch behaviour.
- Do NOT change the images, labels or layout.
- Do NOT change the surrounding case-study panel.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then confirm manually: Tab to the slider, press the left and right arrow keys, and check the divider moves.

=== PROMPT END ===

---

# PHASE 9 — Centralise business constants

**Priority: P2. Must be done before Phase 10.**

### The problem

The phone number `27738595637` is hardcoded in more than 20 separate files. The display format `073 859 5637` is hardcoded in about as many. If the number ever changes, you have to find every one. The travel-fee rules are also duplicated in two files.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: move hardcoded business details into one config file

### Step 1 — Create the config file

Create `src/data/businessConfig.ts`. It must export one frozen object named `BUSINESS` containing:

- `phoneInternational`: `'27738595637'`
- `phoneDisplay`: `'073 859 5637'`
- `whatsAppBase`: a string built from `phoneInternational`, equal to `https://wa.me/27738595637`
- `homeBase`: `'Vredenburg'`
- `serviceAreas`: an array of the four town names: Vredenburg, Saldanha, Langebaan, Jacobsbaai
- `hours`: `'Mon – Sat: 08:00 – 17:00'`
- `headlightPriceZAR`: `650`

Also export a helper function:

```
whatsAppLink(message: string): string
```

It must return `whatsAppBase` plus `?text=` plus the message passed through `encodeURIComponent`.

Use `as const` on the object so TypeScript infers literal types.

### Step 2 — Find every hardcoded usage

```bash
grep -rn "27738595637" src/
```

```bash
grep -rn "073 859 5637" src/
```

List every file and line before changing anything. There will be roughly 20 files.

### Step 3 — Replace them, one file at a time

In each file:
- Import `{ BUSINESS, whatsAppLink }` from the config (adjust the relative path for whether the file is in `src/components/` or `src/pages/`).
- Replace every WhatsApp URL built with a template literal and `encodeURIComponent(...)` with a call to `whatsAppLink('the same message text')`.
- Replace every hardcoded display number `073 859 5637` in visible text with `{BUSINESS.phoneDisplay}`.

**Critically important:** the message text inside each link must stay **exactly the same**. These messages are tailored per page (the headlights page says something different to the FAQ page). You are changing how the URL is built, never what it says.

Work through the files one at a time. After each file, confirm it still type-checks before moving on.

### Step 4 — Leave `index.html` alone

`index.html` is not TypeScript and cannot import the config. Leave the `telephone` value in its structured data exactly as it is.

### Constraints

- Do NOT change any message wording.
- Do NOT change the phone number itself.
- Do NOT change any styling or layout.
- Do NOT touch the travel-fee logic in this phase.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then confirm the only remaining raw occurrences are in the config file and `index.html`:

```bash
grep -rn "27738595637" src/ | grep -v businessConfig
```

That command should return nothing. Report the number of files you changed.

=== PROMPT END ===

---

# PHASE 10 — Deduplicate the two booking flows

**Priority: P2. HIGHEST RISK PHASE IN THIS DOCUMENT.**

> **Read this before starting.** `BookPage.tsx` (692 lines) and `MultiStepBookingModal.tsx` (702 lines) are near-identical copies of the same five-step flow, with pricing, travel-fee and WhatsApp-message logic duplicated in both. Every pricing change has to be made twice or they drift apart.
>
> This is a big refactor and a weaker model may struggle with it. **It is optional.** The site works fine with the duplication — it is a maintenance cost, not a bug. If you are unsure, skip this phase and just remember to always change both files.
>
> If you do attempt it, commit first so you can roll back cleanly.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: extract the shared booking logic into one hook

**This is a careful refactor. Change behaviour in no way at all.** The two forms must work exactly as they do now when you are finished.

### Step 1 — Read both files completely

- `src/pages/BookPage.tsx`
- `src/components/MultiStepBookingModal.tsx`

Produce a list of everything that is duplicated between them. You are looking for (at minimum):
- the `booking` state object and its initial values
- `allSelectableItems` (the combined services and packages list)
- `activeOption`
- `baseServicePrice`
- `getTravelFee`
- `travelFee` and `totalEstimate`
- `whatsAppText`
- `handleNext` / `handleBack` step navigation
- `handleSubmit`

Report that list and note any place where the two files genuinely differ. **Differences matter** — do not flatten a real difference into sameness.

### Step 2 — Create the shared hook

Create `src/hooks/useBookingFlow.ts`.

Export one hook, `useBookingFlow(preselectedServiceId?: string)`, that owns all the shared logic you listed and returns an object containing the state, the derived values and the handler functions that both components need.

Move the logic as-is. Do not "improve" it, do not change any calculation, do not rename any price field.

### Step 3 — Rewrite the two components to consume the hook

One file at a time. Finish the first, verify it, then do the second.

Each component keeps its own JSX — the page layout and the modal layout are genuinely different and must stay different. Only the logic comes from the hook.

The modal keeps its own `isOpen` / `onClose` props and its early return. The page keeps its `PageHeader` and page wrapper.

### Step 4 — Verify nothing changed

After each file, confirm the behaviour is identical:
- Same five steps, same order
- Same prices for every service and vehicle type
- Same travel fee rules: Vredenburg free; Surrounding West Coast R200 waived over R1000; everywhere else R150 waived over R700
- Same WhatsApp message content
- Same success screen

### Constraints

- **Behaviour must be byte-for-byte identical.** This is a pure refactor.
- Do NOT change any price, any threshold, or any message.
- Do NOT change any JSX layout or styling.
- Do NOT combine the two components into one.
- Do NOT install any package.
- If at any point the two files turn out to differ in a way that cannot be shared, leave that part duplicated and say so in your report.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then test both flows by hand and report on each:
1. Open `/#/book`, step through all five steps, confirm the total price.
2. Open the booking modal from a service button, step through, confirm the same total for the same selections.
3. Confirm both still open WhatsApp on submit.

=== PROMPT END ===

---

# PHASE 11 — CSS and dead-code cleanup

**Priority: P2. Several small, independent fixes.**

### The problems

1. `animate-fade-in` is used in 5 components and **defined nowhere** — it silently does nothing, so modals pop in with no transition.
2. `py-0.2` appears twice — almost certainly meant to be `py-0.5`.
3. `src/index.css` has a global `*, ::before, ::after { max-width: 100% }` — a blunt fix left over from the mobile-overflow commit. It will cause subtle layout bugs.
4. The coupon flow is inert: `hasCouponApplied` is passed from `App.tsx` into the booking modal and then discarded unused. No discount is ever applied.
5. Eight components pull `openCoupon` out of context and never call it. Several unused `lucide-react` icon imports.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: fix dead CSS classes and remove dead code

Do these five fixes in order. They are independent — if one cannot be done, do the others and report it.

### Fix 1 — Define the missing fade-in animation

The class `animate-fade-in` is used in five components but is never defined, so it does nothing.

Open `src/index.css`. After the existing `@layer base { ... }` block (not inside it), add a `@keyframes fade-in` that animates `opacity` from 0 to 1, and a `.animate-fade-in` class that runs it once over 180ms with `ease-out`.

Keep it simple — opacity only. Do not add movement or scaling.

### Fix 2 — Correct the invalid padding class

Two places use `py-0.2`, which is not an intended value:
- `src/components/Navbar.tsx` — the badge span (the one showing `R650` / `NEW`)
- `src/components/MultiStepBookingModal.tsx` — a similar badge span

Change both to `py-0.5`. Change nothing else on those lines.

### Fix 3 — Remove the blunt global max-width rule

In `src/index.css` there is this rule inside `@layer base`:

```
*, ::before, ::after {
  box-sizing: border-box;
  max-width: 100%;
}
```

The `max-width: 100%` on every single element is a heavy-handed fix that will cause layout bugs. Remove **only** the `max-width: 100%;` line. **Keep** `box-sizing: border-box;`.

The rule below it that targets `img, video, canvas, svg` already handles the real overflow risk — leave that one exactly as it is.

**After this change you must check for horizontal overflow.** Run the dev server, open the site at 375px width, and check every page for a horizontal scrollbar. If any page overflows, find the specific element causing it and fix that element directly with a targeted class — do not put the global rule back.

### Fix 4 — Remove the dead coupon-discount plumbing

Trace this chain and confirm it before changing anything:
- `src/context/NavigationContext.tsx` has `hasCouponApplied` state and an `applyCoupon` function
- `src/App.tsx` passes `hasCouponApplied` into `<MultiStepBookingModal />`
- `src/components/MultiStepBookingModal.tsx` declares `hasCouponApplied` in its props interface but destructures only `isOpen`, `onClose` and `preselectedServiceId` — the prop is received and thrown away

No discount is ever applied anywhere. Since no coupon discount actually exists as a business offer, remove the dead plumbing:
- Delete `hasCouponApplied` from the `MultiStepBookingModalProps` interface
- Delete the `hasCouponApplied` prop being passed in `App.tsx`

**Keep** `applyCoupon`, `openCoupon`, `closeCoupon` and the `CouponModal` itself — that modal is a real, working R650 offer popup and it is reachable from the home page and the before/after page. Only the unused *discount flag* goes.

### Fix 5 — Remove unused imports and unused context destructuring

Run the type checker with unused-variable checking to find them:

```bash
npx tsc --noEmit --noUnusedLocals
```

This will list unused variables across the project. Work through the list and remove:
- unused `lucide-react` icon imports
- `openCoupon` and `openBooking` destructured from `useNavigation()` in components that never call them

Known offenders to check: `Navbar.tsx` and `Footer.tsx` both destructure `openCoupon` and `openBooking` without using either. `FaqPage.tsx`, `HeadlightsPage.tsx`, `ProcessPage.tsx`, `ReviewsPage.tsx`, `ServicesPage.tsx` and `WorkGalleryPage.tsx` destructure `openCoupon` without using it.

**Only remove something the compiler confirms is unused.** Do not remove anything on a hunch.

### Constraints

- Do NOT remove the `CouponModal` component or the ability to open it.
- Do NOT change any colour or layout value.
- Do NOT add `noUnusedLocals` permanently to `tsconfig.json` — it is only a tool for this task.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then start the dev server and check for horizontal overflow at 375px on every page. Report each of the five fixes as done or skipped, and confirm no page scrolls sideways.

=== PROMPT END ===

---

# PHASE 12 — SEO metadata, robots and sitemap

**Priority: P1.**

### The problem

Already fixed: the favicon, and three broken social-image paths that pointed at `/src/assets/...` and 404'd in production.

Still missing: `og:url`, a canonical link, `robots.txt`, and `sitemap.xml`.

> **You need your live domain name for this phase.** If the site is not deployed yet, skip Phase 12 and come back after you have the real URL. Everywhere below that says `https://YOUR-DOMAIN.co.za`, substitute your actual domain.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: complete the SEO metadata

**The live domain for this site is:** `https://YOUR-DOMAIN.co.za`

(Replace that with the real domain everywhere it appears below. If it still says `YOUR-DOMAIN`, stop and ask for the real one.)

### Step 1 — Add the missing tags to `index.html`

Read `index.html` first. In the `<head>`, add:

- `<link rel="canonical" href="https://YOUR-DOMAIN.co.za/" />`
- `<meta property="og:url" content="https://YOUR-DOMAIN.co.za/" />`

### Step 2 — Make the social image URLs absolute

Social media crawlers (Facebook, WhatsApp, X) require **absolute** URLs for preview images. The file currently has relative ones.

Change these three values from `/og-image.jpg` to `https://YOUR-DOMAIN.co.za/og-image.jpg`:
- the `og:image` meta tag
- the `twitter:image` meta tag
- the `"image"` field inside the JSON-LD structured data script

### Step 3 — Complete the structured data

Inside the existing JSON-LD `<script type="application/ld+json">` block, add two fields to the top-level object, alongside the existing `"name"` and `"telephone"`:

- `"url": "https://YOUR-DOMAIN.co.za/"`
- `"@id": "https://YOUR-DOMAIN.co.za/#business"`

Do not change any other field in that block. The prices, service areas and opening hours in it are all correct — leave them alone.

### Step 4 — Create `public/robots.txt`

Create the file with content that allows all crawlers everything, and points to the sitemap at `https://YOUR-DOMAIN.co.za/sitemap.xml`.

### Step 5 — Create `public/sitemap.xml`

A valid XML sitemap listing the site's pages.

Real URL paths are already in place (Phase 13 is done), so list every page. Create one `<url>` entry for each of these paths on `https://YOUR-DOMAIN.co.za`:

`/`, `/headlights`, `/detailing`, `/process`, `/before-after`, `/services`, `/packages`, `/work`, `/reviews`, `/faq`, `/book`

Give `/` `<priority>1.0</priority>` and the rest `0.8`. Use `<changefreq>weekly</changefreq>` for all.

### Constraints

- Do NOT invent a domain name. If you were not given a real one, stop and say so.
- Do NOT list any `#/` hash URLs in the sitemap.
- Do NOT change the prices, service areas or opening hours in the structured data.

### Verify

```bash
npm run build
```

Confirm `dist/robots.txt` and `dist/sitemap.xml` both exist:

```bash
ls dist/robots.txt dist/sitemap.xml
```

Report every tag you added.

=== PROMPT END ===

---

# PHASE 13 — Real URL routing

**Priority: P1 for SEO. HIGH RISK — this touches navigation across the whole site.**

### Why this matters most for your business

Right now every page lives behind a hash: `yoursite.co.za/#/headlights`. **Google treats that as one single URL.** All eleven pages collapse into one indexable page. The per-page `<title>` tags carefully set up in `NavigationContext.tsx` are invisible to search crawlers.

You are a local business competing for searches like *"headlight restoration Vredenburg"* and *"mobile detailing Saldanha"*. Until each page has a real URL, you cannot rank a dedicated page for each of those searches. This phase is the single biggest unlock for organic traffic.

> Commit before starting. This phase changes navigation everywhere.

### Before you start — hosting requirement

Real client-side routing needs your host to serve `index.html` for **every** path (a "SPA rewrite" or "history API fallback"). Otherwise visiting `yoursite.co.za/headlights` directly returns a 404.

- **Netlify:** needs a `public/_redirects` file containing `/* /index.html 200`
- **Vercel:** needs a `vercel.json` with a rewrite of `/(.*)` to `/index.html`
- **Apache / cPanel shared hosting:** needs a `.htaccess` with a rewrite rule
- **GitHub Pages:** does not support this properly — stay on hash routing if you host there

The prompt below handles Netlify and Vercel. Tell the AI which host you use.

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: replace hash routing with real URL paths

**My host is:** `[WRITE NETLIFY, VERCEL, OR APACHE HERE]`

### Step 1 — Understand the current system

Read `src/context/NavigationContext.tsx` completely. Note:
- `getPageFromHash()` parses `window.location.hash`
- the `PAGE_TITLES` record mapping each page to its `<title>`
- `navigateTo()` sets `window.location.hash`
- a `hashchange` listener keeps state in sync
- the valid page list

Then find every component that calls `navigateTo`:

```bash
grep -rn "navigateTo" src/
```

List them all before changing anything.

### Step 2 — Convert the context to the History API

Rewrite `src/context/NavigationContext.tsx` to use real paths instead of hashes. Keep **the exact same public interface** — every component that uses `useNavigation()` must keep working without being changed.

Specifically:
- Replace `getPageFromHash()` with a function that reads `window.location.pathname` and maps it to an `AppPage`. `/` maps to `home`; `/headlights` maps to `headlights`; and so on for every page in the `AppPage` type. Anything unrecognised maps to `home`.
- Replace the `window.location.hash = ...` assignment in `navigateTo` with `window.history.pushState({}, '', path)`, where the path is `/` for home and `/<page>` for everything else.
- Replace the `hashchange` listener with a `popstate` listener so the browser's back and forward buttons work.
- Keep the `document.title` updating exactly as it does now.
- Keep the scroll-to-top behaviour exactly as it does now.

Do not change the names `currentPage`, `navigateTo`, `openBooking`, `closeBooking`, `openCoupon`, `closeCoupon`, `applyCoupon` or any other exported value. Components depend on them.

### Step 3 — Add the canonical link updater

In the same `useEffect` that sets `document.title`, also update the canonical link so each page declares its own canonical URL. Find the `<link rel="canonical">` element by querying for it, and set its `href` to the current full URL. If the element does not exist, do nothing — do not create it.

### Step 4 — Add the host rewrite configuration

Based on the host named at the top of this task:

- **Netlify:** create `public/_redirects` containing exactly `/*    /index.html   200`
- **Vercel:** create `vercel.json` at the project root with a `rewrites` array sending `/(.*)` to `/index.html`
- **Apache:** create `public/.htaccess` with a `RewriteEngine On` block that serves `index.html` for any path that is not an existing file or directory

Create **only** the one for the stated host.

### Step 5 — Update the sitemap

If `public/sitemap.xml` exists from Phase 12, replace its single entry with one `<url>` entry per page, now that real paths exist:

`/`, `/headlights`, `/detailing`, `/process`, `/before-after`, `/services`, `/packages`, `/work`, `/reviews`, `/faq`, `/book`

Give `/` priority `1.0` and the rest `0.8`. Remove the XML comment about routing not being ready.

### Constraints

- Do NOT install a router library. Do NOT add `react-router-dom`. The existing custom navigation is small and works — just change its mechanism.
- Do NOT change any component outside `src/context/NavigationContext.tsx` (plus the new config and sitemap files). If you think a component needs changing, stop and explain why.
- Do NOT change the `AppPage` type or the page names.
- Do NOT change `PAGE_TITLES` text.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Then start the dev server and test **every** one of these and report on each:
1. Click each of the 10 nav links — the URL bar must show a real path with no `#`.
2. The browser Back button returns to the previous page.
3. The browser Forward button works.
4. Reloading the page on `/headlights` still shows the headlights page.
5. The page title in the browser tab changes per page.
6. The booking modal still opens from buttons on every page.

If reload on a sub-path fails in the dev server, say so — that is a host configuration issue, not a code bug, but confirm the rewrite file was created.

=== PROMPT END ===

### Done when
- URLs look like `yoursite.co.za/headlights`, with no `#`.
- Back and Forward work.
- After deploying, reloading a sub-page does not 404.

---

# PHASE 14 — Content and trust

**Priority: P0 for your business. This one is mostly YOUR work, not an AI's.**

No model can fix these for you. They need real photographs and real customers.

### 14a — Replace the fake before/after gallery

**This is the highest-risk content on your site.**

The before/after section is headed *"Interactive Evidence"* and *"SEE THE DIFFERENCE"*, but every image is stock photography — and the pairs do not even match their claims:

| Case shown | What the images actually are |
|---|---|
| Trim restoration | swirled car paint → polished car paint |
| Chrome polishing | swirled car paint → a generic hero car shot |
| Headlights | generic oxidised lens → generic clear lens |

In a town the size of Vredenburg, one customer recognising a stock photo costs you more than this gallery will ever earn. Word travels.

**What to do:** On your next five jobs, take a photo before you start and a photo after you finish. Same angle, same spot, same light. A phone camera is completely fine — slightly imperfect real photos build far more trust than polished stock images.

When you have them, use this prompt:

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: replace the stock before/after images with real job photos

I have added real before/after photos to `src/assets/images/`. Here are the files and what each one is:

[LIST YOUR FILES HERE, for example:
- real-hilux-headlight-before.jpg — 2016 Toyota Hilux, oxidised headlight, Vredenburg
- real-hilux-headlight-after.jpg — same headlight after restoration
...and so on for each pair]

### Steps

1. Run the image optimisation script from Phase 3 so the new photos are compressed to WebP:

```bash
npm run optimize-images
```

2. Add an import for each new `.webp` file to `src/data/images.ts` and add it to the `IMAGES` object with a clear descriptive key.

3. Open `src/data/studioData.ts` and find `BEFORE_AFTER_CASES`. Replace the `beforeImage` and `afterImage` values in each case with the matching real photos.

4. Update each case's `title`, `beforeLabel`, `afterLabel`, `description` and `technicalDetails` so they describe the **actual vehicle and actual job** shown in the photos, not the generic text that is there now. Use the real vehicle make, model and town.

5. Do the same for `GALLERY_PROJECTS` in the same file, for any entry you now have real photos for.

6. If I have given you fewer real pairs than there are existing cases, **delete** the leftover cases that still use stock imagery. Three real cases beat six fake ones. Do not leave any stock before/after in place.

### Constraints

- Do NOT invent vehicle details, towns, prices or times. If you do not know something, leave the existing value or ask me.
- Do NOT keep any stock image in the before/after or gallery sections.
- Do NOT change the component code — only the data file and the images file.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Confirm every remaining before/after case uses a real photo.

=== PROMPT END ===

### 14b — Get real reviews

Your nav says **"Reviews"** and delivers a self-written Quality Charter. There is not one customer review anywhere on the site. That charter is well written and honest, but it is you vouching for yourself.

**Do this:**
1. Create a free **Google Business Profile** for AeroGlow Detailing. For a local service business this matters more than the website itself — it is what shows up in Maps and in "near me" searches.
2. After each job, send the customer your Google review link on WhatsApp while you are still standing at their car. That is when they are most willing.
3. Once you have five or more reviews, either embed them or ask an AI to add a reviews section using the existing `ReviewItem` interface already defined in `src/types/index.ts`.

**In the meantime**, rename the nav item so it stops promising something it does not deliver:

=== PROMPT START ===

[Paste the CONTEXT BLOCK from Section A here first]

## Task: rename the "Reviews" nav item to match what the page actually contains

The nav links to a page labelled "Reviews", but that page contains a self-written quality charter and no customer reviews. The label over-promises.

Change the user-facing label from `Reviews` to `Our Guarantee` in these places:

1. `src/components/Navbar.tsx` — in the `navLinks` array, the entry with `page: 'reviews'`
2. `src/components/Footer.tsx` — the footer link to that page (currently reads `5-Point Quality Charter`; leave that one as is if it already reads accurately — check it first and report)
3. `src/context/NavigationContext.tsx` — the `PAGE_TITLES` entry for `reviews`, if its wording promises reviews

### Constraints

- Change the **label text only**. Do NOT change the `AppPage` value `'reviews'`, the route, the file name or any id. Those are internal and changing them would break navigation.
- Do NOT change the content of the page itself.

### Verify

```bash
npx tsc --noEmit
```

```bash
npm run build
```

Confirm the nav shows "Our Guarantee" and clicking it still opens the same page.

=== PROMPT END ===

### 14c — Fix the hidden travel-fee tier

The code charges a "Surrounding West Coast" call-out of R200, waived over R1000. That tier appears in **no** customer-facing copy — your footer and charter only mention the R150 / R700 rule. A customer in that zone gets a surprise at checkout.

Decide which is correct, then either add the R200/R1000 tier to the footer and quality-charter copy, or remove it from the code. Do not leave them disagreeing.

---

# Quick reference — commands

Run these yourself after every phase:

```bash
npx tsc --noEmit
```

```bash
npm run build
```

```bash
npm run dev
```

Commit after each phase:

```bash
git add -A && git commit -m "phase N: <name>"
```

Roll back the last phase if it went wrong:

```bash
git reset --hard HEAD~1
```

---

# If a phase goes wrong

1. **Do not let the AI keep patching on top of a broken state.** Roll back with `git reset --hard HEAD~1` and start that phase again.
2. **If the AI edited more files than the phase listed**, that is a red flag — check `git diff` before committing.
3. **If `npm run build` fails**, give the AI the exact error text and nothing else. Do not re-paste the whole phase.
4. **If the AI says it is done but did not run the Verify commands**, make it run them. "It should work" is not verification.
