
# Fix Navigation and Section Numbering

## Overview
Two targeted fixes to the site: replace the grid-based navigation with a floating glassmorphic pill, and correct all section numbering to follow the proper sequence.

---

## Task 1: Replace Navigation with Glassmorphic Pill

### File to Modify
`src/components/FloatingNav.tsx`

### Current State
The navigation is an empty 4-column grid structure with border dividers and no visible content (logo, links, or CTA are all empty divs).

### New Structure

```text
+--------------------------------------------------+
|  SUMAIT.AI    [Systems] [Experience] [Process] [Contact]    [Let's Talk →]  |
+--------------------------------------------------+
```

**Container Styling:**
- Position: `fixed top-0 left-0 right-0 z-50 p-6`
- Inner pill: `max-w-4xl mx-auto rounded-full py-3 px-6`
- Layout: `flex items-center justify-between`

**Glassmorphic Effect (via inline style):**
```css
background: linear-gradient(180deg, rgba(10,10,10,0.55), rgba(10,10,10,0.35)) padding-box, 
            linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08)) border-box;
border: 1px solid transparent;
backdrop-filter: blur(16px) saturate(120%);
-webkit-backdrop-filter: blur(16px) saturate(120%);
box-shadow: 0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04);
```

**Content:**

| Section | Content |
|---------|---------|
| Left | `SUMAIT.AI` logo (font-syne text-lg font-semibold text-white/90) |
| Center | 4 nav links: Systems (#systems), Experience (#experience), Process (#process), Contact (#contact) - hidden on mobile |
| Right | Mobile: hamburger button. Desktop: red "Let's Talk →" CTA button |

---

## Task 2: Fix Section Numbering

### Target Order

| # | Section Component | Label Text | ID (for nav links) |
|---|-------------------|------------|---------------------|
| 01 | HeroSection | `01 /// REVENUE SYSTEMS` | (no change) |
| 02 | AboutSection | `02 /// IDENTITY` | (no change needed) |
| 03 | SystemsSection | `03 /// SYSTEMS` | `#systems` |
| 04 | CaseStudiesSection | `04 /// RESULTS` | - |
| 05 | ProfileSection | `05 /// EXPERIENCE` | `#experience` |
| 06 | ProcessSection | `06 /// PROCESS` | `#process` |
| 07 | TechStackSection | `07 /// TOOLS` | - |
| 08 | TestimonialSection | `08 /// TESTIMONIALS` | - |
| 09 | FAQSection | `09 /// FAQ` | - |
| 10 | CTASection | `10 /// LET'S BUILD` | `#contact` |

### Files to Modify

**1. `src/components/SystemsSection.tsx`**
- Change all 3 system cards from individual numbers (`03`, `04`, `05`) to unified `03`
- Update label format from `{number} /// SYSTEM` to `03 /// SYSTEMS` for all cards

**2. `src/components/CaseStudiesSection.tsx`**
- Change `06 /// RESULTS` to `04 /// RESULTS`

**3. `src/components/ProfileSection.tsx`**
- Change `05 /// Experience` to `05 /// EXPERIENCE` (uppercase for consistency)
- Add `id="experience"` to the section element for nav linking

**4. `src/components/ProcessSection.tsx`**
- Change `07 /// PROCESS` to `06 /// PROCESS`
- Add `id="process"` to the section element for nav linking

**5. `src/components/TechStackSection.tsx`**
- Change `08 /// TOOLS` to `07 /// TOOLS`

**6. `src/components/TestimonialSection.tsx`**
- Change `05 /// TESTIMONIALS` to `08 /// TESTIMONIALS`

**7. `src/components/FAQSection.tsx`**
- Already correct: `09 /// FAQ` (no change needed)

**8. `src/components/CTASection.tsx`**
- Already correct: `10 /// LET'S BUILD` (no change needed)
- Already has `id="contact"` (no change needed)

---

## Technical Details

### FloatingNav Component Replacement

The component will be completely rewritten with:
- State for mobile menu toggle (useState)
- Animation preserved (motion.nav with initial/animate)
- Responsive design with hidden/visible classes
- Anchor links with smooth scroll behavior

### Section ID Additions

Adding IDs for navigation targeting:
- `SystemsSection`: Already has `id="systems"`
- `ProfileSection`: Add `id="experience"`
- `ProcessSection`: Add `id="process"`
- `CTASection`: Already has `id="contact"`

---

## Verification Checklist

After implementation:
- [ ] Navigation displays as floating glassmorphic pill
- [ ] Logo "SUMAIT.AI" visible on left
- [ ] Center links visible on desktop: Systems, Experience, Process, Contact
- [ ] Red "Let's Talk" button visible on desktop right
- [ ] Mobile shows hamburger icon
- [ ] All 3 system cards show "03 /// SYSTEMS"
- [ ] Section numbers follow sequence: 01, 02, 03, 04, 05, 06, 07, 08, 09, 10
- [ ] Nav links scroll to correct sections

---

## What Will NOT Change

- All existing design, colors, and styling
- Card designs and layouts
- Copy and text content (except section numbers)
- Footer component
- Animations and transitions
- Any component logic beyond navigation and labels
