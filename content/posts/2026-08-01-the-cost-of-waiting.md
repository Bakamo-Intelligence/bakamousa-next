---
title: "The Cost of Waiting"
slug: "the-cost-of-waiting"
date: "2026-08-01T09:00:00Z"
author: "Daniel Fazekas"
tags: ["reading-machine", "sustainability", "infrastructure"]
category: "Insights"
summary: "Our idle servers used five to ten times more energy doing nothing than the Reading Machine used reading everything. So we changed the architecture."
draft: false
---

Data centers drink water and eat electricity. The IEA expects their consumption to more than double by 2030, roughly equivalent to Japan's total demand today. An extraordinary engineering achievement, and a real ecological burden.

At Bakamo, we build the Reading Machine, a system that puts qualitative insight on mathematical legs. We don't read a sample of a conversation. We read all of it. Millions of posts, clustered, mapped, interpreted.

That takes serious compute. Serious compute means electricity and water. We don't pretend otherwise. Which makes the obvious efficiency move: read less. Take a sample. Model the rest.

We won't do that. The sample is exactly what we built the Reading Machine to get rid of. It's the reason so much research confidently describes a conversation it never actually read. Completeness isn't a feature we can trade away for a better number.

So we went looking for the waste that isn't reading.

## The machine that waited for lunch

A few weeks ago, one of our analysts was working through a cluster, deciding what a pattern actually meant, and got pulled into a client call, then headed to lunch. The Reading Machine sat there, caches warm, drawing power, waiting for someone who wasn't coming back for an hour.

That made me dig into our numbers:

- A full monthly cycle, 150,000 posts and 20 hours of analysis, uses 2 to 6 kWh.
- Leaving the servers idle 24/7 was burning 20 to 40 kWh a month.

Our idle machine used five to ten times more energy doing nothing than the analysis used doing everything. The idle state wasn't a rounding error. It was the main environmental cost of our product.

We're not unusual. Stanford researchers found that around 30% of servers are "comatose": powered on, drawing energy, doing nothing for six months or more. That study is a decade old now, and I doubt the picture has improved.

## What we changed

So we changed our architecture. When nobody is using the Reading Machine, it winds down to zero idle footprint. The trade-off: when the analyst comes back, they wait a moment for the system to spin up. We can live with that. Frugality is a core value at Bakamo, and we'd rather build it into the infrastructure than put it on an ESG slide.

The honest caveat: "sleeping" in cloud terms means returning capacity to the shared pool, not switching off a physical machine. But in aggregate, releasing reservations is what prevents server bloat, and that's the number that actually counts.

We spend endless time in tech discussing the cost of inference. We spend almost none discussing the cost of waiting.

Which leaves me wondering what else we're all paying for out of habit. For those running compute-heavy tools: are you sleeping your servers, or is the default still running hot? And for the researchers among you: what are you sampling because it's genuinely the right method, and what are you sampling because someone decided years ago that reading everything was too expensive?
