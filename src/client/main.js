/**
 * A-Town Limo client (vanilla ES module, content-hashed):
 *   1. Light-header mobile nav toggle.
 *   2. Multi-step inline quote forms (hero, footer, reservations) — any
 *      [data-quote-form] on the page. POST JSON to /api/lead, then redirect to
 *      /thankyou/. No price shown or calculated.
 */

document.documentElement.classList.add("js");

/* ---- Quote form: date fields can't be in the past (dynamic min = today) ---- */
(function dateMin() {
  const today = new Date().toISOString().slice(0, 10);
  document.querySelectorAll('input[type="date"]').forEach((d) => {
    if (!d.min) d.min = today;
  });
})();

/* ---- Minimal scroll reveal (subtle fade-up, once) ---- */
(function reveal() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;
  const targets = document.querySelectorAll(
    ".section-head, .feature-card, .fleet-card, .team-card, .event-card, .pillar, .contact-card, .faq-item, .hero__grid > *, .excellence__media, .excellence__content, .beyond__head, .cta-band__card, .cta-band__copy, .cta-band__actions, .step-card, .route-chip, .include-card, .airport-tile, .area-chip, .includes-note, .vcard, .site-footer__grid > *, .event-cta__copy, .event-cta__actions, .partner__media, .partner__content, .lp-trust__tile, .lp-intro__col, .lp-icongrid__item, .lp-picker, .gt-glance, .gt-compare, .gt-panel, .gt-split__content, .gt-split__media, .pp-benefit, .pp-audience, .pp-why__item, .page-group-transfers .ap-card, .page-group-transfers .ap-why, .page-group-transfers .gt-trust2, .page-group-transfers .gt-compare__cta, .page-services .svc-card"
  );
  if (!targets.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  targets.forEach((t) => {
    t.classList.add("reveal");
    io.observe(t);
  });
})();

/* ---- Pickup / Drop-off type-ahead autocomplete ----
   Replaces the native <datalist> with a custom, fully styleable combobox: the
   suggestions filter as you TYPE (not just a browser dropdown on hover/focus),
   with full keyboard support (Down/Up to move through matches, Enter to choose,
   Esc to close) plus mouse/touch selection. Free text is always preserved — any
   address can be typed even if it is not in the preset list. Options come from
   the server-rendered <datalist> (single source of truth), so this stays
   zero-dependency and applies to every booking form (hero, modal, footer,
   reservations, group-transfers) without per-page special-casing. ---- */
(function placesAutocomplete() {
  const inputs = document.querySelectorAll("input[data-places]");
  if (!inputs.length) return;
  const escHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  let uid = 0;

  // --- Live Google Places (New) suggestions, shared across every booking input.
  // Active only when the Maps script (layout.js, gated on
  // PUBLIC_GOOGLE_MAPS_API_KEY) has loaded. Returns prediction strings, or null
  // when Places isn't available so callers fall back to the built-in DMV list.
  // One session token per lookup burst keeps autocomplete billing in-session. ---
  let gToken = null;
  const placesReady = () =>
    !!(window.google && google.maps && google.maps.places && google.maps.places.AutocompleteSuggestion);
  const googleSuggest = async (q) => {
    if (!placesReady() || q.length < 3) return null;
    try {
      const { AutocompleteSuggestion, AutocompleteSessionToken } = google.maps.places;
      if (!gToken) gToken = new AutocompleteSessionToken();
      const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
        input: q,
        sessionToken: gToken,
        includedRegionCodes: ["us"],
      });
      return (suggestions || [])
        .map((s) => s.placePrediction && s.placePrediction.text && s.placePrediction.text.text)
        .filter(Boolean)
        .slice(0, 8);
    } catch (_) {
      return null;
    }
  };

  inputs.forEach((input) => {
    // Pull the option values from the associated <datalist>, then detach the
    // native list so only our combobox renders.
    const listId = input.getAttribute("list");
    const dl = listId && document.getElementById(listId);
    const options = dl ? Array.from(dl.querySelectorAll("option")).map((o) => o.value) : [];
    if (!options.length) return;
    input.removeAttribute("list");

    // Wrap the input so the dropdown can sit directly beneath it. The swap
    // button is absolutely positioned on .qf-locs, so wrapping is layout-safe.
    const wrap = document.createElement("div");
    wrap.className = "bf-combo";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);

    const listboxId = `bf-ac-${++uid}`;
    const list = document.createElement("ul");
    list.id = listboxId;
    list.className = "bf-ac";
    list.setAttribute("role", "listbox");
    list.hidden = true;
    wrap.appendChild(list);

    input.setAttribute("role", "combobox");
    input.setAttribute("aria-autocomplete", "list");
    input.setAttribute("aria-expanded", "false");
    input.setAttribute("aria-controls", listboxId);

    let active = -1;
    let items = [];
    let silent = false; // guards the programmatic input event fired on select

    const close = () => {
      if (list.hidden) return;
      list.hidden = true;
      active = -1;
      input.setAttribute("aria-expanded", "false");
      input.removeAttribute("aria-activedescendant");
    };

    // Paint a set of suggestion strings into the dropdown.
    const show = (matches) => {
      items = matches.slice(0, 8);
      if (!items.length) { close(); return; }
      list.innerHTML = items
        .map((m, i) => `<li id="${listboxId}-${i}" role="option" class="bf-ac__opt" aria-selected="false">${escHtml(m)}</li>`)
        .join("");
      list.hidden = false;
      active = -1;
      input.setAttribute("aria-expanded", "true");
      input.removeAttribute("aria-activedescendant");
    };

    // Built-in DMV list (airports, villages, FBOs) — instant, offline-safe.
    const localMatches = (ql) =>
      options
        .filter((o) => o.toLowerCase().includes(ql))
        .sort((a, b) => (b.toLowerCase().startsWith(ql) ? 1 : 0) - (a.toLowerCase().startsWith(ql) ? 1 : 0))
        .slice(0, 8);

    let gTimer = null;
    const render = () => {
      if (silent) return;
      const q = input.value.trim();
      const local = localMatches(q.toLowerCase());
      const willQueryGoogle = q.length >= 3 && placesReady();
      // Show the built-in matches at once; if there are none but Google is about
      // to answer, leave the dropdown as-is to avoid a flash of "no results".
      if (local.length) show(local);
      else if (!willQueryGoogle) { close(); return; }
      if (gTimer) clearTimeout(gTimer);
      if (!willQueryGoogle) return;
      gTimer = setTimeout(async () => {
        const g = await googleSuggest(q);
        if (input.value.trim() !== q || document.activeElement !== input) return;
        if (g && g.length) show(g);
        else if (!local.length) close();
      }, 180);
    };

    const setActive = (i) => {
      const opts = list.querySelectorAll(".bf-ac__opt");
      if (!opts.length) return;
      active = (i + opts.length) % opts.length;
      opts.forEach((o, j) => {
        const on = j === active;
        o.classList.toggle("is-active", on);
        o.setAttribute("aria-selected", String(on));
      });
      input.setAttribute("aria-activedescendant", `${listboxId}-${active}`);
      opts[active].scrollIntoView({ block: "nearest" });
    };

    const choose = (i) => {
      if (i < 0 || i >= items.length) return;
      input.value = items[i];
      silent = true;
      input.dispatchEvent(new Event("input", { bubbles: true })); // sync return trip etc. without reopening
      silent = false;
      close();
      gToken = null; // end the Places session; next lookup starts a fresh one
    };

    input.addEventListener("input", render);
    input.addEventListener("focus", () => { if (input.value.trim()) render(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); if (list.hidden) render(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); if (list.hidden) render(); setActive(active - 1); }
      else if (e.key === "Enter") { if (!list.hidden && active >= 0) { e.preventDefault(); choose(active); } }
      else if (e.key === "Escape") { if (!list.hidden) { e.preventDefault(); close(); } }
      else if (e.key === "Tab") { close(); }
    });
    // mousedown (not click) so the choice lands before the input blurs.
    list.addEventListener("mousedown", (e) => {
      const li = e.target.closest(".bf-ac__opt");
      if (!li) return;
      e.preventDefault();
      choose(Array.prototype.indexOf.call(list.children, li));
      input.focus();
    });
    list.addEventListener("mousemove", (e) => {
      const li = e.target.closest(".bf-ac__opt");
      if (li) setActive(Array.prototype.indexOf.call(list.children, li));
    });
    input.addEventListener("blur", () => setTimeout(close, 120));
  });

  // Close any open combobox on an outside click.
  document.addEventListener("click", (e) => {
    if (e.target.closest(".bf-combo")) return;
    document.querySelectorAll(".bf-ac:not([hidden])").forEach((l) => {
      l.hidden = true;
      const inp = l.parentNode.querySelector("input[data-places]");
      inp?.setAttribute("aria-expanded", "false");
      inp?.removeAttribute("aria-activedescendant");
    });
  });
})();


/* ---- Mobile nav ---- */
(function nav() {
  const toggle = document.querySelector(".nav-toggle");
  if (!toggle) return;
  const close = () => {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    document.body.classList.toggle("nav-open", !open);
    toggle.setAttribute("aria-expanded", String(!open));
  });
  document.getElementById("primary-nav")?.addEventListener("click", (e) => {
    if (e.target.closest("a")) close();
  });
  window.addEventListener("keydown", (e) => e.key === "Escape" && close());

  // Dropdown carets: one open group at a time; Escape / outside click closes.
  const subs = Array.from(document.querySelectorAll(".nav-sub"));
  const shut = (except) => subs.forEach((b) => {
    if (b === except) return;
    b.setAttribute("aria-expanded", "false");
    b.parentElement.classList.remove("is-open");
  });
  subs.forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = b.getAttribute("aria-expanded") !== "true";
    shut(b);
    b.setAttribute("aria-expanded", String(open));
    b.parentElement.classList.toggle("is-open", open);
  }));
  document.addEventListener("click", (e) => { if (!e.target.closest(".has-dropdown")) shut(); });
  window.addEventListener("keydown", (e) => e.key === "Escape" && shut());
})();

/* ---- Beyond the Ride: tabbed event gallery ---- */
(function beyondTabs() {
  const tabs = Array.from(document.querySelectorAll("[data-beyond-tab]"));
  const panels = Array.from(document.querySelectorAll("[data-beyond-panel]"));
  if (!tabs.length || !panels.length) return;

  const select = (i) => {
    tabs.forEach((t, j) => {
      const on = j === i;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach((p, j) => {
      const on = j === i;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const next = e.key === "ArrowRight" ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      select(next);
      tabs[next].focus();
    });
  });
})();

/* ---- Scroll-driven UI: sticky-header state, floating CTA, back-to-top ---- */
(function scrollUi() {
  const header = document.querySelector(".site-header");
  const cta = document.querySelector(".floating-cta");
  const toTop = document.querySelector("[data-scroll-top]");
  const trigger = document.querySelector("[data-cta-trigger]");
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY || window.pageYOffset;

    // Sticky header: subtle shrink/shadow once scrolled.
    if (header) header.classList.toggle("is-scrolled", y > 8);

    // Floating CTA: appears once the fleet section (or 520px fallback) is reached.
    if (cta) {
      let show;
      if (trigger) {
        const top = trigger.getBoundingClientRect().top + y;
        show = y + window.innerHeight * 0.85 > top;
      } else {
        show = y > 520;
      }
      cta.classList.toggle("is-visible", show);
      cta.setAttribute("aria-hidden", String(!show));
    }

    // Back-to-top.
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();

  toTop?.addEventListener("click", () => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
})();

/* ---- Events hub: month filter pills ---- */
(function eventsFilter() {
  const pills = Array.from(document.querySelectorAll("[data-events-filter]"));
  const sections = Array.from(document.querySelectorAll("[data-events-month]"));
  if (!pills.length || !sections.length) return;

  const apply = (filter) => {
    sections.forEach((s) => {
      s.hidden = filter !== "all" && s.dataset.eventsMonth !== filter;
    });
  };

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => {
        const on = p === pill;
        p.classList.toggle("is-active", on);
        p.setAttribute("aria-selected", String(on));
      });
      apply(pill.dataset.eventsFilter);
    });
  });
})();

/* ---- "Book Now" / route / airport buttons → open the quote popup ---- */
(function quoteModal() {
  const modal = document.querySelector("[data-quote-modal]");
  let lastTrigger = null;
  const open = () => {
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    modal.querySelector('input[name="pickup"]')?.focus({ preventScroll: true });
  };
  const close = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    setTimeout(() => { modal.hidden = true; }, 250);
    lastTrigger?.focus?.({ preventScroll: true });
  };
  document.addEventListener("click", (e) => {
    const trig = e.target.closest("[data-open-quote]");
    if (trig) {
      e.preventDefault();
      lastTrigger = trig;
      open();
      if (modal) {
        const mp = modal.querySelector('input[name="pickup"]');
        const md = modal.querySelector('input[name="dropoff"]');
        // Prefill: explicit attributes on the trigger win (an EMPTY
        // data-prefill-pickup means "leave pickup blank", e.g. "Car Service to
        // ATL" prefills only the drop-off). Otherwise the page's default pickup
        // (the ATL hub sets data-default-pickup on <body>).
        const ds = trig.dataset;
        const explicit = "routeFrom" in ds || "prefillPickup" in ds || "prefillDropoff" in ds;
        // Clickable boxes always define the whole trip context they open (so a
        // previous box's drop-off/vehicle never leaks into the next one).
        const owns = explicit || trig.classList.contains("cbox__action");
        const from = ds.routeFrom ?? ds.prefillPickup ?? (explicit ? "" : document.body.dataset.defaultPickup || "");
        const to = ds.routeTo ?? ds.prefillDropoff ?? "";
        // A trigger that sets the trip owns both fields: fill them, clearing
        // stale values left by a previous click.
        if ((from || owns) && mp) mp.value = from;
        if ((from || owns) && md) md.value = to;
        // "Book This Vehicle" preselects the vehicle; any other trigger that sets
        // the trip clears a vehicle left over from a previous click.
        const mv = modal.querySelector('select[name="vehicle"]');
        if (mv && (ds.prefillVehicle || from || owns)) mv.value = ds.prefillVehicle || "";
        if (!from && !owns) {
          const src = document.querySelector('.quote-form:not(#modal-quote) input[name="pickup"]');
          if (src && src.value && mp && !mp.value) mp.value = src.value;
        }
      }
      return;
    }
    if (e.target.closest("[data-quote-close]")) { e.preventDefault(); close(); }
  });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal && !modal.hidden) close(); });
})();

/* ---- Become-a-Partner cards → open the partner enquiry popup. No-op on every
   other page (the partner modal only exists on /become-a-partner/). ---- */
(function partnerModal() {
  const modal = document.querySelector("[data-partner-modal]");
  if (!modal) return;
  let lastTrigger = null;
  const open = () => {
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    modal.querySelector('input[name="company"]')?.focus({ preventScroll: true });
  };
  const close = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    setTimeout(() => { modal.hidden = true; }, 250);
    lastTrigger?.focus?.({ preventScroll: true });
  };
  document.addEventListener("click", (e) => {
    const trig = e.target.closest("[data-open-partner]");
    if (trig) { e.preventDefault(); lastTrigger = trig; open(); return; }
    if (e.target.closest("[data-partner-close]")) { e.preventDefault(); close(); }
  });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) close(); });
})();

/* ---- Quote form v2 interactions: tabs, swap, return trip, hours ---- */
(function quoteFormV2() {
  document.querySelectorAll(".quote-form--v2").forEach((form) => {
    const tabs = form.querySelectorAll("[data-qf-tab]");
    const tripType = form.querySelector("[data-qf-triptype]");
    const hours = form.querySelector("[data-qf-hours]");
    const dropoff = form.querySelector("[data-qf-dropoff]");
    const returnToggle = form.querySelector("[data-qf-returntoggle]");
    const returnCb = form.querySelector("[data-qf-return]");
    const returnFields = form.querySelector("[data-qf-returnfields]");

    const setMode = (mode) => {
      const hourly = mode === "hourly";
      tabs.forEach((t) => {
        const on = t.dataset.qfTab === mode;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
      });
      if (tripType) tripType.value = hourly ? "Hourly" : "One Way";
      if (hours) hours.hidden = !hourly;
      if (dropoff) dropoff.placeholder = hourly ? "Drop-off (optional)" : "Drop-off location";
      if (returnToggle) returnToggle.hidden = hourly;
      if (hourly && returnCb) { returnCb.checked = false; if (returnFields) returnFields.hidden = true; }
    };
    tabs.forEach((t) => t.addEventListener("click", () => setMode(t.dataset.qfTab)));

    // Swap pickup/drop-off within each .qf-locs group.
    form.querySelectorAll("[data-qf-swap]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.closest(".qf-locs");
        const ins = group.querySelectorAll('input[type="text"]');
        if (ins.length >= 2) { const v = ins[0].value; ins[0].value = ins[1].value; ins[1].value = v; }
      });
    });

    // Return trip — reverse of outbound, live-synced until the user edits a return field.
    const touched = new Set();
    const rp = form.querySelector('[name="return_pickup"]');
    const rd = form.querySelector('[name="return_dropoff"]');
    [rp, rd].forEach((el) => el && el.addEventListener("input", () => touched.add(el.name)));
    const syncReturn = () => {
      if (!returnCb || !returnCb.checked) return;
      const g = (n) => form.querySelector(`[name="${n}"]`)?.value || "";
      if (rp && !touched.has("return_pickup")) rp.value = g("dropoff");
      if (rd && !touched.has("return_dropoff")) rd.value = g("pickup");
    };
    ["pickup", "dropoff"].forEach((n) => form.querySelector(`[name="${n}"]`)?.addEventListener("input", syncReturn));
    returnCb?.addEventListener("change", () => {
      if (returnFields) returnFields.hidden = !returnCb.checked;
      if (returnCb.checked) syncReturn();
    });
  });
})();

/* ---- Custom date / time / select pickers (vanilla, tokens-matched) ---- */
(function cfPickers() {
  if (!document.querySelector(".cf-field")) return;
  const pad = (n) => String(n).padStart(2, "0");
  const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const parseISO = (s) => { const p = (s || "").split("-").map(Number); return p[0] ? new Date(p[0], p[1] - 1, p[2]) : null; };
  const fmtDate = (d) => d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const today = () => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; };

  function timeListHTML() {
    let out = "";
    for (let m = 0; m < 24 * 60; m += 15) {
      const h = Math.floor(m / 60), mm = m % 60, ap = h < 12 ? "AM" : "PM", h12 = ((h + 11) % 12) + 1;
      const label = `${h12}:${pad(mm)} ${ap}`;
      out += `<li role="option"><button type="button" class="cf-opt" data-value="${pad(h)}:${pad(mm)}" data-label="${label}">${label}</button></li>`;
    }
    return `<ul class="cf-list cf-list--time" role="listbox">${out}</ul>`;
  }

  function buildCalendar(field, view) {
    const pop = field.querySelector("[data-cf-pop]");
    const hidden = field.querySelector("[data-cf-input]");
    const selected = parseISO(hidden.value);
    let min = today();
    if (field.dataset.cfName === "return_date") {
      const pd = parseISO(field.closest("form")?.querySelector('[name="date"]')?.value);
      if (pd && pd > min) min = pd;
    }
    const y = view.getFullYear(), mo = view.getMonth();
    const start = new Date(y, mo, 1).getDay();
    const days = new Date(y, mo + 1, 0).getDate();
    let cells = "";
    for (let i = 0; i < start; i++) cells += `<span class="cf-cal__cell cf-cal__cell--empty"></span>`;
    for (let d = 1; d <= days; d++) {
      const date = new Date(y, mo, d), dis = date < min, sel = selected && iso(date) === iso(selected);
      cells += `<button type="button" class="cf-cal__cell${sel ? " is-selected" : ""}" data-day="${iso(date)}"${dis ? " disabled" : ""}>${d}</button>`;
    }
    pop.innerHTML = `<div class="cf-cal">
      <div class="cf-cal__head">
        <button type="button" class="cf-cal__nav" data-cal-prev aria-label="Previous month">&lsaquo;</button>
        <span class="cf-cal__month">${view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
        <button type="button" class="cf-cal__nav" data-cal-next aria-label="Next month">&rsaquo;</button>
      </div>
      <div class="cf-cal__dow"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>
      <div class="cf-cal__grid">${cells}</div></div>`;
    pop._view = view;
  }

  function setValue(field, value, label) {
    const hidden = field.querySelector("[data-cf-input]");
    const disp = field.querySelector("[data-cf-display]");
    hidden.value = value;
    if (disp) { disp.textContent = label; disp.classList.remove("cf-placeholder"); }
    field.classList.remove("is-invalid");
    hidden.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function closeAll(except) {
    document.querySelectorAll(".cf-field.cf-open").forEach((f) => {
      if (f === except) return;
      f.classList.remove("cf-open");
      f.querySelector("[data-cf-pop]").hidden = true;
      f.querySelector("[data-cf-trigger]").setAttribute("aria-expanded", "false");
    });
  }
  function open(field) {
    closeAll(field);
    const pop = field.querySelector("[data-cf-pop]");
    if (field.dataset.cf === "date") buildCalendar(field, parseISO(field.querySelector("[data-cf-input]").value) || new Date());
    else if (field.dataset.cf === "time" && !pop.querySelector(".cf-list")) pop.innerHTML = timeListHTML();
    pop.hidden = false;
    field.classList.add("cf-open");
    field.querySelector("[data-cf-trigger]").setAttribute("aria-expanded", "true");
    pop.querySelector(".is-selected")?.scrollIntoView?.({ block: "center" });
  }

  document.addEventListener("click", (e) => {
    const trig = e.target.closest("[data-cf-trigger]");
    if (trig) { e.preventDefault(); const f = trig.closest(".cf-field"); f.classList.contains("cf-open") ? closeAll() : open(f); return; }
    const nav = e.target.closest("[data-cal-prev],[data-cal-next]");
    if (nav) { e.preventDefault(); const f = nav.closest(".cf-field"); const v = new Date(f.querySelector("[data-cf-pop]")._view); v.setMonth(v.getMonth() + (nav.hasAttribute("data-cal-prev") ? -1 : 1)); buildCalendar(f, v); return; }
    const day = e.target.closest(".cf-cal__cell[data-day]");
    if (day && !day.disabled) { e.preventDefault(); const f = day.closest(".cf-field"); setValue(f, day.dataset.day, fmtDate(parseISO(day.dataset.day))); closeAll(); return; }
    const opt = e.target.closest(".cf-opt");
    if (opt) {
      e.preventDefault();
      const f = opt.closest(".cf-field");
      setValue(f, opt.dataset.value, opt.dataset.label || opt.textContent.trim());
      closeAll();
      return;
    }
    if (!e.target.closest(".cf-field")) closeAll();
  });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
})();

/* ---- Quote forms: 3-step flow (trip -> vehicle -> details), submit.
 *      AV's flow + vehicle-card + country-code phone, ATown's submit handling
 *      (POST /api/lead; accepted => /thankyou/ + form_submit_success; otherwise
 *      stay with a tap-to-call message — never redirect on a stubbed 503). ---- */
(function quoteForms() {
  const forms = Array.from(document.querySelectorAll("[data-quote-form]"));
  if (!forms.length) return;

  const params = new URLSearchParams(location.search);
  const UTM = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

  forms.forEach((form) => {
    const steps = Array.from(form.querySelectorAll(".quote-step"));
    const statusEl = form.querySelector(".quote-status");
    const startedAt = Date.now();
    let firstInteract = 0;
    const markInteract = () => { if (!firstInteract) firstInteract = Date.now(); };
    ["focusin", "keydown", "pointerdown", "change"].forEach((ev) => form.addEventListener(ev, markInteract, { passive: true }));

    // Prefill hidden tracking.
    const set = (n, v) => { if (form.elements[n] != null && v != null) form.elements[n].value = v; };
    set("gclid", params.get("gclid") || "");
    UTM.forEach((k) => set(k, params.get(k) || ""));
    set("page_url", location.href);
    set("referrer", document.referrer || "");
    set("device_type", matchMedia("(max-width: 720px)").matches ? "mobile" : "desktop");

    const show = (n) => steps.forEach((s) => (s.hidden = Number(s.dataset.step) !== n));
    const setVehicle = (name, seats) => {
      const vh = form.querySelector('[name="vehicle"]'), ph = form.querySelector('[name="passengers"]');
      if (vh) vh.value = name;
      if (ph && seats) ph.value = seats;
      form.querySelectorAll("[data-qf-vehicle]").forEach((c) => {
        const on = c.dataset.vehicle === name;
        c.classList.toggle("is-selected", on);
        c.setAttribute("aria-checked", String(on));
      });
    };
    const validate = (n) => {
      const step = steps.find((s) => Number(s.dataset.step) === n);
      if (!step) return true;
      if (n === 2) {
        const v = form.querySelector('[name="vehicle"]');
        if (!v || !v.value) { form.querySelector("[data-qf-vehicle]")?.focus(); return false; }
      }
      // Custom pickers (date/time) store into hidden inputs — validate those.
      for (const cf of step.querySelectorAll(".cf-field[data-cf-required]")) {
        if (cf.closest("[hidden]")) continue;
        const inp = cf.querySelector("[data-cf-input]");
        if (!inp || !inp.value) {
          cf.classList.add("is-invalid");
          cf.querySelector("[data-cf-trigger]")?.focus();
          return false;
        }
        cf.classList.remove("is-invalid");
      }
      for (const f of step.querySelectorAll("input,select,textarea")) {
        if (f.required && f.offsetParent !== null && !f.checkValidity()) {
          f.reportValidity();
          return false;
        }
      }
      return true;
    };

    // Step navigation: 1 -> 2 (Continue), vehicle card -> 3 (auto-advance), Back.
    form.querySelector("[data-quote-next]")?.addEventListener("click", () => { if (validate(1)) show(2); });
    form.querySelectorAll("[data-quote-back]").forEach((b) =>
      b.addEventListener("click", () => show(Number(b.dataset.quoteBack) || 1))
    );
    const vcards = Array.from(form.querySelectorAll("[data-qf-vehicle]"));
    vcards.forEach((card, i) => {
      card.addEventListener("click", () => { setVehicle(card.dataset.vehicle, card.dataset.seats); show(3); });
      // Roving arrow keys within the radiogroup.
      card.addEventListener("keydown", (e) => {
        if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
        e.preventDefault();
        const fwd = e.key === "ArrowRight" || e.key === "ArrowDown";
        vcards[(i + (fwd ? 1 : vcards.length - 1)) % vcards.length].focus();
      });
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!validate(1) || !validate(2) || !validate(3)) return;
      const btn = form.querySelector("[data-quote-submit]");
      const data = Object.fromEntries(new FormData(form).entries());
      // Service Type derived from trip type for the lead email / CRM (booking
      // forms only — the single-step contact form has no trip type).
      if (data.trip_type) data.service_type = data.trip_type;
      data.submitted_at = new Date().toISOString();
      data.elapsed_ms = Date.now() - startedAt;
      data.interaction_ms = firstInteract ? Date.now() - firstInteract : -1;
      // Combine country code + number into an E.164 phone (booking forms only;
      // the contact form has no country-code selector — leave its phone as typed).
      if (data.phone && form.querySelector('[name="country_code"]')) {
        const cc = (data.country_code || "+1").replace(/[^\d+]/g, "");
        let digits = String(data.phone).replace(/[^\d]/g, "");
        if (cc === "+1" && digits.length === 11 && digits[0] === "1") digits = digits.slice(1);
        else if (cc !== "+1" && digits[0] === "0") digits = digits.slice(1); // drop trunk 0
        data.phone = cc + digits;
      }

      if (statusEl) statusEl.hidden = true;
      if (btn) {
        btn.disabled = true;
        btn.dataset.html = btn.innerHTML;
        btn.textContent = "Sending…";
      }
      const restore = () => {
        if (!btn) return;
        btn.disabled = false;
        if (btn.dataset.html) btn.innerHTML = btn.dataset.html;
      };

      let res = null;
      let body = null;
      try {
        res = await fetch("/api/lead", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        });
        body = await res.json().catch(() => null);
      } catch (_) {
        res = null; // network failure -> same "call us" fallback as a 503
      }

      if (res && res.ok) {
        try {
          sessionStorage.setItem(
            "atown_trip",
            JSON.stringify({
              pickup: data.pickup,
              dropoff: data.dropoff,
              date: data.date,
              time: data.time,
              trip_type: data.trip_type,
              vehicle: data.vehicle,
            })
          );
        } catch (_) {}
        const go = () => location.assign("/thankyou/");
        // Conversion only for a real, accepted lead (spam-guarded 200s don't count).
        if (body && body.accepted === true) {
          let done = false;
          const once = () => { if (!done) { done = true; go(); } };
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "form_submit_success",
            vehicle: data.vehicle || "",
            service: data.trip_type || "",
            form_location: data.form_location || "",
            eventCallback: once,
            eventTimeout: 1200,
          });
          if (window.gtag) window.gtag("event", "generate_lead", { vehicle: data.vehicle || "", service: data.trip_type || "" });
          setTimeout(once, 1300); // GTM absent -> still navigate
        } else {
          go();
        }
        return;
      }

      // Not accepted (e.g. 503 while the handler is stubbed): stay on the page
      // and offer tap-to-call. Never redirect to /thankyou/ here.
      restore();
      if (statusEl) {
        const phone = (body && body.phone) || {
          e164: document.body.dataset.phoneE164,
          display: document.body.dataset.phoneDisplay,
        };
        const msg =
          (body && body.message) ||
          `Online booking is temporarily unavailable — call ${phone.display}.`;
        const text = document.createElement("span");
        text.textContent = msg;
        const call = document.createElement("a");
        call.className = "btn btn-primary quote-status__call";
        call.href = `tel:${phone.e164}`;
        call.textContent = `Call ${phone.display}`;
        statusEl.replaceChildren(text, call);
        statusEl.className = "quote-status quote-status--error";
        statusEl.hidden = false;
      }
    });
  });
})();

/* ---- click_to_call: every tel: link on every page ---- */
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="tel:"]');
  if (!a) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "click_to_call", page_path: location.pathname });
  if (window.gtag) window.gtag("event", "contact", { method: "phone" });
  // Google Ads phone-lead conversion (click to call).
  if (window.gtag && window.__ADS) window.gtag("event", "conversion", { send_to: window.__ADS.call, value: 10.0, currency: "USD" });
});

/* ---- Google Ads: lead conversion on the /thankyou/ page load. That page is
 *  reached only after a delivered lead (200 accepted), so a page-load
 *  conversion here is clean and can't false-fire on an ordinary page view. ---- */
(function adsLeadConversion() {
  if (!/\/thankyou\/?$/.test(location.pathname)) return;
  if (window.gtag && window.__ADS) window.gtag("event", "conversion", { send_to: window.__ADS.lead });
})();

/* ---- ARIA tabs (landing template): [data-tabs] → role=tablist/tab/tabpanel.
 *  Panels are server-rendered; CSS shows only .is-active once html.js is set
 *  (no layout shift). Arrow keys / Home / End move between tabs. ---- */
(function tabs() {
  document.querySelectorAll("[data-tabs]").forEach((root) => {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
    const select = (i, focus) => {
      tabs.forEach((t, j) => {
        const on = i === j;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        panels[j]?.classList.toggle("is-active", on);
      });
      if (focus) {
        tabs[i].focus();
        tabs[i].scrollIntoView({ block: "nearest", inline: "nearest" });
      }
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => select(i, false));
      t.addEventListener("keydown", (e) => {
        const last = tabs.length - 1;
        const next =
          e.key === "ArrowRight" ? (i === last ? 0 : i + 1) :
          e.key === "ArrowLeft" ? (i === 0 ? last : i - 1) :
          e.key === "Home" ? 0 : e.key === "End" ? last : null;
        if (next === null) return;
        e.preventDefault();
        select(next, true);
      });
    });
  });
})();

/* ---- Fleet picker: travelers + bags → highlight the smallest vehicle that
 *  fits both; dim the rest. Card sizes never change (no layout shift). ---- */
(function fleetPicker() {
  const root = document.querySelector("[data-fleet-picker]");
  if (!root) return;
  const section = root.closest("section");
  const row = section.querySelector("[data-fleet-row]");
  const cards = Array.from(section.querySelectorAll("[data-fleet-card]"))
    .map((el) => ({ el, pax: +el.dataset.pax, bags: +el.dataset.bags, name: el.dataset.name }))
    .sort((a, b) => a.pax - b.pax);
  const out = root.querySelector("[data-bags-value]");
  const result = root.querySelector("[data-fit-result]");
  const MAX_BAGS = 20;
  let bags = Number(out.textContent) || 0;
  const travelers = () => Number(root.querySelector('input[name="lp-travelers"]:checked')?.value || 0);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const update = (scroll) => {
    out.textContent = String(bags);
    root.querySelector("[data-bags-dec]").disabled = bags <= 0;
    root.querySelector("[data-bags-inc]").disabled = bags >= MAX_BAGS;
    const n = travelers();
    if (!n) return; // nothing chosen yet: no highlight, no dimming
    const fit = cards.find((c) => c.pax >= n && c.bags >= bags);
    cards.forEach((c) => {
      c.el.classList.toggle("is-fit", c === fit);
      c.el.classList.toggle("is-dim", !!fit && c !== fit);
    });
    section.classList.add("has-pick");
    if (fit) {
      result.textContent = `Best fit: ${fit.name} (up to ${fit.pax} passengers, ${fit.bags} bags).`;
      // On the mobile swipe row, bring the best fit into view (row scroll only).
      if (scroll && row.scrollWidth > row.clientWidth) {
        row.scrollTo({ left: fit.el.offsetLeft - row.offsetLeft, behavior: reduce ? "auto" : "smooth" });
      }
    } else {
      cards.forEach((c) => c.el.classList.remove("is-dim"));
      result.textContent = "More than our largest vehicle holds? Call us to plan your group.";
    }
  };

  root.addEventListener("change", (e) => { if (e.target.name === "lp-travelers") update(true); });
  root.querySelector("[data-bags-dec]").addEventListener("click", () => { bags = Math.max(0, bags - 1); update(true); });
  root.querySelector("[data-bags-inc]").addEventListener("click", () => { bags = Math.min(MAX_BAGS, bags + 1); update(true); });
  update(false);
})();

/* ---- card_click: every clickable box (stretched .cbox__action, fleet-card
 *  Book buttons). Modal opens from a box still flow into the normal quote
 *  analytics (form_location="modal" → form_submit_success on a real lead). ---- */
document.addEventListener("click", (e) => {
  const el = e.target.closest(".cbox__action, [data-card-label]");
  if (!el) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "card_click",
    label: el.dataset.cardLabel || el.textContent.trim(),
    action: el.matches("[data-open-quote]") ? "modal" : "link",
    page_path: location.pathname,
  });
});
