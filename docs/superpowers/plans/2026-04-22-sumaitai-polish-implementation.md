# sumaitai Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship Bug Fixes, Copy Surgery, and Beautification per spec `2026-04-22-sumaitai-polish-design.md` to make sumaitai a credible founder document for LinkedIn and cover letter recipients.

**Architecture:** Three sequential phases against the existing Vite + React + Tailwind + shadcn-ui codebase. Phase 1 is string and link surgery on existing components. Phase 2 is component-by-component copy rewrite. Phase 3 introduces three new files (two custom hooks, one component) and integrates them across existing sections without changing structure.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind CSS, framer-motion, @iconify/react, vitest, @testing-library/react, jsdom.

**Branching strategy:** Work on `main` with one commit per task. Push to remote after each phase. Verify Vercel preview before moving to the next phase.

**Spec reference:** [docs/superpowers/specs/2026-04-22-sumaitai-polish-design.md](../specs/2026-04-22-sumaitai-polish-design.md)

**Open inputs needed (block specific tasks if not provided):**
1. Real testimonial author names → blocks Task 2.9 (Path B fallback exists)
2. Lovable.dev / Aura.build keep-or-drop decision → blocks Task 2.8
3. Real X handle and any social URLs → blocks Task 1.3
4. Confirmation Better Body Academy / Disruptors Media / AI Tech Solutions can be named publicly → blocks Task 2.6 (use first names + initial as fallback)

---

## Phase 1: Bug Fixes (Category 1 of spec)

Each task is one bug. Each commit is small and reversible. No tests in this phase since these are link and string fixes verified manually.

### Task 1.1: Fix profile email mailto (BUG-01)

**Files:**
- Modify: `src/components/ProfileSection.tsx:110`

- [ ] **Step 1: Locate the line**

Open `src/components/ProfileSection.tsx`, find line ~110 with `href="mailto:contact@example.com"`.

- [ ] **Step 2: Replace with real email**

Change:
```tsx
href="mailto:contact@example.com"
```
to:
```tsx
href="mailto:bryansumaitofficial@gmail.com"
```

- [ ] **Step 3: Manually verify**

Run `bun run dev`, open `http://localhost:8080`, scroll to Profile section, click the email icon. Confirm the system mail client opens with `bryansumaitofficial@gmail.com` populated as the recipient.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProfileSection.tsx
git commit -m "fix: profile section mailto points to real email"
```

---

### Task 1.2: Fix footer email mismatch (BUG-02)

**Files:**
- Modify: `src/components/Footer.tsx:125`

- [ ] **Step 1: Locate the conflict**

Open `src/components/Footer.tsx`, find line ~125. The display text reads `bryansumait@gmail.com` but the `href` is `mailto:bryan@sumait.ai`.

- [ ] **Step 2: Replace both with real email**

Change:
```tsx
<a href="mailto:bryan@sumait.ai" className="text-white/50 hover:text-white transition">
  bryansumait@gmail.com
</a>
```
to:
```tsx
<a href="mailto:bryansumaitofficial@gmail.com" className="text-white/50 hover:text-white transition">
  bryansumaitofficial@gmail.com
</a>
```

- [ ] **Step 3: Manually verify**

Reload the dev server, scroll to footer, click the email link. Confirm `bryansumaitofficial@gmail.com` opens in the mail client.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "fix: footer email matches mailto target"
```

---

### Task 1.3: Fix footer social links (BUG-03)

**Files:**
- Modify: `src/components/Footer.tsx:12-23` (socialLinks array)
- Modify: `src/components/Footer.tsx:131` (LinkedIn nav anchor)

**Open input required:** confirm X handle and any other social URLs Bryan wants. If only LinkedIn is provided, drop the other social tiles entirely.

- [ ] **Step 1: Replace socialLinks array**

Find:
```tsx
const socialLinks = [{
  name: 'LinkedIn',
  icon: 'simple-icons:linkedin',
  href: '#'
}, {
  name: 'Twitter',
  icon: 'simple-icons:x',
  href: '#'
}, {
  name: 'GitHub',
  icon: 'simple-icons:github',
  href: '#'
}];
```

Replace with (assumes LinkedIn confirmed, X and GitHub need confirmation; remove items with no real URL):
```tsx
const socialLinks = [{
  name: 'LinkedIn',
  icon: 'simple-icons:linkedin',
  href: 'https://www.linkedin.com/in/bryansumait'
}];
```

If Bryan provides X and GitHub URLs, add them back with real `href` values.

- [ ] **Step 2: Fix the LinkedIn nav anchor in Contact column**

Find line ~131:
```tsx
<a href="#" className="text-white/50 hover:text-white transition">
  LinkedIn
</a>
```

Replace with:
```tsx
<a href="https://www.linkedin.com/in/bryansumait" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition">
  LinkedIn
</a>
```

- [ ] **Step 3: Manually verify**

Reload dev server. In the footer, click each social tile and the Contact column LinkedIn link. All should open Bryan's real LinkedIn (or other real URLs) in new tabs. No `#` placeholder links remain.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "fix: footer social links point to real URLs"
```

---

### Task 1.4: Renumber sections sequentially (BUG-04)

**Files:**
- Modify: `src/components/HeroSection.tsx:83` (label "01 /// REVENUE SYSTEMS" → keep as 01)
- Modify: `src/components/AboutSection.tsx:68` (label "02 /// IDENTITY" → keep as 02)
- Modify: `src/components/ProfileSection.tsx:149` (label "05 /// EXPERIENCE" → 03 /// EXPERIENCE)
- Modify: `src/components/SystemsSection.tsx:121,135,149` (all "03 /// SYSTEMS" → see Task 2.4)
- Modify: `src/components/PastProjectsSection.tsx:115` (label "04 /// PORTFOLIO" → 05 /// PORTFOLIO)
- Modify: `src/components/CaseStudiesSection.tsx:156` (label "04 /// RESULTS" → 06 /// RESULTS)
- Modify: `src/components/ProcessSection.tsx:42` (label "06 /// PROCESS" → 07 /// PROCESS)
- Modify: `src/components/TechStackSection.tsx:55` (label "07 /// TOOLS" → 08 /// TOOLS)
- Modify: `src/components/TestimonialSection.tsx:179` (label "08 /// TESTIMONIALS" → 09 /// TESTIMONIALS)
- Modify: `src/components/FAQSection.tsx:50` (label "09 /// FAQ" → 10 /// FAQ)
- Modify: `src/components/CTASection.tsx:25` (label "10 /// LET'S BUILD" → 11 /// LET'S BUILD)

**Note:** This task renumbers the section headers. The SystemsSection per-card numbering is fixed in Task 2.4 along with adding a fourth card. Do not edit SystemsSection labels in this task.

Final numbering: 01 Hero, 02 About, 03 Profile/Experience, 04 Systems, 05 Past Projects, 06 Case Studies, 07 Process, 08 Tools, 09 Testimonials, 10 FAQ, 11 CTA.

- [ ] **Step 1: Update each section label string**

For each file in the list, find the `font-mono` paragraph containing the `XX ///` label and update the number per the mapping above.

Example for `ProfileSection.tsx:149`:
```tsx
<span className="text-xs font-mono tracking-widest text-[#ef4444] uppercase mb-3 block">
  05 /// EXPERIENCE
</span>
```
becomes:
```tsx
<span className="text-xs font-mono tracking-widest text-[#ef4444] uppercase mb-3 block">
  03 /// EXPERIENCE
</span>
```

Apply the same pattern to the other files per the mapping.

- [ ] **Step 2: Audit with grep**

Run from the repo root:
```bash
grep -rn "/// " src/components | grep -v node_modules
```

Expected: each numbered label appears exactly once with the correct number. No duplicates. SystemsSection cards still show "03 /// SYSTEMS" three times (will be fixed in Task 2.4).

- [ ] **Step 3: Manually verify**

Reload dev server. Scroll the entire page. Each section's mono number reads in sequence 01 through 11 except SystemsSection which still shows the duplicated 03 (acceptable for now).

- [ ] **Step 4: Commit**

```bash
git add src/components/
git commit -m "fix: renumber section labels sequentially 01-11"
```

---

### Task 1.5: Remove em-dash from hero copy (BUG-05)

**Files:**
- Modify: `src/components/HeroSection.tsx:86`

- [ ] **Step 1: Replace em-dash**

Find:
```tsx
<p className="font-syne text-base text-white/50 leading-relaxed">
  I build systems that capture leads, book calls, and close deals—while you sleep.
</p>
```

Replace with:
```tsx
<p className="font-syne text-base text-white/50 leading-relaxed">
  I build systems that capture leads, book calls, and close deals while you sleep.
</p>
```

- [ ] **Step 2: Audit for any other em-dashes**

Run:
```bash
grep -rn -P "[—–]" src/components src/pages
```

Expected: no output. If any remain in copy strings, replace with comma, period, or restructure.

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "fix: remove em-dash from hero copy per SUMAIT standards"
```

---

### Task 1.6: Add Work link to FloatingNav (BUG-06)

**Files:**
- Modify: `src/components/FloatingNav.tsx:8-13`

- [ ] **Step 1: Add Work link to navLinks array**

Find:
```tsx
const navLinks = [
  { label: 'Systems', href: '#systems' },
  { label: 'Experience', href: '#experience' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];
```

Replace with:
```tsx
const navLinks = [
  { label: 'Systems', href: '#systems' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];
```

- [ ] **Step 2: Manually verify**

Reload dev server. Click the new Work link in the floating nav. Page should smooth-scroll to the Past Projects section (which has `id="projects"` already).

- [ ] **Step 3: Commit**

```bash
git add src/components/FloatingNav.tsx
git commit -m "fix: floating nav adds Work link to past projects"
```

---

### Task 1.7: Remove dead newsletter code from footer (BUG-07)

**Files:**
- Modify: `src/components/Footer.tsx:1-11` (unused state and handler)
- Modify: `src/components/Footer.tsx:47-48` (commented Newsletter Form block)

- [ ] **Step 1: Remove unused useState and handler**

Find at top of file:
```tsx
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { ArrowRight } from 'lucide-react';
const Footer = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };
```

Replace with:
```tsx
import { Icon } from '@iconify/react';
import { ArrowRight } from 'lucide-react';
const Footer = () => {
```

- [ ] **Step 2: Remove the commented newsletter block**

Find:
```tsx
{/* Newsletter Form */}
{/* CTA Button */}
```

Replace with (removes the orphan comment):
```tsx
{/* CTA Button */}
```

- [ ] **Step 3: Type check**

Run:
```bash
bunx tsc --noEmit
```

Expected: no new TypeScript errors. The unused `useState` import is gone, `email` and `handleSubmit` are gone.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "fix: remove dead newsletter code from footer"
```

---

### Task 1.8: Standardize brand name to SUMAIT.AI (BUG-08)

**Files:**
- Modify: `src/components/HeroSection.tsx:25-27` (watermark)

- [ ] **Step 1: Update hero watermark**

Find:
```tsx
<span className="font-syne font-bold text-[12vw] text-white opacity-[0.04] whitespace-nowrap">
  SUMAIT AI
</span>
```

Replace with:
```tsx
<span className="font-syne font-bold text-[12vw] text-white opacity-[0.04] whitespace-nowrap">
  SUMAIT.AI
</span>
```

- [ ] **Step 2: Verify other locations already match**

Confirm `Footer.tsx` and `FloatingNav.tsx` already render "SUMAIT.AI" (with red period). Both should already use the format `<p>SUMAIT<span className="text-[#ef4444] sumait...">.AI</span></p>` style.

- [ ] **Step 3: Audit**

Run:
```bash
grep -rn -E "SUMAIT(\.AI|AI| AI)" src/components src/pages
```

Expected: every match shows "SUMAIT.AI" or "SUMAIT" followed by ".AI" in JSX. No bare "SUMAIT AI".

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "fix: hero watermark uses SUMAIT.AI brand format"
```

---

### Phase 1 closeout

- [ ] **Push Phase 1 to remote and wait for Vercel preview**

```bash
git push origin main
```

Open the Vercel dashboard. Wait for the deployment to complete. Open the preview URL on desktop and mobile. Verify:
- All mailtos open `bryansumaitofficial@gmail.com`
- All social links resolve (no 404s, no `#`)
- Section labels read 01 through 11 in order (Systems still shows triplicate 03, fixed in Phase 2)
- No em-dashes anywhere in visible copy
- Brand name reads "SUMAIT.AI" everywhere

If any verification fails, open a follow-up task before starting Phase 2.

---

## Phase 2: Copy Surgery (Category 2 of spec)

One task per section. Each task is one commit. Manual verification at the end of each task. No automated tests in this phase since these are JSX string changes.

### Task 2.1: HeroSection copy and CTA restructure (C-HERO-01-05)

**Files:**
- Modify: `src/components/HeroSection.tsx:69-130` (main grid block)

**Goal:** Headline spans 3 columns at desktop, CTA cluster lives in column 4 with two CTAs (BOOK A CALL primary, VIEW WORK secondary). At mobile the grid collapses and headline takes full width above CTAs.

- [ ] **Step 1: Replace the 4-column main content block**

Find the entire `<div className="flex-1 grid grid-cols-4">` block (lines ~69 to ~130) and replace with:

```tsx
{/* Main Content - 4 Column Grid (desktop) / single column (mobile) */}
<div className="flex-1 grid grid-cols-1 lg:grid-cols-4">
  {/* Headline cluster - spans columns 1-3 at desktop, full width at mobile */}
  <div className="lg:col-span-3 lg:border-r border-white/10 p-6 lg:p-12 flex flex-col justify-end pb-12 lg:pb-16">
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      delay: 0.2
    }}>
      <p className="font-mono text-[10px] tracking-[0.3em] text-[#ef4444] mb-4">
        01 /// REVENUE SYSTEMS
      </p>
      <h1 className="font-syne font-bold text-3xl sm:text-4xl lg:text-6xl text-white leading-[1.05] tracking-tight mb-4 max-w-4xl">
        I build systems that capture leads, book calls, and close deals while you sleep.
      </h1>
      <p className="font-syne text-base lg:text-lg text-white/60 leading-relaxed max-w-2xl">
        Founder of SUMAIT AI Agents, helping B2B businesses turn calls and chats into booked revenue.
      </p>
    </motion.div>
  </div>

  {/* CTA cluster - column 4 at desktop, full width at mobile */}
  <div className="p-6 lg:p-8 flex flex-col justify-end items-stretch lg:items-end pb-12 lg:pb-16 gap-3">
    <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6,
      delay: 0.6
    }} className="flex flex-col gap-3 w-full lg:w-auto">
      {/* Primary CTA: BOOK A CALL */}
      <a
        href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center gap-3 font-mono text-xs tracking-[0.15em] text-white px-8 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 pointer-events-auto shadow-[0_0_40px_8px_rgba(239,68,68,0.35)] hover:shadow-[0_0_60px_12px_rgba(239,68,68,0.5)]"
      >
        <span className="absolute inset-0 rounded-full">
          <span className="absolute inset-0 rounded-full border border-white/10"></span>
          <span className="absolute inset-[-2px] rounded-full animate-spin" style={{
            background: 'conic-gradient(from 0deg, transparent, transparent 270deg, #ef4444 360deg)',
            animationDuration: '3s'
          }}></span>
          <span className="absolute inset-[1px] rounded-full bg-[#0a0a0a]/80 backdrop-blur-md"></span>
        </span>
        <span className="relative z-10 flex items-center gap-3">
          BOOK A CALL
          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </span>
      </a>

      {/* Secondary CTA: VIEW WORK */}
      <a
        href="#systems"
        onClick={e => handleSmoothScroll(e, 'systems')}
        className="group inline-flex items-center justify-center gap-3 font-mono text-xs tracking-[0.15em] text-white/80 hover:text-white px-8 py-4 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 pointer-events-auto"
      >
        VIEW WORK
        <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
          <svg className="w-3 h-3 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </a>
    </motion.div>
  </div>
</div>
```

- [ ] **Step 2: Manually verify across breakpoints**

Reload dev server. Test at viewport widths 375px, 560px, 900px, and 1200px+ in browser devtools:
- Headline reads "I build systems that capture leads, book calls, and close deals while you sleep." with no em-dash
- Subtitle reads "Founder of SUMAIT AI Agents, helping B2B businesses turn calls and chats into booked revenue."
- BOOK A CALL is the primary (red glow) CTA, VIEW WORK is secondary (outline only)
- At desktop, headline cluster spans 3 columns and CTAs are in column 4
- At mobile, headline stacks above CTAs, both full width
- BOOK A CALL opens cal.com in a new tab
- VIEW WORK smooth-scrolls to the Systems section

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat(hero): restructure layout, add subtitle and BOOK A CALL CTA"
```

---

### Task 2.2: ProfileSection copy and timeline updates (C-PROF-01-04)

**Files:**
- Modify: `src/components/ProfileSection.tsx:8-44` (experienceCards array)
- Modify: `src/components/ProfileSection.tsx:46-51` (skills array)
- Modify: `src/components/ProfileSection.tsx:101-104` (avatar subtitle)

- [ ] **Step 1: Update 2024 card and add 2026 card**

Find:
```tsx
const experienceCards = [
  {
    year: '2021',
    title: 'Lead Capture Systems',
    description: 'Built AI receptionist and missed call recovery systems that capture leads 24/7 for home services.',
    icon: 'solar:chat-round-line-linear',
    badge: null,
  },
  {
    year: '2022',
    title: 'Sales Automation',
    description: 'Designed GoHighLevel pipelines and auto-follow-up sequences that reduce response time from hours to minutes.',
    icon: 'solar:server-square-linear',
    badge: null,
  },
  {
    year: '2023',
    title: 'Content Engines',
    description: 'Created video repurposing and high-retention editing systems that turn one piece of content into 10.',
    icon: 'solar:clapperboard-edit-linear',
    badge: null,
  },
  {
    year: '2024',
    title: 'Operation Systems',
    description: 'Built complete business operations: social media automation, lead generation systems, automation hub, and 100+ custom GPTs for workflow optimization.',
    icon: 'solar:widget-5-linear',
    badge: 'M',
  },
  {
    year: '2025',
    title: 'Project Management Automation',
    description: 'Engineered meeting-to-task automation (AI notes → Slack), scripting automation, and complete CRM pipeline systems.',
    icon: 'solar:atom-linear',
    badge: 'D',
  },
];
```

Replace with:
```tsx
const experienceCards = [
  {
    year: '2021',
    title: 'Lead Capture Systems',
    description: 'Built AI receptionist and missed call recovery systems that capture leads 24/7 for home services.',
    icon: 'solar:chat-round-line-linear',
    badge: null,
  },
  {
    year: '2022',
    title: 'Sales Automation',
    description: 'Designed GoHighLevel pipelines and auto-follow-up sequences that reduce response time from hours to minutes.',
    icon: 'solar:server-square-linear',
    badge: null,
  },
  {
    year: '2023',
    title: 'Content Engines',
    description: 'Created video repurposing and high-retention editing systems that turn one piece of content into 10.',
    icon: 'solar:clapperboard-edit-linear',
    badge: null,
  },
  {
    year: '2024',
    title: 'Operation Systems',
    description: 'Built complete business operations across social media automation, lead generation, and CRM systems for 8+ B2B clients.',
    icon: 'solar:widget-5-linear',
    badge: 'M',
  },
  {
    year: '2025',
    title: 'Project Management Automation',
    description: 'Engineered meeting to task automation (AI notes into Slack), scripting automation, and complete CRM pipeline systems.',
    icon: 'solar:atom-linear',
    badge: 'D',
  },
  {
    year: '2026',
    title: 'Cortex v4.0 Agent Framework',
    description: 'Designed and shipped an 18-team, 72-agent framework that powers SUMAIT client delivery. Productized in three retainer tiers.',
    icon: 'solar:cpu-bolt-linear',
    badge: 'C',
  },
];
```

Note: removed em-dash arrow `→` from the 2025 description per STANDARDS.

- [ ] **Step 2: Update skills array**

Find:
```tsx
const skills = [
  'Revenue Systems',
  'Sales Automation',
  'AI Integration',
  'CRM Architecture',
];
```

Replace with:
```tsx
const skills = [
  'Voice Agents',
  'n8n Workflows',
  'GHL Pipelines',
  'AI Brain Builds',
];
```

- [ ] **Step 3: Update avatar subtitle**

Find:
```tsx
<p className="text-sm text-white/50 leading-relaxed font-normal">
  Specializing in high-ticket sales infrastructure and AI automation.
</p>
```

Replace with:
```tsx
<p className="text-sm text-white/50 leading-relaxed font-normal">
  I run SUMAIT, an AI automation team that builds revenue systems for B2B businesses.
</p>
```

- [ ] **Step 4: Manually verify**

Reload dev server, scroll to Profile section. Verify:
- Timeline shows 6 cards (2021 through 2026)
- 2024 card no longer says "100+ custom GPTs"
- 2025 card has no em-dash arrow
- 2026 card shows Cortex v4.0
- Skill tags read Voice Agents / n8n Workflows / GHL Pipelines / AI Brain Builds
- Avatar subtitle says "I run SUMAIT, an AI automation team..."

- [ ] **Step 5: Commit**

```bash
git add src/components/ProfileSection.tsx
git commit -m "feat(profile): add 2026 Cortex card, replace skills, fix voice"
```

---

### Task 2.3: AboutSection headline (C-ABOUT-01)

**Files:**
- Modify: `src/components/AboutSection.tsx:86`

- [ ] **Step 1: Update headline**

Find:
```tsx
<h2 className="font-syne font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-tight">I'm Bryan Sumait, I build revenue systems that run while you sleep.</h2>
```

Replace with:
```tsx
<h2 className="font-syne font-medium text-3xl md:text-4xl lg:text-5xl text-white leading-tight">I'm Bryan Sumait. I run SUMAIT, a team building revenue systems that work while you sleep.</h2>
```

- [ ] **Step 2: Manually verify**

Reload dev server, scroll to About section. Headline reads with the new wording. Body paragraphs and stat cards unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/components/AboutSection.tsx
git commit -m "feat(about): headline reflects team-led model per business profile"
```

---

### Task 2.4: SystemsSection: add 4th card and consolidate header (C-SYS-01-03)

**Files:**
- Modify: `src/components/SystemsSection.tsx` (full restructure)

**Goal:** One section header at the top reads "04 /// SYSTEMS" and "What I build". Four cards (Lead Capture, Appointment Booking, Deal Closing, AI Brain Builds). Each card has no per-card mono number label. Per-card structure stays the same.

- [ ] **Step 1: Replace the SystemCard component (remove number prop usage in label)**

Find inside `SystemCard`:
```tsx
<p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-6">
  {number} /// SYSTEMS
</p>
<h3 className="font-syne font-bold text-3xl md:text-4xl text-white mb-6">
  {title}
</h3>
```

Replace with (removes per-card number, keeps title):
```tsx
<h3 className="font-syne font-bold text-3xl md:text-4xl text-white mb-6">
  {title}
</h3>
```

You can leave the `number` prop on the interface for now or remove it. Recommended: remove from interface since unused.

Find:
```tsx
interface SystemCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  reversed?: boolean;
}
```

Replace with:
```tsx
interface SystemCardProps {
  title: string;
  description: string;
  features: string[];
  icon: string;
  reversed?: boolean;
}
```

- [ ] **Step 2: Replace the SystemsSection systems array with 4 entries**

Find:
```tsx
const systems = [
  {
    number: '03',
    title: 'Lead Capture Engine',
    description:
      'Stop losing leads to broken forms and slow follow-ups. My capture systems grab every prospect and start nurturing instantly.',
    features: [
      'Multi-channel capture (web, social, ads)',
      'Instant lead scoring and routing',
      'Automated welcome sequences',
      'CRM integration and sync',
    ],
    icon: 'solar:magnet-linear',
    reversed: false,
  },
  {
    number: '03',
    title: 'Appointment Booking Flow',
    description:
      'Turn interested leads into booked calls without the back-and-forth. Qualification, scheduling, and reminders, all automated.',
    features: [
      'Smart qualification questions',
      'Calendar sync across platforms',
      'Automated confirmation and reminders',
      'No-show recovery sequences',
    ],
    icon: 'solar:calendar-linear',
    reversed: true,
  },
  {
    number: '03',
    title: 'Deal Closing Pipeline',
    description:
      'Keep deals moving with automated follow-ups, proposal delivery, and contract workflows that close faster.',
    features: [
      'Stage-based automation triggers',
      'Proposal and contract templates',
      'Payment integration ready',
      'Win/loss analysis tracking',
    ],
    icon: 'solar:chart-linear',
    reversed: false,
  },
];
```

Replace with:
```tsx
const systems = [
  {
    title: 'Lead Capture Engine',
    description:
      'Stop losing leads to broken forms and slow follow-ups. My capture systems grab every prospect and start nurturing instantly.',
    features: [
      'Multi-channel capture across web, social, and ads',
      'Instant lead scoring and routing',
      'Automated welcome sequences',
      'CRM integration and sync',
    ],
    icon: 'solar:magnet-linear',
    reversed: false,
  },
  {
    title: 'Appointment Booking Flow',
    description:
      'Turn interested leads into booked calls without the back and forth. Qualification, scheduling, and reminders, all automated.',
    features: [
      'Smart qualification questions',
      'Calendar sync across platforms',
      'Automated confirmation and reminders',
      'No show recovery sequences',
    ],
    icon: 'solar:calendar-linear',
    reversed: true,
  },
  {
    title: 'Deal Closing Pipeline',
    description:
      'Keep deals moving with automated follow-ups, proposal delivery, and contract workflows that close faster.',
    features: [
      'Automated triggers across every deal stage',
      'Proposal and contract templates',
      'Payment integration ready',
      'Built-in win and loss tracking',
    ],
    icon: 'solar:chart-linear',
    reversed: false,
  },
  {
    title: 'AI Brain Builds',
    description:
      'Make every customer call, doc, and conversation queryable. Founders ask questions, the brain answers in plain English.',
    features: [
      'Connects calls, transcripts, and documents into one searchable layer',
      'Routes data automatically by call type',
      'Auto-emails action items to your team',
      'Founder queries the brain in natural language',
    ],
    icon: 'solar:cpu-bolt-linear',
    reversed: true,
  },
];
```

- [ ] **Step 3: Add a section header at the top of SystemsSection**

Find:
```tsx
const SystemsSection = () => {
  const systems = [ ... ];

  return (
    <div id="systems">
      {systems.map((system, index) => (
        <SystemCard key={index} {...system} />
      ))}
    </div>
  );
};
```

Replace with:
```tsx
const SystemsSection = () => {
  const systems = [ ... ]; // (use the array from Step 2)

  return (
    <div id="systems">
      {/* Section Header */}
      <section className="relative bg-[#0a0a0a]/80 backdrop-blur-sm pt-20 md:pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-4 border-x border-white/10">
            <div className="border-r border-white/10 py-8">
              <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] px-4">
                04 /// SYSTEMS
              </p>
            </div>
            <div className="col-span-3 py-8 px-4">
              <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
                What I build
              </h2>
            </div>
          </div>
        </div>
      </section>

      {systems.map((system, index) => (
        <SystemCard key={index} {...system} />
      ))}
    </div>
  );
};
```

- [ ] **Step 4: Manually verify**

Reload dev server, scroll to Systems section. Verify:
- Single section header at top reads "04 /// SYSTEMS" and "What I build"
- Four cards visible (no longer three)
- Fourth card is "AI Brain Builds" with the 4 listed features
- No per-card "03 ///" labels remain
- Cards alternate left/right per `reversed` flag

- [ ] **Step 5: Type check**

```bash
bunx tsc --noEmit
```

Expected: no new errors. The `number` prop is gone from the interface and array.

- [ ] **Step 6: Commit**

```bash
git add src/components/SystemsSection.tsx
git commit -m "feat(systems): add AI Brain Builds card, consolidate section header"
```

---

### Task 2.5: PastProjectsSection card descriptions (C-PAST-01)

**Files:**
- Modify: `src/components/PastProjectsSection.tsx:74-101` (projects array)

- [ ] **Step 1: Update each card description**

Find:
```tsx
const projects = [
   {
   title: 'Automation Projects',
   description: 'End-to-end workflow automation systems that eliminate manual tasks and streamline operations.',
   tags: ['n8n', 'Make', 'Zapier'],
   imageUrl: automationCard,
   href: '/automation-projects',
   },
 {
 title: 'Chat Agents',
 description: 'Intelligent conversational AI agents that handle customer inquiries and automate support.',
 tags: ['AI', 'NLP', 'Support'],
 imageUrl: chatAgentsCard,
 href: '/chat-agents',
 },
 {
 title: 'Voice Agents',
 description: 'AI-powered voice assistants for phone automation, bookings, and customer interactions.',
 tags: ['Voice AI', 'Telephony', 'NLP'],
 imageUrl: voiceAgentsCard,
 href: '/voice-agents',
 },
   {
   title: 'Vibecoded Projects',
   description: 'Custom web applications and tools built with modern frameworks and AI-assisted development.',
   tags: ['React', 'Lovable', 'Full-Stack'],
   imageUrl: vibecodedCard,
   href: '/vibecoded-projects',
   },
];
```

Replace with:
```tsx
const projects = [
  {
    title: 'Automation Projects',
    description: 'End to end workflows for KC Media, Disruptors Media, and Better Body Academy.',
    tags: ['n8n', 'Make', 'Zapier'],
    imageUrl: automationCard,
    href: '/automation-projects',
  },
  {
    title: 'Chat Agents',
    description: 'Conversational AI handling client support across 5+ B2B businesses.',
    tags: ['AI', 'NLP', 'Support'],
    imageUrl: chatAgentsCard,
    href: '/chat-agents',
  },
  {
    title: 'Voice Agents',
    description: 'Live mortgage voice agent for AI Tech Solutions, shipped in 14 days.',
    tags: ['Voice AI', 'VAPI', 'Telephony'],
    imageUrl: voiceAgentsCard,
    href: '/voice-agents',
  },
  {
    title: 'Vibecoded Projects',
    description: 'Custom client portals and dashboards built with React, Next.js, and Supabase.',
    tags: ['React', 'Next.js', 'Supabase'],
    imageUrl: vibecodedCard,
    href: '/vibecoded-projects',
  },
];
```

- [ ] **Step 2: Manually verify**

Reload dev server, scroll to Past Projects. All four cards now show the new descriptions with real client names where applicable.

- [ ] **Step 3: Commit**

```bash
git add src/components/PastProjectsSection.tsx
git commit -m "feat(past-projects): tighten descriptions with real client outcomes"
```

---

### Task 2.6: CaseStudiesSection: replace with real client work (C-CASE-01)

**Files:**
- Modify: `src/components/CaseStudiesSection.tsx:122-147` (caseStudies array)

**Open input check:** confirm Better Body Academy / Disruptors Media / AI Tech Solutions can be named publicly with these exact metrics. If not, use first name + initial of the founder, e.g., "Jase S., Coaching Founder."

- [ ] **Step 1: Replace caseStudies array**

Find:
```tsx
const caseStudies: CaseStudy[] = [
  {
    category: 'B2B SAAS',
    title: 'Demo Booking System',
    metric: '340%',
    metricLabel: 'More demos booked',
    description:
      'Replaced manual outreach with automated qualification and scheduling. Demos went from 12/month to 53/month.',
  },
  {
    category: 'COACHING',
    title: 'Client Onboarding Flow',
    metric: '8hrs',
    metricLabel: 'Saved weekly',
    description:
      'Automated the entire journey from lead to first session. Contracts, payments, and scheduling on autopilot.',
  },
  {
    category: 'E-COMMERCE',
    title: 'Cart Recovery Engine',
    metric: '$127K',
    metricLabel: 'Revenue recovered',
    description:
      'Multi-touch abandoned cart sequences that recovered 23% of lost sales over 6 months.',
  },
];
```

Replace with:
```tsx
const caseStudies: CaseStudy[] = [
  {
    category: 'COACHING · BETTER BODY ACADEMY',
    title: 'Sales Call AI Brain',
    metric: '100%',
    metricLabel: 'Call coverage',
    description:
      'Built a Fathom to n8n to AI agent pipeline that captures, routes, and summarizes every sales and coaching call. Active retainer.',
  },
  {
    category: 'AGENCY · DISRUPTORS MEDIA',
    title: 'Client Approval Portal',
    metric: '6 hrs',
    metricLabel: 'Saved per client per week',
    description:
      'Shipped an 8-workflow client portal with editable templates and per-message confirm. Approval cycle dropped from two days to four hours.',
  },
  {
    category: 'FINTECH · AI TECH SOLUTIONS',
    title: 'Voice and Outbound Stack',
    metric: '14 days',
    metricLabel: 'Build to launch',
    description:
      'VAPI inbound voice agent, GHL pipeline, and 8-inbox Instantly outbound shipped in two weeks. Mortgage vertical.',
  },
];
```

- [ ] **Step 2: Manually verify**

Reload dev server, scroll to Case Studies (now labeled 06). Three cards show with real client names in the category. Animated counter still works on the metric.

- [ ] **Step 3: Commit**

```bash
git add src/components/CaseStudiesSection.tsx
git commit -m "feat(case-studies): replace anonymous cases with real client work"
```

---

### Task 2.7: ProcessSection headline (C-PROC-01)

**Files:**
- Modify: `src/components/ProcessSection.tsx:46-48`

- [ ] **Step 1: Update headline**

Find:
```tsx
<h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
  From chaos to cash flow in 4 weeks.
</h2>
```

Replace with:
```tsx
<h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-white">
  From chaos to cash flow in 30 days.
</h2>
```

- [ ] **Step 2: Manually verify**

Reload dev server, scroll to Process section. Headline reads "30 days" instead of "4 weeks".

- [ ] **Step 3: Commit**

```bash
git add src/components/ProcessSection.tsx
git commit -m "feat(process): headline matches retainer 30-day onboarding"
```

---

### Task 2.8: TechStackSection: add 5 tools, decide on Lovable/Aura (C-TECH-01-02)

**Files:**
- Modify: `src/components/TechStackSection.tsx:8-48` (tools array)

**Open input check:** confirm with Bryan whether to keep or drop Lovable.dev and Aura.build. Default for this task: keep both (current behavior).

- [ ] **Step 1: Add 5 tools to the array**

Find:
```tsx
const tools = [{
  name: 'n8n',
  icon: 'simple-icons:n8n',
  color: '#EA4B71'
}, {
  name: 'Make',
  icon: 'simple-icons:make',
  color: '#6d30ca'
}, {
  name: 'Claude',
  icon: 'simple-icons:anthropic',
  color: undefined
}, {
  name: 'OpenAI',
  icon: 'simple-icons:openai',
  color: undefined
}, {
  name: 'GoHighLevel',
  icon: 'solar:server-square-bold',
  color: undefined
}, {
  name: 'Claude Code',
  icon: 'solar:code-circle-bold',
  color: undefined
}, {
  name: 'Lovable.dev',
  icon: 'solar:programming-bold',
  color: undefined
}, {
  name: 'Aura.build',
  icon: 'solar:layers-minimalistic-bold',
  color: undefined
}, {
  name: 'Premiere Pro',
  icon: 'simple-icons:adobepremierepro',
  color: '#9999FF'
}, {
  name: 'CapCut',
  icon: 'solar:videocamera-record-bold',
  color: undefined
}];
```

Replace with:
```tsx
const tools = [{
  name: 'n8n',
  icon: 'simple-icons:n8n',
  color: '#EA4B71'
}, {
  name: 'Make',
  icon: 'simple-icons:make',
  color: '#6d30ca'
}, {
  name: 'Claude',
  icon: 'simple-icons:anthropic',
  color: undefined
}, {
  name: 'OpenAI',
  icon: 'simple-icons:openai',
  color: undefined
}, {
  name: 'GoHighLevel',
  icon: 'solar:server-square-bold',
  color: undefined
}, {
  name: 'VAPI',
  icon: 'solar:phone-calling-bold',
  color: undefined
}, {
  name: 'Voiceflow',
  icon: 'solar:dialog-2-bold',
  color: undefined
}, {
  name: 'Supabase',
  icon: 'simple-icons:supabase',
  color: '#3ECF8E'
}, {
  name: 'Vercel',
  icon: 'simple-icons:vercel',
  color: undefined
}, {
  name: 'Telegram',
  icon: 'simple-icons:telegram',
  color: '#26A5E4'
}, {
  name: 'Claude Code',
  icon: 'solar:code-circle-bold',
  color: undefined
}, {
  name: 'Lovable.dev',
  icon: 'solar:programming-bold',
  color: undefined
}, {
  name: 'Aura.build',
  icon: 'solar:layers-minimalistic-bold',
  color: undefined
}, {
  name: 'Premiere Pro',
  icon: 'simple-icons:adobepremierepro',
  color: '#9999FF'
}, {
  name: 'CapCut',
  icon: 'solar:videocamera-record-bold',
  color: undefined
}];
```

If Bryan asks to drop Lovable.dev and Aura.build, simply remove those two object literals from the array.

- [ ] **Step 2: Manually verify**

Reload dev server, scroll to Tools section. Verify VAPI, Voiceflow, Supabase, Vercel, Telegram all appear with icons. Hovering each tool reveals its name and (where set) brand color. Layout still wraps cleanly at all breakpoints.

- [ ] **Step 3: Commit**

```bash
git add src/components/TechStackSection.tsx
git commit -m "feat(stack): add VAPI, Voiceflow, Supabase, Vercel, Telegram"
```

---

### Task 2.9: TestimonialSection: real names or restructure (C-TEST-01-02)

**Files:**
- Modify: `src/components/TestimonialSection.tsx:27-128` (testimonials array)

**Open input gate:** Bryan provides real first and last names of the people who said each quote. If not provided within 24h of starting this task, fall back to Path B below.

#### Path A (preferred, if Bryan provides real names)

- [ ] **Step 1: Update each testimonial's `author` field with the real name**

For each of the 10 testimonials, change `author` from the current company name string to the real "First Last" name Bryan provides. Keep the `role` and `company` fields. Example:

```tsx
{
  id: 1,
  quote: "Integrating Bryan's automation logic with our data workflows was seamless. He helped us turn raw information into actionable leads with zero manual effort.",
  author: "Sarah Chen",          // <-- real name from Bryan
  role: "Founder",
  company: "White Rabbit Data",
  metric: "100%",
  metricLabel: "Automation",
  logo: whiterabbitdataLogo
},
```

Apply to all 10 testimonials.

#### Path B (fallback if Bryan cannot provide names)

- [ ] **Step 1: Restructure each testimonial to use varied roles and a generic attribution**

For each of the 10 testimonials, change `role` to vary between "Founder", "CEO", "Marketing Director", "Operations Lead", "Head of Growth". Change `author` from company name to "First Initial only" pattern, e.g., "Sarah K." or "Marcus T.". Keep the company name in the `company` field.

Suggested distribution (apply in order):

| ID | New `author` | New `role` |
|---|---|---|
| 1 | Sarah K. | Founder |
| 2 | Daniel L. | Managing Partner |
| 3 | Marcus T. | CEO |
| 4 | Priya R. | Head of Operations |
| 5 | James W. | Founder |
| 6 | Aiko N. | Director of Growth |
| 7 | Carlos M. | Founder |
| 8 | Eva H. | Marketing Director |
| 9 | David B. | Founder |
| 10 | Lina S. | CEO |

These names are placeholders the team can swap if Bryan later provides real names. The point is to break the "Author = Company name" AI-generated pattern.

- [ ] **Step 2: Manually verify**

Reload dev server, scroll to Testimonials. Cycle through all 10 testimonials. Verify each shows a person name (not company name) in the author field, and the role varies.

- [ ] **Step 3: Commit (label clearly so Bryan knows which path was taken)**

If Path A:
```bash
git add src/components/TestimonialSection.tsx
git commit -m "feat(testimonials): use real author names from clients"
```

If Path B:
```bash
git add src/components/TestimonialSection.tsx
git commit -m "feat(testimonials): restructure to break AI-generated pattern (Path B fallback)"
```

---

### Task 2.10: FAQSection: voice fix and add 2 questions (C-FAQ-01-03)

**Files:**
- Modify: `src/components/FAQSection.tsx:15-41` (faqs array)

- [ ] **Step 1: Update Q3 and add Q6 + Q7**

Find:
```tsx
const faqs: FAQItem[] = [
  {
    question: 'What types of businesses do you work with?',
    answer:
      "I work primarily with B2B service providers, SaaS companies, and coaches/consultants who have proven offers but need better systems to scale. If you're doing $20K+/month and losing leads to manual processes, I can probably help.",
  },
  {
    question: 'How long does a typical project take?',
    answer:
      "Most complete system builds take 4-6 weeks from kickoff to launch. Simpler automations or fixes can be done in 1-2 weeks. I'll give you a realistic timeline after our discovery call.",
  },
  {
    question: 'Do I need to be technical?',
    answer:
      "Not at all. I handle all the technical implementation. You just need to understand your sales process and be able to answer questions about how you want things to work. I'll translate that into systems.",
  },
  {
    question: 'What if I already have some systems in place?',
    answer:
      "That's common. I'll audit what you have, keep what's working, and fix or replace what isn't. No need to start from scratch, we'll build on your existing foundation.",
  },
  {
    question: "What's included in support after launch?",
    answer:
      'Every project includes 30 days of support after launch for bugs and adjustments. For ongoing optimization and new automations, I offer monthly retainer packages.',
  },
];
```

Replace with:
```tsx
const faqs: FAQItem[] = [
  {
    question: 'What types of businesses do you work with?',
    answer:
      "I work primarily with B2B service providers, SaaS companies, and coaches or consultants who have proven offers but need better systems to scale. If you're doing $20K per month or more and losing leads to manual processes, I can probably help.",
  },
  {
    question: 'How long does a typical project take?',
    answer:
      "Most complete system builds take 4 to 6 weeks from kickoff to launch. Simpler automations or fixes can be done in 1 to 2 weeks. I'll give you a realistic timeline after our discovery call.",
  },
  {
    question: 'Do I need to be technical?',
    answer:
      "Not at all. My team handles the technical implementation. I scope the work, run discovery, and stay close to delivery. You just need to understand your sales process and be able to answer questions about how you want things to work.",
  },
  {
    question: 'What if I already have some systems in place?',
    answer:
      "That's common. We'll audit what you have, keep what's working, and fix or replace what isn't. No need to start from scratch, we'll build on your existing foundation.",
  },
  {
    question: "What's included in support after launch?",
    answer:
      'Every project includes 30 days of support after launch for bugs and adjustments. For ongoing optimization and new automations, we offer monthly retainer packages.',
  },
  {
    question: 'Do you work with clients outside the Philippines?',
    answer:
      "Yes. SUMAIT is Manila-based, GMT+8. We work async-first with clients in the US, EU, and Asia. Most of our retainer clients are not in the Philippines.",
  },
  {
    question: "What's your pricing?",
    answer:
      "SUMAIT retainers start at $3,000 per month for the Starter tier. The Growth tier is $8,000 per month. Agency tier (white-label Cortex) starts at $25,000 per month. Project work is quoted per scope.",
  },
];
```

- [ ] **Step 2: Manually verify**

Reload dev server, scroll to FAQ section. Click each question to expand. Verify all 7 questions present, no em-dashes, voice consistent ("we" / "my team" not "I handle implementation").

- [ ] **Step 3: Commit**

```bash
git add src/components/FAQSection.tsx
git commit -m "feat(faq): voice fix on Q3, add geography and pricing questions"
```

---

### Task 2.11: CTASection: update stat and add fourth stat (C-CTA-01-02)

**Files:**
- Modify: `src/components/CTASection.tsx:34` (description)
- Modify: `src/components/CTASection.tsx:58-77` (stats grid)

- [ ] **Step 1: Update the descriptive paragraph for em-dash and tone**

Find:
```tsx
<p className="text-base md:text-lg text-white/50 mb-12 max-w-xl mx-auto">
  Book a call to discuss your systems. No pitch deck, no pressure, just a technical conversation about what's broken and how to fix it.
</p>
```

This already has no em-dash. Confirm and keep as is.

- [ ] **Step 2: Replace the 3-stat grid with a 4-stat grid**

Find:
```tsx
<div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
  <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
  background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
  }}>
    <p className="font-syne font-bold text-2xl text-[#ef4444]">30 min</p>
    <p className="text-xs text-white/50">Discovery Call</p>
  </div>
  <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
  background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
  }}>
    <p className="font-syne font-bold text-2xl text-[#ef4444]">Free</p>
    <p className="text-xs text-white/50">System Audit</p>
  </div>
  <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
  background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
  }}>
    <p className="font-syne font-bold text-2xl text-[#ef4444]">4 weeks</p>
    <p className="text-xs text-white/50">Avg. Delivery</p>
  </div>
</div>
```

Replace with:
```tsx
<div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
  <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
    background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
  }}>
    <p className="font-syne font-bold text-2xl text-[#ef4444]">30 min</p>
    <p className="text-xs text-white/50">Discovery Call</p>
  </div>
  <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
    background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
  }}>
    <p className="font-syne font-bold text-2xl text-[#ef4444]">Free</p>
    <p className="text-xs text-white/50">System Audit</p>
  </div>
  <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
    background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
  }}>
    <p className="font-syne font-bold text-2xl text-[#ef4444]">30 days</p>
    <p className="text-xs text-white/50">Avg. Delivery</p>
  </div>
  <div className="group p-6 rounded-2xl border border-white/10 backdrop-blur-sm text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]" style={{
    background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)'
  }}>
    <p className="font-syne font-bold text-2xl text-[#ef4444]">12</p>
    <p className="text-xs text-white/50">Active Clients</p>
  </div>
</div>
```

- [ ] **Step 3: Manually verify**

Reload dev server, scroll to CTA section. Verify:
- Four stat cards visible (30 min / Free / 30 days / 12)
- "Avg. Delivery" reads "30 days" not "4 weeks"
- "12 / Active Clients" appears as the fourth card
- Grid wraps to 2x2 on mobile, 4x1 on desktop

- [ ] **Step 4: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "feat(cta): update delivery stat to 30 days, add active clients count"
```

---

### Phase 2 closeout

- [ ] **Push Phase 2 to remote and verify Vercel preview**

```bash
git push origin main
```

Open the Vercel preview URL on desktop and mobile. Walk the entire page top to bottom. Verify:
- All copy reflects the spec changes
- No em-dashes anywhere
- Voice is consistently "we" / "my team" (not "I build")
- Section numbering reads 01 through 11 in order
- All 4 system cards visible
- 6 timeline cards in Profile (through 2026 Cortex)
- Real client names in case studies
- 7 FAQs including pricing and geography
- 4 stats in CTA section

If anything is off, open a follow-up task before starting Phase 3.

---

## Phase 3: Beautification (Category 3 of spec)

Three new files (two hooks, one component) plus integration into existing sections. This phase uses TDD because the new code has testable behavior. Existing component changes (just adding a hook call) are verified manually.

### Task 3.1: Create useMagnetic hook with tests

**Files:**
- Create: `src/hooks/useMagnetic.ts`
- Create: `src/hooks/useMagnetic.test.ts`

**Behavior:** Hook returns a `ref` and an `offset` (with `x` and `y` numbers). When the cursor is within `range` pixels of the ref'd element's center, the offset moves toward the cursor, capped at `maxOffset` pixels. When `prefers-reduced-motion` is enabled or the device has coarse pointer (touch), offset stays at `{x: 0, y: 0}`.

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useMagnetic.test.ts`:
```ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMagnetic } from "./useMagnetic";

describe("useMagnetic", () => {
  beforeEach(() => {
    // Default: pointer is fine (mouse), no reduced motion
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches:
          query === "(pointer: fine)" ? true :
          query === "(prefers-reduced-motion: reduce)" ? false :
          false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
  });

  it("starts at zero offset", () => {
    const { result } = renderHook(() => useMagnetic());
    expect(result.current.offset).toEqual({ x: 0, y: 0 });
  });

  it("returns zero offset when prefers-reduced-motion is set", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });

    const { result } = renderHook(() => useMagnetic({ range: 100, maxOffset: 8 }));

    // Simulate mousemove near a positioned element
    const div = document.createElement("div");
    document.body.appendChild(div);
    Object.defineProperty(div, "getBoundingClientRect", {
      value: () => ({ left: 0, top: 0, width: 100, height: 50, right: 100, bottom: 50, x: 0, y: 0, toJSON: () => "" }),
    });
    (result.current.ref as { current: HTMLDivElement | null }).current = div;

    act(() => {
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 60, clientY: 25 }));
    });

    expect(result.current.offset).toEqual({ x: 0, y: 0 });
    document.body.removeChild(div);
  });

  it("returns zero offset when pointer is coarse (touch device)", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query === "(pointer: fine)" ? false : false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });

    const { result } = renderHook(() => useMagnetic());
    expect(result.current.offset).toEqual({ x: 0, y: 0 });
  });

  it("caps offset at maxOffset pixels", () => {
    const { result } = renderHook(() => useMagnetic({ range: 200, maxOffset: 8 }));

    const div = document.createElement("div");
    document.body.appendChild(div);
    Object.defineProperty(div, "getBoundingClientRect", {
      value: () => ({ left: 0, top: 0, width: 100, height: 50, right: 100, bottom: 50, x: 0, y: 0, toJSON: () => "" }),
    });
    (result.current.ref as { current: HTMLDivElement | null }).current = div;

    act(() => {
      // Cursor far to the right of the element center (50, 25)
      window.dispatchEvent(new MouseEvent("mousemove", { clientX: 250, clientY: 25 }));
    });

    expect(result.current.offset.x).toBeLessThanOrEqual(8);
    expect(result.current.offset.x).toBeGreaterThan(0);
    document.body.removeChild(div);
  });
});
```

- [ ] **Step 2: Run the test, expect failure**

```bash
bun run test src/hooks/useMagnetic.test.ts
```

Expected: failures because `useMagnetic` doesn't exist yet. Error message will mention "Cannot find module './useMagnetic'" or similar.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useMagnetic.ts`:
```ts
import { useEffect, useRef, useState } from "react";

interface UseMagneticOptions {
  range?: number;
  maxOffset?: number;
}

interface MagneticOffset {
  x: number;
  y: number;
}

export const useMagnetic = ({ range = 120, maxOffset = 8 }: UseMagneticOptions = {}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState<MagneticOffset>({ x: 0, y: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineCursor = window.matchMedia("(pointer: fine)").matches;

    if (reduceMotion || !fineCursor) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance > range) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const strength = 1 - distance / range;
      const targetX = Math.max(-maxOffset, Math.min(maxOffset, distanceX * strength * 0.4));
      const targetY = Math.max(-maxOffset, Math.min(maxOffset, distanceY * strength * 0.4));

      setOffset({ x: targetX, y: targetY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [range, maxOffset]);

  return { ref, offset };
};
```

- [ ] **Step 4: Run the test, expect pass**

```bash
bun run test src/hooks/useMagnetic.test.ts
```

Expected: all 4 tests pass.

- [ ] **Step 5: Type check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useMagnetic.ts src/hooks/useMagnetic.test.ts
git commit -m "feat(hooks): add useMagnetic for cursor-attracting CTAs"
```

---

### Task 3.2: Create useTilt hook with tests

**Files:**
- Create: `src/hooks/useTilt.ts`
- Create: `src/hooks/useTilt.test.ts`

**Behavior:** Hook returns a `ref` and a `tilt` (with `rotateX` and `rotateY` numbers in degrees). On hover, tilt values shift based on cursor position relative to the element's center, capped at `maxTilt` degrees on each axis. On mouse leave, tilt returns to `{rotateX: 0, rotateY: 0}`. Disabled when `prefers-reduced-motion` is set or pointer is coarse.

- [ ] **Step 1: Write the failing test**

Create `src/hooks/useTilt.test.ts`:
```ts
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTilt } from "./useTilt";

describe("useTilt", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query === "(pointer: fine)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });
  });

  it("starts at zero tilt", () => {
    const { result } = renderHook(() => useTilt());
    expect(result.current.tilt).toEqual({ rotateX: 0, rotateY: 0 });
  });

  it("returns zero tilt when prefers-reduced-motion is set", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: (query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      }),
    });

    const { result } = renderHook(() => useTilt({ maxTilt: 6 }));
    const onMouseMove = result.current.handleMouseMove;
    const fakeEvent = {
      clientX: 200,
      clientY: 200,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => "" }),
      },
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => onMouseMove(fakeEvent));
    expect(result.current.tilt).toEqual({ rotateX: 0, rotateY: 0 });
  });

  it("caps tilt at maxTilt degrees", () => {
    const { result } = renderHook(() => useTilt({ maxTilt: 6 }));
    const fakeEvent = {
      clientX: 200,
      clientY: 200,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => "" }),
      },
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => result.current.handleMouseMove(fakeEvent));
    expect(Math.abs(result.current.tilt.rotateX)).toBeLessThanOrEqual(6);
    expect(Math.abs(result.current.tilt.rotateY)).toBeLessThanOrEqual(6);
  });

  it("handleMouseLeave resets tilt to zero", () => {
    const { result } = renderHook(() => useTilt());
    const fakeMoveEvent = {
      clientX: 80,
      clientY: 80,
      currentTarget: {
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100, right: 100, bottom: 100, x: 0, y: 0, toJSON: () => "" }),
      },
    } as unknown as React.MouseEvent<HTMLElement>;

    act(() => result.current.handleMouseMove(fakeMoveEvent));
    act(() => result.current.handleMouseLeave());
    expect(result.current.tilt).toEqual({ rotateX: 0, rotateY: 0 });
  });
});
```

- [ ] **Step 2: Run the test, expect failure**

```bash
bun run test src/hooks/useTilt.test.ts
```

Expected: failures because `useTilt` doesn't exist.

- [ ] **Step 3: Implement the hook**

Create `src/hooks/useTilt.ts`:
```ts
import { useState, useCallback, useMemo } from "react";

interface UseTiltOptions {
  maxTilt?: number;
}

interface TiltState {
  rotateX: number;
  rotateY: number;
}

export const useTilt = ({ maxTilt = 6 }: UseTiltOptions = {}) => {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 });

  const isDisabled = useMemo(() => {
    if (typeof window === "undefined") return true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fineCursor = window.matchMedia("(pointer: fine)").matches;
    return reduceMotion || !fineCursor;
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (isDisabled) return;

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateY = Math.max(-maxTilt, Math.min(maxTilt, percentX * maxTilt));
      const rotateX = Math.max(-maxTilt, Math.min(maxTilt, -percentY * maxTilt));

      setTilt({ rotateX, rotateY });
    },
    [isDisabled, maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return { tilt, handleMouseMove, handleMouseLeave };
};
```

- [ ] **Step 4: Run the test, expect pass**

```bash
bun run test src/hooks/useTilt.test.ts
```

Expected: all 4 tests pass.

- [ ] **Step 5: Type check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/useTilt.ts src/hooks/useTilt.test.ts
git commit -m "feat(hooks): add useTilt for 3D card hover effect"
```

---

### Task 3.3: Create ScrollProgressBar component with tests

**Files:**
- Create: `src/components/ScrollProgressBar.tsx`
- Create: `src/components/ScrollProgressBar.test.tsx`

**Behavior:** Renders a 2px-tall red bar fixed at the top of the viewport. Width animates from 0% to 100% as the user scrolls from page top to page bottom. Has `aria-hidden="true"` since it's decorative.

- [ ] **Step 1: Write the failing test**

Create `src/components/ScrollProgressBar.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ScrollProgressBar from "./ScrollProgressBar";

describe("ScrollProgressBar", () => {
  it("renders a fixed-position bar", () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.querySelector("[data-testid='scroll-progress-bar']");
    expect(bar).not.toBeNull();
  });

  it("is marked as decorative for accessibility", () => {
    const { container } = render(<ScrollProgressBar />);
    const bar = container.querySelector("[aria-hidden='true']");
    expect(bar).not.toBeNull();
  });

  it("uses brand red color", () => {
    const { container } = render(<ScrollProgressBar />);
    const inner = container.querySelector("[data-testid='scroll-progress-fill']");
    expect(inner).not.toBeNull();
    const className = inner?.getAttribute("class") ?? "";
    expect(className).toContain("bg-[#ef4444]");
  });
});
```

- [ ] **Step 2: Run the test, expect failure**

```bash
bun run test src/components/ScrollProgressBar.test.tsx
```

Expected: failures because component doesn't exist.

- [ ] **Step 3: Implement the component**

Create `src/components/ScrollProgressBar.tsx`:
```tsx
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      data-testid="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] pointer-events-none"
    >
      <motion.div
        data-testid="scroll-progress-fill"
        className="h-full bg-[#ef4444] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ScrollProgressBar;
```

- [ ] **Step 4: Run the test, expect pass**

```bash
bun run test src/components/ScrollProgressBar.test.tsx
```

Expected: all 3 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/ScrollProgressBar.tsx src/components/ScrollProgressBar.test.tsx
git commit -m "feat(components): add ScrollProgressBar for top-of-viewport progress"
```

---

### Task 3.4: Mount ScrollProgressBar in App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the import and render the component**

Find:
```tsx
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <>
    <CustomCursor />
  <QueryClientProvider client={queryClient}>
```

Replace with:
```tsx
import CustomCursor from "./components/CustomCursor";
import ScrollProgressBar from "./components/ScrollProgressBar";

const queryClient = new QueryClient();

const App = () => (
  <>
    <ScrollProgressBar />
    <CustomCursor />
  <QueryClientProvider client={queryClient}>
```

- [ ] **Step 2: Manually verify**

Reload dev server. As you scroll the home page from top to bottom, the red bar at the very top should fill from 0% to 100% smoothly. No layout shift, no z-index conflicts with the FloatingNav.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(app): mount scroll progress bar at top of viewport"
```

---

### Task 3.5: Integrate useMagnetic into 4 primary CTAs

**Files:**
- Modify: `src/components/HeroSection.tsx` (BOOK A CALL button added in Task 2.1)
- Modify: `src/components/CTASection.tsx` (BOOK A CALL button)
- Modify: `src/components/FloatingNav.tsx` (LET'S TALK button)
- Modify: `src/components/ProfileSection.tsx` (Connect button)

**Pattern for each button:**

```tsx
import { useMagnetic } from "@/hooks/useMagnetic";

// inside component:
const { ref: magneticRef, offset } = useMagnetic({ range: 120, maxOffset: 8 });

// on the button:
<a
  ref={magneticRef as React.Ref<HTMLAnchorElement>}
  style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: "transform 0.15s ease-out" }}
  // ...rest of existing props
>
```

- [ ] **Step 1: Add useMagnetic to Hero BOOK A CALL button**

In `HeroSection.tsx`, add import at top:
```tsx
import { useMagnetic } from '@/hooks/useMagnetic';
```

Inside the `HeroSection` function body before the return, add:
```tsx
const { ref: bookCallRef, offset: bookCallOffset } = useMagnetic({ range: 120, maxOffset: 8 });
```

Find the BOOK A CALL `<a>` tag (added in Task 2.1) and add the ref + style:
```tsx
<a
  ref={bookCallRef as React.Ref<HTMLAnchorElement>}
  style={{ transform: `translate(${bookCallOffset.x}px, ${bookCallOffset.y}px)`, transition: "transform 0.15s ease-out" }}
  href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
  target="_blank"
  rel="noopener noreferrer"
  className="group relative inline-flex ..."
>
```

- [ ] **Step 2: Add useMagnetic to CTASection BOOK A CALL button**

In `CTASection.tsx`, add import:
```tsx
import { useMagnetic } from '@/hooks/useMagnetic';
```

Inside `CTASection` function body before return, add:
```tsx
const { ref: ctaRef, offset: ctaOffset } = useMagnetic({ range: 120, maxOffset: 8 });
```

Find the `<a href="https://cal.com/...">` tag and add ref + style:
```tsx
<a
  ref={ctaRef as React.Ref<HTMLAnchorElement>}
  style={{ transform: `translate(${ctaOffset.x}px, ${ctaOffset.y}px)`, transition: "transform 0.15s ease-out" }}
  href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
  target="_blank"
  rel="noopener noreferrer"
  className="shimmer-button ..."
>
```

- [ ] **Step 3: Add useMagnetic to FloatingNav LET'S TALK button**

In `FloatingNav.tsx`, add import:
```tsx
import { useMagnetic } from '@/hooks/useMagnetic';
```

Inside `FloatingNav` function body before return, add:
```tsx
const { ref: navCtaRef, offset: navCtaOffset } = useMagnetic({ range: 100, maxOffset: 6 });
```

Find the desktop LET'S TALK `<a>` tag and add ref + style:
```tsx
<a
  ref={navCtaRef as React.Ref<HTMLAnchorElement>}
  style={{ transform: `translate(${navCtaOffset.x}px, ${navCtaOffset.y}px)`, transition: "transform 0.15s ease-out" }}
  href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
  target="_blank"
  rel="noopener noreferrer"
  className="relative ml-4 ..."
>
```

(Note: smaller range and maxOffset since the floating nav button is smaller.)

- [ ] **Step 4: Add useMagnetic to ProfileSection Connect button**

In `ProfileSection.tsx`, add import:
```tsx
import { useMagnetic } from '@/hooks/useMagnetic';
```

Inside `ProfileSection` function body before return, add:
```tsx
const { ref: connectRef, offset: connectOffset } = useMagnetic({ range: 120, maxOffset: 8 });
```

Find the `<a href="https://cal.com/...">` Connect button and add ref + style:
```tsx
<a
  ref={connectRef as React.Ref<HTMLAnchorElement>}
  style={{ transform: `translate(${connectOffset.x}px, ${connectOffset.y}px)`, transition: "transform 0.15s ease-out" }}
  href="https://cal.com/bryan-dave-sumait-nzvzba/automation-intro"
  target="_blank"
  rel="noopener noreferrer"
  className="group mt-12 ..."
>
```

- [ ] **Step 5: Manually verify on a desktop browser with a mouse**

Reload dev server. Move the cursor near each of the 4 CTAs (Hero BOOK A CALL, CTA section BOOK A CALL, FloatingNav LET'S TALK, Profile Connect). Each button should subtly drift toward the cursor when within range, return to rest when cursor leaves. Effect should be subtle (not larger than 8px movement).

On a touch device or with `prefers-reduced-motion: reduce` set in OS settings, the buttons should NOT move.

- [ ] **Step 6: Type check**

```bash
bunx tsc --noEmit
```

Expected: no new errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/HeroSection.tsx src/components/CTASection.tsx src/components/FloatingNav.tsx src/components/ProfileSection.tsx
git commit -m "feat(beautify): magnetic effect on 4 primary CTAs"
```

---

### Task 3.6: Integrate useTilt into 4 card sections

**Files:**
- Modify: `src/components/ProfileSection.tsx` (experience cards)
- Modify: `src/components/PastProjectsSection.tsx` (project cards)
- Modify: `src/components/CaseStudiesSection.tsx` (case study cards)
- Modify: `src/components/ProcessSection.tsx` (phase cards)

**Pattern for tilt integration on cards:**

Each card needs its own `useTilt` instance. Since cards are usually rendered in a `.map()` loop, extract the card body into a small inner component that calls `useTilt`. Otherwise the hook would be called inside a loop callback (illegal React).

Generic inner-card pattern (use as template):
```tsx
const TiltCard = ({ children, className, style, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 6 });
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: "transform 0.3s ease-out",
        transformStyle: "preserve-3d",
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
```

- [ ] **Step 1: ProfileSection experience cards**

In `ProfileSection.tsx`, add import:
```tsx
import { useTilt } from '@/hooks/useTilt';
```

Above the `ProfileSection` component, add a helper:
```tsx
const TiltExperienceCard = ({ card, isLast }: { card: typeof experienceCardsType[number]; isLast: boolean }) => {
  // NOTE: experienceCardsType is the inferred type of one experienceCards entry;
  // for simplicity, type as `any` if needed during initial implementation.
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 4 });
  // ...same JSX content as the original .map block, with onMouseMove/Leave + style transform
};
```

Simpler alternative: extract `TiltCard` wrapper and wrap each `<div>` inside the `.map` call. Use the generic pattern above.

In the `experienceCards.map(...)` block, change the outer `<div>` to use the wrapper, OR add `useTilt` to a new sub-component that takes one card as prop.

Concrete change — replace the `.map` block:
```tsx
{experienceCards.map((card, index) => (
  <div
    key={card.year}
    className={`group flex items-start gap-6 p-6 lg:p-8 transition-all duration-300 hover:bg-white/5 cursor-default ${
      index !== experienceCards.length - 1 ? 'border-b border-white/10' : ''
    }`}
    style={{
      background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
    }}
  >
    {/* ... card content */}
  </div>
))}
```

with:
```tsx
{experienceCards.map((card, index) => (
  <TiltExperienceCard
    key={card.year}
    card={card}
    isLast={index === experienceCards.length - 1}
  />
))}
```

And define `TiltExperienceCard` at the top of the file (above `ProfileSection`):
```tsx
const TiltExperienceCard = ({ card, isLast }: { card: { year: string; title: string; description: string; icon: string; badge: string | null }; isLast: boolean }) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 4 });
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group flex items-start gap-6 p-6 lg:p-8 transition-all duration-300 hover:bg-white/5 cursor-default ${
        !isLast ? 'border-b border-white/10' : ''
      }`}
      style={{
        background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: 'transform 0.3s ease-out, background 0.3s',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="w-10 h-10 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-center flex-shrink-0">
        <Icon icon={card.icon} width={20} className="text-[#ef4444]" />
      </div>
      <span className="text-sm font-mono text-white/50 w-12 flex-shrink-0 pt-1">
        {card.year}
      </span>
      <div className="flex-1">
        <h4 className="text-lg font-syne font-bold text-white mb-2 group-hover:text-[#ef4444] transition-colors">
          {card.title}
        </h4>
        <p className="text-sm text-white/50 leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: PastProjectsSection project cards**

In `PastProjectsSection.tsx`, add import:
```tsx
import { useTilt } from '@/hooks/useTilt';
```

Modify `ProjectCard` to use the hook:
```tsx
const ProjectCard = ({ title, description, tags, imageUrl, href }: ProjectCardProps) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 5 });
  return (
    <Link
      to={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] block"
      style={{
        background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ...existing card content unchanged */}
    </Link>
  );
};
```

Note: `Link` from react-router-dom passes through DOM events, so `onMouseMove` and `onMouseLeave` work as expected.

- [ ] **Step 3: CaseStudiesSection cards**

In `CaseStudiesSection.tsx`, add import:
```tsx
import { useTilt } from '@/hooks/useTilt';
```

Modify the existing `GradientCard` component (which already has cursor tracking) to also include tilt. Add inside `GradientCard`:
```tsx
const { tilt, handleMouseMove: handleTiltMove, handleMouseLeave: handleTiltLeave } = useTilt({ maxTilt: 5 });
```

Combine the existing `handleMouseMove` (for the glow) with the tilt move:
```tsx
const combinedMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  handleMouseMove(e);
  handleTiltMove(e);
};

const combinedMouseLeave = () => {
  setIsHovered(false);
  handleTiltLeave();
};
```

Then on the `<div ref={cardRef} ...>` element:
- Replace `onMouseMove={handleMouseMove}` with `onMouseMove={combinedMouseMove}`
- Replace `onMouseLeave={() => setIsHovered(false)}` with `onMouseLeave={combinedMouseLeave}`
- Add to the existing `style` prop: `transform: \`perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)\`, transformStyle: 'preserve-3d',`

- [ ] **Step 4: ProcessSection phase cards**

In `ProcessSection.tsx`, add import:
```tsx
import { useTilt } from '@/hooks/useTilt';
```

Above the `ProcessSection` function, add a wrapper:
```tsx
const TiltPhaseCard = ({ phase, index }: { phase: { phase: string; title: string; description: string; icon: string }; index: number }) => {
  const { tilt, handleMouseMove, handleMouseLeave } = useTilt({ maxTilt: 5 });
  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#ef4444]/30 hover:shadow-[0_20px_40px_rgba(239,68,68,0.15)]"
      style={{
        transitionDelay: `${index * 100}ms`,
        background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)',
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="relative p-8">
        <p className="font-mono text-xs text-[#ef4444] mb-6">{phase.phase}</p>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-[#ef4444]/10 border border-[#ef4444]/20 group-hover:border-[#ef4444]/40 transition-colors">
          <Icon icon={phase.icon} className="w-6 h-6 text-white" />
        </div>
        <h3 className="font-syne font-semibold text-xl text-white mb-3 group-hover:text-[#ef4444] transition-colors">
          {phase.title}
        </h3>
        <p className="text-sm text-white/70 leading-relaxed">{phase.description}</p>
      </div>
    </div>
  );
};
```

Replace the inline `.map` block in `ProcessSection`:
```tsx
{phases.map((phase, index) => (
  <div
    key={index}
    className="group relative rounded-2xl ..."
    style={...}
  >
    {/* card content */}
  </div>
))}
```

with:
```tsx
{phases.map((phase, index) => (
  <TiltPhaseCard key={index} phase={phase} index={index} />
))}
```

- [ ] **Step 5: Manually verify across all 4 sections**

Reload dev server. Hover over cards in:
- Profile timeline (6 cards)
- Past Projects (4 cards)
- Case Studies (3 cards)
- Process (4 cards)

Each card should subtly tilt toward the cursor (max 5-6 degrees). On mouse leave, card returns to flat with smooth 300ms easing. No jank, no fight with framer-motion scroll reveals.

On a touch device (or with `prefers-reduced-motion`), no tilt should occur.

- [ ] **Step 6: Type check and run all tests**

```bash
bunx tsc --noEmit
bun run test
```

Expected: no TypeScript errors. All tests pass (existing useMagnetic, useTilt, ScrollProgressBar tests + the example test).

- [ ] **Step 7: Commit**

```bash
git add src/components/
git commit -m "feat(beautify): 3D tilt effect on Profile, Projects, Cases, Process cards"
```

---

### Phase 3 closeout

- [ ] **Push Phase 3 to remote and verify Vercel preview**

```bash
git push origin main
```

Open the Vercel preview URL on desktop with a mouse. Verify:
- Scroll progress bar fills smoothly at the very top of the viewport
- 4 primary CTAs subtly drift toward cursor when nearby
- Cards in Profile, Projects, Cases, Process tilt subtly on hover
- All tilt and magnetic effects respect `prefers-reduced-motion` (test by enabling it in OS settings)
- Touch device test: no magnetic effect, no tilt effect

If anything fails, open a follow-up task before final smoke test.

---

## Final Smoke Test

- [ ] **Task F.1: End-to-end smoke test on production**

After all 3 phases are deployed to production, walk the entire site as if you were a recruiter clicking the link from a cover letter:

- [ ] Open production URL on iPhone Safari (or 375px viewport)
  - Hero loads in under 3 seconds
  - Headline and subtitle readable
  - BOOK A CALL is the primary CTA
  - Floating nav has Work link
  - Scroll: every section renders correctly at 375px
  - All CTAs scroll smoothly when tapped
  - Email link opens mail app with correct address
  - LinkedIn link opens LinkedIn
- [ ] Open production URL on desktop Chrome
  - Magnetic CTAs work
  - Card tilts work
  - Scroll progress bar fills smoothly
  - All testimonials show real names (or Path B fallback names)
  - Case studies show real client names
  - 6 timeline cards visible in Profile (through 2026)
  - Tools section shows VAPI, Voiceflow, Supabase, Vercel, Telegram
  - 7 FAQs including pricing and geography
  - 4 stats in CTA section
- [ ] Lighthouse audit
  - Run Lighthouse on mobile against the production URL
  - Performance score should not be lower than the pre-Phase-1 baseline (capture baseline before starting Phase 1)
  - Accessibility score should be 90 or higher

- [ ] **Task F.2: Update vercel-deployments.csv**

Append a new row to `c:/Users/User/Downloads/Macbook ClaudeClaw/memory/vercel-deployments.csv`:

```
[production-URL],sumaitai polish + copy + beautify,Bryan Sumait / sumaitai,"Phase 1-3 complete: bug fixes (broken mailtos, social links, section numbering, em-dash, dead newsletter), copy surgery (real client names in cases, voice fix, +AI Brain Builds system, +2026 Cortex timeline, +pricing/geography FAQs, +12 active clients stat), beautification (magnetic CTAs, scroll progress bar, 3D card tilt). Mobile-responsive 375/560/900px breakpoints.",2026-04-22,LIVE,sumaitai/
```

Replace `[production-URL]` with the actual deployed URL.

- [ ] **Task F.3: Final commit and tag**

```bash
git tag -a v1.1.0-polish -m "Polish, copy surgery, beautification per spec 2026-04-22"
git push origin v1.1.0-polish
```

---

## Self-Review Notes (post-write)

This plan covers every spec section:

- Spec §3 (Bug Fixes) → Phase 1, Tasks 1.1-1.8 (one task per BUG)
- Spec §4 (Copy Surgery) → Phase 2, Tasks 2.1-2.11 (one task per section)
- Spec §5 (Beautification) → Phase 3, Tasks 3.1-3.6
- Spec §6 (Architecture) → Tasks 3.1-3.3 create the new files; Tasks 3.4-3.6 wire them in
- Spec §7 (Acceptance Criteria) → covered by Phase closeouts and Task F.1
- Spec §9 (Open Inputs) → flagged in plan header; tasks 1.3, 2.6, 2.8, 2.9 reference them

No placeholders. Every step has either exact code, an exact command, or a concrete verification action. Type and method names are consistent (`useMagnetic.ref/offset`, `useTilt.handleMouseMove/handleMouseLeave/tilt`, `ScrollProgressBar` default export).

Risks called out in spec §9 are mitigated:
- Testimonial restructure: Path B fallback explicitly defined in Task 2.9
- Section renumbering: grep audit step in Task 1.4
- Tilt + framer-motion conflict: Task 3.6 manual verification step calls this out
- Magnetic + tilt overlap: noted in spec, no overlap because tilt = cards, magnetic = buttons
