# Mandarin Quest addition

Added Mandarin Quest as the third featured entry in Selected Work. It appears beside Chess Trainer in the second row of the compact asymmetric desktop showcase; mobile uses a compact 2x2 grid. Cards show an image and title. Clicking opens a project detail dialog containing the complete description, technology tags, overview, and Live Demo link. Existing project IDs remain intact, and project numbering from 01 to 08 is retained in the detail content and compact entries.

The card uses the supplied short description. The disclosure contains all three supplied overview paragraphs, six key features, and engineering details. It explicitly distinguishes guided-answer transcript checks from pronunciation or tone assessment, and code-level Supabase integration from verified production configuration. No project dates, repository URL, user counts, outcome claims, or AI tutor claims were added.

## Application preview access

The corrected application URL, https://mandarin-learning-timothy.vercel.app/, returned HTTP 200 and loaded Mandarin Quest. The Live Demo link uses this URL. A real 1440 × 1000 screenshot of its Today dashboard, Bamboo Lane story, and three mini-games is saved as `assets/images/mandarin-quest.png`. The preview follows the existing `.project-image.image-trigger` and image-dialog pattern, with a direct image link as the fallback without JavaScript.

## Verification

Reviewed rendered desktop and mobile screenshots. Checked 1440, 768, 390, and 320px viewports with the overview open and closed. No horizontal overflow or JavaScript errors were observed. Keyboard expansion/collapse, pointer expansion with motion enabled, reduced motion, unique IDs, sequential labels, the project URL, and the disclosure without JavaScript passed.

Review artifacts:

- [Desktop card](mandarin-quest-desktop.png)
- [Mobile card](mandarin-quest-mobile.png)
- [Expanded mobile overview](mandarin-quest-overview-mobile.png)
- [Validation results](mandarin-quest-validation.json)

Changes are local; no Vercel deployment was performed.
