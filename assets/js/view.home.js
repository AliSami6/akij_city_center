/*
Name: 			View - Home
Written by: 	
Theme Version:	1.1
*/

(($ => {
    /*
	Circle Slider
	*/
    if ($.isFunction($.fn.flipshow)) {
		const circleContainer = $('.fc-slideshow');
	
		$.each( circleContainer, function() {
				
			const $container = $(this);
				
			$container.flipshow();

			setTimeout(function circleFlip() {
				$container.data().flipshow._navigate($container.find('div.fc-right span:first'), 'right');
				setTimeout(circleFlip, 3000);
			}, 3000);
			
		});
	}

    /*
	Move Cloud
	*/
    if ($('.cloud').get(0)) {
		const moveCloud = () => {
			$('.cloud').animate({
				'top': '+=20px'
			}, 3000, 'linear', () => {
				$('.cloud').animate({
					'top': '-=20px'
				}, 3000, 'linear', () => {
					moveCloud();
				});
			});
		};

		moveCloud();
	}
})).apply(this, [jQuery]);

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

/* =========================================
   5. DROPDOWN - DESKTOP + MOBILE
========================================= */

const dropdownToggles = document.querySelectorAll(
  "#HeaderMainNav .dropdown-toggle"
);

dropdownToggles.forEach(function (toggle) {

  toggle.addEventListener("click", function (e) {

    e.preventDefault();
    e.stopPropagation();

    const parentDropdown = this.closest(".dropdown");

    if (!parentDropdown) return;

    const dropdownMenu =
      parentDropdown.querySelector(".dropdown-menu");

    /* =========================================
       CLOSE OTHER DROPDOWNS
    ========================================= */

    document
      .querySelectorAll("#HeaderMainNav .dropdown")
      .forEach(function (dropdown) {

        if (dropdown !== parentDropdown) {

          dropdown.classList.remove("show");

          const otherMenu =
            dropdown.querySelector(".dropdown-menu");

          if (otherMenu) {
            otherMenu.classList.remove("show");
          }

          const otherToggle =
            dropdown.querySelector(".dropdown-toggle");

          if (otherToggle) {
            otherToggle.setAttribute(
              "aria-expanded",
              "false"
            );
          }

        }

      });

    /* =========================================
       TOGGLE CURRENT DROPDOWN
    ========================================= */

    parentDropdown.classList.toggle("show");

    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");

      const isOpen =
        dropdownMenu.classList.contains("show");

      this.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );
    }

  });

});


/* =========================================
   6. CLICK OUTSIDE = CLOSE DROPDOWN
========================================= */

document.addEventListener("click", function (e) {

  if (!e.target.closest("#HeaderMainNav .dropdown")) {

    document
      .querySelectorAll("#HeaderMainNav .dropdown")
      .forEach(function (dropdown) {

        dropdown.classList.remove("show");

        const menu =
          dropdown.querySelector(".dropdown-menu");

        if (menu) {
          menu.classList.remove("show");
        }

        const toggle =
          dropdown.querySelector(".dropdown-toggle");

        if (toggle) {
          toggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      });

  }

});


/* =========================================
   7. WINDOW RESIZE
========================================= */

window.addEventListener("resize", function () {

  document
    .querySelectorAll("#HeaderMainNav .dropdown")
    .forEach(function (dropdown) {

      dropdown.classList.remove("show");

      const menu =
        dropdown.querySelector(".dropdown-menu");

      if (menu) {
        menu.classList.remove("show");
      }

      const toggle =
        dropdown.querySelector(".dropdown-toggle");

      if (toggle) {
        toggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    });

});