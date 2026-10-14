# Compact project showcase

The four showcase cards display only screenshots and titles. Desktop uses alternating 5/7 and 7/5 widths across two rows, preserving Interview/RuneCode and Mandarin/Chess pairing. Mobile uses a compact 2x2 grid. The heading, spacing, and grid height respond to the viewport so all four cards fit in one screen at the tested sizes. Thumbnail cropping fills each tile; the full original screenshots remain available in project details.

Clicking a card opens its full content in a native dialog. Descriptions, categories, technology tags, complete overviews, engineering details, and the two supplied Live Demo links are retained. RuneCode uses a short card title, with its full project title inside the detail dialog. Live Demo appears near the beginning of detail content, followed by the full screenshot and overview. The editor screenshot with successful output remains in RuneCode's detail.

One copy of each project's static content moves into the shared dialog and returns when it closes. The underlying grid does not expand. Escape, the close button, and backdrop clicks close the dialog and restore focus. Full screenshot enlargement uses the existing image dialog above the project dialog. Project hashes open the corresponding detail. Without JavaScript, native inline details provide the full content.

Cards retain directional slide-in entrances for the image and title. Keyboard focus reveals each card immediately, and live reduced-motion changes settle all animation parts.

Verified four-card viewport fit at 1440×900, 1366×768, 1280×720, 1024×600, 768×1024, 390×844, and 320×568. Checked all four detail dialogs at these sizes, including content retention, correct title, internal scrolling, focus return, content restoration, and nested image enlargement. Checked close-button/backdrop behavior, direct hashes, native disclosures without JavaScript, and animation/reduced-motion behavior. No horizontal overflow or JavaScript errors were observed. This does not establish viewport fit for every possible screen size or accessibility conformance in other browser engines.

- [Desktop showcase](project-showcase-desktop.png)
- [Mobile showcase](project-showcase-mobile.png)
- [Desktop detail](project-showcase-detail-desktop.png)
- [Mobile detail](project-showcase-detail-mobile.png)
- [Validation](project-showcase-validation.json)

Changes are local; no Vercel deployment was performed.
