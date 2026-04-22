# sumaitai: Polish, Copy Surgery, and Beautification

**Date:** 2026-04-22
**Owner:** Bryan Sumait
**Author:** Cortex (brainstorming session with Jase)
**Repo:** github.com/bryansumaitautomate/sumaitai
**Status:** Approved, ready for implementation planning

---

## 1. Goal

Take the current sumaitai single-page site from "good portfolio" to "credible founder document" without changing its design language. The site is used as the primary link from Bryan's LinkedIn profile and from cover letters when applying to roles. It serves a dual audience:

1. **Bryan as a hireable specialist** (full-time, contract, part-time, freelance)
2. **SUMAIT AI Agents as a B2B service provider** (Cortex retainer tiers)

Success looks like: a recruiter or buyer landing on the site can verify Bryan's credibility in under 30 seconds, and find the right next action (hire him, hire his team, or both).

This spec covers three categories of work, all approved:

- **Bug fixes** that ship regardless (broken links, wrong emails, duplicate section numbers)
- **Copy surgery** to align every section with SUMAIT STANDARDS and the real Business Profile
- **Beautification** with three high-impact additions (magnetic CTAs, scroll progress bar, 3D tilt cards)

---

## 2. Scope

### In scope

- All 13 sections of the home page (`src/pages/Index.tsx` and its child components)
- The four deep-dive project routes are **not** in scope here, but their landing card descriptions on the home page are
- The footer
- The floating nav

### Out of scope

- Replacing the Spline 3D iframe in the hero
- Removing the CustomCursor
- Changing the 4-column grid system
- Changing the brand palette (black, red, white)
- Changing the typography (Syne, JetBrains Mono, body)
- Rebuilding the four deep-dive project pages

### Constraints

- All output must follow `SUPER-AI-AGENTS/STANDARDS.md`: zero jargon, zero dashes, sentences under 20 words, mobile-first, WCAG AA contrast.
- Must work on 375px, 560px, 900px, and 1200px+ breakpoints.
- Lighthouse mobile score must not drop below current baseline.
- No new external runtime dependencies. Use existing stack (React 18, Vite 5, Tailwind, framer-motion, lucide-react, @iconify/react).

---

## 3. Category 1: Bug Fixes

| ID | File | Line(s) | Current | Fix |
|---|---|---|---|---|
| BUG-01 | `src/components/ProfileSection.tsx` | 110 | `mailto:contact@example.com` | `mailto:bryansumaitofficial@gmail.com` |
| BUG-02 | `src/components/Footer.tsx` | 125, 127 | Display text says `bryansumait@gmail.com`, mailto says `bryan@sumait.ai` | Both must point to `bryansumaitofficial@gmail.com` |
| BUG-03 | `src/components/Footer.tsx` | 12-23 | Social links all `href="#"` | Real LinkedIn URL: `https://www.linkedin.com/in/bryansumait`. Real X handle if Bryan has one. Remove dead links instead of leaving placeholders. |
| BUG-04 | `src/components/SystemsSection.tsx` | 121, 135, 149 | All three system cards labeled `03 ///` | Renumber: keep first card `03`, second becomes `04`, third becomes `05`. Cascade renumbering through the whole page so labels read 01 (hero), 02 (about), 03 (profile), 04 (systems), 05 (past projects), 06 (case studies), 07 (process), 08 (tools), 09 (testimonials), 10 (FAQ), 11 (contact). Update each section's label string. |
| BUG-05 | `src/components/HeroSection.tsx` | 86 | `"...close deals—while you sleep."` (em-dash) | `"...close deals while you sleep."` (drop the em-dash, no replacement needed) |
| BUG-06 | `src/components/FloatingNav.tsx` | 8-13 | Nav has Systems / Experience / Process / Contact, missing Past Projects | Add `{ label: 'Work', href: '#projects' }` between Experience and Process |
| BUG-07 | `src/components/Footer.tsx` | 47-48 | Newsletter form code is commented out, leaves dead vertical space and visible comment | Remove the commented block entirely |
| BUG-08 | Multiple files | Several | Brand name inconsistency: hero watermark says "SUMAIT AI" (no period), footer and nav say "SUMAIT.AI" (with period) | Pick one. Recommend "SUMAIT.AI" everywhere since it matches the domain feel and is already in two places. |

**Acceptance for Category 1:** every link clicks to a real destination, no `mailto:contact@example.com`, no `href="#"`, no duplicate section numbers, no em-dashes anywhere in copy, brand name written one way only.

---

## 4. Category 2: Copy Surgery

Every change below must respect SUMAIT STANDARDS. No dashes, no jargon, no sentence over 20 words.

### 4.1 HeroSection (`src/components/HeroSection.tsx`)

**Problem.** The hero copy lives in column 1 of a 4-column grid. Most of the visible space is empty. The CTA "VIEW WORK" sits in the far right column, easy to miss. There is no clear "I'm Bryan, here's what I do" statement above the fold.

**Changes.**

- **C-HERO-01.** Move the headline copy out of column 1 and into a more prominent position. Implementation: keep the existing 4-column grid structure intact (columns are signature). The headline currently sits in column 1 only. Restructure so the headline spans columns 1 through 3 of the bottom row (was just column 1) and the CTA cluster sits in column 4 of the bottom row. At mobile (under 900px), the grid collapses to a single column and the headline takes full width above the CTAs.
- **C-HERO-02.** Headline copy stays: "I build systems that capture leads, book calls, and close deals while you sleep." (with em-dash already removed in BUG-05).
- **C-HERO-03.** Add a subtitle line directly under the headline: "Founder of SUMAIT AI Agents, helping B2B businesses turn calls and chats into booked revenue."
- **C-HERO-04.** Add a second CTA next to "VIEW WORK": "BOOK A CALL" linking to `https://cal.com/bryan-dave-sumait-nzvzba/automation-intro`. Style as primary (red fill), make "VIEW WORK" the secondary (outline).
- **C-HERO-05.** Keep the Spline iframe, beam animations, watermark text, and the "01 /// REVENUE SYSTEMS" mono label. These are signature.

### 4.2 ProfileSection (`src/components/ProfileSection.tsx`)

**Problem.** The 2024 timeline card mentions "100+ custom GPTs for workflow optimization" which is jargon and unverifiable. Skills tags are generic. The 2026 year is missing entirely (Cortex v4.0 is your most leveraged build).

**Changes.**

- **C-PROF-01.** Update 2024 card description to remove "100+ custom GPTs" jargon. Replace with one specific outcome. Suggested: "Built complete business operations across social media automation, lead generation, and CRM systems for 8+ B2B clients."
- **C-PROF-02.** Add a 2026 card to the experience timeline. Title: "Cortex v4.0 Agent Framework". Icon: `solar:cpu-bolt-bold` or similar. Description: "Designed and shipped an 18-team, 72-agent framework that powers SUMAIT's client delivery. Productized in three retainer tiers."
- **C-PROF-03.** Replace skill tags. Current: "Revenue Systems," "Sales Automation," "AI Integration," "CRM Architecture." New: "Voice Agents," "n8n Workflows," "GHL Pipelines," "AI Brain Builds." More specific and matches actual stack.
- **C-PROF-04.** Update the small subtitle under the avatar. Current: "Specializing in high-ticket sales infrastructure and AI automation." Replace with: "I run SUMAIT, an AI automation team that builds revenue systems for B2B businesses."

### 4.3 AboutSection (`src/components/AboutSection.tsx`)

**Problem.** Headline says "I build" but Business Profile is clear that Bryan does not build with his own hands. He runs a team of five operators.

**Changes.**

- **C-ABOUT-01.** Replace headline. Current: "I'm Bryan Sumait, I build revenue systems that run while you sleep." New: "I'm Bryan Sumait. I run SUMAIT, a team building revenue systems that work while you sleep."
- **C-ABOUT-02.** Body copy paragraphs 1 and 2 stay as written.
- **C-ABOUT-03.** Body copy paragraph 3 stays: "My clients stop chasing leads and start closing deals, because their systems do the heavy lifting."
- **C-ABOUT-04.** Stat cards (99% / 5+ / $2M+) keep their values.

### 4.4 SystemsSection (`src/components/SystemsSection.tsx`)

**Problem.** Three system cards exist (Lead Capture, Appointment Booking, Deal Closing). The newest pattern Bryan ships, AI Brain Builds (the Better Body Academy pattern), is missing. Generic feature bullets like "Stage-based automation triggers" are jargon.

**Changes.**

- **C-SYS-01.** Add a fourth system card. Title: "AI Brain Builds". Description: "Make every customer call, doc, and conversation queryable. Founders ask questions, the brain answers in plain English." Features:
  - Connects calls, transcripts, and documents into one searchable layer
  - Routes data automatically by call type
  - Auto-emails action items to your team
  - Founder queries the brain in natural language
- **C-SYS-02.** Tighten existing feature bullets. Each bullet under 10 words. Examples:
  - "Multi-channel capture (web, social, ads)" stays as is, fine
  - "Stage-based automation triggers" becomes "Automated triggers across every deal stage"
  - "Win/loss analysis tracking" becomes "Built-in win and loss tracking"
- **C-SYS-03.** The current implementation puts a `{number} /// SYSTEMS` label on every card, all reading "03 /// SYSTEMS". Fix: remove the per-card label entirely. Add a single section header at the top of the SystemsSection that reads "04 /// SYSTEMS" and "What I build". Each card keeps its title and feature list, no per-card mono number. This is cleaner than numbering 04a / 04b / 04c / 04d.

### 4.5 PastProjectsSection (`src/components/PastProjectsSection.tsx`)

**Problem.** Card descriptions are generic.

**Changes.**

- **C-PAST-01.** Tighten each card description to one specific real outcome. Suggested:
  - Automation Projects: "End-to-end workflows for KC Media, Disruptors Media, and Better Body Academy."
  - Chat Agents: "Conversational AI handling client support across 5+ B2B businesses."
  - Voice Agents: "Live mortgage voice agent for AI Tech Solutions, shipped in 14 days."
  - Vibecoded Projects: "Custom client portals and dashboards built with React, Next.js, and Supabase."
- **C-PAST-02.** Section number becomes 05 after renumbering.

### 4.6 CaseStudiesSection (`src/components/CaseStudiesSection.tsx`)

**Problem.** Anonymous category labels (B2B SAAS, COACHING, E-COMMERCE) with no client names. Reads as fabricated and undermines credibility.

**Changes.**

- **C-CASE-01.** Replace three case studies with real ones. Use real client names with permission. Recommended new set:
  - **Better Body Academy.** Category: COACHING. Metric: "100%". Label: "Call coverage". Description: "Built a Fathom to n8n to AI agent pipeline that captures, routes, and summarizes every sales and coaching call. Active retainer."
  - **Disruptors Media.** Category: AGENCY. Metric: "6 hrs". Label: "Saved per client per week". Description: "Shipped an 8-workflow client portal with editable templates and per-message confirm. Approval cycle dropped from two days to four hours."
  - **AI Tech Solutions.** Category: FINTECH. Metric: "14 days". Label: "Build to launch". Description: "VAPI inbound voice agent, GHL pipeline, and 8-inbox Instantly outbound shipped in two weeks. Mortgage vertical."
- **C-CASE-02.** Keep the cursor-following glow effect, animated metric counter, and gradient cards exactly as they are.
- **C-CASE-03.** Section number becomes 06 after renumbering.

### 4.7 ProcessSection (`src/components/ProcessSection.tsx`)

**Problem.** Headline says "From chaos to cash flow in 4 weeks" but FAQ says builds take 4 to 6 weeks. Internal contradiction.

**Changes.**

- **C-PROC-01.** Replace headline. Current: "From chaos to cash flow in 4 weeks." New: "From chaos to cash flow in 30 days." Matches the 30-day onboarding pattern from your retainer model.
- **C-PROC-02.** Phase descriptions stay.
- **C-PROC-03.** Section number becomes 07 after renumbering.

### 4.8 TechStackSection (`src/components/TechStackSection.tsx`)

**Problem.** Stack list is incomplete. Missing tools that show up in actual case studies (VAPI, Voiceflow, Supabase, Vercel, Telegram). Includes Lovable.dev and Aura.build which signal "vibe coder" and may undermine perception with serious recruiters.

**Changes.**

- **C-TECH-01.** Add five tools to the stack: VAPI, Voiceflow, Supabase, Vercel, Telegram. Use existing iconify icon library, prefer simple-icons set when available.
- **C-TECH-02.** Decision required from Bryan during implementation: keep or drop Lovable.dev and Aura.build? Default: keep, since they show range and Bryan uses them. If Bryan wants the more "serious operator" positioning, drop both.
- **C-TECH-03.** Subtitle stays: "I stay current through paid communities and courses, not outdated YouTube tutorials." Punchy and specific.
- **C-TECH-04.** Section number becomes 08 after renumbering.

### 4.9 TestimonialSection (`src/components/TestimonialSection.tsx`)

**Problem.** Critical credibility issue. Every testimonial has Author = Company name with role "Founder/CEO." This pattern reads as AI-generated. A recruiter or buyer will spot it instantly. This is the single highest-impact copy fix on the page.

**Changes.**

- **C-TEST-01.** Two paths:
  - **Path A (preferred):** Bryan provides real first and last names of the people who actually said each quote. Update the `author` field for all 10 testimonials.
  - **Path B (fallback):** Restructure each testimonial. Move the company name to a "From" attribution. Change the role to vary between "Founder," "CEO," "Marketing Director," "Operations Lead," etc. Use only first names plus initial: "Sarah K., Founder."
- **C-TEST-02.** If neither path is possible, recommend cutting the testimonial section entirely. No testimonials beats fake-looking testimonials.
- **C-TEST-03.** Carousel mechanics, animations, and progress dots stay.
- **C-TEST-04.** Section number becomes 09 after renumbering.

### 4.10 FAQSection (`src/components/FAQSection.tsx`)

**Problem.** Only 5 questions. Two of the most-asked buyer questions are missing: pricing, and geography (Bryan is in Manila but the site never mentions it).

**Changes.**

- **C-FAQ-01.** Voice fix on Q3. Current: "I handle all the technical implementation." New: "My team handles the technical implementation. I scope the work, run discovery, and stay close to delivery."
- **C-FAQ-02.** Add Q6: "Do you work with clients outside the Philippines?" Answer: "Yes. SUMAIT is Manila-based, GMT+8. I work async-first with clients in the US, EU, and Asia. Most of my retainer clients are not in the Philippines."
- **C-FAQ-03.** Add Q7: "What's your pricing?" Answer: "SUMAIT retainers start at $3,000 per month for the Starter tier. The Growth tier is $8,000 per month. Agency tier (white-label Cortex) starts at $25,000 per month. Project work is quoted per scope."
- **C-FAQ-04.** Section number becomes 10 after renumbering.

### 4.11 CTASection (`src/components/CTASection.tsx`)

**Problem.** Three stats (30 min, Free, 4 weeks). The "4 weeks" stat must change to match the Process section update. Adding "12 active clients" as a fourth stat adds social proof.

**Changes.**

- **C-CTA-01.** Update the third stat. Current: "4 weeks / Avg. Delivery". New: "30 days / Avg. Delivery". Matches Process headline.
- **C-CTA-02.** Add a fourth stat card: "12 / Active Clients". Use the same gradient card style. Adjust grid from `sm:grid-cols-3` to `sm:grid-cols-2 lg:grid-cols-4`.
- **C-CTA-03.** Section number becomes 11 after renumbering.

### 4.12 Footer (`src/components/Footer.tsx`)

Already covered in Bug Fixes (BUG-02, BUG-03, BUG-07, BUG-08).

---

## 5. Category 3: Beautification

Three additions, ranked by impact-per-effort. All three approved.

### 5.1 Magnetic CTAs (B-MAG)

**What it does.** When the user's cursor approaches a primary CTA button (BOOK A CALL, LET'S TALK, the hero VIEW WORK button), the button subtly shifts toward the cursor by up to 8 pixels. Returns to rest when cursor leaves.

**Where it applies.**

- The "BOOK A CALL" CTA in `CTASection.tsx`
- The "LET'S TALK" CTA in `FloatingNav.tsx`
- The "Connect" CTA in `ProfileSection.tsx`
- The new "BOOK A CALL" CTA in `HeroSection.tsx` (added in C-HERO-04)

**Implementation notes.**

- Use a small custom hook `useMagnetic` that tracks cursor distance from the button center.
- Apply a CSS transform (`translate(x, y)`) capped at 8 pixels in any direction.
- Disable on touch devices (use `(pointer: fine)` media query or feature detection).
- Respect `prefers-reduced-motion`.

### 5.2 Scroll Progress Bar (B-PROG)

**What it does.** A 2-pixel-tall red bar at the very top of the viewport. Fills from 0% to 100% as the user scrolls from top of page to bottom.

**Implementation notes.**

- Place inside `App.tsx` so it appears across every route.
- Color: `#ef4444` (brand red).
- Position: `fixed top: 0`, full width, `z-index: 100` (above FloatingNav at z-50).
- Use `framer-motion`'s `useScroll` and `useTransform` for smooth animation. Already a dependency.
- Add `aria-hidden="true"` since it is decorative.

### 5.3 3D Tilt on Cards (B-TILT)

**What it does.** Cards subtly tilt toward the cursor on hover. Maximum tilt: 6 degrees on each axis. Smooth easing, no harsh edges.

**Where it applies.**

- Profile experience cards (`ProfileSection.tsx`)
- Past Projects cards (`PastProjectsSection.tsx`)
- Case Studies cards (`CaseStudiesSection.tsx`)
- Process phase cards (`ProcessSection.tsx`)

**Implementation notes.**

- Use a small custom hook `useTilt` that tracks cursor position relative to card center.
- Apply via CSS `transform: perspective(1000px) rotateX() rotateY()`.
- Reset to 0 on mouse leave with a 300ms ease-out.
- Disable on touch devices and respect `prefers-reduced-motion`.
- Cap effect at 6 degrees so it stays subtle.

---

## 6. Architecture and Components

### New files to create

| Path | Purpose |
|---|---|
| `src/hooks/useMagnetic.ts` | Reusable hook for magnetic CTA effect |
| `src/hooks/useTilt.ts` | Reusable hook for 3D tilt effect |
| `src/components/ScrollProgressBar.tsx` | Top-of-viewport scroll progress indicator |

### Files to modify

| Path | Changes |
|---|---|
| `src/App.tsx` | Mount `<ScrollProgressBar />` at the top |
| `src/components/HeroSection.tsx` | C-HERO-01 through C-HERO-05, BUG-05, integrate `useMagnetic` |
| `src/components/ProfileSection.tsx` | C-PROF-01 through C-PROF-04, BUG-01, integrate `useTilt` and `useMagnetic` |
| `src/components/AboutSection.tsx` | C-ABOUT-01 through C-ABOUT-04 |
| `src/components/SystemsSection.tsx` | C-SYS-01 through C-SYS-03, BUG-04 |
| `src/components/PastProjectsSection.tsx` | C-PAST-01, C-PAST-02, integrate `useTilt` |
| `src/components/CaseStudiesSection.tsx` | C-CASE-01 through C-CASE-03, integrate `useTilt` |
| `src/components/ProcessSection.tsx` | C-PROC-01 through C-PROC-03, integrate `useTilt` |
| `src/components/TechStackSection.tsx` | C-TECH-01 through C-TECH-04 |
| `src/components/TestimonialSection.tsx` | C-TEST-01 through C-TEST-04 |
| `src/components/FAQSection.tsx` | C-FAQ-01 through C-FAQ-04 |
| `src/components/CTASection.tsx` | C-CTA-01 through C-CTA-03, integrate `useMagnetic` |
| `src/components/Footer.tsx` | BUG-02, BUG-03, BUG-07, BUG-08 |
| `src/components/FloatingNav.tsx` | BUG-06, BUG-08, integrate `useMagnetic` |

### Open inputs needed from Bryan

These items in the spec require Bryan to provide content during implementation. Flag and ask if not provided.

1. **C-TEST-01:** Real first and last names for the 10 testimonial authors, OR explicit approval of fallback Path B.
2. **C-TECH-02:** Keep or drop Lovable.dev and Aura.build from the stack.
3. **BUG-03:** Real X handle and any other social URLs Bryan wants linked. Already have LinkedIn.
4. **C-CASE-01:** Confirmation that Better Body Academy, Disruptors Media, and AI Tech Solutions are okay to name publicly with these specific outcome numbers.

---

## 7. Acceptance Criteria

### Category 1 (Bug Fixes)

- [ ] All `mailto:` links resolve to `bryansumaitofficial@gmail.com`
- [ ] No `href="#"` exists in production code
- [ ] Section labels read 01 through 11 with no duplicates
- [ ] Zero em-dashes in any visible copy
- [ ] FloatingNav has 5 items including a Work link
- [ ] Footer has no commented-out code blocks
- [ ] Brand name written as "SUMAIT.AI" in all locations

### Category 2 (Copy Surgery)

- [ ] Every visible sentence is under 20 words
- [ ] Zero dashes in any copy
- [ ] Bryan's role is consistently "founder of a team," not "I build"
- [ ] Profile timeline includes a 2026 Cortex v4.0 entry
- [ ] Testimonials either show real names or are restructured per Path B
- [ ] FAQ includes a pricing question and a geography question
- [ ] Process headline matches FAQ on timeline
- [ ] CTA section shows 4 stats including "12 active clients"

### Category 3 (Beautification)

- [ ] Magnetic CTA effect works on all 4 specified buttons
- [ ] Scroll progress bar fills smoothly from 0% to 100% on scroll
- [ ] Card tilt works on Profile, Past Projects, Case Studies, Process cards
- [ ] All effects respect `prefers-reduced-motion`
- [ ] All effects are disabled on touch devices

### Cross-cutting quality gates

- [ ] All four breakpoints render correctly (375, 560, 900, 1200+)
- [ ] WCAG AA contrast on all text and buttons
- [ ] Lighthouse mobile performance score not lower than baseline
- [ ] No new console errors
- [ ] No new TypeScript errors

---

## 8. Out of Scope (explicit list, do not touch)

- The Spline 3D iframe in the hero
- The CustomCursor component
- The 4-column grid system
- The brand palette (black, red, white)
- Typography choices (Syne, JetBrains Mono, body)
- The four deep-dive project pages (Automation, Chat, Voice, Vibecoded)
- The LogoMarquee
- Performance optimization beyond "do no harm" (we are not removing the Spline iframe even though it is heavy)

---

## 9. Risks and Open Questions

| Risk | Severity | Mitigation |
|---|---|---|
| Testimonial restructure (C-TEST-01) requires content Bryan does not have on hand | High | Default to Path B if names are not provided within 24h of implementation start |
| Renumbering sections (BUG-04) cascades through multiple files and could miss a label | Medium | Implementation plan includes a grep audit step for "/// " patterns after renumbering |
| Tilt + magnetic effects could feel heavy if both fire on the same element | Low | Tilt applies only to cards, magnetic only to buttons. No overlap. |
| 3D tilt on cards inside a section that also has framer-motion scroll reveal could fight transforms | Medium | Test interaction during implementation; if conflict, fall back to tilt-only on hover state |

---

## 10. Implementation Order (rough)

This is a hint for the writing-plans phase, not a final plan.

1. **Phase 1: Bug Fixes (Category 1).** Fastest to ship, removes embarrassments.
2. **Phase 2: Copy Surgery (Category 2).** Highest credibility impact.
3. **Phase 3: Beautification (Category 3).** Polish layer, ships last.

Each phase committed separately. Each phase deployed to a Vercel preview before merging to main.
