/* Small, optional interactions. The portfolio remains readable without JS. */
(() => {
  "use strict";
  const body = document.body;
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const video = document.getElementById("hero-video");
  const hero = document.querySelector(".hero");
  let heroVisible = true;

  // Dialogs retain native focus trapping, Escape handling, and focus return.
  const menuButton = document.querySelector(".menu-button");
  const menu = document.getElementById("mobile-menu");
  const imageDialog = document.getElementById("image-dialog");
  const supportsDialog = typeof menu.showModal === "function";
  const syncModalState = () => {
    body.classList.toggle(
      "modal-open",
      !!document.querySelector("dialog[open]"),
    );
    menuButton.setAttribute("aria-expanded", String(menu.open));
    syncVideo();
  };
  function openDialog(dialog) {
    dialog.showModal();
    syncModalState();
  }
  if (supportsDialog) {
    body.classList.add("enhanced");
    menuButton.hidden = false;
    menuButton.addEventListener("click", () => openDialog(menu));
    document.querySelectorAll("dialog").forEach((dialog) => {
      dialog
        .querySelectorAll("[data-close]")
        .forEach((button) =>
          button.addEventListener("click", () => dialog.close()),
        );
      dialog.addEventListener("close", syncModalState);
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          dialog.close();
      });
      dialog.querySelectorAll("[data-dismiss]").forEach((link) => {
        link.addEventListener("click", () => {
          dialog.close();
          // Reveal compact projects before the native anchor scroll takes place.
          const target = document.querySelector(link.getAttribute("href"));
          if (target?.matches("details")) target.open = true;
          requestAnimationFrame(() => {
            if (!target) return;
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
          });
        });
      });
    });
    document.querySelectorAll(".image-trigger").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const image = document.getElementById("expanded-image");
        image.src = button.dataset.image;
        image.alt = button.dataset.caption;
        document.getElementById("image-caption").textContent =
          button.dataset.caption;
        openDialog(imageDialog);
      });
    });
    window
      .matchMedia("(min-width: 721px)")
      .addEventListener("change", (event) => {
        if (event.matches && menu.open) menu.close();
      });
  }

  // Background film follows visibility and the viewer's motion preference.
  function syncVideo() {
    if (
      motion.matches ||
      !heroVisible ||
      document.hidden ||
      body.classList.contains("modal-open")
    )
      video.pause();
    else video.play().catch(() => {});
  }
  motion.addEventListener("change", () => {
    syncVideo();
  });
  document.addEventListener("visibilitychange", syncVideo);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        heroVisible = entries[0].isIntersecting;
        syncVideo();
      },
      { threshold: 0.05 },
    ).observe(hero);
  }
  syncVideo();

  // Only the film drifts slightly; the text and pointer remain stable.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    hero.addEventListener(
      "pointermove",
      (event) => {
        if (motion.matches) return;
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty(
          "--film-x",
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}px`,
        );
        hero.style.setProperty(
          "--film-y",
          `${((event.clientY - bounds.top) / bounds.height - 0.5) * 5}px`,
        );
      },
      { passive: true },
    );
    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--film-x", "0px");
      hero.style.setProperty("--film-y", "0px");
    });
  }

  // Direct hashes into compact projects reveal their contents on entry.
  function revealHash() {
    if (!window.location.hash) return;
    const target = document.getElementById(
      decodeURIComponent(window.location.hash.slice(1)),
    );
    if (target?.matches("details")) target.open = true;
  }
  window.addEventListener("hashchange", revealHash);
  revealHash();

  // A composed entrance: title lines lead, then supporting copy and imagery.
  // All source content is visible without JS. Hero CTAs never enter a queue.
  if ("IntersectionObserver" in window && "animate" in Element.prototype) {
    const tokens = getComputedStyle(document.documentElement);
    const tempo = {
      text: parseFloat(tokens.getPropertyValue("--motion-text")),
      body: parseFloat(tokens.getPropertyValue("--motion-body")),
      image: parseFloat(tokens.getPropertyValue("--motion-image")),
      stagger: parseFloat(tokens.getPropertyValue("--motion-stagger")),
      easing: tokens.getPropertyValue("--motion-ease").trim(),
    };
    const groups = new Map();
    let entranceObserver;
    const makePart = (element, delay = 0, kind = "body") => {
      element.dataset.motionPart = "";
      element.dataset.motionKind = kind;
      element.style.setProperty(
        "--entrance-y",
        kind === "eyebrow" ? "12px" : "24px",
      );
      return { element, delay, kind };
    };
    function settle(group) {
      group.animations.forEach((animation) => animation.cancel());
      group.animations = [];
      group.state = "settled";
      group.root.dataset.motionState = "settled";
      group.root.classList.remove("motion-pending", "motion-playing");
      entranceObserver?.unobserve(group.root);
    }
    function play(group) {
      if (group.state === "settled" || group.state === "playing") return;
      if (motion.matches || group.root.contains(document.activeElement)) {
        settle(group);
        return;
      }
      group.state = "playing";
      group.root.dataset.motionState = "playing";
      group.root.classList.remove("motion-pending");
      group.root.classList.add("motion-playing");
      group.animations = group.parts.map(({ element, delay, kind }) => {
        const start =
          kind === "line"
            ? "translateY(105%)"
            : kind === "image"
              ? "translateY(22px) scale(0.985)"
              : `translateY(${kind === "eyebrow" ? 12 : 24}px)`;
        return element.animate(
          [
            { opacity: 0, transform: start },
            { opacity: 1, transform: "none" },
          ],
          {
            duration:
              kind === "image"
                ? tempo.image
                : kind === "line"
                  ? tempo.text
                  : tempo.body,
            delay,
            easing: tempo.easing,
            fill: "both",
          },
        );
      });
      // Releasing completed animations restores normal hover/focus styles.
      Promise.all(group.animations.map((animation) => animation.finished))
        .then(() => {
          if (group.state === "playing") settle(group);
        })
        .catch(() => {});
      entranceObserver?.unobserve(group.root);
    }
    function register(root, parts) {
      if (!parts.length) return;
      root.dataset.motionGroup = "";
      const group = { root, parts, animations: [], state: "idle" };
      groups.set(root, group);
      return group;
    }
    document.querySelectorAll(".chapter-heading").forEach((root) => {
      const parts = [];
      const eyebrow = root.querySelector(".eyebrow");
      if (eyebrow) parts.push(makePart(eyebrow, 0, "eyebrow"));
      root.querySelectorAll(".text-line-inner").forEach((line, index) => {
        parts.push(makePart(line, 80 + index * tempo.stagger, "line"));
      });
      const glyph = root.querySelector(".chapter-glyph");
      if (glyph) parts.push(makePart(glyph, 160));
      root
        .querySelectorAll(
          ".section-intro, :scope > p:not(.eyebrow), .about-name",
        )
        .forEach((copy) => {
          parts.push(makePart(copy, 260));
        });
      register(root, parts);
    });
    document
      .querySelectorAll(
        ".project-image, .project-copy, .more-work-label, .project-row > summary, .experience-row > summary, .about-note, .skills-section, .skill-depth, .credentials, .recognitions, .contact-bottom",
      )
      .forEach((root) => {
        if (root.matches(".project-image, summary")) {
          register(root, [
            makePart(
              root,
              0,
              root.matches(".project-image") ? "image" : "body",
            ),
          ]);
          return;
        }
        let elements = [...root.children];
        if (root.matches(".credentials")) {
          elements = [
            root.firstElementChild,
            ...root.querySelectorAll(".education-row, .certification"),
          ];
        } else if (root.matches(".recognitions")) {
          elements = [
            root.firstElementChild,
            ...root.querySelectorAll(".recognition"),
          ];
        }
        register(
          root,
          elements.map((element, index) =>
            makePart(element, Math.min(index * 90, 180)),
          ),
        );
      });
    // This observer is installed before any content is prepared for an entrance.
    entranceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) play(groups.get(target));
        });
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    groups.forEach((group) => {
      if (motion.matches || group.root.getBoundingClientRect().bottom < 0) {
        settle(group);
      } else {
        if (
          group.root.getBoundingClientRect().top >=
          window.innerHeight * 0.85
        ) {
          group.root.classList.add("motion-pending");
          group.root.dataset.motionState = "pending";
        }
        entranceObserver.observe(group.root);
      }
    });
    const heroParts = [makePart(hero.querySelector(".eyebrow"), 0, "eyebrow")];
    hero.querySelectorAll(".text-line-inner").forEach((line, index) => {
      heroParts.push(makePart(line, index * tempo.stagger, "line"));
    });
    heroParts.push(makePart(hero.querySelector(".hero-intro"), 220));
    const heroGroup = register(hero.querySelector(".hero-content"), heroParts);
    if (window.location.hash || motion.matches) settle(heroGroup);
    else play(heroGroup);
    document.addEventListener("focusin", (event) => {
      const group = groups.get(event.target.closest("[data-motion-group]"));
      if (group) settle(group);
    });
    motion.addEventListener("change", () => {
      if (motion.matches) {
        entranceObserver.disconnect();
        groups.forEach(settle);
      }
    });
  }
  if ("IntersectionObserver" in window) {
    const links = [...document.querySelectorAll(".desktop-nav a")];
    const sections = links.map((link) =>
      document.querySelector(link.getAttribute("href")),
    );
    const projectVisuals = [...document.querySelectorAll(".project-image")];
    const clamp = (value, min = 0, max = 1) =>
      Math.min(max, Math.max(min, value));
    sections.forEach((section) => {
      section.classList.add("scroll-scene");
      const wash = document.createElement("div");
      wash.className = "scene-wash";
      wash.setAttribute("aria-hidden", "true");
      const horizon = document.createElement("span");
      horizon.className = "scene-horizon";
      wash.append(horizon);
      section.prepend(wash);
    });
    let scheduled = false;
    const updateScroll = () => {
      scheduled = false;
      if (document.hidden || body.classList.contains("modal-open")) return;
      // Batch geometry reads before any style writes. No perpetual animation
      // loop, scroll interception, artificial scroll distance, or pinned panels.
      const viewport = window.innerHeight;
      const marker = viewport * 0.35;
      const sectionBounds = sections.map((section) =>
        section.getBoundingClientRect(),
      );
      const heroBounds = hero.getBoundingClientRect();
      const imageBounds = projectVisuals.map((image) =>
        image.getBoundingClientRect(),
      );
      const scrollRange = Math.max(
        1,
        document.documentElement.scrollHeight - viewport,
      );
      let active = null;
      sections.forEach((section, index) => {
        if (sectionBounds[index].top <= marker) active = section.id;
      });
      links.forEach((link) => {
        if (link.hash === `#${active}`)
          link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      if (motion.matches) return;
      const strength = window.innerWidth <= 720 ? 0.55 : 1;
      body.style.setProperty(
        "--page-progress",
        clamp(window.scrollY / scrollRange).toFixed(4),
      );
      const heroTravel = clamp(window.scrollY, 0, heroBounds.height);
      hero.style.setProperty(
        "--hero-film-y",
        `${Math.min(64, heroTravel * 0.1) * strength}px`,
      );
      hero.style.setProperty(
        "--hero-film-scale",
        (1 + clamp(heroTravel / heroBounds.height) * 0.045 * strength).toFixed(
          4,
        ),
      );
      hero.style.setProperty(
        "--hero-copy-y",
        `${-Math.min(32, heroTravel * 0.05) * strength}px`,
      );
      sections.forEach((section, index) => {
        const rect = sectionBounds[index];
        const entry = clamp((viewport - rect.top) / (viewport * 1.05));
        const light = clamp(
          1 - Math.abs(rect.top - viewport * 0.38) / (viewport * 0.9),
        );
        section.style.setProperty(
          "--glyph-y",
          `${(clamp((rect.top - viewport * 0.2) * 0.05, -16, 24) * strength).toFixed(2)}px`,
        );
        section.style.setProperty("--scene-light", (light * 0.55).toFixed(3));
        section.style.setProperty(
          "--wash-x",
          `${(-20 + entry * 40).toFixed(2)}%`,
        );
        section.style.setProperty(
          "--seam-y",
          `${((1 - entry) * 38).toFixed(2)}px`,
        );
        section.style.setProperty(
          "--seam-scale",
          (0.6 + entry * 0.4).toFixed(3),
        );
      });
      projectVisuals.forEach((image, index) => {
        const rect = imageBounds[index];
        const distance = rect.top + rect.height * 0.5 - viewport * 0.5;
        image.style.setProperty(
          "--image-y",
          `${(clamp(distance * -0.035, -14, 14) * strength).toFixed(2)}px`,
        );
      });
    };
    const scheduleScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(updateScroll);
    };
    function syncScrollMotion() {
      body.classList.toggle("scroll-scenes", !motion.matches);
      scheduleScroll();
    }
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll, { passive: true });
    window.addEventListener("pageshow", scheduleScroll);
    document.addEventListener("visibilitychange", scheduleScroll);
    document.querySelectorAll("dialog").forEach((dialog) => {
      dialog.addEventListener("close", scheduleScroll);
    });
    // Expanded projects change section geometry without necessarily scrolling.
    document.querySelectorAll("details").forEach((details) => {
      details.addEventListener("toggle", scheduleScroll);
    });
    if ("ResizeObserver" in window) {
      new ResizeObserver(scheduleScroll).observe(
        document.querySelector("main"),
      );
    }
    motion.addEventListener("change", syncScrollMotion);
    syncScrollMotion();
  }
})();
