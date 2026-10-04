import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get these from tina.io when you set up Tina Cloud
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ── Homepage (single document) ──
      {
        name: "homepage",
        label: "Homepage",
        path: "content",
        format: "json",
        match: { include: "homepage" },
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          // ── Hero Section ──
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "title", label: "Title" },
              { type: "string", name: "highlightWord", label: "Highlight Word" },
              { type: "string", name: "titleSuffix", label: "Title Suffix" },
              { type: "string", name: "inputPlaceholder", label: "Input Placeholder" },
              { type: "string", name: "thankYouMessage", label: "Thank You Message" },
              { type: "string", name: "scrollLabel", label: "Scroll Label" },
              {
                type: "string",
                name: "statements",
                label: "Rotating Statements",
                list: true,
              },
            ],
          },

          // ── Metaphor Section ──
          {
            type: "object",
            name: "metaphor",
            label: "The Shift Section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "paragraph1", label: "Opening Paragraph", ui: { component: "textarea" } },
              { type: "string", name: "highlightWord", label: "Highlight Word" },
              {
                type: "object",
                name: "timeline",
                label: "Timeline Items",
                list: true,
                fields: [
                  { type: "string", name: "year", label: "Year/Label" },
                  { type: "string", name: "text", label: "Text" },
                ],
              },
              { type: "string", name: "paragraph2", label: "Paragraph 2", ui: { component: "textarea" } },
              { type: "string", name: "paragraph3", label: "Paragraph 3", ui: { component: "textarea" } },
              { type: "string", name: "sideLabel", label: "Side Card Label" },
              { type: "string", name: "sideQuote", label: "Side Card Quote", ui: { component: "textarea" } },
            ],
          },

          // ── Business Reality Section ──
          {
            type: "object",
            name: "businessReality",
            label: "Business Reality Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading", ui: { component: "textarea" } },
              { type: "string", name: "bodyParagraph1", label: "Body Paragraph 1", ui: { component: "textarea" } },
              { type: "string", name: "bodyParagraph2", label: "Body Paragraph 2", ui: { component: "textarea" } },
              { type: "string", name: "overlapParagraph1", label: "Overlap Card Paragraph 1", ui: { component: "textarea" } },
              { type: "string", name: "overlapParagraph2", label: "Overlap Card Paragraph 2", ui: { component: "textarea" } },
              { type: "string", name: "overlapConclusion", label: "Overlap Card Conclusion", ui: { component: "textarea" } },
            ],
          },

          // ── Process Section ──
          {
            type: "object",
            name: "process",
            label: "Process / Method Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              {
                type: "object",
                name: "steps",
                label: "Steps",
                list: true,
                fields: [
                  { type: "string", name: "number", label: "Step Number" },
                  { type: "string", name: "title", label: "Step Title" },
                  { type: "string", name: "description", label: "Step Description", ui: { component: "textarea" } },
                ],
              },
              { type: "string", name: "comparisonLabel", label: "Comparison Section Label" },
              { type: "string", name: "comparisonOld", label: "Old Approach" },
              { type: "string", name: "comparisonNew", label: "New Approach" },
            ],
          },

          // ── Deliverable Section ──
          {
            type: "object",
            name: "deliverable",
            label: "Deliverable Section",
            fields: [
              { type: "string", name: "label", label: "Section Label" },
              { type: "string", name: "heading", label: "Heading" },
              {
                type: "object",
                name: "layers",
                label: "Layers",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Layer Name" },
                  { type: "string", name: "description", label: "Layer Description" },
                ],
              },
              { type: "string", name: "bodyText", label: "Body Text", ui: { component: "textarea" } },
              {
                type: "string",
                name: "cracksList",
                label: "Cracks List Items",
                list: true,
              },
              { type: "string", name: "conclusion", label: "Conclusion" },
              { type: "string", name: "conclusionHighlight", label: "Conclusion Highlight" },
            ],
          },

          // ── Insurance / CTA Section ──
          {
            type: "object",
            name: "insurance",
            label: "Insurance / CTA Section",
            fields: [
              { type: "string", name: "heading", label: "Section Heading", ui: { component: "textarea" } },
              {
                type: "object",
                name: "promises",
                label: "Promises",
                list: true,
                fields: [
                  { type: "string", name: "number", label: "Number" },
                  { type: "string", name: "text", label: "Promise Text" },
                ],
              },
              { type: "string", name: "ctaHeading", label: "CTA Heading" },
              { type: "string", name: "ctaSubtext", label: "CTA Subtext", ui: { component: "textarea" } },
              { type: "string", name: "ctaButtonText", label: "CTA Button Text" },
              { type: "string", name: "ctaEmail", label: "CTA Email Address" },
            ],
          },

          // ── Footer ──
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "logoText", label: "Logo Text" },
              { type: "string", name: "tagline", label: "Tagline" },
              { type: "string", name: "copyrightText", label: "Copyright Text" },
            ],
          },

          // ── Navigation ──
          {
            type: "object",
            name: "navigation",
            label: "Navigation",
            fields: [
              { type: "string", name: "logoText", label: "Logo Text" },
              {
                type: "object",
                name: "navLinks",
                label: "Navigation Links",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "URL" },
                ],
              },
              { type: "string", name: "ctaText", label: "CTA Button Text" },
              { type: "string", name: "ctaHref", label: "CTA Link" },
            ],
          },
        ],
      },

      // ── Blog Posts ──
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "subtitle", label: "Subtitle (shown under the headline)" },
          { type: "string", name: "seoTitle", label: "Search title (shown in Google; defaults to Title)" },
          { type: "datetime", name: "date", label: "Date" },
          { type: "string", name: "summary", label: "Summary", ui: { component: "textarea" } },
          { type: "boolean", name: "draft", label: "Draft" },
          { type: "image", name: "featuredImage", label: "Featured Image" },
          { type: "rich-text", name: "body", label: "Body", isBody: true },
        ],
      },
    ],
  },
});
