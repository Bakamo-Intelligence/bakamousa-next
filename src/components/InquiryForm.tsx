"use client";

import { useState } from "react";

const BEGIN_OPTIONS = ["Book a meeting", "See a demo of the Reading Machine", "I work at a research agency"];

const FIELD =
  "mt-2 w-full rounded-xl border border-white/15 bg-near-black px-4 py-3 text-base text-white placeholder:text-text-muted focus:border-accent focus:outline-none";
const LABEL = "block text-[11px] uppercase tracking-[0.18em] text-accent";

/**
 * The inquiry form from the copy deck. The site has no form backend, so Send
 * opens the visitor's own email with the answers filled in, addressed to us.
 * Nothing is stored or sent from the page itself.
 */
export default function InquiryForm({ email }: { email: string }) {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const body = [
      `Name: ${value("name")}`,
      `Work email: ${value("email")}`,
      `Organisation: ${value("organisation")}`,
      `Category or market: ${value("category")}`,
      "",
      "The study I am planning:",
      value("study"),
      "",
      `How I would like to begin: ${value("begin")}`,
    ].join("\n");
    const subject = `Inquiry from ${value("organisation") || value("name")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 md:grid-cols-2" data-analytics-section="contact_inquiry">
      <label className={LABEL}>
        Name
        <input name="name" type="text" required autoComplete="name" className={FIELD} />
      </label>
      <label className={LABEL}>
        Work email
        <input name="email" type="email" required autoComplete="email" className={FIELD} />
      </label>
      <label className={LABEL}>
        Organisation
        <input name="organisation" type="text" autoComplete="organization" className={FIELD} />
      </label>
      <label className={LABEL}>
        Your category or market
        <input name="category" type="text" className={FIELD} />
      </label>
      <label className={`${LABEL} md:col-span-2`}>
        The study you are planning
        <textarea
          name="study"
          rows={5}
          placeholder="What are you about to research, and what do you already expect to find?"
          className={FIELD}
        />
      </label>
      <fieldset className="md:col-span-2">
        <legend className={LABEL}>How would you like to begin?</legend>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {BEGIN_OPTIONS.map((option, index) => (
            <label key={option} className="flex items-center gap-3 text-base font-light text-white">
              <input
                type="radio"
                name="begin"
                value={option}
                defaultChecked={index === 0}
                className="h-4 w-4 accent-[#c9a96e]"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="cta-button text-sm"
          data-analytics-event="cta_click"
          data-analytics-label="Send inquiry"
          data-analytics-location="contact_inquiry"
        >
          Send
        </button>
        <p className="mt-4 text-sm leading-relaxed text-text-muted" role="status">
          {opened
            ? `Your email has opened with these details filled in. Send it from there, or write to ${email}.`
            : "Send opens your email with these details filled in."}
        </p>
      </div>
    </form>
  );
}
