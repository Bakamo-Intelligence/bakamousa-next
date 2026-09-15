import React from "react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-neutral-900 to-black text-white font-sans">
      {/* HERO SECTION */}
      <section
        className="relative flex flex-col items-center justify-center py-28 px-4 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80')" }}
      >
        {/* subtle starfield / vignette overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black" />
        <div className="relative z-10 flex flex-col items-center max-w-3xl text-center px-4">
          {/* Neon heading */}
          <div className="mb-6 flex items-center gap-4">
            <img src="/bakamo-logo.png" alt="Bakamo Logo" className="h-10 opacity-90" />
            <span className="text-2xl font-semibold tracking-wide text-white/90">X</span>
            <img src="/sandra-baumann-logo.png" alt="Sandra Baumann Logo" className="h-10 opacity-90" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-400" style={{ textShadow: '0 2px 20px rgba(99,102,241,0.35)' }}>
            Measure Reality. Not Assumptions.
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-cyan-200/80">The Truth, Quantified.</h2>
          <p className="max-w-2xl text-sm md:text-lg mb-6 text-white/80">
            We&apos;ve solved the biggest problem in traditional market research: the bias of the question itself.
            Bakamo Social&apos;s unfiltered intelligence and Sandra Baumann&apos;s nationwide quantification combine to give you board-ready, reality-rooted insight.
          </p>
          <div className="flex gap-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold text-black bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg transform hover:scale-105 transition" style={{ boxShadow: '0 8px 40px rgba(99,102,241,0.25)' }}>
              De-Risk Your Next Study
            </a>
            <a href="#how-it-works" className="inline-flex items-center justify-center rounded-lg px-5 py-3 font-semibold ring-1 ring-white/10 text-white/90 hover:underline transition">
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-16 px-4 bg-white" id="problem">
        <div className="max-w-3xl mx-auto text-center">
          {/* Visual: Boardroom bubble icon placeholder */}
          <div className="mx-auto mb-4">
            <span role="img" aria-label="Boardroom in bubble" className="text-5xl">💼🫧</span>
          </div>
          <h3 className="text-2xl font-bold mb-2">The Echo Chamber</h3>
          <p className="text-lg mb-4 font-semibold">Your biggest risk isn&apos;t bad data. It&apos;s irrelevant questions.</p>
          <p className="mb-2">Traditional quantitative research has a fatal flaw. It begins in a boardroom, defining what you want to learn. You write surveys based on internal assumptions, creating an echo chamber where consumers can only answer what you decide to ask.</p>
          <p className="mb-2">You get statistically significant answers to culturally insignificant questions.</p>
          <p className="mb-2">We flipped the model. We don&apos;t ask. We listen first.</p>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className="py-16 px-4 bg-gray-50" id="how-it-works">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-center">Unfiltered Reality Meets Rigorous Validation</h3>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Bakamo Social Column */}
            <div className="flex-1 bg-white rounded-lg shadow p-6">
              <h4 className="text-xl font-bold mb-2">THE RADAR: Discovering Unfiltered Reality</h4>
              <p className="font-semibold mb-2">&quot;Insights Without Asking&quot;</p>
              <ul className="list-disc ml-6 mb-2">
                <li>Bakamo analyzes millions of organic, unprompted conversations across the digital ecosystem.</li>
                <li>We identify the language consumers actually use, the needs they express when no brand is watching, and the &quot;unknown unknowns&quot; that traditional surveys miss.</li>
              </ul>
              <ul className="list-disc ml-6">
                <li>Discover emerging narratives.</li>
                <li>Identify authentic consumer language.</li>
                <li>Define the right inputs for Quant.</li>
              </ul>
            </div>
            {/* Sandra Baumann Column */}
            <div className="flex-1 bg-white rounded-lg shadow p-6">
              <h4 className="text-xl font-bold mb-2">THE ENGINE: Nationwide Quantification</h4>
              <p className="font-semibold mb-2">&quot;Statistical Rigor &amp; Scale&quot;</p>
              <ul className="list-disc ml-6 mb-2">
                <li>Sandra Baumann, one of America&apos;s most trusted names in quantitative research, takes Bakamo&apos;s organic insights and subjects them to rigorous statistical validation.</li>
                <li>We design survey instruments based on reality, not guesswork, scaled to representative US samples.</li>
              </ul>
              <ul className="list-disc ml-6">
                <li>Validate the size of the opportunity.</li>
                <li>Board-ready statistical confidence.</li>
                <li>Measure prevalence across demographics.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION SECTION */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Why This Matters for the US Market</h3>
          <ul className="list-decimal ml-8 mb-4">
            <li className="mb-2"><b>De-Risk Your Research Budget:</b> Stop spending six figures validating internal assumptions. We ensure you are measuring concepts that actually exist in the minds of consumers before you deploy a nationwide survey.</li>
            <li className="mb-2"><b>Speed to Culture:</b> Traditional survey design takes weeks of internal alignment. Bakamo accelerates the front-end by harvesting real-time cultural topics, allowing Baumann to get into the field faster with relevant questions.</li>
            <li className="mb-2"><b>The End of the &quot;Say-Do&quot; Gap:</b> By grounding our quant in unprompted social behavior, we bridge the gap between what people say in surveys and what they actually care about in real life.</li>
          </ul>
        </div>
      </section>

      {/* AUTHORITY / TRUST SECTION */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          {/* Visual: Professional photos placeholder */}
          <div className="flex justify-center gap-8 mb-6">
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-4xl">SB</div>
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-4xl">B</div>
          </div>
          <h3 className="text-2xl font-bold mb-4">Proven Innovation meets US Credibility.</h3>
          <blockquote className="italic mb-4">“I&apos;ve spent my career ensuring data is statistically sound. But my biggest concern has always been the inputs—are we asking the right questions? Partnering with Bakamo solves the input problem. They provide the raw, unfiltered truth of what&apos;s happening in culture, allowing me to design quantitative studies that are wildly more accurate to reality.”<br /><span className="font-bold">— Sandra Baumann</span></blockquote>
          <blockquote className="italic mb-4">“[Short quote from Bakamo leadership about entering the US market and the power of this combination.]”<br /><span className="font-bold">— [Bakamo Founder Name/Title]</span></blockquote>
        </div>
      </section>

      {/* FOOTER / FINAL CTA */}
      <footer className="py-12 px-4 bg-blue-900 text-white text-center" id="contact">
        <h3 className="text-2xl font-bold mb-4">Are you ready to measure what actually matters?</h3>
        <p className="mb-6">Let’s discuss how Grounded Quantification can calibrate your upcoming segmentation, tracker, or innovation pipeline.</p>
        <a href="mailto:info@bakamosocial.com" className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold shadow hover:bg-gray-100 transition mb-4 inline-block">Start an Introduction with Sandra & Bakamo</a>
        <div className="mt-8 text-sm">© 2024 Bakamo Social. All Rights Reserved. <a href="/privacy-policy" className="underline">Privacy Policy</a>.</div>
      </footer>
    </main>
  );
}
