---
name: Vitality & Resilience
colors:
  surface: '#fafaf4'
  surface-dim: '#dadad5'
  surface-bright: '#fafaf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4ee'
  surface-container: '#eeeee9'
  surface-container-high: '#e8e8e3'
  surface-container-highest: '#e3e3de'
  on-surface: '#1a1c19'
  on-surface-variant: '#42493e'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f1f1ec'
  outline: '#72796e'
  outline-variant: '#c2c9bb'
  surface-tint: '#3b6934'
  primary: '#154212'
  on-primary: '#ffffff'
  primary-container: '#2d5a27'
  on-primary-container: '#9dd090'
  inverse-primary: '#a1d494'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fd8b00'
  on-secondary-container: '#603100'
  tertiary: '#363a37'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d514e'
  on-tertiary-container: '#c0c4bf'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcf0ae'
  primary-fixed-dim: '#a1d494'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#23501e'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#e0e3df'
  tertiary-fixed-dim: '#c4c7c3'
  on-tertiary-fixed: '#191c1a'
  on-tertiary-fixed-variant: '#444844'
  background: '#fafaf4'
  on-background: '#1a1c19'
  surface-variant: '#e3e3de'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  section-gap: 40px
  touch-target-min: 48px
---

## Brand & Style
This design system is built to inspire confidence and momentum for individuals on a journey toward a smoke-free life. The brand personality is **Empathetic**, **Disciplined**, and **Energetic**. It balances the professional reliability needed for health-related tracking with a vibrant, celebratory spirit that rewards small wins.

The visual style follows a **Modern Corporate** aesthetic with **Tactile** influences. It prioritizes clarity and high-contrast accessibility to ensure that both young professionals and older users can navigate the interface without friction. The interface uses generous whitespace, large touch targets, and subtle depth to create an environment that feels organized and supportive.

## Colors
The palette is rooted in a "Growth and Energy" logic.
- **Primary (Deep Green):** Represents health, stability, and the restoration of life. It is used for primary navigation, success states, and key headers.
- **Secondary (Vibrant Orange):** Represents motivation, fire (overcome), and achievement. It is used sparingly for Call-to-Action (CTA) buttons, progress indicators, and "streak" highlights.
- **Tertiary (Mint White):** A soft, green-tinted neutral used for background surfaces to reduce eye strain compared to pure white.
- **Neutral:** A deep charcoal-green is used for text to maintain high legibility while feeling more organic than pure black.

## Typography
**Hanken Grotesk** is chosen for its exceptional legibility and modern, sharp geometric construction. It feels professional yet approachable. 

For the target audience (including middle-aged users), the scale starts at a generous 16px for standard body text. Weights are used strategically: Bold (700+) for achievements and headlines, and Regular (400) for instructional content. Line heights are kept slightly wider than standard (1.5x for body) to improve reading speed and comfort. All interactive labels use medium or semi-bold weights to ensure they are clearly distinguishable from static text.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop/tablet and a **Fluid Margin** system on mobile. 
- **Rhythm:** A strict 8px base unit ensures consistent vertical rhythm.
- **Margins:** Large 24px side margins on mobile provide breathing room and prevent accidental touches near the screen edges.
- **Touch Targets:** A minimum height of 48px is enforced for all interactive elements, with primary buttons ideally reaching 56px to accommodate all users comfortably.
- **Hierarchy:** Use 40px gaps between major sections (e.g., "Days Smoke-Free" vs. "Health Benefits Tracking") to create a clear visual break.

## Elevation & Depth
This design system uses **Ambient Shadows** to signify interactability and importance.
- **Surface Level (0dp):** The Tertiary background (#F4F7F2).
- **Card Level (1dp):** Pure white surfaces with a very soft, diffused shadow (Y: 4px, Blur: 12px, 5% Primary Color opacity). This "lift" suggests the card is a container for vital information.
- **Interactive Level (2dp):** Buttons and active chips use a slightly more pronounced shadow (Y: 6px, Blur: 16px, 12% Primary or Secondary Color opacity) to create a "tactile" feel, inviting the user to press them.
- **Overlays (3dp):** Modals and bottom sheets use a deep backdrop blur (20px) to maintain context while focusing attention.

## Shapes
A **Rounded (Level 2)** shape language is used to soften the serious nature of health tracking. 
- **Buttons & Cards:** Use a 16px (1rem) radius (`rounded-lg`) to feel friendly and modern.
- **Input Fields:** Use an 8px (0.5rem) radius to maintain a sense of structured data entry.
- **Progress Bars:** Use fully rounded (pill-shaped) ends to signify a continuous journey.
The consistency of these radii creates a "friendly-tech" feel that avoids the coldness of sharp corners.

## Components
- **Buttons:** 
  - *Primary:* Deep Green background, White text. Large padding (16px top/bottom).
  - *Action (Incentive):* Vibrant Orange background. Used for "Log Craving" or "Claim Reward."
- **Cards:** White background with 16px corner radius. Used to group health stats (e.g., "Money Saved," "Life Regained"). Include a subtle 1px border in a lighter shade of the primary color for definition.
- **Progress Circles:** Thick strokes (8px+) using the Secondary Orange to show time elapsed, creating a high-visibility visual "win."
- **Input Fields:** Large 18px text size within the field. Labels are always visible above the field (not floating) for maximum cognitive clarity for older users.
- **Chips/Tags:** Used for "Trigger Tracking" (e.g., "Stress," "Alcohol"). These should be large and easy to toggle on/off with a single tap.
- **Success Toasts:** Use the Deep Green with a celebratory icon (star or checkmark) to reinforce positive behavior immediately after a user logs a successful day.