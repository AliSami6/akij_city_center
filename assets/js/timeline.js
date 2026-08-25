document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
     1. TIMELINE ELEMENTS
  ========================================= */

  const timeline = document.querySelector(".timeline-vertical-wrapper");

  const centralLine = document.querySelector(".central-line");

  const bottomBadge = document.querySelector(".timeline-badge.badge-bottom");

  if (!timeline || !centralLine || !bottomBadge) {
    return;
  }

  /* =========================================
     2. CALCULATE MAX LINE HEIGHT
     LINE MUST STOP AT "TODAY"
  ========================================= */

  function getMaxLineHeight() {
    const timelineRect = timeline.getBoundingClientRect();

    const badgeRect = bottomBadge.getBoundingClientRect();

    /*
      Today badge center position
      relative to timeline
    */

    const badgeCenter = badgeRect.top - timelineRect.top + badgeRect.height / 2;

    /*
      Central line starts from 45px
    */

    const lineStart = 45;

    /*
      Maximum height:
      line start → Today center
    */

    const maxHeight = badgeCenter - lineStart;

    return Math.max(0, maxHeight);
  }

  /* =========================================
     3. SCROLL DRIVEN LINE
  ========================================= */

  function updateTimelineLine() {
    const timelineRect = timeline.getBoundingClientRect();

    /*
      Viewport drawing point
    */

    const drawPoint = window.innerHeight / 1.2;

    /*
      Current desired height
    */

    let currentHeight = drawPoint - timelineRect.top;

    /*
      Minimum
    */

    if (currentHeight < 0) {
      currentHeight = 0;
    }

    /*
      IMPORTANT:
      Never go beyond Today
    */

    const maxHeight = getMaxLineHeight();

    if (currentHeight > maxHeight) {
      currentHeight = maxHeight;
    }

    /*
      Set CSS variable
    */

    timeline.style.setProperty("--line-height", currentHeight + "px");

    /*
      Apply line height
    */

    centralLine.style.height = currentHeight + "px";
  }

  /* =========================================
     4. EVENTS
  ========================================= */

  window.addEventListener("scroll", updateTimelineLine, { passive: true });

  window.addEventListener("resize", updateTimelineLine);

  /*
    Initial calculation
  */

  updateTimelineLine();

  /* =========================================
     5. NODE REVEAL ANIMATION
  ========================================= */

  const timelineItems = document.querySelectorAll(".timeline-node");

  const observerOptions = {
    root: null,
    threshold: 0.25,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  timelineItems.forEach(function (item) {
    observer.observe(item);
  });
});
