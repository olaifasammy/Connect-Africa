Let's build *The Scholar* into a full design system for Connect-Africa.

This palette is built to make knowledge feel valuable. Not a startup, an archive.

The Core Palette

*Primary — Emerald Depth*
- `Emerald 900 #064E3B` — Main brand, headers, primary buttons, selected ontology node
- `Emerald 700 #047857` — Hover states, secondary headers
- `Emerald 100 #D1FAE5` — Subtle backgrounds for selected cards, code/ontology blocks

*Base — Parchment & Ink*
- `Parchment #FDF6E3` — Your main page background. Easier on eyes than white for long reading
- `Paper #FFFFFF` — Cards, modals, popups on top of parchment
- `Ink #121619` — Primary text. Softer than pure black
- `Stone #78716C` — Secondary text, metadata, timestamps

*Accents — Gold & Clay*
- `Savanna Gold #C9A86A` — The star. Use for ontology relationships, links, active underline, icons
- `Clay #A1624D` — Tags, categories, provenance badges

How to Use It — The 60-30-10

- *60% Parchment + Paper:* Backgrounds and content
- *30% Ink + Stone:* All typography
- *10% Emerald + Gold:* Only where you want the eye to go

*1. Ontology Graph — This is critical*
- Canvas: Parchment #FDF6E3
- Default Node: White with Ink #121619 border + Stone label
- Selected Node: Emerald 900 #064E3B fill + White text
- Relationship Line: Savanna Gold #C9A86A, 1.5px. Dashed if inferred, solid if verified
- Hover: Node glows with Emerald 100 #D1FAE5

This makes the graph readable. If everything is emerald, nothing is.

*2. UI Components*
- *Primary Button:* Emerald 900 background, White text, no border. Hover: Emerald 700
- *Secondary Button:* Transparent, Emerald 900 border + text. Hover: Emerald 100 background
- *Links in articles:* Gold #C9A86A underline, on hover turns Emerald 900. Feels scholarly.
- *Cards:* White #FFFFFF, 1px border Stone at 20% opacity, radius 12px. On hover, border becomes Gold.

*3. Typography Pairing*
- *Headings:* Serif — Instrument Serif or Lora. Gives that knowledge archive feel. Color: Ink or Emerald 900
- *Body:* Sans-serif — Inter or General Sans. Color: Ink #121619
- *Metadata / Ontology IDs:* Monospace — JetBrains Mono, color Stone

*4. Light / Dark Mode Tokens*
Token	Light	Dark
Background	#FDF6E3	#121619
Surface	#FFFFFF	#1E2328
Text Primary	#121619	#FDF6E3
Primary	#064E3B	#34D399
Accent Line	#C9A86A	#C9A86A
For dark mode, you _must_ lighten emerald to #34D399. Dark emerald on dark background disappears.

*One rule to make it feel African, not generic:*

Add a subtle texture. On your Parchment background, add a 2% noise texture or a very faint Adinkra / geometric line pattern in Stone at 4% opacity. Users won't consciously see it, but it stops the site from feeling like another SaaS.

Want me to generate the CSS variables file and a sample hero section + knowledge card in this system so you can drop it straight into your project?