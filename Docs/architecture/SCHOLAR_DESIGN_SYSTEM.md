# Connect Africa — "The Scholar" Design System Specification

**Version:** 2.0  
**Status:** Authoritative  
**Scope:** Frontend Design System & UI Architecture  
**Reference Document:** `frontend/ColorSpecs.md`

---

## 1. Executive Summary

Connect Africa is a production-grade African knowledge platform designed to organize, verify, connect, preserve, and intelligently expand structured knowledge about Africa.

"The Scholar" design system shifts the platform away from standard dark-mode SaaS aesthetics into a digital archive. The palette and layout are structured to make knowledge feel valuable, enduring, and authoritative.

---

## 2. Core Design Principles

### 2.1 The 60-30-10 Rule
- **60% Base (Parchment & Paper):** Main backgrounds and structural surfaces (`#FDF6E3` & `#FFFFFF`).
- **30% Typography (Ink & Stone):** High-contrast typography and secondary metadata (`#121619` & `#78716C`).
- **10% Accents (Emerald Depth, Savanna Gold, Clay):** Selective highlights, selected ontology nodes, active links, and provenance badges (`#064E3B`, `#C9A86A`, `#A1624D`).

### 2.2 Cultural Authenticity
A subtle 2% noise texture overlay with faint geometric background patterns on Parchment backgrounds prevents the platform from feeling like generic flat SaaS software.

---

## 3. Color Token Matrix

### 3.1 Primary & Base Palette

| Token Name | Hex Code | Purpose / Usage |
| :--- | :--- | :--- |
| **Parchment** | `#FDF6E3` | Main page background (warm, eye-friendly reading canvas) |
| **Paper** | `#FFFFFF` | Cards, modals, popups on top of Parchment |
| **Ink** | `#121619` | Primary typography (softer than pure black) |
| **Stone** | `#78716C` | Secondary text, metadata, timestamps, subtle borders |
| **Emerald 900** | `#064E3B` | Main brand, headers, primary buttons, selected ontology nodes |
| **Emerald 700** | `#047857` | Hover states, secondary headers |
| **Emerald 100** | `#D1FAE5` | Selected card subtle backgrounds, code/ontology blocks |
| **Savanna Gold** | `#C9A86A` | Ontology relationships, active link underlines, icons, star accents |
| **Clay** | `#A1624D` | Category tags, provenance badges, historical indicators |

### 3.2 Dark Mode Adaptation

| Token | Light Mode (Default) | Dark Mode |
| :--- | :--- | :--- |
| **Background (Canvas)** | `#FDF6E3` (Parchment) | `#121619` (Dark Ink) |
| **Surface (Paper)** | `#FFFFFF` (Paper) | `#1E2328` (Dark Charcoal) |
| **Text Primary** | `#121619` (Ink) | `#FDF6E3` (Parchment) |
| **Text Secondary** | `#78716C` (Stone) | `#A8A29E` (Stone Light) |
| **Primary Brand** | `#064E3B` (Emerald 900) | `#34D399` (Lightened Emerald) |
| **Accent Line** | `#C9A86A` (Savanna Gold) | `#C9A86A` (Savanna Gold) |

---

## 4. Typography Hierarchy

| Role | Font Family | Usage |
| :--- | :--- | :--- |
| **Headings** | `Lora`, `Instrument Serif` | Article titles, hero headings, section headers |
| **Body Text** | `Inter`, `ui-sans-serif` | Main readable body, form inputs, button labels |
| **Metadata & Code** | `JetBrains Mono` | Ontology IDs, timestamps, JSON attributes, code blocks |

---

## 5. UI Component Rules

### 5.1 Primary Button
- **Background:** `#064E3B` (Emerald 900)
- **Text:** `#FFFFFF` (White)
- **Hover:** `#047857` (Emerald 700)
- **Border:** None

### 5.2 Secondary Button
- **Background:** Transparent
- **Border:** 1px `#064E3B` (Emerald 900)
- **Text:** `#064E3B` (Emerald 900)
- **Hover:** `#D1FAE5` (Emerald 100) background

### 5.3 Article & Navigation Links
- **Default:** `#121619` (Ink) with `#C9A86A` (Savanna Gold) underline.
- **Hover:** Text and underline transition to `#064E3B` (Emerald 900).

### 5.4 Knowledge & Entity Cards
- **Background:** `#FFFFFF` (Paper)
- **Border:** 1px `#78716C` at 20% opacity
- **Border Radius:** `12px` (`rounded-xl`)
- **Hover:** Border shifts to `#C9A86A` (Savanna Gold) with subtle shadow.

---

## 6. Ontology Graph Visual Specification

- **Canvas Background:** `#FDF6E3` (Parchment)
- **Default Node:** White `#FFFFFF` fill with Ink `#121619` border + Stone `#78716C` label
- **Selected Node:** Emerald 900 `#064E3B` fill + White `#FFFFFF` text
- **Relationship Edge:** Savanna Gold `#C9A86A` (1.5px width)
  - *Verified Relationship:* Solid line
  - *Inferred Relationship:* Dashed line (`stroke-dasharray="4"`)
- **Hover Effect:** Node glows with `#D1FAE5` (Emerald 100) shadow

---

## 7. Implementation Roadmap & Architecture

1. **Font Pipeline (`index.html`):** Integrate Google Fonts for `Lora`, `Instrument Serif`, `Inter`, and `JetBrains Mono`.
2. **Token Engine (`src/index.css`):** Define CSS variables on `:root` and `[data-theme="dark"]`. Add noise texture styling.
3. **Tailwind Extension (`tailwind.config.js`):** Configure semantic color utilities and font families.
4. **Theme Management (`src/context/ThemeContext.tsx`):** React context for light/dark mode persistence.
5. **Component Migration:** Update `Navbar`, `Footer`, `HomePage`, `ArticleListPage`, `ArticleDetailPage`, `SearchPage`, and `EntityVisual`.
6. **Build & Quality Validation:** Verify build success (`tsc -b && vite build`) and zero linter warnings.
