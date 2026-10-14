# Selected Work layout and entrances

Both supplied live application links use the label Live Demo. The existing URLs and requested Interview/RuneCode, Mandarin/Chess pairing are preserved.

Desktop uses a twelve-column grid with alternating 5/7 and 7/5 card widths. RuneCode and Mandarin Quest get the wider columns for their longer descriptions and live links. RuneCode begins 64px below Interview, and Chess begins 96px below Mandarin. Narrow cards use taller image frames; wide cards use landscape frames. Screenshots fit without cropping. Mobile resets widths, offsets, and frame ratios to a single column.

Featured cards now have coordinated 720ms entrances: metadata, preview, and copy slide in with small delays. Left cards enter from the left; right cards enter from the right. The preview also settles from a subtle scale. Travel is reduced on tablet and mobile. Each card animates once, and completed animations release their styles. Existing chapter and other section entrances remain in place.

Keyboard focus immediately settles the containing card, so links and disclosures never wait for an animation. Reduced motion skips entrances, and enabling it during playback settles all groups. All content remains readable without JavaScript.

Reviewed desktop and mobile screenshots. Layout checks covered 1440, 1024, 768, 390, and 320px. Motion checks sampled 16 card entrances across 1440, 768, 390, and 320px, inspecting real Web Animations keyframes and intermediate transforms. Verified alternating directions, staggered parts, no pending or animated horizontal overflow, one-time playback, released animation styles, keyboard visibility, live reduced-motion changes, and JavaScript-disabled content and disclosures. Project image enlargement and the RuneCode editor preview remain functional. No JavaScript errors were observed.

- [Desktop layout](selected-work-grid-desktop.png)
- [Mobile layout](selected-work-grid-mobile.png)
- [Layout validation](project-layout-validation.json)
- [Motion validation](project-motion-validation.json)

Changes are local; no Vercel deployment was performed.
