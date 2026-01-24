
# Cal.com Booking Link Integration

## Overview
Add your Cal.com booking link (`https://cal.com/bryan-dave-sumait-nzvzba/automation-intro`) to all relevant CTA buttons and remove the "VIEW ALL REVIEWS" button from the testimonial section.

## Changes Required

### 1. HeroSection.tsx
**Location:** Top-right navigation  
**Current:** `href="#contact"` with smooth scroll  
**Action:** Update "LET'S TALK" link to open Cal.com directly in a new tab

### 2. CTASection.tsx
**Location:** Main "BOOK A CALL" shimmer button  
**Current:** `href="#"` (placeholder)  
**Action:** Update to Cal.com link with `target="_blank"` and `rel="noopener noreferrer"`

### 3. ProfileSection.tsx
**Location:** Red "Connect" button at bottom of profile card  
**Current:** No href (button element)  
**Action:** Convert to anchor tag linking to Cal.com booking

### 4. TestimonialSection.tsx
**Location:** Below testimonial carousel  
**Current:** "VIEW ALL REVIEWS" shimmer button  
**Action:** Remove entire button block (lines 195-220)

### 5. Footer.tsx
**Location:** Quick links section  
**Current:** `href="#contact"` for "Contact" link  
**Action:** Update to Cal.com link

---

## Technical Details

### Files to Modify

| File | Change Type | Description |
|------|-------------|-------------|
| `src/components/HeroSection.tsx` | Edit | Update "LET'S TALK" href and remove smooth scroll handler |
| `src/components/CTASection.tsx` | Edit | Update "BOOK A CALL" button href |
| `src/components/ProfileSection.tsx` | Edit | Convert "Connect" button to link |
| `src/components/TestimonialSection.tsx` | Edit | Remove "VIEW ALL REVIEWS" button block |
| `src/components/Footer.tsx` | Edit | Update "Contact" link href |

### Link Attributes
All Cal.com links will include:
- `target="_blank"` - Opens in new tab
- `rel="noopener noreferrer"` - Security best practice for external links

### Booking URL
```text
https://cal.com/bryan-dave-sumait-nzvzba/automation-intro
```
