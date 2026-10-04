# Portfolio redesign

Implemented in `animated-sites/timothy-nico/index.html`, with styles and optional interactions in `styles.css` and `script.js`. The design treats modern city lights as the visual identity, without inventing a personal story around the location.

## What changed

- A single cinematic opening replaces the loading screen and long scroll sequence. Large typography, architectural frame lines, and warm text sit against the existing film.
- Mobile uses a separate portrait composition so the main typography sits below the face.
- Hero height now fits the available viewport below the header. Headline size and spacing respond to both height and width; short landscape screens use a single-line name, and the scroll hint is omitted on short screens. LinkedIn, Email, and GitHub are visible in the first viewport. The upper-right signature is the personal Hanzi name, 陈勝榮, replacing the generic city-light caption. Community & mentoring was removed at the user's request.
- The hero now provides direct LinkedIn, Email, and GitHub CTAs. LinkedIn is the primary action, with outlined secondary links; all three fit in one row on mobile. Explore my work and the complete Quick view interface (header entry, introduction strip, dialog, styles, and interaction code) were removed at the user's request. Résumé links and the 1,300+ user figure remain excluded.
- Selected work comes immediately after the introduction. Two staggered project spreads lead into four expandable project entries.
- Project images and recognition documents open in accessible native dialogs, with ordinary image links as the fallback.
- Experience places company logos at the front of every row, visible before expansion. The disclosures contain contribution details. Skills, education, languages, and recognition retain their existing content.
- The palette is fixed: ice blue (#A8CFFF) picks up the photograph's cool lighting, with warm white main text and silver-blue chapter typography. A muted rose light seam reflects the pink illumination on the portrait. Color choices and the film playback button were removed at the user's request.
- The background film pauses when offscreen or behind a dialog and respects reduced motion. A matching 80 KB WebP poster removes the visual jump from the old, unrelated still image.
- All essential content is static HTML, readable without JavaScript. No build step or runtime dependency was added.
- The editorial chapter system restores Hanzi: 作品 (work), 经历 (experience), 探索 (exploration), and 联系 (contact). Smaller serif markers identify skills, education, certifications, and recognition. Decorative translations are excluded from screen-reader output.
- Typography has four explicit roles: Space Grotesk for display, Instrument Sans for reading, IBM Plex Mono for metadata, and Noto Serif SC for Hanzi. Silver-blue solid/outlined glyph pairs and thin illuminated rules extend the city-light visual language.
- Entrances now have a composed sequence: display text rises through a line mask in 780ms, supporting copy settles over 650ms, and featured images enter over 900ms. Successive title lines have a 110ms delay and a pronounced ease-out. The observer triggers when a group reaches 85% of viewport height. Entrances play once; keyboard focus immediately reveals the target, and completed animations release their styles so hover remains responsive. Hero CTAs are excluded from the entrance sequence and are immediately visible. Reduced motion, missing animation/IntersectionObserver support, and printing preserve static content.
- Continuous scroll depth connects the chapters with a quieter treatment: the hero film and type move in opposite directions at reduced distances, Hanzi travels independently, and featured project images drift within their frames. Headings stay stationary after their entrance. Architectural light seams and a directional wash respond to each section's position, with ice blue, muted rose, and cool neutral light distinguishing the chapters. Light intensity and glyph travel have been reduced so typography leads the experience. A thin header rule shows reading progress. Body copy stays stationary.
- On desktops with sufficient height, the Experience introduction stays in view while its list scrolls. Small screens use gentler depth and normal document flow. Native scrolling and anchors are preserved; the frame callback runs only after scrolling, resizing, or relevant layout changes. Geometry reads are batched before style writes. Live reduced-motion changes and print styles remove depth and decorative light layers.

## Verification

The updated CV, `CV_Timothy_Nico_ATS.docx`, was used as the source for a subsequent content update. Pasar Atom now lists Software Engineer and four responsibilities covering recruitment ERP, rental pooling, legacy data integration, and internal local LLM deployment. The thesis project, BNSP Associate Data Scientist credential, and Red Hat System Administration I training were added. AI Interview, skills, education, and English proficiency details were updated. Data Annotation experience and Community & mentoring are excluded at the user's request; resume links and the 1,300+ user figure remain excluded.

Reviewed rendered screenshots in headless Chromium. Checked 17 viewport sizes from 1920×1080 to 320×568, including short desktop windows, short phone screens, and landscape orientations, plus a 640px CSS viewport at 2× pixel density to check reflow.

Passed checks for content retention, valid section anchors, unique IDs, mobile navigation, keyboard focus and Escape, dialog focus return, project deep links, image previews, experience disclosures, the fixed palette and absence of removed controls, automatic film pausing, reduced motion, JavaScript disabled, and blocked video.

No JavaScript errors, failed HTTP responses, or horizontal overflow were found. Axe-core 4.10.3 reported zero violations for the selected WCAG A/AA tags on the desktop page and mobile navigation dialog. Automated checks do not establish full accessibility conformance or testing in other browser engines.

Hero CTA checks verified the existing LinkedIn and GitHub profile URLs, the mailto address, keyboard order, and minimum 44px target heights at every tested viewport. The entire rectangle of every CTA fits below the header and inside the initial viewport at scroll position 0; hit-testing confirms they are clickable without scrolling. Image-dialog focus return, direct project links, mobile navigation, and automatic film pausing still work after removing Quick view and Community & mentoring.

Additional motion checks verified the actual 780ms title animation timing, one-time entrances, immediately visible hero CTAs, immediate keyboard focus, image hover after animation completion, live reduced-motion changes, and fallback without IntersectionObserver. All four font families loaded. Chapter layouts were inspected at 1440px, 768px, 390px, and 320px. Intermediate entrance frames and a browser scroll recording supplement the settled screenshots.

Scroll-scene checks verified changing Hanzi and light positions with stationary headings, opposite hero layer movement, stable idle state, the desktop sticky introduction, gentler mobile flow, reduced motion, printing, and direct thesis navigation at 320px. The main viewport, dialog, content, and axe checks also passed after this change.

## Review artifacts

- [Desktop opening](redesign-desktop.png)
- [Mobile opening](redesign-mobile.png)
- [Validation results](redesign-validation.json)
- [Work chapter on desktop](chapter-desktop.png)
- [Work chapter on mobile](chapter-mobile.png)
- [Motion validation](motion-validation.json)
- [Motion study and Apple sources](apple-motion-study.md)
- [Browser scroll preview](motion-preview.webm)
- [Section transition on desktop](scroll-transition-desktop.png)
- [Section transition on mobile](scroll-transition-mobile.png)
- [Scroll scene validation](scroll-validation.json)

The existing portfolio content and media were retained. No fabricated project metrics, case studies, or project repository URLs were added.
