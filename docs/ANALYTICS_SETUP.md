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

## GA4 property configuration (done 15 September 2026)

Property "Bakamo.Social - GA4", web stream `https://www.bakamosocial.com`:

- Key events: `generate_lead` only (the old `contact_us` / `join_us` key events were removed).
- Custom dimensions (event scope): `page_type`, `label`, `location`, `destination`,
  `section`, `contact_method`, `lead_source`. Custom metric: `depth_percentage`.
- Enhanced measurement: page views including "page changes based on browser history
  events" (needed because the site navigates client-side), outbound clicks, file downloads.
- The eight "create event" rules left over from the GTM setup were deleted.
- Unwanted referrals: `bakamosocial.com`.
- User-provided data capabilities: off (the site collects no user data).
- AI assistant traffic: GA4's default channel group includes a built-in "AI Assistant"
  channel, so no custom channel group is needed.

The GTM container can be deleted, or left unpublished, once GA4 shows the new events.
