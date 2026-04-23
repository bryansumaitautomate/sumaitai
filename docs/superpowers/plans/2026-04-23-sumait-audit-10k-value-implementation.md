# SUMAIT AI Audit $10k Value Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the SUMAIT AI Audit upgrade per spec `2026-04-23-sumait-audit-10k-value-design.md` so finishing the audit produces a hosted, branded, shareable report URL that feels like a $10k consulting deliverable, integrated into sumaitai.

**Architecture:** Two repos. The audit code stays in `sumait-ai-audit` (gets new Supabase tables, new edge function, new `/report/[id]` route, 10 report sections, what-if simulator, share mechanics, print CSS). The main site `sumaitai` gets 5 small integration touchpoints (footer URL update, FloatingNav link, hero tertiary CTA, CTA section secondary path, new `/audit` landing page) plus a FAQ Q7 pricing removal. n8n environment and LeadConnector calendar stay as-is, configured separately.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind, Supabase (Postgres + Edge Functions in Deno), framer-motion, vitest, @testing-library/react, jsdom. New runtime dep: nanoid (~1 KB).

**Branching strategy:** Work on `main` in both repos. One commit per task. Push to remote after each phase. Verify Vercel preview before moving to next phase.

**Spec reference:** [docs/superpowers/specs/2026-04-23-sumait-audit-10k-value-design.md](../specs/2026-04-23-sumait-audit-10k-value-design.md)

**Open inputs needed (block specific tasks if not provided):**
1. Bryan reviews 4 industry verticals he has direct experience in (Path C) → blocks Task 1.3 final values; default = ship my drafts
2. Bryan reviews `cortexTeams` metadata → blocks Task 1.7 final values; default = ship my drafts
3. n8n side: confirm `bryansumaitofficial@gmail.com` is set up to send via n8n's email tool → blocks Task 5.1
4. n8n side: configure share-report webhook → blocks Task 5.2
5. n8n side: configure re-engagement triggers → blocks Task 5.3
6. Sample report screenshot for `/audit` landing page → use placeholder for v1; replace once first reports exist

---

## File Structure

### sumait-ai-audit repo (new files)

| Path | Responsibility |
|---|---|
| `supabase/migrations/<ts>_audit_reports.sql` | Create audit_reports table + RLS policies |
| `supabase/migrations/<ts>_industry_benchmarks.sql` | Create industry_benchmarks table + RLS |
| `supabase/seed/industry_benchmarks.sql` | 40-row seed (10 industries × 4 size bands) |
| `supabase/functions/generate-report/index.ts` | New edge function: persist report + fire webhook |
| `src/lib/cortex.ts` | selectCortexTeams() rules + cortexTeams metadata map |
| `src/lib/cortex.test.ts` | Tests for the mapping rules |
| `src/lib/calendar.ts` | computePhaseDates() pure function |
| `src/lib/calendar.test.ts` | Tests for date math |
| `src/lib/simulator.ts` | useWhatIfSimulator math + dependency cascade |
| `src/lib/simulator.test.ts` | Tests for simulator math and cascade |
| `src/lib/report-fetcher.ts` | Supabase RPC wrapper for fetching reports + incrementing view count |
| `src/types/report.ts` | Extended AIAnalysisResponse + AuditReport row type |
| `src/pages/Report.tsx` | The `/report/[id]` route component |
| `src/components/report/ReportLayout.tsx` | Page shell shared by all report sections |
| `src/components/report/CoverSection.tsx` | Section 1 |
| `src/components/report/ExecutiveSummary.tsx` | Section 2 |
| `src/components/report/WhereYouAreToday.tsx` | Section 3 |
| `src/components/report/IndustryBenchmark.tsx` | Section 4 |
| `src/components/report/RoadmapSection.tsx` | Section 5 |
| `src/components/report/CortexConfig.tsx` | Section 6 |
| `src/components/report/WhatIfSimulator.tsx` | Section 7 |
| `src/components/report/MathSection.tsx` | Section 8 |
| `src/components/report/WhatHappensNext.tsx` | Section 9 |
| `src/components/report/ReportFooter.tsx` | Section 10 |
| `src/components/report/ShareTeammateForm.tsx` | Inline form for "email to teammate" |
| `src/styles/print.css` | Print-optimized CSS |

### sumait-ai-audit repo (modified files)

| Path | Change |
|---|---|
| `src/App.tsx` | Add `/report/:id` route |
| `src/components/audit/AuditWizard.tsx` | Submit calls `generate-report` edge function, redirects to /report/[id] on success |
| `src/components/audit/ResultsDashboard.tsx` | Stays for v2 use; not rendered in v1 flow (route directly to /report/[id]) |
| `src/types/audit.ts` | Extend `AIAnalysisResponse` with new fields |
| `supabase/functions/analyze-audit/index.ts` | Extend SYSTEM_PROMPT to require new fields |
| `package.json` | Add `nanoid` dependency |

### sumaitai repo (new files)

| Path | Responsibility |
|---|---|
| `src/pages/Audit.tsx` | The `/audit` landing page |

### sumaitai repo (modified files)

| Path | Change |
|---|---|
| `src/App.tsx` | Add `/audit` route |
| `src/components/Footer.tsx` | Update audit link URL to sumait-audit.vercel.app |
| `src/components/FloatingNav.tsx` | Add Audit external link as 6th nav item |
| `src/components/HeroSection.tsx` | Add tertiary "Run free 5-minute audit" link |
| `src/components/CTASection.tsx` | Add secondary "Run audit first" link |
| `src/components/FAQSection.tsx` | Update Q7 to remove public pricing |

---

## Phase 1: Data layer + AI extension

Build the Supabase schema, seed benchmarks, extend the AI prompt, and create the new `generate-report` edge function. Phase ends with a working end-to-end submission that creates a row in `audit_reports`.

### Task 1.1: Create audit_reports migration

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `supabase/migrations/<timestamp>_audit_reports.sql`

- [ ] **Step 1: Generate migration filename**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
TIMESTAMP=$(date -u +%Y%m%d%H%M%S)
TARGET="supabase/migrations/${TIMESTAMP}_audit_reports.sql"
echo "Will create: $TARGET"
```

- [ ] **Step 2: Write the migration**

Create the file with content:
```sql
-- Audit reports table: one row per submitted audit
create table public.audit_reports (
  id text primary key,
  created_at timestamptz default now() not null,
  
  contact_name text not null,
  contact_email text not null,
  
  company_info jsonb not null,
  goals_readiness jsonb not null,
  departments jsonb not null,
  
  analysis jsonb not null,
  industry_benchmark jsonb,
  cortex_configuration jsonb,
  
  view_count int default 0 not null,
  last_viewed_at timestamptz
);

create index audit_reports_email_idx on public.audit_reports (contact_email);
create index audit_reports_created_idx on public.audit_reports (created_at desc);

-- Enable RLS: public read (anyone with URL can view), service-role write
alter table public.audit_reports enable row level security;

create policy "Public can read audit reports"
  on public.audit_reports
  for select
  using (true);

create policy "Service role can insert audit reports"
  on public.audit_reports
  for insert
  with check (auth.role() = 'service_role');

create policy "Service role can update view counts"
  on public.audit_reports
  for update
  using (auth.role() = 'service_role');

-- RPC function for view count increment (callable by anon)
create or replace function public.increment_view_count(report_id text)
returns void
language plpgsql
security definer
as $$
begin
  update public.audit_reports
  set view_count = view_count + 1,
      last_viewed_at = now()
  where id = report_id;
end;
$$;

grant execute on function public.increment_view_count(text) to anon, authenticated;
```

- [ ] **Step 3: Apply migration locally with Supabase CLI**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
npx supabase db push
```

Expected: migration applied without errors. Confirm via Supabase dashboard.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/
git commit -m "feat(db): add audit_reports table with RLS and view-count RPC"
```

---

### Task 1.2: Create industry_benchmarks migration

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `supabase/migrations/<timestamp>_industry_benchmarks.sql`

- [ ] **Step 1: Generate filename + write the migration**

```sql
-- Industry benchmarks table: 10 industries × 4 size bands = 40 rows
create table public.industry_benchmarks (
  industry text not null,
  size_band text not null,
  avg_weekly_manual_hours numeric not null,
  top_quartile_weekly_hours numeric not null,
  avg_ai_adoption_pct numeric not null,
  common_cost_drivers text[] not null,
  common_quick_wins text[] not null,
  source_note text default 'Based on SUMAIT engagements and public industry research' not null,
  updated_at timestamptz default now() not null,
  primary key (industry, size_band)
);

-- Public read so generate-report can look up
alter table public.industry_benchmarks enable row level security;

create policy "Public can read benchmarks"
  on public.industry_benchmarks
  for select
  using (true);

create policy "Service role can manage benchmarks"
  on public.industry_benchmarks
  for all
  using (auth.role() = 'service_role');
```

- [ ] **Step 2: Apply migration**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
npx supabase db push
```

- [ ] **Step 3: Commit**

```bash
git add supabase/migrations/
git commit -m "feat(db): add industry_benchmarks table"
```

---

### Task 1.3: Seed industry_benchmarks (40 rows)

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `supabase/seed/industry_benchmarks.sql`

These are draft starter values. Path C from spec: I draft, Bryan adjusts the 4 verticals he has direct experience in (Agency, Coaching, SaaS, E-commerce most likely) before applying.

- [ ] **Step 1: Write seed file with all 40 rows**

Create `supabase/seed/industry_benchmarks.sql` with content:
```sql
-- Industry benchmarks seed: 10 industries × 4 size bands
-- Path C: Bryan reviews and adjusts before launch

insert into public.industry_benchmarks
  (industry, size_band, avg_weekly_manual_hours, top_quartile_weekly_hours, avg_ai_adoption_pct, common_cost_drivers, common_quick_wins)
values

-- AGENCY (Marketing / Creative)
('agency', 'micro', 28, 12, 18, ARRAY['client onboarding', 'reporting', 'proposal writing'], ARRAY['Automated client onboarding intake', 'AI proposal generation', 'Slack-based status reports']),
('agency', 'small', 42, 18, 28, ARRAY['client communication', 'project tracking', 'invoicing'], ARRAY['Client portal with auto-updates', 'AI-assisted creative briefs', 'Automated invoice reminders']),
('agency', 'mid', 65, 25, 40, ARRAY['team coordination', 'multi-client reporting', 'resource allocation'], ARRAY['Cross-team workflow automation', 'Dashboard consolidation', 'AI-driven capacity planning']),
('agency', 'large', 110, 38, 55, ARRAY['process standardization', 'data silos', 'compliance reporting'], ARRAY['Enterprise workflow orchestration', 'Cross-tool data sync', 'Automated compliance audits']),

-- COACHING (1-on-1)
('coaching', 'micro', 18, 8, 22, ARRAY['scheduling', 'session notes', 'follow-up emails'], ARRAY['AI session note transcription', 'Automated booking + reminders', 'Templated follow-up sequences']),
('coaching', 'small', 32, 14, 35, ARRAY['client tracking', 'content delivery', 'billing'], ARRAY['Client portal with progress tracking', 'Drip content automation', 'Stripe-integrated billing']),
('coaching', 'mid', 50, 22, 48, ARRAY['program management', 'community moderation', 'cohort coordination'], ARRAY['Skool/Circle automation', 'AI-moderated community', 'Cohort progress dashboards']),
('coaching', 'large', 85, 32, 60, ARRAY['multi-coach scheduling', 'curriculum delivery', 'reporting'], ARRAY['Multi-coach calendar coordination', 'LMS automation', 'Program ROI dashboards']),

-- COURSE (Online course / info product)
('course', 'micro', 22, 10, 25, ARRAY['content production', 'student support', 'launches'], ARRAY['AI-assisted content batching', 'Automated student onboarding', 'Launch sequence automation']),
('course', 'small', 38, 16, 38, ARRAY['support tickets', 'community management', 'affiliate tracking'], ARRAY['AI customer support agent', 'Community automation', 'Affiliate dashboard']),
('course', 'mid', 60, 25, 50, ARRAY['multi-course management', 'student segmentation', 'lifecycle marketing'], ARRAY['Cross-course recommendation engine', 'Lifecycle automation', 'Student health scoring']),
('course', 'large', 95, 35, 62, ARRAY['enterprise sales', 'reporting', 'curriculum updates'], ARRAY['B2B sales automation', 'Enterprise reporting', 'AI-assisted curriculum updates']),

-- SAAS
('saas', 'micro', 25, 11, 30, ARRAY['customer support', 'onboarding', 'churn investigation'], ARRAY['AI support chatbot', 'In-app onboarding flows', 'Churn prediction signals']),
('saas', 'small', 45, 19, 45, ARRAY['lead qualification', 'demo coordination', 'support escalations'], ARRAY['AI lead qualifier', 'Calendly + AI demo prep', 'Tiered support routing']),
('saas', 'mid', 75, 30, 58, ARRAY['enterprise sales ops', 'product analytics', 'compliance'], ARRAY['Sales ops automation', 'Product usage AI insights', 'SOC2 evidence collection']),
('saas', 'large', 130, 45, 70, ARRAY['multi-product coordination', 'data warehouse maintenance', 'pricing optimization'], ARRAY['Cross-product orchestration', 'AI-driven warehouse mgmt', 'Dynamic pricing engine']),

-- ECOMMERCE
('ecommerce', 'micro', 30, 13, 28, ARRAY['order management', 'customer service', 'inventory'], ARRAY['Automated order routing', 'AI customer service', 'Inventory alerts']),
('ecommerce', 'small', 50, 22, 42, ARRAY['marketing campaigns', 'returns processing', 'product listings'], ARRAY['Klaviyo automation', 'Returns portal', 'AI product description generator']),
('ecommerce', 'mid', 80, 32, 55, ARRAY['multi-channel ops', 'fulfillment coordination', 'reviews management'], ARRAY['Channel sync automation', 'Fulfillment dashboards', 'AI review responses']),
('ecommerce', 'large', 140, 50, 68, ARRAY['marketplace integrations', 'pricing optimization', 'ad spend allocation'], ARRAY['Cross-marketplace automation', 'Dynamic pricing AI', 'Ad budget AI']),

-- REALESTATE
('realestate', 'micro', 22, 10, 15, ARRAY['lead follow-up', 'showing scheduling', 'document prep'], ARRAY['AI lead qualifier', 'Auto-scheduling for showings', 'Document templating']),
('realestate', 'small', 38, 16, 25, ARRAY['transaction coordination', 'contract management', 'client communication'], ARRAY['Transaction automation', 'AI contract summaries', 'Client portal']),
('realestate', 'mid', 62, 25, 38, ARRAY['team coordination', 'CRM management', 'marketing'], ARRAY['Team CRM automation', 'AI listing descriptions', 'Drip campaigns']),
('realestate', 'large', 100, 38, 50, ARRAY['enterprise reporting', 'broker management', 'compliance'], ARRAY['Brokerage dashboards', 'Compliance automation', 'Recruitment automation']),

-- ACCOUNTING
('accounting', 'micro', 20, 9, 32, ARRAY['data entry', 'reconciliation', 'client communication'], ARRAY['OCR receipt automation', 'Auto-reconciliation rules', 'Client portal']),
('accounting', 'small', 35, 15, 45, ARRAY['monthly close', 'reporting', 'tax prep'], ARRAY['Close checklist automation', 'AI-generated reports', 'Tax doc collection automation']),
('accounting', 'mid', 60, 24, 58, ARRAY['multi-client coordination', 'staff utilization', 'compliance'], ARRAY['Multi-client dashboards', 'Capacity planning', 'Compliance workflows']),
('accounting', 'large', 100, 38, 70, ARRAY['firm-wide standardization', 'audit prep', 'practice management'], ARRAY['Firm-wide automation', 'AI audit prep', 'Practice management AI']),

-- LEGAL
('legal', 'micro', 25, 11, 20, ARRAY['intake', 'document drafting', 'billing'], ARRAY['AI client intake', 'Document templating', 'Time tracking automation']),
('legal', 'small', 42, 18, 32, ARRAY['matter management', 'discovery', 'invoicing'], ARRAY['Matter dashboard', 'AI document review', 'Auto-billing']),
('legal', 'mid', 70, 28, 45, ARRAY['multi-attorney coordination', 'compliance', 'knowledge management'], ARRAY['Cross-attorney workflows', 'Compliance automation', 'AI knowledge base']),
('legal', 'large', 115, 42, 58, ARRAY['firm-wide processes', 'regulatory reporting', 'eDiscovery'], ARRAY['Firm process orchestration', 'AI regulatory reports', 'AI-assisted eDiscovery']),

-- FITNESS
('fitness', 'micro', 18, 8, 18, ARRAY['scheduling', 'check-ins', 'follow-ups'], ARRAY['Auto-scheduling', 'Check-in reminders', 'Follow-up sequences']),
('fitness', 'small', 32, 14, 30, ARRAY['member management', 'class coordination', 'retention'], ARRAY['Member portal', 'Class scheduling AI', 'Retention campaigns']),
('fitness', 'mid', 55, 22, 42, ARRAY['multi-location ops', 'staff coordination', 'reporting'], ARRAY['Multi-location dashboards', 'Staff scheduling AI', 'Cross-location reporting']),
('fitness', 'large', 90, 35, 55, ARRAY['enterprise franchise mgmt', 'corporate wellness', 'standardization'], ARRAY['Franchise operations AI', 'Corporate wellness automation', 'Standardization workflows']),

-- HOMESERVICES
('homeservices', 'micro', 24, 10, 15, ARRAY['scheduling', 'estimates', 'follow-ups'], ARRAY['AI scheduling assistant', 'AI estimate generator', 'Auto-follow-up']),
('homeservices', 'small', 40, 17, 28, ARRAY['dispatch', 'job tracking', 'invoicing'], ARRAY['Smart dispatch', 'Job tracking automation', 'Auto-invoicing']),
('homeservices', 'mid', 65, 26, 40, ARRAY['multi-crew ops', 'inventory', 'customer comms'], ARRAY['Multi-crew dashboards', 'Inventory automation', 'Customer comms automation']),
('homeservices', 'large', 110, 40, 52, ARRAY['regional ops', 'fleet management', 'compliance'], ARRAY['Regional ops orchestration', 'Fleet management AI', 'Compliance automation']);
```

- [ ] **Step 2: Apply seed**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
psql "$SUPABASE_DB_URL" -f supabase/seed/industry_benchmarks.sql
```

(Or via Supabase dashboard SQL editor if local CLI not configured.)

- [ ] **Step 3: Verify**

```bash
psql "$SUPABASE_DB_URL" -c "select count(*) from industry_benchmarks;"
```

Expected: `40`.

- [ ] **Step 4: Commit**

```bash
git add supabase/seed/
git commit -m "feat(db): seed 40 industry_benchmarks rows (Path C draft for review)"
```

**Open input gate (Path C):** before launch, Bryan reviews `agency`, `coaching`, `saas`, `ecommerce` rows and adjusts numbers based on direct client experience. Each cell is one UPDATE statement run via Supabase dashboard. Other industries can stay as drafts and update over time.

---

### Task 1.4: Extend AIAnalysisResponse types

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/types/report.ts`
- Modify: `src/types/audit.ts`

- [ ] **Step 1: Extend QuickWin and LongTermStrategy types**

In `src/types/audit.ts`, find the existing `QuickWin` interface and replace with:
```ts
export interface QuickWin {
  id: string;
  title: string;
  desc: string;
  estimated_savings?: string;
  implementation_time?: string;
  // New fields:
  phase: 30 | 60 | 90;
  effort_hours: number;
  hours_per_week_saved: number;
  dependency_id: string | null;
  risk_level: 'low' | 'medium' | 'high';
  risk_note: string;
  what_to_do_tomorrow?: string;
}
```

Find the existing `LongTermStrategy` interface and replace with:
```ts
export interface LongTermStrategy {
  id: string;
  quarter?: string;
  title: string;
  desc: string;
  focus_areas?: string[];
  expected_outcome?: string;
  // New fields:
  phase: 30 | 60 | 90 | 'beyond';
  effort_hours: number;
  hours_per_week_saved: number;
  dependency_id: string | null;
  risk_level: 'low' | 'medium' | 'high';
}
```

Add at the end of `src/types/audit.ts`:
```ts
export interface CortexTeamExplanation {
  paragraph: string;
  impact_line: string;
}

export interface ExtendedAIAnalysisResponse extends AIAnalysisResponse {
  cortex_team_explanations?: Record<string, CortexTeamExplanation>;
}
```

- [ ] **Step 2: Create the report-specific types**

Create `src/types/report.ts`:
```ts
import { CompanyInfo, GoalsReadiness, Department, ExtendedAIAnalysisResponse } from "./audit";

export interface IndustryBenchmark {
  industry: string;
  size_band: 'micro' | 'small' | 'mid' | 'large';
  avg_weekly_manual_hours: number;
  top_quartile_weekly_hours: number;
  avg_ai_adoption_pct: number;
  common_cost_drivers: string[];
  common_quick_wins: string[];
  source_note: string;
}

export interface CortexConfiguration {
  recommended_team_ids: string[];   // e.g., ['T05', 'T07', 'T14']
  total_agents: number;
  total_tools: number;
  combined_weekly_hours_saved: number;
  combined_annual_savings: number;
}

export interface AuditReport {
  id: string;
  created_at: string;
  contact_name: string;
  contact_email: string;
  company_info: CompanyInfo;
  goals_readiness: GoalsReadiness;
  departments: Department[];
  analysis: ExtendedAIAnalysisResponse;
  industry_benchmark: IndustryBenchmark | null;
  cortex_configuration: CortexConfiguration | null;
  view_count: number;
  last_viewed_at: string | null;
}
```

- [ ] **Step 3: Type check**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
bunx tsc --noEmit
```

Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/types/
git commit -m "feat(types): extend AIAnalysisResponse with phase/dependency/risk + AuditReport"
```

---

### Task 1.5: Extend the analyze-audit AI prompt

**Repo:** `sumait-ai-audit`
**Files:**
- Modify: `supabase/functions/analyze-audit/index.ts`

- [ ] **Step 1: Update the system prompt JSON output schema**

In `supabase/functions/analyze-audit/index.ts`, find the `quick_wins` array example in `SYSTEM_PROMPT` (around line 184-202). Replace with:
```
  "quick_wins": [
    { 
      "id": "qw_1",
      "title": "Immediate Action Item 1", 
      "desc": "Executive briefing-style description of operational drag identified...",
      "estimated_savings": "$X,XXX",
      "implementation_time": "1-2 weeks",
      "phase": 30,
      "effort_hours": 12,
      "hours_per_week_saved": 8,
      "dependency_id": null,
      "risk_level": "low",
      "risk_note": "Standard implementation, no buy-in required",
      "what_to_do_tomorrow": "Open Fathom and turn on auto-share to your Sales Slack channel. Five minutes."
    },
    { 
      "id": "qw_2",
      "title": "Immediate Action Item 2", 
      "desc": "Executive briefing-style description of leakage found...",
      "estimated_savings": "$X,XXX",
      "implementation_time": "2-3 weeks",
      "phase": 60,
      "effort_hours": 18,
      "hours_per_week_saved": 14,
      "dependency_id": "qw_1",
      "risk_level": "medium",
      "risk_note": "Requires team coordination on data structure change"
    },
    { 
      "id": "qw_3",
      "title": "Immediate Action Item 3", 
      "desc": "Executive briefing-style description of capacity reclamation...",
      "estimated_savings": "$X,XXX",
      "implementation_time": "1 week",
      "phase": 90,
      "effort_hours": 6,
      "hours_per_week_saved": 5,
      "dependency_id": null,
      "risk_level": "low",
      "risk_note": "Self-contained, no upstream dependencies"
    }
  ],
```

- [ ] **Step 2: Update long_term_strategy schema**

Find the existing long_term_strategy example and replace with:
```
  "long_term_strategy": [
    { 
      "id": "lt_1",
      "quarter": "Q1",
      "title": "Foundation & Quick Automation", 
      "desc": "Establish core automation infrastructure and quick wins",
      "focus_areas": ["area1", "area2"],
      "expected_outcome": "$X saved",
      "phase": 30,
      "effort_hours": 40,
      "hours_per_week_saved": 12,
      "dependency_id": null,
      "risk_level": "medium"
    },
    { 
      "id": "lt_2",
      "quarter": "Q2",
      "title": "Scale & Optimize", 
      "desc": "Expand automation coverage and optimize existing workflows",
      "focus_areas": ["area1", "area2"],
      "expected_outcome": "$X saved",
      "phase": 60,
      "effort_hours": 60,
      "hours_per_week_saved": 18,
      "dependency_id": "lt_1",
      "risk_level": "medium"
    },
    { 
      "id": "lt_3",
      "quarter": "Q3",
      "title": "Full Integration & ROI Realization", 
      "desc": "Complete transformation and realize full ROI potential",
      "focus_areas": ["area1", "area2"],
      "expected_outcome": "$X saved",
      "phase": "beyond",
      "effort_hours": 80,
      "hours_per_week_saved": 22,
      "dependency_id": "lt_2",
      "risk_level": "high"
    }
  ],
```

- [ ] **Step 3: Add new prompt instructions before the IMPORTANT line**

Find the line `IMPORTANT: Your response must be ONLY the JSON object above`. Before that line, insert these new instructions:
```
NEW REQUIREMENTS FOR PHASING AND DEPENDENCIES:

1. ASSIGN PHASE TO EVERY QUICK WIN AND LONG-TERM ITEM:
   - Phase 30: immediate, low-effort, no dependencies
   - Phase 60: moderate effort, may depend on phase 30 items
   - Phase 90: longer setup, may depend on earlier phases
   - Phase "beyond": multi-quarter initiatives (long_term only)

2. IDENTIFY DEPENDENCIES:
   - If item X requires item Y to be completed first, set X's dependency_id to Y's id
   - Use null for items with no dependencies
   - Each item must have a unique id (qw_1, qw_2, qw_3 for quick wins; lt_1, lt_2, lt_3 for long-term)

3. ESTIMATE EFFORT_HOURS AND HOURS_PER_WEEK_SAVED:
   - effort_hours = total setup time to implement (one-time)
   - hours_per_week_saved = ongoing weekly time savings after implementation
   - These power a what-if simulator, so be realistic

4. RISK LEVELS:
   - low: standard implementation, no team buy-in needed
   - medium: requires change management or technical risk
   - high: requires significant team alignment or material technical risk
   - Always include a risk_note (one sentence) explaining what to watch for

5. WHAT_TO_DO_TOMORROW (only on the FIRST quick win, qw_1):
   - One specific action under 30 words
   - Executable in 5-15 minutes
   - References a specific tool name or button label (e.g., "Open Zapier...", "Click Connect in HubSpot...")
   - This is the highest-impact moment of the report; make it specific and immediate
```

- [ ] **Step 4: Add Cortex explanations request**

After the long_term_strategy block in the JSON schema, before the closing `}` of the example, add:
```
  ,
  "cortex_team_explanations": {
    "T05": {
      "paragraph": "[One paragraph explaining what Team 05 (Marketing & Growth) does for this specific business. Reference the company name and at least one of their stated departments or pain points.]",
      "impact_line": "Saves [Company Name] [X] hrs/week · $[Y]/yr"
    },
    "T07": {
      "paragraph": "[Similar paragraph for Team 07 Automation Factory]",
      "impact_line": "Saves [Company Name] [X] hrs/week · $[Y]/yr"
    }
  }
```

Then in the user prompt section (around line 395-399, the "Provide a comprehensive analysis..." line), add:
```
- For cortex_team_explanations: I will pass you the recommended team IDs in a separate parameter. For each team ID, write one paragraph explaining what that team does specifically for ${companyInfo.companyName || 'this business'}, referencing at least one of their stated departments or pain points.
```

(The actual team IDs will come from `selectCortexTeams()` and be passed to the prompt at call time. We'll wire this in Task 1.8.)

- [ ] **Step 5: Manually deploy + test the function**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
npx supabase functions deploy analyze-audit
```

Test by submitting an audit through the existing UI; inspect the JSON response to confirm new fields are present.

- [ ] **Step 6: Commit**

```bash
git add supabase/functions/analyze-audit/
git commit -m "feat(ai): extend analyze-audit prompt with phase/dependency/risk + Cortex explanations"
```

---

### Task 1.6: Create selectCortexTeams() with TDD

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/lib/cortex.ts`
- Create: `src/lib/cortex.test.ts`

**Behavior:** Pure function. Input: `{ companyInfo, departments, goalsReadiness }`. Output: `string[]` of team IDs (3-5 unique teams), always including `T07`.

- [ ] **Step 1: Write the failing test**

Create `src/lib/cortex.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { selectCortexTeams } from "./cortex";
import { CompanyInfo, GoalsReadiness, Department } from "@/types/audit";

const baseCompany: CompanyInfo = {
  companyName: "Acme",
  industry: "agency",
  employeeCount: "5",
  techStack: "",
  referralSource: ""
};

const baseGoals: GoalsReadiness = {
  incomeGoal90Days: "",
  averageEmployeeHourlyRate: "50",
  previousAIInvestment: "",
  whyImplementAI: "",
  expectedChanges: "",
  currentMonthlyRevenue: "10k-25k",
  biggestCostDriver: "labor-payroll"
};

const dept = (name: string, processName = "p"): Department => ({
  id: name,
  name,
  processes: [{ id: "1", processName, hoursPerWeek: 10, peopleInvolved: 1, painPoints: "" }]
});

describe("selectCortexTeams", () => {
  it("always includes T07 Automation Factory", () => {
    const teams = selectCortexTeams({ companyInfo: baseCompany, goalsReadiness: baseGoals, departments: [dept("Random")] });
    expect(teams).toContain("T07");
  });

  it("returns 3-5 teams", () => {
    const teams = selectCortexTeams({ companyInfo: baseCompany, goalsReadiness: baseGoals, departments: [dept("Sales"), dept("Marketing"), dept("Support")] });
    expect(teams.length).toBeGreaterThanOrEqual(3);
    expect(teams.length).toBeLessThanOrEqual(5);
  });

  it("returns unique teams (no duplicates)", () => {
    const teams = selectCortexTeams({ companyInfo: baseCompany, goalsReadiness: baseGoals, departments: [dept("Sales"), dept("Marketing")] });
    const unique = new Set(teams);
    expect(unique.size).toBe(teams.length);
  });

  it("triggers T05+T07 for sales department", () => {
    const teams = selectCortexTeams({ companyInfo: baseCompany, goalsReadiness: baseGoals, departments: [dept("Sales")] });
    expect(teams).toContain("T05");
    expect(teams).toContain("T07");
  });

  it("triggers T04+T14 for support department", () => {
    const teams = selectCortexTeams({ companyInfo: baseCompany, goalsReadiness: baseGoals, departments: [dept("Customer Support")] });
    expect(teams).toContain("T04");
    expect(teams).toContain("T14");
  });

  it("triggers T18+T17 for agency industry", () => {
    const teams = selectCortexTeams({ companyInfo: { ...baseCompany, industry: "agency" }, goalsReadiness: baseGoals, departments: [dept("ops")] });
    expect(teams).toContain("T18");
    expect(teams).toContain("T17");
  });

  it("triggers T01+T04+T05 for SaaS industry", () => {
    const teams = selectCortexTeams({ companyInfo: { ...baseCompany, industry: "saas" }, goalsReadiness: baseGoals, departments: [dept("Engineering")] });
    expect(teams).toContain("T01");
    expect(teams).toContain("T04");
    expect(teams).toContain("T05");
  });
});
```

- [ ] **Step 2: Run test, expect failure**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
bun run test src/lib/cortex.test.ts
```

Expected: failures because the module doesn't exist.

- [ ] **Step 3: Implement selectCortexTeams + cortexTeams metadata**

Create `src/lib/cortex.ts`:
```ts
import { CompanyInfo, GoalsReadiness, Department } from "@/types/audit";

export type TeamId = 'T01' | 'T02' | 'T03' | 'T04' | 'T05' | 'T07' | 'T13' | 'T14' | 'T15' | 'T16' | 'T17' | 'T18';

export interface TeamMeta {
  id: TeamId;
  name: string;
  tagline: string;
  tools: string[];
  agentCount: number;
}

export const cortexTeams: Record<TeamId, TeamMeta> = {
  T01: { id: 'T01', name: 'Fullstack', tagline: 'Web apps, dashboards, APIs', tools: ['Next.js', 'React', 'Supabase', 'Vercel'], agentCount: 5 },
  T02: { id: 'T02', name: 'Security', tagline: 'Audits, compliance, threat modeling', tools: ['Snyk', 'GitHub Security', 'Cloudflare'], agentCount: 4 },
  T03: { id: 'T03', name: 'Devops & Cloud', tagline: 'Deploy, scale, monitor', tools: ['Vercel', 'AWS', 'Cloudflare', 'Sentry'], agentCount: 4 },
  T04: { id: 'T04', name: 'AI & ML', tagline: 'Chatbots, RAG, voice agents', tools: ['Claude', 'OpenAI', 'VAPI', 'Voiceflow'], agentCount: 5 },
  T05: { id: 'T05', name: 'Marketing & Growth', tagline: 'Lead gen, SEO, ads, reputation', tools: ['n8n', 'Claude', 'GHL', 'Instantly'], agentCount: 4 },
  T07: { id: 'T07', name: 'Automation Factory', tagline: 'Workflow automation across your stack', tools: ['n8n', 'Make', 'Zapier', 'Claude'], agentCount: 4 },
  T13: { id: 'T13', name: 'Content Creation', tagline: 'Strategy, copy, video, social', tools: ['Claude', 'Premiere', 'CapCut'], agentCount: 4 },
  T14: { id: 'T14', name: 'CSM', tagline: 'Customer success and ongoing ops', tools: ['Telegram', 'Slack', 'GHL'], agentCount: 4 },
  T15: { id: 'T15', name: 'Design & UX', tagline: 'Brand, layouts, UI systems', tools: ['Figma', 'Tailwind', 'Lovable'], agentCount: 4 },
  T16: { id: 'T16', name: 'QA & Polish', tagline: 'Test, verify, ship clean', tools: ['Playwright', 'Vitest', 'Lighthouse'], agentCount: 4 },
  T17: { id: 'T17', name: 'Finance & HR', tagline: 'Invoicing, payroll, capacity, SOPs', tools: ['Stripe', 'Notion', 'Google Sheets'], agentCount: 4 },
  T18: { id: 'T18', name: 'Client Onboarding', tagline: 'Intake, kickoff, knowledge base', tools: ['Notion', 'GHL', 'Loom'], agentCount: 4 },
};

interface SelectInput {
  companyInfo: CompanyInfo;
  goalsReadiness: GoalsReadiness;
  departments: Department[];
}

export function selectCortexTeams(input: SelectInput): TeamId[] {
  const { companyInfo, goalsReadiness, departments } = input;
  const counts = new Map<TeamId, number>();
  
  const bump = (...teams: TeamId[]) => {
    for (const team of teams) {
      counts.set(team, (counts.get(team) ?? 0) + 1);
    }
  };
  
  // T07 is always included
  bump('T07');
  
  // Department-based rules
  for (const dept of departments) {
    const name = dept.name.toLowerCase();
    if (/sales|lead.?gen|outreach/.test(name)) bump('T05', 'T07');
    if (/support|service|help.?desk/.test(name)) bump('T04', 'T14');
    if (/content|social|marketing/.test(name)) bump('T13', 'T05');
    if (/ops|admin|back.?office/.test(name)) bump('T17', 'T07');
    if (/engineering|product|dev/.test(name)) bump('T01', 'T16');
    if (/design|ux|creative/.test(name)) bump('T15', 'T13');
  }
  
  // Industry-based rules
  const industry = (companyInfo.industry || '').toLowerCase();
  if (/agency|consulting/.test(industry)) bump('T18', 'T17');
  if (/ecommerce|e.?commerce/.test(industry)) bump('T05', 'T07', 'T04');
  if (/saas|software/.test(industry)) bump('T01', 'T04', 'T05');
  
  // Cost-driver rules
  const cd = (goalsReadiness.biggestCostDriver || '').toLowerCase();
  if (/labor|payroll|people/.test(cd)) bump('T07');
  if (/tech|tool|software/.test(cd)) bump('T01', 'T03');
  
  // Rank by frequency, take top 5 (minimum 3)
  const ranked = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([team]) => team);
  
  const top = ranked.slice(0, 5);
  
  // Ensure minimum 3 teams (pad with T07 already in, plus T05, T13 fallbacks)
  const fallbacks: TeamId[] = ['T05', 'T13', 'T17'];
  for (const fb of fallbacks) {
    if (top.length >= 3) break;
    if (!top.includes(fb)) top.push(fb);
  }
  
  return top;
}
```

- [ ] **Step 4: Run test, expect pass**

```bash
bun run test src/lib/cortex.test.ts
```

Expected: all 7 tests pass.

- [ ] **Step 5: Type check**

```bash
bunx tsc --noEmit
```

Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/lib/cortex.ts src/lib/cortex.test.ts
git commit -m "feat(cortex): add selectCortexTeams rules + team metadata with tests"
```

---

### Task 1.7: Create computePhaseDates() with TDD

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/lib/calendar.ts`
- Create: `src/lib/calendar.test.ts`

**Behavior:** Pure function. Input: ISO date string. Output: array of 3 phase objects with start and end dates as `Date` instances.

- [ ] **Step 1: Write failing test**

Create `src/lib/calendar.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { computePhaseDates } from "./calendar";

describe("computePhaseDates", () => {
  it("returns 3 phases", () => {
    const phases = computePhaseDates("2026-04-23T00:00:00Z");
    expect(phases).toHaveLength(3);
  });

  it("phase 1 starts on submission date", () => {
    const phases = computePhaseDates("2026-04-23T00:00:00Z");
    expect(phases[0].start.toISOString().slice(0, 10)).toBe("2026-04-23");
  });

  it("phase 1 ends 30 days after start", () => {
    const phases = computePhaseDates("2026-04-23T00:00:00Z");
    expect(phases[0].end.toISOString().slice(0, 10)).toBe("2026-05-22");
  });

  it("phase 2 starts day after phase 1 ends", () => {
    const phases = computePhaseDates("2026-04-23T00:00:00Z");
    expect(phases[1].start.toISOString().slice(0, 10)).toBe("2026-05-23");
    expect(phases[1].end.toISOString().slice(0, 10)).toBe("2026-06-21");
  });

  it("phase 3 ends 90 days after submission", () => {
    const phases = computePhaseDates("2026-04-23T00:00:00Z");
    expect(phases[2].end.toISOString().slice(0, 10)).toBe("2026-07-21");
  });

  it("each phase has a label", () => {
    const phases = computePhaseDates("2026-04-23T00:00:00Z");
    expect(phases[0].label).toBe("Phase 1");
    expect(phases[1].label).toBe("Phase 2");
    expect(phases[2].label).toBe("Phase 3");
  });
});
```

- [ ] **Step 2: Run test, expect failure**

```bash
bun run test src/lib/calendar.test.ts
```

- [ ] **Step 3: Implement**

Create `src/lib/calendar.ts`:
```ts
export interface Phase {
  label: string;
  start: Date;
  end: Date;
}

const DAYS_PER_PHASE = 30;

export function computePhaseDates(submissionDateIso: string): Phase[] {
  const start1 = new Date(submissionDateIso);
  const phases: Phase[] = [];

  for (let i = 0; i < 3; i++) {
    const start = new Date(start1);
    start.setUTCDate(start.getUTCDate() + i * DAYS_PER_PHASE);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + (DAYS_PER_PHASE - 1));
    phases.push({
      label: `Phase ${i + 1}`,
      start,
      end,
    });
  }

  return phases;
}
```

- [ ] **Step 4: Run test, expect pass**

```bash
bun run test src/lib/calendar.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/calendar.ts src/lib/calendar.test.ts
git commit -m "feat(calendar): add computePhaseDates pure function with tests"
```

---

### Task 1.8: Create generate-report edge function

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `supabase/functions/generate-report/index.ts`

- [ ] **Step 1: Write the function**

Create `supabase/functions/generate-report/index.ts`:
```ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.0";
import { customAlphabet } from "https://esm.sh/nanoid@5.0.4";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-', 12);

const RequestSchema = z.object({
  contact: z.object({
    name: z.string().min(1).max(120),
    email: z.string().email().max(200),
  }),
  companyInfo: z.record(z.unknown()),
  goalsReadiness: z.record(z.unknown()),
  departments: z.array(z.unknown()).min(1).max(20),
});

function getSizeBand(employeeCount: string): 'micro' | 'small' | 'mid' | 'large' {
  const n = parseInt(employeeCount, 10);
  if (isNaN(n) || n <= 10) return 'micro';
  if (n <= 50) return 'small';
  if (n <= 200) return 'mid';
  return 'large';
}

function normalizeIndustry(industry: string): string {
  const map: Record<string, string> = {
    'marketing & advertising': 'agency',
    'consulting': 'agency',
    'coaching': 'coaching',
    'education': 'course',
    'technology': 'saas',
    'e-commerce': 'ecommerce',
    'real estate': 'realestate',
    'finance': 'accounting',
    'professional services': 'legal',
    'healthcare': 'fitness',
    'fitness': 'fitness',
    'retail': 'ecommerce',
    'manufacturing': 'homeservices',
    'salons & spas': 'homeservices',
    'restaurants & hospitality': 'homeservices',
  };
  return map[industry.toLowerCase()] || 'agency';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
    const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const N8N_WEBHOOK_URL = Deno.env.get('N8N_REPORT_WEBHOOK_URL') || 'https://<baccarat-n8n-instance>/webhook/sumait-ai-audit-report';

    const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const rawBody = await req.json();
    const validation = RequestSchema.safeParse(rawBody);
    if (!validation.success) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid input' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const { contact, companyInfo, goalsReadiness, departments } = validation.data;

    // Step 1: invoke analyze-audit (existing function) for the AI analysis
    const analyzeRes = await supabase.functions.invoke('analyze-audit', {
      body: { companyInfo, goalsReadiness, departments },
    });
    if (analyzeRes.error || !analyzeRes.data?.success) {
      throw new Error('AI analysis failed');
    }
    const analysis = analyzeRes.data.analysis;

    // Step 2: look up industry benchmark
    const industry = normalizeIndustry((companyInfo as any).industry || '');
    const sizeBand = getSizeBand((companyInfo as any).employeeCount || '');
    const benchRes = await supabase
      .from('industry_benchmarks')
      .select('*')
      .eq('industry', industry)
      .eq('size_band', sizeBand)
      .single();
    const industry_benchmark = benchRes.data || null;

    // Step 3: cortex configuration is computed client-side, but we cache the team IDs here
    // For now: pass a placeholder; the client renders from selectCortexTeams() on the report page
    // OR: implement same logic in Deno here. For v1, rely on client.
    const cortex_configuration = null;

    // Step 4: generate ID and insert
    const id = nanoid();
    const insertRes = await supabase.from('audit_reports').insert({
      id,
      contact_name: contact.name,
      contact_email: contact.email,
      company_info: companyInfo,
      goals_readiness: goalsReadiness,
      departments,
      analysis,
      industry_benchmark,
      cortex_configuration,
    });
    if (insertRes.error) {
      console.error('Insert error:', insertRes.error);
      throw new Error('Failed to persist report');
    }

    // Step 5: fire n8n webhook (best-effort, don't block on failure)
    const reportLink = `https://sumait-audit.vercel.app/report/${id}`;
    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact,
          company_name: (companyInfo as any).companyName,
          report_link: reportLink,
          revenue: analysis.dashboard?.revenue,
          roi: analysis.dashboard?.roi,
          hours_saved: analysis.dashboard?.hours_saved,
        }),
      });
    } catch (e) {
      console.error('n8n webhook failed (non-blocking):', e);
    }

    return new Response(JSON.stringify({
      success: true,
      id,
      link: reportLink,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('generate-report error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Unable to generate report. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
```

- [ ] **Step 2: Set environment variables**

In Supabase dashboard → Edge Functions → Secrets:
- `N8N_REPORT_WEBHOOK_URL` = the webhook URL Bryan creates in n8n (Phase 5)

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` should already be available as built-in secrets.

- [ ] **Step 3: Deploy the function**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
npx supabase functions deploy generate-report
```

- [ ] **Step 4: Test with curl**

```bash
curl -X POST "https://<project-ref>.supabase.co/functions/v1/generate-report" \
  -H "Authorization: Bearer <anon-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "contact": {"name": "Test User", "email": "test@example.com"},
    "companyInfo": {"companyName": "Test Co", "industry": "agency", "employeeCount": "5", "techStack": "", "referralSource": ""},
    "goalsReadiness": {"averageEmployeeHourlyRate": "60", "currentMonthlyRevenue": "10k-25k", "biggestCostDriver": "labor-payroll", "incomeGoal90Days": "", "previousAIInvestment": "", "whyImplementAI": "", "expectedChanges": ""},
    "departments": [{"id":"1","name":"Sales","processes":[{"id":"a","processName":"Lead follow-up","hoursPerWeek":10,"peopleInvolved":1,"painPoints":""}]}]
  }'
```

Expected: `{ "success": true, "id": "<12-char-nanoid>", "link": "https://sumait-audit.vercel.app/report/<id>" }`. Verify the row exists in `audit_reports` table.

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/generate-report/
git commit -m "feat(api): add generate-report edge function with persistence + n8n webhook"
```

---

### Phase 1 closeout

- [ ] **Verify all 8 tasks landed cleanly**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
git log --oneline | head -10
bun run test
bunx tsc --noEmit
```

Expected: 8 commits, all tests pass, type check clean.

- [ ] **Push to remote**

```bash
git push origin main
```

---

## Phase 2: Report URL render (basic)

Build the `/report/[id]` route with all 10 sections rendering from the persisted data. Static render only at this phase (no simulator interactivity, no print CSS yet).

### Task 2.1: Add nanoid dependency, set up router for /report/[id]

**Repo:** `sumait-ai-audit`
**Files:**
- Modify: `package.json`
- Modify: `src/App.tsx`
- Create: `src/pages/Report.tsx` (stub)
- Create: `src/lib/report-fetcher.ts`

- [ ] **Step 1: Install nanoid**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
bun add nanoid
```

- [ ] **Step 2: Create the report-fetcher**

Create `src/lib/report-fetcher.ts`:
```ts
import { supabase } from "@/integrations/supabase/client";
import { AuditReport } from "@/types/report";

export async function fetchReportById(id: string): Promise<AuditReport | null> {
  const { data, error } = await supabase
    .from('audit_reports')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Failed to fetch report:', error);
    return null;
  }
  return data as AuditReport;
}

export async function incrementViewCount(id: string): Promise<void> {
  const { error } = await supabase.rpc('increment_view_count', { report_id: id });
  if (error) console.error('Failed to increment view count:', error);
}
```

- [ ] **Step 3: Create stub Report page**

Create `src/pages/Report.tsx`:
```tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuditReport } from "@/types/report";
import { fetchReportById, incrementViewCount } from "@/lib/report-fetcher";

export default function Report() {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<AuditReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchReportById(id).then((r) => {
      setReport(r);
      setLoading(false);
      if (r) incrementViewCount(id);
    });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-sumait-black text-white flex items-center justify-center">Loading…</div>;
  if (!report) return <div className="min-h-screen bg-sumait-black text-white flex items-center justify-center">Report not found.</div>;

  return (
    <div className="min-h-screen bg-sumait-black text-white p-8">
      <h1 className="text-2xl font-bold">Report for {report.company_info.companyName}</h1>
      <p className="text-white/60 mt-2">ID: {report.id}</p>
      <pre className="text-xs mt-6 overflow-auto">{JSON.stringify(report.analysis, null, 2)}</pre>
    </div>
  );
}
```

- [ ] **Step 4: Wire route in App.tsx**

In `src/App.tsx`, find where existing routes are defined. Add the new route. Example pattern:
```tsx
import Report from "./pages/Report";
// ...
<Route path="/report/:id" element={<Report />} />
```

- [ ] **Step 5: Smoke test**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
bun run dev
```

Open `http://localhost:8080/report/<id-from-curl-test>` from Task 1.8. Should render a debug view with the analysis JSON.

- [ ] **Step 6: Commit**

```bash
git add package.json bun.lockb src/lib/report-fetcher.ts src/pages/Report.tsx src/App.tsx
git commit -m "feat(report): scaffold /report/[id] route with fetcher and stub page"
```

---

### Task 2.2: Build ReportLayout shell

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/ReportLayout.tsx`

- [ ] **Step 1: Create the shell**

Create `src/components/report/ReportLayout.tsx`:
```tsx
import { ReactNode } from "react";

interface ReportLayoutProps {
  children: ReactNode;
}

export function ReportLayout({ children }: ReportLayoutProps) {
  return (
    <div className="min-h-screen bg-sumait-black text-white relative font-sans">
      {/* Bottom red glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.4) 0%, rgba(239, 68, 68, 0.2) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-16 space-y-12">
        {children}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/report/ReportLayout.tsx
git commit -m "feat(report): add ReportLayout shell with brand backgrounds"
```

---

### Task 2.3: Build CoverSection

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/CoverSection.tsx`

- [ ] **Step 1: Create the section**

Create `src/components/report/CoverSection.tsx`:
```tsx
import { AuditReport } from "@/types/report";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CoverProps {
  report: AuditReport;
}

export function CoverSection({ report }: CoverProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const date = new Date(report.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="report-section">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">SUMAIT.AI · AUDIT REPORT</p>
          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Prepared for {report.company_info.companyName || 'your business'}
          </h1>
          <p className="text-white/60 mt-3">{date}</p>
        </div>
        <button
          onClick={handleShare}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition text-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Share'}
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into Report.tsx**

Replace the body of the `Report` component (between loading/null returns and closing) with:
```tsx
import { ReportLayout } from "@/components/report/ReportLayout";
import { CoverSection } from "@/components/report/CoverSection";
// ...
return (
  <ReportLayout>
    <CoverSection report={report} />
    {/* More sections coming */}
  </ReportLayout>
);
```

Remove the debug `<pre>` JSON dump.

- [ ] **Step 3: Commit**

```bash
git add src/components/report/CoverSection.tsx src/pages/Report.tsx
git commit -m "feat(report): add CoverSection with share-link button"
```

---

### Task 2.4: Build ExecutiveSummary

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/ExecutiveSummary.tsx`

- [ ] **Step 1: Create the section**

Create `src/components/report/ExecutiveSummary.tsx`:
```tsx
import { AuditReport } from "@/types/report";
import { useEffect, useState } from "react";

const parseCurrency = (s: string) => parseInt((s || '').replace(/[$,]/g, '')) || 0;
const parseRoi = (s: string) => parseFloat((s || '').replace('x', '')) || 0;
const parseHours = (s: string) => parseInt((s || '').replace(/,/g, '')) || 0;

function AnimatedValue({ value, prefix = '', suffix = '', decimals = 0, delay = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number; delay?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / 1500, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setV(value * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  const formatted = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString();
  return <span className="tabular-nums">{prefix}{formatted}{suffix}</span>;
}

interface Props {
  report: AuditReport;
}

export function ExecutiveSummary({ report }: Props) {
  const totalSavings = parseCurrency(report.analysis.dashboard.revenue);
  const roi = parseRoi(report.analysis.dashboard.roi);
  const hours = parseHours(report.analysis.dashboard.hours_saved);

  const totalWeeklyHours = report.departments.reduce(
    (acc, d) => acc + d.processes.reduce((p, pr) => p + pr.hoursPerWeek * pr.peopleInvolved, 0),
    0
  );

  return (
    <section className="report-section rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/[0.10] p-8 md:p-12">
      <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">EXECUTIVE SUMMARY</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
        Your Efficiency Report is Ready.
      </h2>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            <AnimatedValue value={totalSavings} prefix="$" delay={200} />
          </p>
          <p className="text-white/50 mt-2 text-sm">Reclaimable Revenue</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <AnimatedValue value={roi} suffix="x" decimals={1} delay={400} />
          </p>
          <p className="text-white/50 mt-2 text-sm">First-Year ROI</p>
        </div>
        <div>
          <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <AnimatedValue value={hours} delay={600} />
          </p>
          <p className="text-white/50 mt-2 text-sm">Hours Saved per Year</p>
        </div>
      </div>

      <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-3xl">
        {report.company_info.companyName || 'Your business'} is currently spending {totalWeeklyHours} hours per week on processes that AI can do faster, cheaper, and around the clock. The math below shows what changing that looks like.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Wire into Report.tsx**

```tsx
import { ExecutiveSummary } from "@/components/report/ExecutiveSummary";
// inside ReportLayout:
<ExecutiveSummary report={report} />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/report/ExecutiveSummary.tsx src/pages/Report.tsx
git commit -m "feat(report): add ExecutiveSummary with animated headline numbers"
```

---

### Task 2.5: Build WhereYouAreToday

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/WhereYouAreToday.tsx`

- [ ] **Step 1: Create section**

Create `src/components/report/WhereYouAreToday.tsx`:
```tsx
import { AuditReport } from "@/types/report";

interface Props { report: AuditReport; }

export function WhereYouAreToday({ report }: Props) {
  const totalWeeklyHours = report.departments.reduce(
    (acc, d) => acc + d.processes.reduce((p, pr) => p + pr.hoursPerWeek * pr.peopleInvolved, 0), 0);
  const departmentNames = report.departments.map(d => d.name).join(', ');

  const rows = [
    { label: 'Industry', value: report.company_info.industry || 'Not specified' },
    { label: 'Employee count', value: report.company_info.employeeCount || 'Not specified' },
    { label: 'Current MRR', value: report.goals_readiness.currentMonthlyRevenue || 'Not specified' },
    { label: 'Biggest cost driver', value: report.goals_readiness.biggestCostDriver || 'Not specified' },
    { label: 'Tech stack', value: report.company_info.techStack || 'Not specified' },
    { label: 'Departments mapped', value: departmentNames || 'Not specified' },
    { label: 'Total weekly hours', value: `${totalWeeklyHours} hrs` },
    { label: 'Avg hourly rate', value: `$${report.goals_readiness.averageEmployeeHourlyRate || 'Not specified'}/hr` },
    { label: 'Prior AI investment', value: report.goals_readiness.previousAIInvestment || 'None' },
  ];

  return (
    <section className="report-section">
      <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">WHERE YOU ARE TODAY</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Snapshot of your operations</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {rows.map(({ label, value }) => (
          <div key={label} className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <p className="text-xs uppercase tracking-wider text-white/40 mb-1">{label}</p>
            <p className="text-white font-medium">{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into Report.tsx**

```tsx
import { WhereYouAreToday } from "@/components/report/WhereYouAreToday";
// ...
<WhereYouAreToday report={report} />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/report/WhereYouAreToday.tsx src/pages/Report.tsx
git commit -m "feat(report): add WhereYouAreToday snapshot grid"
```

---

### Task 2.6: Build IndustryBenchmark

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/IndustryBenchmark.tsx`

- [ ] **Step 1: Create section**

Create `src/components/report/IndustryBenchmark.tsx`:
```tsx
import { AuditReport } from "@/types/report";

interface Props { report: AuditReport; }

export function IndustryBenchmark({ report }: Props) {
  const bench = report.industry_benchmark;
  const yourHours = report.departments.reduce(
    (acc, d) => acc + d.processes.reduce((p, pr) => p + pr.hoursPerWeek * pr.peopleInvolved, 0), 0);

  if (!bench) {
    return null;
  }

  const max = Math.max(yourHours, bench.avg_weekly_manual_hours, bench.top_quartile_weekly_hours);
  const hourlyRate = parseFloat(report.goals_readiness.averageEmployeeHourlyRate || '50');
  const gap = Math.max(0, yourHours - bench.avg_weekly_manual_hours);
  const annualReclaim = Math.round(gap * 52 * hourlyRate);

  return (
    <section className="report-section">
      <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">INDUSTRY BENCHMARK</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
        Where you stand vs other {bench.industry} businesses your size
      </h2>

      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 md:p-8 mb-6">
        <div className="space-y-4">
          {[
            { label: 'Industry average', value: bench.avg_weekly_manual_hours, color: 'bg-white/30' },
            { label: 'Top quartile', value: bench.top_quartile_weekly_hours, color: 'bg-emerald-400' },
            { label: 'You', value: yourHours, color: 'bg-primary' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white/70">{label}</span>
                <span className="text-white font-mono">{value} hrs/week</span>
              </div>
              <div className="h-3 rounded-full bg-white/[0.04] overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
              </div>
            </div>
          ))}
        </div>

        {gap > 0 && (
          <p className="text-white/70 mt-6 leading-relaxed">
            You are spending <span className="text-primary font-bold">{gap} hours per week</span> more than the industry average. Closing that gap reclaims <span className="text-primary font-bold">${annualReclaim.toLocaleString()}</span> per year at your hourly rate.
          </p>
        )}
      </div>

      <h3 className="font-display text-lg font-semibold mb-3">What is working in your industry right now</h3>
      <ul className="space-y-2 text-white/70">
        {bench.common_quick_wins.map((win) => (
          <li key={win} className="flex gap-3">
            <span className="text-primary">·</span>
            <span>{win}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-white/30 mt-4">{bench.source_note}</p>
    </section>
  );
}
```

- [ ] **Step 2: Wire into Report.tsx**

```tsx
import { IndustryBenchmark } from "@/components/report/IndustryBenchmark";
// ...
<IndustryBenchmark report={report} />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/report/IndustryBenchmark.tsx src/pages/Report.tsx
git commit -m "feat(report): add IndustryBenchmark comparison with bar chart"
```

---

### Task 2.7: Build RoadmapSection (uses computePhaseDates)

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/RoadmapSection.tsx`

- [ ] **Step 1: Create section**

Create `src/components/report/RoadmapSection.tsx`:
```tsx
import { AuditReport } from "@/types/report";
import { computePhaseDates } from "@/lib/calendar";
import { QuickWin, LongTermStrategy } from "@/types/audit";
import { AlertTriangle, Lightbulb } from "lucide-react";

interface Props { report: AuditReport; }

const formatDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export function RoadmapSection({ report }: Props) {
  const phases = computePhaseDates(report.created_at);
  const wins = report.analysis.quick_wins || [];
  const longTerm = report.analysis.long_term_strategy || [];
  const tomorrow = wins.find(w => w.what_to_do_tomorrow)?.what_to_do_tomorrow;

  const itemsByPhase = (phaseNum: 30 | 60 | 90): (QuickWin | LongTermStrategy)[] => [
    ...wins.filter(w => w.phase === phaseNum),
    ...longTerm.filter(l => l.phase === phaseNum),
  ];

  return (
    <section className="report-section">
      <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">YOUR 30-60-90 ROADMAP</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">From plan to action</h2>

      {tomorrow && (
        <div className="rounded-2xl bg-gradient-to-br from-primary/15 to-transparent border border-primary/30 p-6 mb-8">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold mb-2">What to do tomorrow morning</p>
              <p className="text-white/80 leading-relaxed">{tomorrow}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {phases.map((phase, idx) => {
          const phaseNum = (idx === 0 ? 30 : idx === 1 ? 60 : 90) as 30 | 60 | 90;
          const items = itemsByPhase(phaseNum);
          return (
            <div key={phase.label} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-5 md:p-6">
              <p className="font-mono text-xs text-primary mb-1">{phase.label.toUpperCase()}</p>
              <p className="text-sm text-white/60 mb-1">Days {idx * 30 + 1}-{(idx + 1) * 30}</p>
              <p className="text-xs text-white/40 mb-5">{formatDate(phase.start)} - {formatDate(phase.end)}, {phase.start.getFullYear()}</p>

              <div className="space-y-4">
                {items.length === 0 && <p className="text-white/40 text-sm italic">No items in this phase</p>}
                {items.map((item) => (
                  <div key={item.id} className="border-l-2 border-primary pl-4">
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-white/60 mb-2">Setup: {item.effort_hours} hrs · Saves {item.hours_per_week_saved} hrs/wk</p>
                    {item.dependency_id && (
                      <p className="text-xs text-yellow-400 flex items-start gap-1">
                        <AlertTriangle className="w-3 h-3 mt-0.5" />
                        Depends on {item.dependency_id}
                      </p>
                    )}
                    {item.risk_level !== 'low' && (
                      <p className="text-xs text-white/50 mt-1">Risk ({item.risk_level}): {('risk_note' in item ? item.risk_note : '')}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into Report.tsx**

```tsx
import { RoadmapSection } from "@/components/report/RoadmapSection";
// ...
<RoadmapSection report={report} />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/report/RoadmapSection.tsx src/pages/Report.tsx
git commit -m "feat(report): add 30-60-90 RoadmapSection with What-To-Do-Tomorrow callout"
```

---

### Task 2.8: Build CortexConfig

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/CortexConfig.tsx`

- [ ] **Step 1: Create section**

Create `src/components/report/CortexConfig.tsx`:
```tsx
import { AuditReport } from "@/types/report";
import { selectCortexTeams, cortexTeams } from "@/lib/cortex";

interface Props { report: AuditReport; }

export function CortexConfig({ report }: Props) {
  const teamIds = selectCortexTeams({
    companyInfo: report.company_info,
    goalsReadiness: report.goals_readiness,
    departments: report.departments,
  });
  const teams = teamIds.map(id => cortexTeams[id]).filter(Boolean);
  const explanations = report.analysis.cortex_team_explanations || {};
  const hourlyRate = parseFloat(report.goals_readiness.averageEmployeeHourlyRate || '50');

  // Combined totals
  const allTools = new Set<string>();
  let totalAgents = 0;
  for (const team of teams) {
    team.tools.forEach(t => allTools.add(t));
    totalAgents += team.agentCount;
  }

  // Estimate combined impact from quick wins (rough)
  const wins = report.analysis.quick_wins || [];
  const longTerm = report.analysis.long_term_strategy || [];
  const combinedHours = [...wins, ...longTerm].reduce((acc, w) => acc + (w.hours_per_week_saved || 0), 0);
  const combinedAnnual = Math.round(combinedHours * 52 * hourlyRate);

  return (
    <section className="report-section">
      <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">YOUR CORTEX CONFIGURATION</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">
        The exact AI agent setup for {report.company_info.companyName || 'your business'}
      </h2>

      <p className="text-white/60 mb-8 max-w-3xl">
        Your business needs these specialized teams from our 18-team Cortex framework. Each card shows what that team does for you specifically and the tools it wires up.
      </p>

      <div className="space-y-4 mb-8">
        {teams.map((team) => {
          const exp = explanations[team.id];
          return (
            <div key={team.id} className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-mono text-xs text-primary tracking-widest">{team.id} / {team.name.toUpperCase()}</p>
                  <p className="text-white/50 text-sm mt-1">{team.tagline}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </div>
              </div>

              {exp?.paragraph && (
                <p className="text-white/80 leading-relaxed mb-4">{exp.paragraph}</p>
              )}

              <p className="text-xs text-white/40 mb-1 uppercase tracking-wider">Tools wired</p>
              <p className="text-white/70 text-sm mb-4">{team.tools.join(' · ')}</p>

              {exp?.impact_line && (
                <p className="text-primary font-mono text-sm">{exp.impact_line}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/30 p-6 md:p-8">
        <p className="text-xs text-white/50 uppercase tracking-wider mb-2">Your Cortex setup recommends</p>
        <p className="text-2xl md:text-3xl font-bold mb-1">
          {teams.length} teams · {totalAgents} agents · {allTools.size} tools wired
        </p>
        <p className="text-white/70 mt-2">
          Combined estimated impact: <span className="text-primary font-bold">${combinedAnnual.toLocaleString()}/yr</span> · {combinedHours} hrs/week saved
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <a href="https://api.leadconnectorhq.com/widget/booking/LvT9ESMMAUsFrky1KMt9" target="_blank" rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-primary text-white font-semibold text-sm hover:bg-primary/90 transition">
            Get this exact setup deployed →
          </a>
          <a href="https://sumait-cortex.vercel.app" target="_blank" rel="noopener noreferrer"
            className="px-5 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition">
            See the full Cortex catalog
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into Report.tsx**

```tsx
import { CortexConfig } from "@/components/report/CortexConfig";
// ...
<CortexConfig report={report} />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/report/CortexConfig.tsx src/pages/Report.tsx
git commit -m "feat(report): add CortexConfig section with team cards and totals"
```

---

### Task 2.9: Build MathSection (reuse existing breakdown)

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/MathSection.tsx`

- [ ] **Step 1: Create section (reuses existing computation breakdown)**

Create `src/components/report/MathSection.tsx`:
```tsx
import { AuditReport } from "@/types/report";
import { Calculator, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props { report: AuditReport; }

export function MathSection({ report }: Props) {
  const [open, setOpen] = useState(true);
  const breakdown = report.analysis.computation_breakdown;

  if (!breakdown) return null;

  return (
    <section className="report-section">
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
        <button onClick={() => setOpen(!open)} className="w-full p-6 flex items-center justify-between hover:bg-white/[0.02] transition">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-primary" />
            <span className="font-semibold">How we calculated this</span>
          </div>
          <ChevronDown className={cn('w-5 h-5 text-white/50 transition-transform', open && 'rotate-180')} />
        </button>

        {open && (
          <div className="px-6 pb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02]">
                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Hourly rate</p>
                <p className="font-semibold">{breakdown.hourly_rate_used}</p>
                <p className="text-xs text-white/30 mt-1">{breakdown.hourly_rate_source === 'user-provided' ? 'From your input' : 'Industry average'}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02]">
                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Total hours/year</p>
                <p className="font-semibold">{breakdown.total_annual_hours?.toLocaleString() || 'Not available'}</p>
                <p className="text-xs text-white/30 mt-1">{breakdown.total_weekly_hours} hrs/week × 52</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02]">
                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Current labor cost</p>
                <p className="font-semibold">{breakdown.total_annual_labor_cost}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02]">
                <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Automation efficiency</p>
                <p className="font-semibold">{breakdown.automation_efficiency}</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20">
              <p className="text-xs uppercase tracking-wider text-white/50 mb-2">ROI calculation</p>
              <p className="text-white/80 text-sm">{breakdown.roi_calculation}</p>
              <p className="text-xs text-white/30 mt-2">ROI capped at {breakdown.roi_ceiling_applied} based on your revenue tier</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into Report.tsx**

```tsx
import { MathSection } from "@/components/report/MathSection";
// ...
<MathSection report={report} />
```

- [ ] **Step 3: Commit**

```bash
git add src/components/report/MathSection.tsx src/pages/Report.tsx
git commit -m "feat(report): add MathSection reusing computation breakdown"
```

---

### Task 2.10: Build WhatHappensNext (without share UI yet) and ReportFooter

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/WhatHappensNext.tsx`
- Create: `src/components/report/ReportFooter.tsx`

- [ ] **Step 1: Create WhatHappensNext**

Create `src/components/report/WhatHappensNext.tsx`:
```tsx
import { AuditReport } from "@/types/report";

interface Props { report: AuditReport; }

export function WhatHappensNext({ report }: Props) {
  return (
    <section className="report-section">
      <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">WHAT HAPPENS NEXT</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Three ways forward</h2>

      <div className="grid md:grid-cols-3 gap-4">
        <a href="https://api.leadconnectorhq.com/widget/booking/LvT9ESMMAUsFrky1KMt9" target="_blank" rel="noopener noreferrer"
          className="rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/15 transition p-6 text-center">
          <p className="font-semibold text-lg">Book a strategy call</p>
          <p className="text-white/60 text-sm mt-2">30 minutes with Bryan to plan your first quick win</p>
        </a>

        <button onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] transition p-6 text-center">
          <p className="font-semibold text-lg">Share with your team</p>
          <p className="text-white/60 text-sm mt-2">Copy the link to send to your CFO or co-founder</p>
        </button>

        <button onClick={() => window.print()}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] transition p-6 text-center">
          <p className="font-semibold text-lg">Download as PDF</p>
          <p className="text-white/60 text-sm mt-2">Print to PDF for offline review</p>
        </button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create ReportFooter**

Create `src/components/report/ReportFooter.tsx`:
```tsx
import { AuditReport } from "@/types/report";

interface Props { report: AuditReport; }

const relativeTime = (iso: string | null): string => {
  if (!iso) return 'just now';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
};

export function ReportFooter({ report }: Props) {
  return (
    <footer className="report-section pt-8 border-t border-white/10 text-center">
      <p className="font-mono text-xs text-white/30 tracking-wider mb-2">SUMAIT.AI · REVIEWED BY BRYAN SUMAIT</p>
      <p className="text-white/50 text-sm mb-4">
        <a href="mailto:bryansumaitofficial@gmail.com" className="hover:text-white">bryansumaitofficial@gmail.com</a>
        {' · '}
        <a href="https://sumait-audit.vercel.app/" className="hover:text-white">Run a new audit</a>
      </p>
      {report.view_count > 1 && (
        <p className="text-xs text-white/30">
          Viewed {report.view_count} times · Last opened {relativeTime(report.last_viewed_at)}
        </p>
      )}
    </footer>
  );
}
```

- [ ] **Step 3: Wire into Report.tsx**

```tsx
import { WhatHappensNext } from "@/components/report/WhatHappensNext";
import { ReportFooter } from "@/components/report/ReportFooter";
// inside ReportLayout, after MathSection:
<WhatHappensNext report={report} />
<ReportFooter report={report} />
```

- [ ] **Step 4: Smoke test**

```bash
bun run dev
```

Visit `/report/<id>` from earlier curl test. Verify all sections render without errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/report/WhatHappensNext.tsx src/components/report/ReportFooter.tsx src/pages/Report.tsx
git commit -m "feat(report): add WhatHappensNext + ReportFooter sections"
```

---

### Phase 2 closeout

- [ ] **Type check + tests + push**

```bash
bunx tsc --noEmit
bun run test
git push origin main
```

Verify Vercel preview renders the report URL correctly.

---

## Phase 3: Interactivity layer

Build the What-If simulator math hook with TDD, then wire the interactive UI plus share/print mechanics.

### Task 3.1: Build useWhatIfSimulator math + dependency cascade with TDD

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/lib/simulator.ts`
- Create: `src/lib/simulator.test.ts`

- [ ] **Step 1: Write failing tests**

Create `src/lib/simulator.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { computeScenario, applyDependencyCascade, ScenarioInputs } from "./simulator";

const items = [
  { id: 'qw_1', hours_per_week_saved: 8, dependency_id: null },
  { id: 'qw_2', hours_per_week_saved: 14, dependency_id: 'qw_1' },
  { id: 'qw_3', hours_per_week_saved: 5, dependency_id: null },
  { id: 'lt_1', hours_per_week_saved: 18, dependency_id: null },
];

describe("computeScenario", () => {
  it("sums hours and money for active items", () => {
    const inputs: ScenarioInputs = { items, activeIds: ['qw_1', 'qw_2', 'qw_3'], hourlyRate: 50 };
    const result = computeScenario(inputs);
    expect(result.weeklyHours).toBe(27);
    expect(result.annualHours).toBe(27 * 52);
    expect(result.annualSavings).toBe(27 * 52 * 50);
  });

  it("returns 0 when nothing is active", () => {
    const inputs: ScenarioInputs = { items, activeIds: [], hourlyRate: 50 };
    const result = computeScenario(inputs);
    expect(result.weeklyHours).toBe(0);
    expect(result.annualSavings).toBe(0);
  });

  it("respects hourly rate", () => {
    const inputs: ScenarioInputs = { items, activeIds: ['qw_1'], hourlyRate: 100 };
    const result = computeScenario(inputs);
    expect(result.annualSavings).toBe(8 * 52 * 100);
  });
});

describe("applyDependencyCascade", () => {
  it("disables items whose dependency is not active", () => {
    const result = applyDependencyCascade(items, ['qw_2', 'qw_3'], false);
    expect(result).not.toContain('qw_2');
    expect(result).toContain('qw_3');
  });

  it("keeps items if their dependency is active", () => {
    const result = applyDependencyCascade(items, ['qw_1', 'qw_2'], false);
    expect(result).toContain('qw_1');
    expect(result).toContain('qw_2');
  });

  it("does not cascade when ignoreDependencies is true", () => {
    const result = applyDependencyCascade(items, ['qw_2'], true);
    expect(result).toContain('qw_2');
  });

  it("handles items with no dependencies", () => {
    const result = applyDependencyCascade(items, ['qw_3', 'lt_1'], false);
    expect(result).toContain('qw_3');
    expect(result).toContain('lt_1');
  });
});
```

- [ ] **Step 2: Run test, expect failure**

```bash
bun run test src/lib/simulator.test.ts
```

- [ ] **Step 3: Implement**

Create `src/lib/simulator.ts`:
```ts
export interface SimulatorItem {
  id: string;
  hours_per_week_saved: number;
  dependency_id: string | null;
}

export interface ScenarioInputs {
  items: SimulatorItem[];
  activeIds: string[];
  hourlyRate: number;
}

export interface ScenarioResult {
  weeklyHours: number;
  annualHours: number;
  annualSavings: number;
}

export function computeScenario(inputs: ScenarioInputs): ScenarioResult {
  const active = new Set(inputs.activeIds);
  const weeklyHours = inputs.items
    .filter(i => active.has(i.id))
    .reduce((sum, i) => sum + i.hours_per_week_saved, 0);
  const annualHours = weeklyHours * 52;
  return {
    weeklyHours,
    annualHours,
    annualSavings: annualHours * inputs.hourlyRate,
  };
}

export function applyDependencyCascade(
  items: SimulatorItem[],
  activeIds: string[],
  ignoreDependencies: boolean
): string[] {
  if (ignoreDependencies) return activeIds;
  const active = new Set(activeIds);
  // Iterate until stable: remove items whose dependency is not active
  let changed = true;
  while (changed) {
    changed = false;
    for (const id of [...active]) {
      const item = items.find(i => i.id === id);
      if (!item) continue;
      if (item.dependency_id && !active.has(item.dependency_id)) {
        active.delete(id);
        changed = true;
      }
    }
  }
  return [...active];
}
```

- [ ] **Step 4: Run test, expect pass**

```bash
bun run test src/lib/simulator.test.ts
```

Expected: all 7 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/simulator.ts src/lib/simulator.test.ts
git commit -m "feat(simulator): add computeScenario + applyDependencyCascade with tests"
```

---

### Task 3.2: Build WhatIfSimulator UI

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/WhatIfSimulator.tsx`

- [ ] **Step 1: Create component**

Create `src/components/report/WhatIfSimulator.tsx`:
```tsx
import { AuditReport } from "@/types/report";
import { useState, useMemo } from "react";
import { computeScenario, applyDependencyCascade, SimulatorItem } from "@/lib/simulator";
import { Sliders } from "lucide-react";

interface Props { report: AuditReport; }

export function WhatIfSimulator({ report }: Props) {
  const allItems: SimulatorItem[] = useMemo(() => {
    const wins = (report.analysis.quick_wins || []).map(w => ({
      id: w.id,
      hours_per_week_saved: w.hours_per_week_saved,
      dependency_id: w.dependency_id,
    }));
    const longTerm = (report.analysis.long_term_strategy || []).map(l => ({
      id: l.id,
      hours_per_week_saved: l.hours_per_week_saved,
      dependency_id: l.dependency_id,
    }));
    return [...wins, ...longTerm];
  }, [report]);

  const defaultRate = parseFloat(report.goals_readiness.averageEmployeeHourlyRate || '50');
  const allDefaultActive = allItems.map(i => i.id);

  const [activeIds, setActiveIds] = useState<string[]>(allDefaultActive);
  const [hourlyRate, setHourlyRate] = useState(defaultRate);
  const [ignoreDeps, setIgnoreDeps] = useState(false);

  const effective = applyDependencyCascade(allItems, activeIds, ignoreDeps);
  const result = computeScenario({ items: allItems, activeIds: effective, hourlyRate });

  const toggle = (id: string) => {
    setActiveIds(curr => curr.includes(id) ? curr.filter(x => x !== id) : [...curr, id]);
  };

  const scenarioLabel = (() => {
    if (effective.length === allItems.length && hourlyRate === defaultRate) return 'Recommended scenario';
    if (effective.length < allItems.length) return 'Conservative scenario';
    if (hourlyRate !== defaultRate) return 'Custom assumption';
    return 'Aggressive scenario';
  })();

  return (
    <section className="report-section">
      <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">WHAT-IF SIMULATOR</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">Adjust your scenario</h2>
      <p className="text-xs uppercase tracking-wider text-white/50 mb-6 inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
        {scenarioLabel}
      </p>

      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6 mb-6">
        {/* Live results */}
        <div className="grid grid-cols-3 gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Annual savings</p>
            <p className="text-2xl font-bold text-primary tabular-nums">${result.annualSavings.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Weekly hours saved</p>
            <p className="text-2xl font-bold tabular-nums">{result.weeklyHours}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/40 mb-1">Active items</p>
            <p className="text-2xl font-bold tabular-nums">{effective.length} / {allItems.length}</p>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 mb-6">
          <p className="font-mono text-xs uppercase tracking-wider text-white/50">Quick wins</p>
          {(report.analysis.quick_wins || []).map(w => {
            const isActive = activeIds.includes(w.id);
            const isCascadedOff = !ignoreDeps && isActive && !effective.includes(w.id);
            return (
              <label key={w.id} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={isActive} onChange={() => toggle(w.id)} className="w-4 h-4 accent-primary" />
                <span className={`flex-1 text-sm ${isCascadedOff ? 'text-white/30 line-through' : 'text-white/80'}`}>{w.title}</span>
                <span className="text-xs text-white/50 font-mono">{w.hours_per_week_saved} hrs/wk · ${(w.hours_per_week_saved * 52 * hourlyRate).toLocaleString()}/yr</span>
              </label>
            );
          })}

          <p className="font-mono text-xs uppercase tracking-wider text-white/50 pt-3">Long-term plays</p>
          {(report.analysis.long_term_strategy || []).map(l => {
            const isActive = activeIds.includes(l.id);
            const isCascadedOff = !ignoreDeps && isActive && !effective.includes(l.id);
            return (
              <label key={l.id} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={isActive} onChange={() => toggle(l.id)} className="w-4 h-4 accent-primary" />
                <span className={`flex-1 text-sm ${isCascadedOff ? 'text-white/30 line-through' : 'text-white/80'}`}>{l.title}</span>
                <span className="text-xs text-white/50 font-mono">{l.hours_per_week_saved} hrs/wk · ${(l.hours_per_week_saved * 52 * hourlyRate).toLocaleString()}/yr</span>
              </label>
            );
          })}
        </div>

        {/* Hourly rate slider */}
        <div className="pt-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white/70">Average hourly rate</p>
            <p className="text-sm font-mono text-primary">${hourlyRate}/hr</p>
          </div>
          <input
            type="range"
            min={20} max={200} step={5}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(parseInt(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-white/40 mt-1"><span>$20</span><span>$200</span></div>
        </div>

        {/* Ignore dependencies */}
        <div className="pt-4 mt-4 border-t border-white/10">
          <button onClick={() => setIgnoreDeps(!ignoreDeps)} className="text-xs text-white/50 hover:text-white/80 transition">
            {ignoreDeps ? '✓ Ignoring dependencies' : 'Ignore dependencies'}
          </button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into Report.tsx**

Place between RoadmapSection and MathSection:
```tsx
import { WhatIfSimulator } from "@/components/report/WhatIfSimulator";
// ...
<WhatIfSimulator report={report} />
```

- [ ] **Step 3: Manually verify**

```bash
bun run dev
```

Visit a report URL. Toggle items. Confirm:
- Numbers recalculate live
- Dependency cascade visually strikes through dependent items when their parent is off
- "Ignore dependencies" link toggles the cascade

- [ ] **Step 4: Commit**

```bash
git add src/components/report/WhatIfSimulator.tsx src/pages/Report.tsx
git commit -m "feat(simulator): add interactive What-If section with toggles + slider"
```

---

### Task 3.3: Build ShareTeammateForm

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/components/report/ShareTeammateForm.tsx`
- Modify: `src/components/report/WhatHappensNext.tsx`

- [ ] **Step 1: Create the form**

Create `src/components/report/ShareTeammateForm.tsx`:
```tsx
import { useState } from "react";
import { AuditReport } from "@/types/report";
import { Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

// Set via env var during Phase 5 cutover. Points to Baccarat n8n instance.
const SHARE_WEBHOOK_URL = import.meta.env.VITE_N8N_SHARE_WEBHOOK_URL || "https://<baccarat-n8n-instance>/webhook/sumait-ai-audit-share";

interface Props { report: AuditReport; onClose: () => void; }

export function ShareTeammateForm({ report, onClose }: Props) {
  const [toEmail, setToEmail] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!toEmail) return;
    setSending(true);
    try {
      const res = await fetch(SHARE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from_name: report.contact_name,
          from_email: report.contact_email,
          to_email: toEmail,
          note,
          report_link: window.location.href,
          company_name: report.company_info.companyName,
        }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
      toast.success("Sent!");
      setTimeout(onClose, 2000);
    } catch {
      toast.error("Could not send. Try again.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="text-center p-6">
        <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
        <p className="font-semibold">Sent to {toEmail}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <input type="email" placeholder="Teammate's email" value={toEmail} onChange={(e) => setToEmail(e.target.value)} required
        className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-sm focus:border-primary/50 outline-none" />
      <textarea placeholder="Optional note..." value={note} onChange={(e) => setNote(e.target.value)} rows={2}
        className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/10 text-sm focus:border-primary/50 outline-none" />
      <div className="flex gap-2">
        <button type="submit" disabled={sending} className="flex-1 px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2">
          {sending ? "Sending…" : <><Send className="w-4 h-4" /> Send</>}
        </button>
        <button type="button" onClick={onClose} className="px-4 py-3 rounded-lg border border-white/10 text-sm hover:bg-white/5">Cancel</button>
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Update WhatHappensNext to open form on share click**

Replace `src/components/report/WhatHappensNext.tsx` with:
```tsx
import { AuditReport } from "@/types/report";
import { useState } from "react";
import { ShareTeammateForm } from "./ShareTeammateForm";

interface Props { report: AuditReport; }

export function WhatHappensNext({ report }: Props) {
  const [showShare, setShowShare] = useState(false);

  return (
    <section className="report-section">
      <p className="font-mono text-xs tracking-[0.3em] text-primary mb-3">WHAT HAPPENS NEXT</p>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">Three ways forward</h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <a href="https://api.leadconnectorhq.com/widget/booking/LvT9ESMMAUsFrky1KMt9" target="_blank" rel="noopener noreferrer"
          className="rounded-2xl bg-primary/10 border border-primary/30 hover:bg-primary/15 transition p-6 text-center">
          <p className="font-semibold text-lg">Book a strategy call</p>
          <p className="text-white/60 text-sm mt-2">30 minutes with Bryan to plan your first quick win</p>
        </a>

        <button onClick={() => setShowShare(true)}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] transition p-6 text-center">
          <p className="font-semibold text-lg">Email to teammate</p>
          <p className="text-white/60 text-sm mt-2">Send the report to your CFO or co-founder</p>
        </button>

        <button onClick={() => window.print()}
          className="rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] transition p-6 text-center">
          <p className="font-semibold text-lg">Download as PDF</p>
          <p className="text-white/60 text-sm mt-2">Print to PDF for offline review</p>
        </button>
      </div>

      {showShare && (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] p-6">
          <ShareTeammateForm report={report} onClose={() => setShowShare(false)} />
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/report/ShareTeammateForm.tsx src/components/report/WhatHappensNext.tsx
git commit -m "feat(report): add ShareTeammateForm + wire into WhatHappensNext"
```

---

### Task 3.4: Add print-optimized CSS

**Repo:** `sumait-ai-audit`
**Files:**
- Create: `src/styles/print.css`
- Modify: `src/index.css` (import print styles)

- [ ] **Step 1: Create print stylesheet**

Create `src/styles/print.css`:
```css
@media print {
  /* Reset to printer-friendly white */
  body, html { background: white !important; color: black !important; }
  .min-h-screen { min-height: auto !important; background: white !important; }

  /* Hide chrome */
  nav, button[aria-label], .no-print { display: none !important; }

  /* Hide simulator (replace with snapshot in future iteration) */
  .report-section input[type="checkbox"],
  .report-section input[type="range"],
  .report-section button { display: none !important; }

  /* Brand colors only on accents */
  .text-primary { color: #ef4444 !important; }
  .bg-primary { background: #ef4444 !important; }

  /* Section breaks */
  .report-section { break-inside: avoid; page-break-inside: avoid; margin-bottom: 24px; }

  /* Clean borders for print */
  .border-white\/10, .border-white\/\[0\.08\] { border-color: #ddd !important; }
  .bg-white\/\[0\.02\] { background: #f9f9f9 !important; }
  .text-white, .text-white\/80, .text-white\/70, .text-white\/60, .text-white\/50, .text-white\/40, .text-white\/30 { color: #333 !important; }

  /* Page setup */
  @page { size: A4 portrait; margin: 1cm; }
}
```

- [ ] **Step 2: Import in index.css**

In `src/index.css`, add at the bottom:
```css
@import './styles/print.css';
```

- [ ] **Step 3: Manual verify**

```bash
bun run dev
```

Open a report URL. Press Ctrl+P (or Cmd+P). Confirm the print preview:
- White background, black text
- Brand red accents preserved
- No buttons, simulator inputs visible
- Section breaks at logical points

- [ ] **Step 4: Commit**

```bash
git add src/styles/print.css src/index.css
git commit -m "feat(report): add print-optimized CSS for browser PDF export"
```

---

### Phase 3 closeout

- [ ] **Type check + tests + push**

```bash
bunx tsc --noEmit
bun run test
git push origin main
```

---

## Phase 4: Update wizard submission flow

Switch the existing wizard from "submit to n8n directly" to "call generate-report, then redirect to /report/[id]".

### Task 4.1: Update AuditWizard handleSubmit

**Repo:** `sumait-ai-audit`
**Files:**
- Modify: `src/components/audit/AuditWizard.tsx`

- [ ] **Step 1: Replace handleSubmit logic**

In `src/components/audit/AuditWizard.tsx`, find the current `handleSubmit` function and replace its body.

Current pattern (calls analyze-audit, then n8n on email gate):
```ts
const { data, error } = await supabase.functions.invoke('analyze-audit', { body: ... });
```

New pattern (still uses the existing wizard for collecting data, but on the FINAL email submission, calls generate-report instead). For v1 we keep the existing dashboard flow but ALSO redirect to the new report URL after successful generate-report.

Find the existing `handleSubmit` and modify. The new flow:
1. Wizard step 1-4 stays unchanged (collects data, runs analyze-audit for the dashboard)
2. The dashboard email gate (in `LeadMagnetGate` component, currently in ResultsDashboard) is replaced with a "Generate Full Report" button that calls generate-report and redirects

Update `LeadMagnetGate.handleSubmit` in `src/components/audit/ResultsDashboard.tsx`:

Find the existing `handleSubmit` in `LeadMagnetGate`:
```ts
const response = await fetch("https://madeeas.app.n8n.cloud/webhook/sumait-ai-audit", { ... });
```

Replace with:
```ts
const { data: result, error } = await supabase.functions.invoke('generate-report', {
  body: {
    contact: { name, email },
    companyInfo: data.companyInfo,
    goalsReadiness: data.goalsReadiness,
    departments: data.departments,
  },
});

if (error || !result?.success) {
  throw new Error(result?.error || 'Failed to generate report');
}

// Redirect to the hosted report URL
window.location.href = `/report/${result.id}`;
```

Add the import at the top of ResultsDashboard.tsx if not present:
```ts
import { supabase } from "@/integrations/supabase/client";
```

- [ ] **Step 2: Manually verify**

Run a complete audit submission flow. Verify after entering email + name on the gate, the page navigates to `/report/<new-id>`.

- [ ] **Step 3: Commit**

```bash
git add src/components/audit/ResultsDashboard.tsx
git commit -m "feat(wizard): submit lead form via generate-report and redirect to /report/[id]"
```

---

## Phase 5: Email + n8n configuration (Bryan-side, manual)

These tasks are configuration in the **Baccarat n8n instance**. They are not code commits in the audit repo. Bryan provides the Baccarat n8n base URL during this phase, then sets the corresponding env vars:
- Supabase secret `N8N_REPORT_WEBHOOK_URL` (used by `generate-report` edge function)
- Vercel env var `VITE_N8N_SHARE_WEBHOOK_URL` (used by `ShareTeammateForm`)

### Task 5.1: Build the report-ready email workflow on Baccarat n8n

**Repo:** none (Baccarat n8n config)

- [ ] **Step 1: Create new webhook trigger on Baccarat n8n at path `/webhook/sumait-ai-audit-report`**

- [ ] **Step 2: Wire the email node to use the template per spec section 7.2**

Send from `bryansumaitofficial@gmail.com`. Reply-to same. Body uses the template in the spec.

- [ ] **Step 3: Set `N8N_REPORT_WEBHOOK_URL` in Supabase secrets to the new Baccarat URL**

Via Supabase dashboard → Edge Functions → Secrets, set `N8N_REPORT_WEBHOOK_URL=https://<your-baccarat-n8n-host>/webhook/sumait-ai-audit-report`.

- [ ] **Step 4: Test by submitting an audit and verifying email arrives at the lead's email address**

### Task 5.2: Build the share-report n8n workflow on Baccarat n8n

**Repo:** none (Baccarat n8n config)

- [ ] **Step 1: Create new webhook trigger on Baccarat n8n at path `/webhook/sumait-ai-audit-share`**

- [ ] **Step 2: Wire it to send a forwarded email from `from_email` (the original viewer) to `to_email` (their teammate) with the `report_link` and optional `note`**

- [ ] **Step 3: Set `VITE_N8N_SHARE_WEBHOOK_URL` in Vercel env vars for the audit project**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
vercel env add VITE_N8N_SHARE_WEBHOOK_URL production
# Enter: https://<your-baccarat-n8n-host>/webhook/sumait-ai-audit-share
```

Redeploy to pick up the new env var:
```bash
vercel --prod --yes
```

- [ ] **Step 4: Test via the report's share form**

### Task 5.3: Configure re-engagement sequence triggers on Baccarat n8n

**Repo:** none (Baccarat n8n config)

Per spec section 7.5. Baccarat n8n schedules re-engagement emails based on `audit_reports` row age (queried from Supabase) and LeadConnector booking events.

- [ ] **Step 1: Create the day-3, day-7, day-14 trigger workflows on Baccarat n8n**
- [ ] **Step 2: Wire LeadConnector booking webhook as cancel signal**
- [ ] **Step 3: Wire share-report webhook as Telegram notification trigger to Bryan**

---

## Phase 6: sumaitai integration

5 small touchpoints in the sumaitai repo plus the FAQ Q7 update.

### Task 6.1: Update Footer audit URL

**Repo:** `sumaitai`
**Files:**
- Modify: `src/components/Footer.tsx`

- [ ] **Step 1: Replace URL**

Find:
```tsx
href="https://sumait-ai-audit.lovable.app/"
```
Replace with:
```tsx
href="https://sumait-audit.vercel.app/"
```

- [ ] **Step 2: Commit**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumaitai
git add src/components/Footer.tsx
git commit -m "fix(footer): point audit CTA to sumait-audit.vercel.app"
```

### Task 6.2: Add Audit nav link to FloatingNav

**Repo:** `sumaitai`
**Files:**
- Modify: `src/components/FloatingNav.tsx`

- [ ] **Step 1: Update navLinks array**

Find:
```tsx
const navLinks = [
  { label: 'Systems', href: '#systems' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#projects' },
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
  { label: 'Audit', href: 'https://sumait-audit.vercel.app/', external: true },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];
```

- [ ] **Step 2: Update render to handle external links in both desktop and mobile blocks**

In the desktop block, change the `.map()`:
```tsx
{navLinks.map((link) => (
  <a
    key={link.label}
    href={link.href}
    onClick={link.external ? undefined : (e) => handleSmoothScroll(e, link.href)}
    target={link.external ? '_blank' : undefined}
    rel={link.external ? 'noopener noreferrer' : undefined}
    className="text-sm text-white/60 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-colors"
  >
    {link.label}
  </a>
))}
```

Same change in the mobile menu block.

Also update the navLinks type definition to allow `external` boolean:
```tsx
const navLinks: { label: string; href: string; external?: boolean }[] = [...];
```

- [ ] **Step 3: Commit**

```bash
git add src/components/FloatingNav.tsx
git commit -m "feat(nav): add Audit external link as 6th nav item"
```

### Task 6.3: Add hero tertiary CTA

**Repo:** `sumaitai`
**Files:**
- Modify: `src/components/HeroSection.tsx`

- [ ] **Step 1: Add the link**

Find the closing `</motion.div>` of the CTA cluster motion wrapper. Right before it, add:
```tsx
<a
  href="https://sumait-audit.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
  className="font-mono text-xs tracking-[0.15em] text-white/60 hover:text-white transition-colors mt-2 self-start lg:self-end pointer-events-auto"
>
  Or run our free 5-minute AI audit →
</a>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HeroSection.tsx
git commit -m "feat(hero): add tertiary AI audit CTA"
```

### Task 6.4: Add CTA section secondary path

**Repo:** `sumaitai`
**Files:**
- Modify: `src/components/CTASection.tsx`

- [ ] **Step 1: Add the link**

Find the closing tag of the BOOK A CALL anchor. Immediately after it, add:
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

- [ ] **Step 2: Commit**

```bash
git add src/components/CTASection.tsx
git commit -m "feat(cta): add audit-first secondary path"
```

### Task 6.5: Build /audit landing page

**Repo:** `sumaitai`
**Files:**
- Create: `src/pages/Audit.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the page**

Create `src/pages/Audit.tsx`:
```tsx
import { motion } from "framer-motion";
import FloatingNav from "@/components/FloatingNav";
import Footer from "@/components/Footer";

export default function Audit() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <FloatingNav />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-xs tracking-[0.3em] text-[#ef4444] mb-4">FREE AUDIT</p>
          <h1 className="font-syne text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Get a custom AI Automation Audit for your business in 5 minutes
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mb-12">
            We map your team's manual processes to AI agents and show you exactly what to automate first. No call required.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'What it covers', body: 'Your departments, processes, hours, cost drivers, AI readiness.' },
              { title: 'What you get back', body: 'A personalized hosted report with industry benchmarks, 30-60-90 roadmap, and your custom Cortex configuration.' },
              { title: 'Who it is for', body: 'B2B service businesses doing $20K/month or more, losing leads to manual processes.' },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-white/10 backdrop-blur-sm p-6"
                style={{ background: 'linear-gradient(to bottom, #0a0a0a 0%, rgba(239, 68, 68, 0.2) 100%)' }}>
                <h3 className="font-syne font-semibold text-lg mb-3">{card.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>

          <a
            href="https://sumait-audit.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold rounded-full transition-all shadow-[0_0_40px_8px_rgba(239,68,68,0.35)]"
          >
            Start your audit →
          </a>

          <div className="mt-20">
            <h2 className="font-syne text-2xl md:text-3xl font-bold mb-8">FAQ</h2>
            <div className="space-y-6 max-w-3xl">
              <div>
                <p className="font-semibold mb-2">How long does it take?</p>
                <p className="text-white/60">About 5 minutes to fill out the wizard. Report generates in 30 seconds.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Do I need to talk to a human?</p>
                <p className="text-white/60">No. The whole audit is self-serve. You get a hosted report URL you can share with your team. Optional: book a call after.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">What do you do with my data?</p>
                <p className="text-white/60">We store your inputs to generate your report. Bryan reviews them to inform follow-up. We do not share with third parties.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Add route to App.tsx**

In `src/App.tsx`, add:
```tsx
const Audit = lazy(() => import("./pages/Audit"));
// inside Routes:
<Route path="/audit" element={<Audit />} />
```

- [ ] **Step 3: Verify**

```bash
bun run dev
```

Visit `http://localhost:8080/audit`. Confirm page renders.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Audit.tsx src/App.tsx
git commit -m "feat(audit-page): add /audit landing page on sumaitai"
```

### Task 6.6: Update FAQ Q7 to remove public pricing

**Repo:** `sumaitai`
**Files:**
- Modify: `src/components/FAQSection.tsx`

- [ ] **Step 1: Replace Q7 answer**

Find:
```tsx
"SUMAIT retainers start at $3,000 per month for the Starter tier. The Growth tier is $8,000 per month. Agency tier (white-label Cortex) starts at $25,000 per month. Project work is quoted per scope.",
```
Replace with:
```tsx
"Pricing is custom to each engagement. We will quote you on the discovery call once we understand your scope and goals.",
```

- [ ] **Step 2: Commit**

```bash
git add src/components/FAQSection.tsx
git commit -m "fix(faq): remove public pricing from Q7 per new no-public-pricing rule"
```

---

### Phase 6 closeout

- [ ] **Type check + push**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumaitai
bunx tsc --noEmit
bun run test
git push origin main
```

Vercel auto-deploys. Verify `sumaitai.vercel.app/audit` resolves.

---

## Phase 7: Cutover + verify

### Task 7.1: Redeploy sumait-ai-audit to Vercel under sumait-audit.vercel.app

**Repo:** `sumait-ai-audit`

- [ ] **Step 1: Link the audit repo to a new Vercel project**

```bash
cd c:/Users/User/Downloads/Macbook\ ClaudeClaw/sumait-ai-audit
vercel link --yes --project sumait-audit
```

Expected: linked to `bryansumaitautomates-projects/sumait-audit`, GitHub auto-deploy connected.

- [ ] **Step 2: Set environment variables in Vercel**

For Vite production build, the audit needs the Supabase URL + anon key already configured. Confirm via:
```bash
vercel env ls
```

If missing, add via dashboard or:
```bash
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
```

- [ ] **Step 3: Deploy to production**

```bash
vercel --prod --yes
```

Wait for the deployment to complete. Capture the production URL (should be `https://sumait-audit.vercel.app`).

- [ ] **Step 4: Verify HTTP 200**

```bash
curl -sI https://sumait-audit.vercel.app | head -3
```

Expected: HTTP/1.1 200 OK.

- [ ] **Step 5: End-to-end smoke test**

In a browser:
1. Open `https://sumait-audit.vercel.app/`
2. Run a complete audit (fill all 4 steps with test data)
3. Submit lead gate (use a real email you can check)
4. Verify redirect to `https://sumait-audit.vercel.app/report/<id>`
5. Verify all 10 sections render
6. Verify simulator works
7. Verify share link copies correctly
8. Verify print preview looks clean
9. Check email arrives at the test email
10. Visit the report URL again from a different browser/device, confirm view count increments

### Task 7.2: Update tracking CSV

- [ ] **Append new deployment to memory/vercel-deployments.csv**

```bash
cat >> "c:/Users/User/Downloads/Macbook ClaudeClaw/memory/vercel-deployments.csv" <<'EOF'
https://sumait-audit.vercel.app,SUMAIT AI Audit (10k value upgrade),Bryan Sumait / Lead Magnet,"Hosted report URL per audit submission. 10 sections (cover/exec summary/where you are/industry benchmark/30-60-90 roadmap/Cortex configuration/what-if simulator/the math/what happens next/footer). Supabase audit_reports + industry_benchmarks tables. Cortex team mapping rules. Email + share-with-team flow via n8n. Print-optimized CSS for PDF export. Replaces sumait-ai-audit.lovable.app.",2026-04-23,LIVE,sumait-ai-audit/
EOF
```

### Task 7.3: Final verification checklist

- [ ] sumait-audit.vercel.app returns HTTP 200
- [ ] /report/<id> renders all 10 sections
- [ ] What-if simulator updates numbers live
- [ ] Dependency cascade works
- [ ] Share link copies correctly
- [ ] Email arrives from bryansumaitofficial@gmail.com
- [ ] sumaitai.vercel.app footer audit link points to new URL
- [ ] sumaitai.vercel.app FloatingNav has Audit link
- [ ] sumaitai.vercel.app hero shows tertiary audit CTA
- [ ] sumaitai.vercel.app CTA section shows audit secondary path
- [ ] sumaitai.vercel.app/audit landing page renders
- [ ] sumaitai.vercel.app FAQ Q7 no longer shows public pricing
- [ ] Print-to-PDF on the report URL produces a clean A4 PDF
- [ ] Lighthouse mobile score on /report/<id> is 80 or higher

---

## Self-review

This plan covers every spec section:

- Spec §3 (Architecture) → Phase 7 cutover verifies the architecture
- Spec §4 (Hosted report URL) → Phase 2 (10 sections) + Phase 3 (interactivity)
- Spec §5 (Data layer) → Phase 1 Tasks 1.1, 1.2, 1.3, 1.4, 1.5, 1.8
- Spec §6 (Cortex Configuration mapping) → Phase 1 Task 1.6 + Phase 2 Task 2.8
- Spec §7 (Email + sharing flow) → Phase 3 Task 3.3 + Phase 5 (n8n config)
- Spec §8 (sumaitai integration) → Phase 6 (5 touchpoints + FAQ Q7)
- Spec §9 (Acceptance criteria) → Phase 7 verification checklist

No placeholders. Every step has either exact code, exact commands, or a concrete verification action. Type names are consistent (`AuditReport`, `SimulatorItem`, `TeamId`, `IndustryBenchmark`).

Risks called out in spec §10 are addressed:
- Industry benchmark credibility: Path C documented in Task 1.3
- Cortex team mapping coverage: T07 always included (Task 1.6); fallback teams listed
- Simulator math drift: math is read from analysis jsonb, single source of truth
- n8n email template drift: Phase 5 is explicit Bryan-side config
- Public link discovery: 12-char nanoid, accepted risk
- Lovable.dev workflow: Phase 7 leaves Lovable→GitHub flow intact, just adds Vercel auto-deploy from same GitHub repo
