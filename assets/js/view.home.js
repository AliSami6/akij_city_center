/*
Name: 			View - Home
Written by: 	
Theme Version:	1.1
*/

(($) => {
  /*
	Circle Slider
	*/
  if ($.isFunction($.fn.flipshow)) {
    const circleContainer = $(".fc-slideshow");

    $.each(circleContainer, function () {
      const $container = $(this);

      $container.flipshow();

      setTimeout(function circleFlip() {
        $container
          .data()
          .flipshow._navigate(
            $container.find("div.fc-right span:first"),
            "right",
          );
        setTimeout(circleFlip, 3000);
      }, 3000);
    });
  }

  /*
	Move Cloud
	*/
  if ($(".cloud").get(0)) {
    const moveCloud = () => {
      $(".cloud").animate(
        {
          top: "+=20px",
        },
        3000,
        "linear",
        () => {
          $(".cloud").animate(
            {
              top: "-=20px",
            },
            3000,
            "linear",
            () => {
              moveCloud();
            },
          );
        },
      );
    };

    moveCloud();
  }
}).apply(this, [jQuery]);

window.addEventListener("scroll", function () {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("header-scrolled");
  } else {
    header.classList.remove("header-scrolled");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
     1. CURRENT PAGE DETECTION
  ========================================= */

  let currentPage = window.location.pathname.split("/").pop();

  if (!currentPage || currentPage === "") {
    currentPage = "index.html";
  }

  /* =========================================
     2. NAVIGATION ACTIVE CLASS
  ========================================= */

  const allNavLinks = document.querySelectorAll(
    "#HeaderMainNav .nav-link, #HeaderMainNav .dropdown-item",
  );

  allNavLinks.forEach(function (link) {
    link.classList.remove("active");
  });

  const homePages = ["index.html", "index-2.html"];

  /* =========================================
     3. HOME ACTIVE
  ========================================= */

  if (homePages.includes(currentPage)) {
    const homeLink = document.querySelector("#navbarDropdownMenuLink");

    if (homeLink) {
      homeLink.classList.add("active");
    }

    if (currentPage === "index-2.html") {
      const homeTwo = document.querySelector(
        '#HeaderMainNav .dropdown-item[href="index-2.html"]',
      );

      if (homeTwo) {
        homeTwo.classList.add("active");
      }
    }
  } else {
    /* =========================================
       4. OTHER PAGE ACTIVE
    ========================================= */

    allNavLinks.forEach(function (link) {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const linkPage = href.split("/").pop();

      if (linkPage === currentPage) {
        link.classList.add("active");

        const parentDropdown = link.closest(".dropdown");

        if (parentDropdown) {
          const parentNavLink =
            parentDropdown.querySelector(".dropdown-toggle");

          if (parentNavLink) {
            parentNavLink.classList.add("active");
          }
        }
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menuCollapse = document.getElementById("navbarNavDropdown");
  const overlay = document.querySelector(".sidebar-overlay");
  const closeBtn = document.querySelector(".sidebar-close-btn");

  if (!menuCollapse) return;

  // Initialize Bootstrap Collapse instance
  const bsCollapse = new bootstrap.Collapse(menuCollapse, {
    toggle: false,
  });

  // Toggle overlay active state when menu slides in/out
  menuCollapse.addEventListener("show.bs.collapse", function () {
    if (overlay) overlay.classList.add("active");
  });

  menuCollapse.addEventListener("hide.bs.collapse", function () {
    if (overlay) overlay.classList.remove("active");
  });

  // Explicit Close Actions
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      bsCollapse.hide();
    });
  }

  if (overlay) {
    overlay.addEventListener("click", function () {
      bsCollapse.hide();
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const closeBtn = document.getElementById("closeMenuBtn");
  const navDropdown = document.getElementById("navbarNavDropdown");

  if (closeBtn && navDropdown) {
    closeBtn.addEventListener("click", function () {
      const bsCollapse =
        bootstrap.Collapse.getInstance(navDropdown) ||
        new bootstrap.Collapse(navDropdown);
      bsCollapse.hide();
    });
  }
});
