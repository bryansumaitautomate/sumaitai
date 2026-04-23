# SUMAIT AI Audit: $10k Value Upgrade

**Date:** 2026-04-23
**Owner:** Bryan Sumait
**Author:** Cortex (brainstorming session with Jase)
**Repos:** github.com/bryansumaitautomate/sumaitai (integration) + github.com/bryansumaitautomate/sumait-ai-audit (audit upgrades)
**Status:** Approved, ready for implementation planning

---

## 1. Goal

Upgrade the SUMAIT AI Audit lead magnet so finishing it feels like receiving a $10,000 consulting deliverable. The audit currently captures emails but never sends a real report. Build a hosted, shareable, beautifully branded "audit report" URL per submission and integrate the upgraded audit into the main sumaitai personal site.

Success looks like: a B2B founder finishes the audit, lands on a custom URL like `sumait-audit.vercel.app/report/V1StGXR8_Z5j`, sees a multi-section branded report with industry benchmarks, a calendar-dated 30-60-90 roadmap, a custom Cortex configuration mapping their pain points to specific SUMAIT agent teams, and an interactive what-if simulator. They share the URL with a teammate who opens it. The "viewed N times" counter ticks up. Bryan gets notified in Telegram. The lead is hot.

Conversion funnel: free audit → hosted report URL → book strategy call → $3-25k retainer.

---

## 2. Scope

### In scope

- All 10 sections of the new hosted report URL (Section 4 of this spec)
- New Supabase table `audit_reports` with full data persistence
- New Supabase table `industry_benchmarks` with 40 cells (10 industries × 4 size bands)
- Extended `analyze-audit` Supabase edge function (adds Cortex mapping, calendar phasing, dependency tagging)
- New Supabase edge function `generate-report` (creates report row + nanoid)
- New `/report/[id]` route in the sumait-ai-audit app
- New `/share-report` n8n webhook for "email to teammate" feature
- Updated email template (n8n-controlled, content specified here)
- Redeploy sumait-ai-audit to Vercel under `sumait-audit.vercel.app` (replaces lovable.app URL)
- 5 sumaitai integration touchpoints (footer URL, FloatingNav link, hero tertiary CTA, CTA section secondary path, new `/audit` landing page)
- Print-optimized CSS for browser PDF export

### Out of scope

- Migrating audit code into sumaitai monorepo (kept separate per architecture decision A+)
- Server-side PDF generation (deferred; print-to-PDF is sufficient for v1)
- Custom domain on either site (sumait.ai not yet registered; Vercel default URLs OK for v1)
- ICS calendar download (deferred to v2)
- URL-encoded scenario sharing for what-if simulator (deferred to v2)
- Side-by-side scenario comparison (deferred to v2)
- User accounts / save scenarios (out of scope)
- Public pricing display anywhere (Bryan's decision: pricing stays 1-on-1 only)
- Aggregating anonymized data from past audits into benchmarks (deferred; manual updates only for v1)

### Constraints

- All visible copy must follow `SUPER-AI-AGENTS/STANDARDS.md`: zero jargon, zero dashes, sentences under 20 words, no AI-detectable patterns.
- Mobile-first at 375px / 560px / 900px / 1200px+ breakpoints. WCAG AA contrast minimum.
- Must work on touch devices (no hover-only interactions in critical paths).
- Reduced-motion respected on all animations.
- No new runtime dependencies in sumaitai (it just gets URL updates and one new route).
- Audit repo gains: Supabase RPC calls, nanoid library (~1 KB), new route, new edge function. No other new deps.

---

## 3. Architecture

**Approach A+ confirmed:** keep audit as separate codebase, redeploy to Vercel under your domain pattern, link from sumaitai. The audit and sumaitai stay independent applications with cross-links.

```
┌─────────────────────────┐         ┌──────────────────────────┐
│   sumaitai.vercel.app   │ ──────▶ │  sumait-audit.vercel.app │
│   (Bryan's main site)   │ link    │  (the audit + reports)   │
└─────────────────────────┘         └──────────────────────────┘
                                              │
                                              ▼
                                    ┌──────────────────────┐
                                    │   Supabase project   │
                                    │   - audit_reports    │
                                    │   - industry_bench   │
                                    │   - edge: analyze    │
                                    │   - edge: generate   │
                                    └──────────────────────┘
                                              │
                                              ▼
                                    ┌──────────────────────┐
                                    │   n8n workflow       │
                                    │   madeeas.app        │
                                    │   - sends emails     │
                                    │   - re-engagement    │
                                    │   - share-report     │
                                    └──────────────────────┘
                                              │
                                              ▼
                                    ┌──────────────────────┐
                                    │   LeadConnector      │
                                    │   booking calendar   │
                                    └──────────────────────┘
```

The audit code stays in its own repo so Bryan's Lovable.dev workflow is unaffected. Existing Supabase project, n8n environment, and LeadConnector calendar all stay in place. The new pieces are additions, not replacements.

---

## 4. The hosted report URL

### 4.1 Structure (10 sections in render order)

| # | Section | Purpose |
|---|---|---|
| 1 | **Cover** | "Prepared for [Company Name]" + date + SUMAIT.AI brand + share button |
| 2 | **Executive Summary** | Three headline numbers + 2-sentence "what this means" using their company name |
| 3 | **Where You Are Today** | Snapshot of inputs: industry, size, MRR, biggest cost driver, departments, total weekly hours |
| 4 | **Industry Benchmark** | "Where you stand vs other [industry] your size" comparison with peers |
| 5 | **Your 30-60-90 Day Roadmap** | Calendar-dated phases with quick wins, dependencies, risk callouts |
| 6 | **Your Cortex Configuration** | Maps their pain points to specific SUMAIT agent teams. Bryan's IP play. |
| 7 | **What-If Simulator** | 6 toggles + hourly rate slider. Live recalculation. |
| 8 | **The Math** | Computation breakdown (existing) expanded with assumption labels |
| 9 | **What Happens Next** | Three CTAs: book call, share with team, download PDF |
| 10 | **Footer** | Brand block, "Reviewed by Bryan Sumait" line, contact, replay-the-audit link |

### 4.2 URL pattern

`https://sumait-audit.vercel.app/report/<nanoid>` where nanoid is 12 chars, URL-safe alphabet, generated server-side. Example: `V1StGXR8_Z5j`.

Public link. No auth. Forever-lived. Anyone with the URL can view.

### 4.3 Render details by section

**Section 1: Cover.** Top of page. Brand block (SUMAIT.AI logo, red accent), then "Prepared for {{company_name}}", then date "{{generation_date}}", then a small "Share this report" button (copies URL to clipboard).

**Section 2: Executive Summary.** Large-format treatment of three headline numbers (reclaimable revenue, ROI multiplier, hours saved per week). All three animate on first load using the existing `AnimatedValue` component pattern. Below: a 2-sentence paragraph: "{{company_name}} is currently spending {{total_weekly_hours}} hours per week on processes that AI can do faster, cheaper, and around the clock. The math below shows what changing that looks like."

**Section 3: Where You Are Today.** A snapshot card. Two columns at desktop, stacked at mobile.
- Left: Industry, employee count, current MRR, biggest cost driver, primary tech stack (from `companyInfo`)
- Right: Departments mapped, total weekly hours, average hourly rate, AI investment to date (from `goalsReadiness` + `departments`)

**Section 4: Industry Benchmark.** A comparison card.
```
Where you stand vs other [industry] your size
  Industry average:  38 hrs/week on manual work
  Top quartile:      18 hrs/week
  You:               52 hrs/week  ← bottom tier
  [horizontal bar chart visualization]
You are spending 14 hours per week more than the industry
average. Closing that gap reclaims $36,400 per year at your
hourly rate.
```
Followed by "What is working in your industry right now": a bullet list of the 3 most common quick wins for businesses of this industry/size, drawn from `industry_benchmarks.common_quick_wins`.

**Section 5: 30-60-90 Roadmap.** Three columns at desktop. Above the columns: a "What to do tomorrow morning" callout (the most important first action, AI-generated under 30 words, executable in 5-15 min, references a real tool). Each column shows the phase label, calendar date range (calculated from audit submission date), and the items assigned to that phase by the AI. Each item shows: title, setup hours, weekly hours saved, risk level, dependency note (if any).

If the user views the report after the original 90-day window has passed, a banner appears at top of section: "This roadmap was generated [N days] ago. The dates show the original 90-day plan. Want a fresh roadmap? [Run a new audit]."

**Section 6: Cortex Configuration.** Card stack. One card per recommended team (3-5 cards). Each card has:
- Team number + name + tagline (e.g., "TEAM 07 / AUTOMATION FACTORY")
- Status badge (always "Active" green dot since these are recommended teams)
- One paragraph from the AI explaining what this team does for this specific business
- Tools wired (n8n · Claude · GHL · etc.), pulled from team's stack signature
- Estimated impact line ("Saves {{company}} {{X}} hrs/week · ${{Y}}/yr")

Bottom of section: a totals card.
```
Your Cortex setup recommends:
3 teams · 14 specialized agents · 9 tools wired
Combined estimated impact: $187,000/yr · 47 hrs/week saved
                                                          
[ Get this exact setup deployed → ]   (links to LeadConnector)
[ See the full Cortex catalog → ]     (links to sumait-cortex.vercel.app)
```

**No tier pricing labels.** Pricing is 1-on-1 only.

**Section 7: What-If Simulator.** 6 checkboxes (3 quick wins + 3 long-term plays) plus an hourly rate slider ($20-$200, default = user's input). The big numbers in Section 2 above the simulator animate to new totals when toggles flip. Math runs client-side.

When a dependency is toggled off, the dependent auto-disables with an inline note: "(also disabled, depends on [name])". A small "ignore dependency" link override exists. A scenario badge above the simulator shows current state: "Recommended scenario" / "Conservative scenario" / "Aggressive scenario" / "Custom assumption" (when slider edited).

**Section 8: The Math.** Existing `ComputationBreakdownSection` component, expanded with:
- Source attribution per number ("Hourly rate: from your input" / "Industry rate: from benchmark data")
- Assumption labels visible without clicking
- ROI ceiling explanation ("ROI capped at {{ceiling}}x based on your revenue tier")

**Section 9: What Happens Next.** Three explicit CTAs, equal visual weight:
1. **Book a strategy call** → opens LeadConnector calendar in new tab
2. **Share this report with your team** → opens an inline form (name + email of teammate + optional 1-line note). Submitting fires the `/share-report` n8n webhook. Success state: "Sent to [colleague@email]."
3. **Download as PDF** → triggers `window.print()` with print-optimized CSS

**Section 10: Footer.** Brand block. "Reviewed by Bryan Sumait" line. Contact: `bryansumaitofficial@gmail.com`. Small "Run a new audit" link. "Viewed {{count}} times · Last opened {{relative_time}}" footer line shown to all viewers.

### 4.4 Print-optimized CSS

Single stylesheet with `@media print {}` block:
- Hide nav, share buttons, simulator (replace with "current scenario as printed" snapshot)
- Render in A4 portrait
- Page breaks at section boundaries (`break-before: page` on `.report-section`)
- Strip backgrounds (white background, black text for ink savings)
- Keep brand red accents
- Show URL in footer ("View live: https://sumait-audit.vercel.app/report/V1StGXR8_Z5j")

---

## 5. Data layer

### 5.1 New Supabase table: `audit_reports`

```sql
create table audit_reports (
  id text primary key,                   -- 12-char nanoid, URL slug
  created_at timestamptz default now(),
  
  contact_name text not null,
  contact_email text not null,
  
  company_info jsonb not null,           -- the wizard's CompanyInfo
  goals_readiness jsonb not null,        -- the wizard's GoalsReadiness
  departments jsonb not null,            -- the wizard's Department[]
  
  analysis jsonb not null,               -- the full AIAnalysisResponse
  industry_benchmark jsonb,              -- cached snapshot at time of generation
  cortex_configuration jsonb,            -- cached snapshot at time of generation
  
  view_count int default 0,
  last_viewed_at timestamptz
);

create index audit_reports_email_idx on audit_reports (contact_email);
create index audit_reports_created_idx on audit_reports (created_at desc);
```

Public read access via Supabase RLS (anyone with the URL can read the row). No write access except via the edge function (service role key).

### 5.2 New Supabase table: `industry_benchmarks`

```sql
create table industry_benchmarks (
  industry text not null,
  size_band text not null,               -- 'micro' | 'small' | 'mid' | 'large'
  avg_weekly_manual_hours numeric not null,
  top_quartile_weekly_hours numeric not null,
  avg_ai_adoption_pct numeric not null,
  common_cost_drivers text[] not null,
  common_quick_wins text[] not null,
  source_note text default 'Based on SUMAIT engagements and public industry research',
  updated_at timestamptz default now(),
  primary key (industry, size_band)
);
```

Seeded with 40 rows: 10 industries × 4 size bands. Editable via Supabase dashboard so Bryan can update without redeploying.

**Industries:** `agency`, `coaching`, `course`, `saas`, `ecommerce`, `realestate`, `accounting`, `legal`, `fitness`, `homeservices`.

**Size bands:** `micro` (1-10), `small` (11-50), `mid` (51-200), `large` (200+).

### 5.3 Industry benchmark seed data path

**Path C:** I draft plausible starter values for all 40 cells based on common patterns. Bryan reviews and adjusts the cells for industries he has direct experience in (likely Agency, Coaching, SaaS, E-commerce). The rest stay as my drafts and get updated as Bryan takes on more clients in those verticals.

The drafts ship in a SQL seed file (`supabase/seed/industry_benchmarks.sql`) Bryan can review before applying.

### 5.4 New Supabase edge function: `generate-report`

Wraps the existing `analyze-audit` flow plus the new persistence + benchmarking + Cortex mapping logic.

Input (JSON body):
```ts
{
  contact: { name: string, email: string },
  companyInfo: CompanyInfo,
  goalsReadiness: GoalsReadiness,
  departments: Department[]
}
```

Process:
1. Generate nanoid (12 chars)
2. Run AI analysis (calls existing `analyze-audit` logic internally OR calls it as a sub-function)
3. Look up industry benchmark for `(industry, size_band)`
4. Run Cortex mapping rules against inputs (see Section 6 below)
5. Insert row into `audit_reports`
6. Fire n8n webhook with `{ name, email, company, link, top_metric }`
7. Return `{ id, link }` to client

Error handling: if AI call fails, return error and don't create row (so user can retry). If n8n fails, log but don't block (user still sees report on-site).

### 5.5 Extended `analyze-audit` AI prompt

Add fields to the existing AI response schema:
```ts
quick_wins: Array<{
  title: string,
  desc: string,
  // NEW:
  phase: 30 | 60 | 90,
  effort_hours: number,
  hours_per_week_saved: number,
  dependency_id: string | null,
  risk_level: 'low' | 'medium' | 'high',
  risk_note: string,
  what_to_do_tomorrow: string | null   // only first one has this
}>,
long_term_strategy: Array<{
  title: string,
  desc: string,
  // NEW:
  phase: 30 | 60 | 90 | 'beyond',
  effort_hours: number,
  hours_per_week_saved: number,
  dependency_id: string | null,
  risk_level: 'low' | 'medium' | 'high'
}>,
// NEW:
cortex_team_explanations: {
  [teamId: string]: {
    paragraph: string,
    impact_line: string
  }
}
```

The prompt is extended with constraints:
- "Each quick win must have a `phase` (30, 60, or 90). Phase 30 quick wins are immediate, low-effort, no-dependency."
- "Identify dependencies: if doing X requires Y first, set X's `dependency_id` to Y's id."
- "The first quick win (phase 30, no dependencies) gets a `what_to_do_tomorrow` value: an action under 30 words, executable in 5-15 minutes, that references a specific tool name or button."
- "Risk levels: low = standard, medium = needs careful change management, high = requires team buy-in or technical risk."

---

## 6. Cortex Configuration mapping

### 6.1 Rules (deterministic team selection)

Implemented as a TypeScript function `selectCortexTeams(inputs): TeamId[]`:

| User signal | Triggered Cortex teams |
|---|---|
| Department contains "sales", "lead gen", "outreach" | T05 Marketing & Growth + T07 Automation Factory |
| Department contains "support", "service", "help desk" | T04 AI & ML + T14 CSM |
| Department contains "content", "social", "marketing" | T13 Content Creation + T05 |
| Department contains "ops", "admin", "back office" | T17 Finance & HR + T07 |
| Department contains "engineering", "product", "dev" | T01 Fullstack + T16 QA |
| Department contains "design", "ux", "creative" | T15 Design & UX + T13 |
| Industry = "agency" or "consulting" | T18 Client Onboarding + T17 |
| Industry = "ecommerce" | T05 + T07 + T04 |
| Industry = "saas" | T01 + T04 + T05 |
| Cost driver = "people / labor" | T07 prioritized |
| Cost driver = "tech stack" | T01 + T03 prioritized |
| (always) | T07 Automation Factory included |

After rules fire, dedupe and rank by frequency. Take top 3-5.

### 6.2 Team metadata table (in code, not DB)

A static map `cortexTeams: Record<TeamId, TeamMeta>` defined in `src/lib/cortex.ts`:

```ts
type TeamMeta = {
  id: string,           // 'T05'
  name: string,         // 'Marketing & Growth'
  tagline: string,      // 'Lead gen, SEO, ads, reputation'
  tools: string[],      // ['n8n', 'Claude', 'GHL', 'Instantly']
  agentCount: number,   // 4
}
```

Populated from `SUPER-AI-AGENTS/` content already in the parent repo. Bryan reviews the seed values before launch.

### 6.3 AI copy layer

The `analyze-audit` prompt receives the matched team IDs and the user inputs, and returns one paragraph + one impact line per team (see `cortex_team_explanations` in Section 5.5 above). The prompt instructs:
- "Reference the user's company name in each paragraph"
- "Reference at least one of their stated departments or pain points"
- "The impact line is 'Saves {{company}} {{X}} hrs/week · ${{Y}}/yr', computed from the audit math"

---

## 7. Email + sharing flow

### 7.1 Submission redirect flow

1. User clicks "Get my report" → submits name + email
2. Client calls `generate-report` edge function
3. Function creates row, fires n8n webhook
4. Function returns `{ id, link }`
5. Client immediately redirects to `/report/<id>` (does not wait for email)
6. Toast: "Report ready! We've also emailed the link to your inbox for later."

### 7.2 Email template (n8n-controlled)

**From:** `bryansumaitofficial@gmail.com`
**Reply-to:** same
**Subject:** `Your SUMAIT AI Audit is ready, {{name}}`

```
Hey {{name}},

Your SUMAIT AI Audit for {{company_name}} is ready.

The headline:
  Reclaimable revenue:    ${{revenue}}
  ROI:                    {{roi}}x
  Hours saved per week:   {{hours_saved}}

View the full report (shareable with your team):
[ View Audit Report → ]
{{report_link}}

Want to talk through it? Book a 30-minute call with me. No pitch, 
just a working conversation about which quick win to start with:
[ Book a Strategy Call → ]
{{calendar_link}}

Or reply to this email with questions. I read every one.

Bryan Sumait
Founder, SUMAIT AI Agents
sumaitai.vercel.app
```

### 7.3 Sharing mechanics on the report page

In Section 9 ("What Happens Next"):

- **Copy link**: copies `https://sumait-audit.vercel.app/report/<id>` to clipboard with a "Copied!" toast
- **Email to teammate**: small inline form. Submits to `/share-report` n8n webhook with `{ from_name, from_email, to_email, note, report_link }`. n8n sends a forwarded email from the original viewer's identity. Success: "Sent to [colleague@email]"
- **Download as PDF**: triggers `window.print()` with print-optimized CSS

### 7.4 View tracking

The `audit_reports` table has `view_count` and `last_viewed_at`. On every report load, a Supabase RPC increments view_count and updates last_viewed_at.

Footer line shown to all viewers:
> *Viewed {{count}} times · Last opened {{relative_time}}*

If the original lead is the only viewer (count = 1), the footer is hidden to avoid awkwardness.

### 7.5 Re-engagement sequence (n8n workflow, separate from audit code)

The audit code emits webhook events. n8n decides what to do.

| Day | Trigger | Action |
|---|---|---|
| 0 | `report.generated` | Initial "your report is ready" email (above) |
| 3 | No call booked | "Did you get a chance to review?" follow-up |
| 7 | No call booked | "Here's the single quick win to start with"; uses Phase 1 QW1 from their report |
| 14 | No call booked | "Your roadmap dates start in N days. Worth a 15-min chat?" |
| Any | Call booked | Cancel sequence. Send pre-call prep email. |
| Any | `report.shared` (teammate added) | Notify Bryan in Telegram (multi-stakeholder = hot lead) |

n8n workflows are configured by Bryan separately. Audit code's responsibility is firing the events.

---

## 8. sumaitai integration

5 touchpoints in the main sumaitai repo. Each is small.

### 8.1 Footer audit link URL update

File: `src/components/Footer.tsx`. Find the existing CTA:
```tsx
href="https://sumait-ai-audit.lovable.app/"
```
Replace with:
```tsx
href="https://sumait-audit.vercel.app/"
```

### 8.2 FloatingNav: add "Audit" link

File: `src/components/FloatingNav.tsx`. Update `navLinks` array to add Audit between Work and Process:

```tsx
const navLinks = [
  { label: 'Systems', href: '#systems' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Audit', href: 'https://sumait-audit.vercel.app/', external: true },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];
```

The render handler must respect the `external` flag: external links open in a new tab and skip smooth-scroll. Update both desktop and mobile menu rendering.

### 8.3 Hero: add tertiary CTA

File: `src/components/HeroSection.tsx`. After the two existing CTAs in the CTA cluster, add:

```tsx
<a
  href="https://sumait-audit.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="font-mono text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors mt-2 self-start lg:self-end"
>
  Or run our free 5-minute AI audit →
</a>
```

Small text link, not a button. Doesn't compete with BOOK A CALL or VIEW WORK.

### 8.4 CTA section: add secondary path

File: `src/components/CTASection.tsx`. After the BOOK A CALL button, add:

```tsx
<a
  href="https://sumait-audit.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="block mt-4 font-mono text-xs tracking-widest text-white/60 hover:text-white transition-colors"
>
  Not ready to chat? Run the AI audit first →
</a>
```

### 8.5 New `/audit` landing page

File: `src/pages/Audit.tsx` (new). A thin marketing page about the audit:

- Hero block: "Get a custom AI Automation Audit for your business in 5 minutes"
- Subhead: "We map your team's manual processes to AI agents and show you exactly what to automate first. No call required."
- 3-card grid:
  1. **What it covers**: your departments, processes, hours, cost drivers, AI readiness
  2. **What you get back**: a personalized hosted report with industry benchmarks, 30-60-90 roadmap, and your custom Cortex configuration
  3. **Who it's for**: B2B service businesses doing $20K/month or more, losing leads to manual processes
- Sample report screenshot teaser (placeholder image for v1, real screenshot once first reports exist)
- Big CTA button: "Start your audit →" links to `https://sumait-audit.vercel.app/`
- 3-question FAQ specific to the audit

Add the route to `src/App.tsx`:
```tsx
const Audit = lazy(() => import("./pages/Audit"));
// ...
<Route path="/audit" element={<Audit />} />
```

### 8.6 sumaitai FAQ Q7 follow-up (related but separate)

The current sumaitai `FAQSection.tsx` Q7 contains public pricing tiers ($3K / $8K / $25K). Bryan's new rule: no public pricing. Update Q7:

Current:
```
SUMAIT retainers start at $3,000 per month for the Starter tier. The Growth 
tier is $8,000 per month. Agency tier (white-label Cortex) starts at $25,000 
per month. Project work is quoted per scope.
```

Replace with:
```
Pricing is custom to each engagement. We'll quote you on the discovery call 
once we understand your scope and goals.
```

This change ships as part of this spec since it's directly related to the "no public pricing" decision made during this brainstorm.

---

## 9. Acceptance criteria

### Audit repo (sumait-ai-audit)

- [ ] `audit_reports` table created in Supabase with the schema in Section 5.1
- [ ] `industry_benchmarks` table created with the schema in Section 5.2
- [ ] 40 benchmark rows seeded via `supabase/seed/industry_benchmarks.sql`
- [ ] `generate-report` edge function deployed and successfully creates rows
- [ ] `analyze-audit` extended prompt returns `phase`, `effort_hours`, `hours_per_week_saved`, `dependency_id`, `risk_level`, `risk_note`, `what_to_do_tomorrow`, `cortex_team_explanations`
- [ ] `selectCortexTeams()` function in `src/lib/cortex.ts` correctly maps inputs to team IDs per Section 6.1 rules
- [ ] `cortexTeams` metadata map populated in `src/lib/cortex.ts`
- [ ] `/report/[id]` route renders all 10 sections per Section 4.3 specs
- [ ] Industry benchmark card shows correct comparison data
- [ ] 30-60-90 roadmap renders calendar dates from submission date
- [ ] "What to do tomorrow" callout appears above the roadmap
- [ ] Cortex Configuration section renders 3-5 team cards with no tier pricing
- [ ] What-If simulator: 6 toggles + slider work with live recalculation
- [ ] Dependency auto-disable works with "ignore dependency" override
- [ ] Scenario badge updates correctly
- [ ] Share buttons: copy link, email-to-teammate, download PDF all functional
- [ ] Print-optimized CSS produces a clean PDF via browser print
- [ ] View count increments on each load via Supabase RPC
- [ ] "Viewed N times" footer line appears when count > 1
- [ ] n8n webhook fires on submission with `{ contact, link, top_metric }`
- [ ] n8n webhook for share-report works (separate workflow)
- [ ] Email from `bryansumaitofficial@gmail.com` lands with the spec template
- [ ] Audit redeployed to Vercel under `sumait-audit.vercel.app`

### sumaitai repo

- [ ] Footer audit link updated to `sumait-audit.vercel.app`
- [ ] FloatingNav has 6 items including "Audit" external link (desktop + mobile)
- [ ] Hero has tertiary "Or run our free 5-minute AI audit" link
- [ ] CTA section has "Not ready to chat? Run the AI audit first" link
- [ ] `/audit` landing page route created and rendering
- [ ] FAQ Q7 updated to remove public pricing
- [ ] All changes mobile-responsive at 375/560/900/1200+
- [ ] No new TypeScript errors (`bunx tsc --noEmit` clean)
- [ ] All existing tests still pass

### Cross-cutting

- [ ] All visible copy follows SUMAIT STANDARDS (no dashes, no jargon, sentences under 20 words)
- [ ] WCAG AA contrast on all new UI elements
- [ ] Reduced-motion respected on what-if simulator animations
- [ ] Touch device test: simulator works without hover
- [ ] Lighthouse mobile performance not lower than current audit baseline

---

## 10. Risks and open questions

| Risk | Severity | Mitigation |
|---|---|---|
| Industry benchmark numbers feel made-up under scrutiny | High | Path C: Bryan reviews and locks the 4 verticals he has direct client experience in before launch |
| Cortex team mapping rules don't cover an edge-case industry | Medium | Default fallback: T07 Automation Factory always included; AI copy adapts to whatever team is matched |
| What-If simulator math diverges from email-PDF-renders if added later | Medium | Math is client-side and read from the same `analysis` jsonb. Future PDF generator uses same data source. |
| n8n email template drift from this spec | Low | Email content is in n8n, this spec is the source of truth; Bryan owns sync |
| Public link discovery (12-char nanoid guess) | Negligible | 1 in ~3 trillion. Document accepted risk. |
| Lovable.dev workflow breaks if we redeploy to Vercel under different URL | Low | Vercel auto-deploys from the same GitHub repo Lovable pushes to. Test once before cutting over. |

### Open inputs from Bryan during implementation

1. **Real X / GitHub URLs** for any social tiles in the audit footer (currently using LinkedIn from previous spec)
2. **Confirmation that `bryansumaitofficial@gmail.com`** is correctly set up to send via n8n's email tool
3. **Cortex team metadata**: Bryan reviews the seed `cortexTeams` map after I draft it from `SUPER-AI-AGENTS/` content
4. **Industry benchmark drafts**: Bryan reviews and adjusts the 4 verticals he has direct client experience in (Path C)
5. **Sample report screenshot** for the `/audit` landing page once first reports exist

---

## 11. Out of scope (explicit, do not touch)

- Migrating audit code into sumaitai monorepo
- Server-side PDF generation
- Custom domain on sumaitai or sumait-audit
- ICS calendar download
- URL-encoded scenario sharing
- Side-by-side scenario comparison
- User accounts or saved scenarios
- Aggregating past audits into benchmarks
- Public pricing tiers anywhere on either site
- Changes to the wizard's existing 4 steps (only data flow downstream changes)
- Changes to the existing Spline iframe / CustomCursor / brand palette / typography on sumaitai

---

## 12. Implementation order (rough)

This is a hint for the writing-plans phase, not a final plan.

**Phase 1: Data layer + AI extension.** Create Supabase tables, seed benchmarks, extend `analyze-audit` prompt, create `generate-report` edge function. Test that submissions persist correctly.

**Phase 2: Report URL render.** Build `/report/[id]` route with all 10 sections rendering from the persisted data. No simulator interactivity yet, no print CSS yet. Static render.

**Phase 3: Interactivity layer.** Add what-if simulator math and toggles, add dependency handling, add share buttons (copy link + download PDF + email-to-teammate form), add print-optimized CSS.

**Phase 4: Cortex mapping.** Add `selectCortexTeams` rules, populate `cortexTeams` metadata, integrate into `generate-report`, render Cortex Configuration section.

**Phase 5: Email + n8n integration.** Update n8n webhook payload, update n8n email template, configure share-report webhook, configure re-engagement sequence triggers.

**Phase 6: sumaitai integration.** Update Footer URL, add Audit nav link, add hero tertiary CTA, add CTA section secondary, build /audit landing page, update FAQ Q7. Push to sumaitai main, auto-deploy.

**Phase 7: Cutover.** Redeploy audit repo to Vercel under `sumait-audit.vercel.app`. Verify URL works. Update sumaitai links if any URL refinements needed.

Each phase committed separately. Each phase deployed to a Vercel preview before merging.
