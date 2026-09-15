# Analytics Setup

The site sends data straight to Google Analytics 4 (measurement ID `G-L84VKCB2WZ`).
Google Tag Manager is no longer used: the old container (`GTM-5ZQTVMCV`) only held
a page-view tag and never forwarded the site's own events, so GA4 had no key events.

## How it loads

- `src/lib/analytics.ts` loads `gtag.js` only after the visitor accepts cookies in the
  banner (`src/components/CookieBanner.tsx`). Nothing is sent before a choice is made.
- Events that happen before the choice are held in memory (up to 50). They are sent if
  the visitor accepts and discarded if they decline.
- "Cookie settings" in the footer reopens the banner. Declining afterwards stops
  collection immediately and deletes the `_ga` cookies.
- Production builds use `G-L84VKCB2WZ` by default. Override with `NEXT_PUBLIC_GA_ID`, or
  set it to an empty value to switch analytics off. Development builds never load GA4.
- Page views, including client-side navigation, come from GA4 enhanced measurement
  ("Page changes based on browser history events" must stay on in the data stream).

## Events the site sends

| Event | When |
| --- | --- |
| `nav_click` | Top navigation links |
| `cta_click` | Calls to action and report downloads |
| `contact_click` | Email and phone links |
| `generate_lead` | The main "Start the conversation" email links on /contact |
| `outbound_click` | Links to other sites |
| `thinker_card_open` | Opening a thinker on /our-method |
| `scroll_depth` | 25, 50, 75 and 90% of the page |
| `section_view` | A tagged section becomes visible |

Event parameters, where present: `label`, `location`, `destination`, `page_type`,
`contact_method`, `lead_source`, `depth_percentage`, `section`. Use GA4's built-in
"Page path" dimension for the page an event happened on.

`generate_lead` counts clicks on the email link, not sent emails, so treat it as a
strong signal of intent rather than a confirmed enquiry.

## One-time GA4 admin steps

1. Admin → Events: mark `generate_lead` as a key event.
2. Admin → Custom definitions: register the parameters above as event-scoped custom
   dimensions (`depth_percentage` can be a custom metric instead).
3. Admin → Data streams → the web stream: set the website URL to
   `https://www.bakamosocial.com` and keep enhanced measurement on.
4. Data streams → Configure tag settings → List unwanted referrals: make sure
   `bakamosocial.com` is spelled correctly.
5. Data streams → Configure tag settings → User-provided data collection: turn automatic
   detection off (the site never collects user data in forms).
6. Optional: Admin → Data display → Channel groups: add an "AI assistants" channel that
   matches sources such as `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`,
   `gemini.google.com` and `claude.ai`.

The GTM container can be deleted, or left unpublished, once GA4 shows the new events.
