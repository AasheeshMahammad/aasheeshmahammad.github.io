(function () {
  "use strict";

  var USER = "AasheeshMahammad";
  // Profile/site repos, plus the projects already featured on the page
  var EXCLUDE = [
    USER, USER + ".github.io",
    "insomnia-plugin-run-requests-parallel", "Chatbot", "Animepahe-Link-Fetcher"
  ].map(function (n) { return n.toLowerCase(); });
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;

  // Theme toggle
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Nav: scrolled state + mobile menu
  var nav = document.getElementById("nav");
  var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 10); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var menuBtn = document.getElementById("menu-btn");
  var links = document.getElementById("nav-links");
  var setMenu = function (open) {
    links.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  };
  menuBtn.addEventListener("click", function () { setMenu(!links.classList.contains("open")); });
  links.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });

  // Active link highlighting
  var navLinks = Array.prototype.slice.call(links.querySelectorAll("a"));
  if ("IntersectionObserver" in window) {
    var sectionObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { sectionObs.observe(s); });
  }

  // Scroll reveal
  var revealAll = function (els) { els.forEach(function (el) { el.classList.add("visible"); }); };
  var revealObs = null;
  if (!reduceMotion && "IntersectionObserver" in window) {
    revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
  }
  var observeReveal = function (els) {
    if (revealObs) els.forEach(function (el) { revealObs.observe(el); });
    else revealAll(els);
  };
  observeReveal(Array.prototype.slice.call(document.querySelectorAll(".reveal")));

  // Typing effect
  var roles = ["Full Stack Engineer", "Analyst @ Goldman Sachs", "Spring Boot · Angular · React", "AI & LLM integrations", "Python automation"];
  var typed = document.getElementById("typed");
  if (reduceMotion) {
    typed.textContent = roles[0];
  } else {
    var r = 0, c = 0, deleting = false;
    (function tick() {
      var word = roles[r];
      c += deleting ? -1 : 1;
      typed.textContent = word.slice(0, c);
      var delay = deleting ? 45 : 90;
      if (!deleting && c === word.length) { deleting = true; delay = 1600; }
      else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      setTimeout(tick, delay);
    })();
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  // GitHub data
  var LANG_COLORS = {
    Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#3178c6", Java: "#b07219",
    C: "#555555", "C++": "#f34b7d", "C#": "#178600", HTML: "#e34c26", CSS: "#563d7c",
    Shell: "#89e051", Go: "#00ADD8", Rust: "#dea584", Kotlin: "#A97BFF", PHP: "#4F5D95",
    Ruby: "#701516", "Jupyter Notebook": "#DA5B0B", SQL: "#e38c00", Dart: "#00B4AB", Vue: "#41b883"
  };

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (ch) { if (ch) node.appendChild(ch); });
    return node;
  }

  function svgIcon(path) {
    var span = document.createElement("span");
    span.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="' + path + '"/></svg>';
    return span.firstChild;
  }
  var ICON_STAR = "M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z";
  var ICON_FORK = "M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z";
  var ICON_REPO = "M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z";

  function projectCard(repo) {
    var meta = el("div", { "class": "project-meta" });
    if (repo.language) {
      var dot = el("span", { "class": "lang-dot" });
      dot.style.background = LANG_COLORS[repo.language] || "var(--accent)";
      meta.appendChild(el("span", {}, [dot, document.createTextNode(repo.language)]));
    }
    meta.appendChild(el("span", { title: "Stars" }, [svgIcon(ICON_STAR), document.createTextNode(String(repo.stargazers_count))]));
    meta.appendChild(el("span", { title: "Forks" }, [svgIcon(ICON_FORK), document.createTextNode(String(repo.forks_count))]));

    var topics = null;
    if (repo.topics && repo.topics.length) {
      topics = el("div", { "class": "topics" }, repo.topics.slice(0, 4).map(function (t) { return el("span", { text: t }); }));
    }

    var link = el("a", { href: repo.html_url, target: "_blank", rel: "noopener", text: repo.name });
    var head = el("div", { "class": "project-head" }, [svgIcon(ICON_REPO)]);
    if (repo.homepage) {
      head.appendChild(el("a", { href: repo.homepage, target: "_blank", rel: "noopener", "class": "mono", style: "font-size:.8rem", text: "Live ↗" }));
    }
    return el("article", { "class": "card project-card reveal" }, [
      head,
      el("h3", {}, [link]),
      el("p", { text: repo.description || "No description yet. Check out the code on GitHub." }),
      topics,
      meta
    ]);
  }

  var grid = document.getElementById("projects-grid");
  var moreBlock = document.getElementById("more-projects");
  // Featured projects are static, so if the live list can't load, just hide the extra grid
  function hideMore() { moreBlock.style.display = "none"; }

  fetch("https://api.github.com/users/" + USER + "/repos?per_page=100&sort=updated", { headers: { Accept: "application/vnd.github+json" } })
    .then(function (res) { if (!res.ok) throw new Error(res.status); return res.json(); })
    .then(function (repos) {
      var list = repos.filter(function (r) { return !r.fork && !r.archived && EXCLUDE.indexOf(r.name.toLowerCase()) === -1; })
        .sort(function (a, b) {
          return (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at));
        })
        .slice(0, 3);
      if (!list.length) { hideMore(); return; }
      grid.innerHTML = "";
      var cards = list.map(projectCard);
      cards.forEach(function (c) { grid.appendChild(c); });
      observeReveal(cards);
    })
    .catch(hideMore);
})();
