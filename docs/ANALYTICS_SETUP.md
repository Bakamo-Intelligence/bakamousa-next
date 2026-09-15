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
| `book_demo_click` | Any "Book a demo" button or link. Most open the booking popup; `destination=roam_lobby` fallback links open ro.am in a new tab. Visits to a `#book-a-demo` URL send it with `location=url_hash`. |
| `booking_time_selected` | A time slot is picked in the Roam booking calendar |
| `generate_lead` | A demo booking is confirmed in the Roam booking calendar |
| `contact_click` | Email and phone links |
| `outbound_click` | Links to other sites |
| `thinker_card_open` | Opening a thinker on /our-method |
| `scroll_depth` | 25, 50, 75 and 90% of the page |
| `section_view` | A tagged section becomes visible |

Event parameters, where present: `label`, `location`, `destination`, `page_type`,
`contact_method`, `lead_source`, `depth_percentage`, `section`, `booking_tool`.
`booking_tool` is not registered as a custom dimension. Email and phone links send
`destination=mailto` or `tel`, never the address or number. Use GA4's built-in
"Page path" dimension for the page an event happened on.

`generate_lead` fires when Roam confirms a booking (the embed's `onEventScheduled`
callback in `src/components/BookingModal.tsx`), with `contact_method=booking`,
`booking_tool=roam`, `location=booking_modal` and `lead_source` set to the page type.
Roam's callbacks also carry the booker's name, email and note: never forward those to
GA4. Until 15 September 2026 `generate_lead` counted clicks on the /contact email link, and
`lead_source` was `contact_page`; it now carries page_type values (`contact`, `about`, ...).

GA4 only sees visitors who accepted analytics cookies, so count bookings from the
Roam-created events in Google Calendar (or Roam's booking list) as the source of truth.

## Booking popup

"Book a demo" links point to `/contact#book-a-demo`. `BookingModal` (mounted in the root
layout) intercepts them and opens a popup; Roam's calendar script loads only on first
open. The lobby URL and call length live in `src/lib/booking.ts`.

Tested 15 September 2026 in headless Chrome with cookies declined: the popup makes no
requests to Roam until opened, and once opened loads only ro.am, roamstatic.com and
LaunchDarkly (Roam's feature-flag service), with no Google requests and no cookies.

The Roam lobby (ro.am/dani) has its "Google Tracking ID" set to `G-L84VKCB2WZ`. That
only affects the standalone lobby page (e.g. the link in email signatures): it loads
gtag there (with Google consent defaults denied) and sends page views and Roam's lobby
events to this GA4 property under hostname `ro.am`. Roam's page also loads Roam's own
Google Ads tag and marketing cookies. In reports, filter `hostName` to
`www.bakamosocial.com` for website numbers, and treat Roam's lobby events as signature
and direct-link bookings, separate from the site's `generate_lead`.

## GA4 property configuration (done 15 September 2026)

Property "Bakamo.Social - GA4", web stream `https://www.bakamosocial.com`:

- Key events: `generate_lead` only (the old `contact_us` / `join_us` key events were removed).
- Custom dimensions (event scope): `page_type`, `label`, `location`, `destination`,
  `section`, `contact_method`, `lead_source`. Custom metric: `depth_percentage`.
- Enhanced measurement: page views including "page changes based on browser history
  events" (needed because the site navigates client-side), outbound clicks, file downloads.
- The eight "create event" rules left over from the GTM setup were deleted.
- Unwanted referrals: `bakamosocial.com`.
- User-provided data capabilities: off (booking details are entered in Roam's embed and are never sent to GA4).
- AI assistant traffic: GA4's default channel group includes a built-in "AI Assistant"
  channel, so no custom channel group is needed.

The GTM container can be deleted, or left unpublished, once GA4 shows the new events.
