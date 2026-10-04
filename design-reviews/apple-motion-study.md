# Motion study: Apple product pages

Inspected on 4 October 2026: the official [iPhone Air](https://www.apple.com/iphone-air/) and [MacBook Pro](https://www.apple.com/macbook-pro/) pages, including their page markup, styles, and scroll animation configuration. This is an implementation study; no Apple assets or animation code were copied into the portfolio.

## Observed implementation

Both inspected stylesheets define a `StaggeredFadeIn` default of 30px vertical travel, 0.7s translation, 0.9s opacity, and a 0.15s stagger. Headings and gallery components use explicit staggered items. These are component defaults in these product pages, not a universal rule for every Apple animation.

Sources: [iPhone Air stylesheet](https://www.apple.com/v/iphone-air/i/built/styles/overview.built.css), [MacBook Pro stylesheet](https://www.apple.com/v/macbook-pro/ax/built/styles/overview.built.css).

Scroll-linked image treatments have their own ranges, while smaller caption transitions use shorter timing. The practical lesson is to distinguish narrative motion from interaction feedback rather than assign one speed to every element.

## Interpretation and portfolio changes

My design interpretation is that perceived polish comes from a controlled order, strong deceleration, and a limited number of competing movements. Slowing every animation would make a recruiter wait unnecessarily.

| Portfolio element | Treatment | Timing |
| --- | --- | --- |
| Hero name and chapter titles | Rise through a text-line mask; settle with a pronounced ease-out | 780ms; 110ms between lines |
| Eyebrows and supporting copy | Short translation plus opacity; descriptions follow titles | 650ms; chapter descriptions start at 260ms |
| Featured project images | 22px rise and subtle 0.985 to 1 scale | 900ms |
| Chapter rules | Draw across beneath the title | 780ms; starts at 120ms |
| Hero contact links | Immediately visible and interactive | No entrance delay |
| Continuous depth | Reduced hero travel, Hanzi drift and light intensity; stationary reading text | Driven by native scroll position |

The portfolio retains its own night-city palette, Hanzi, typography, and personal portrait. The timings above are independently chosen for this layout, not Apple's values. Entrances run once, focused controls reveal immediately, and reduced motion disables the effects without concealing content.

## Review

The Chromium checks cover actual animation timing, settled states, keyboard cancellation, hover restoration, live reduced-motion changes, JavaScript/observer fallback, desktop/mobile reflow, and first-viewport CTA visibility at 17 sizes. A short [browser recording](motion-preview.webm) shows the resulting sequence using native smooth scrolling. This does not replace cross-browser or real-device testing.
