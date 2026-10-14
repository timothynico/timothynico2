# RuneCode addition

Added RuneCode — Gamified Python & SQL Learning as the second featured Selected Work entry, beside AI Interview Website. The card uses the supplied category, short description, six technology tags, and Live Demo URL. The expandable Project overview contains all four supplied paragraphs and the supplied technical detail. Existing project IDs remain unchanged; visible work numbering runs from 01 to 08.

The showcase uses a compact, asymmetric two-column, two-row arrangement: Interview and RuneCode in the first row, Mandarin Quest and Chess Trainer in the second. RuneCode and Mandarin Quest span seven of twelve desktop grid columns; Interview and Chess Trainer span five. Cards display only an image and title. Clicking opens a native project detail dialog with the complete content and Live Demo link. Mobile also uses a compact 2x2 grid. The existing image dialog enlarges the full map screenshot and the editor image inside the detail dialog. Native inline disclosures and image links are the fallback without JavaScript.

## Real application screenshots

https://coding-learning-timothy.vercel.app/ returned HTTP 200. Captured its pixel-art adventure map at 1440 × 1000 as `assets/images/runecode-map.png`.

Opened `/quest/w1-01`, entered the following Python, and clicked Run code:

```python
nama = "Adventurer"
print(nama)
```

After runtime initialization completed, the output panel displayed `Adventurer`. Captured the actual editor and output at 1440 × 1000 as `assets/images/runecode-editor.png`. This execution occurred in a fresh guest browser context.

The project's sandbox and 36-reference-solution testing descriptions come from the user's supplied project content. This portfolio update did not independently rerun the project's full application test suite.

## Portfolio verification

Reviewed rendered desktop, mobile, and expanded-detail screenshots. Checked 1440, 768, 390, and 320px viewports with the overview open and closed. Both screenshot assets loaded, both image dialogs opened through the keyboard, Escape closed the dialogs, and focus returned to the invoking image link. Verified the Live Demo URL, unique IDs, sequential work labels, JavaScript-disabled disclosure and image fallbacks, motion-enabled interactions, and the existing Mandarin Quest disclosure. No horizontal overflow or JavaScript errors were observed.

- [Desktop card](runecode-desktop.png)
- [Mobile card](runecode-mobile.png)
- [Expanded mobile overview](runecode-overview-mobile.png)
- [Validation results](runecode-validation.json)

Changes are local; no Vercel deployment was performed.
