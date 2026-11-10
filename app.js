
/* =========================================
   MABATI ROLLING MILLS
   MAIN WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   1. WHATSAPP CONTACT DETAILS
========================================= */

const WHATSAPP_NUMBER = "254756393875";

const WHATSAPP_MESSAGE = `Hello MRM Team,

I hope you are doing well. I am interested in placing an order for your roofing products. Kindly assist me with the available products, pricing and ordering process.

Thank you. I look forward to your response.`;

const whatsappLink =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;


/* =========================================
   2. NAVIGATION MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function closeMenu() {
  if (!menuToggle || !mainNav) return;

  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function openMenu() {
  if (!menuToggle || !mainNav) return;

  mainNav.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
  menuToggle.setAttribute("aria-label", "Close navigation menu");
}

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", function (event) {
    event.stopPropagation();

    const isOpen = mainNav.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close after selecting a navigation link.
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  // Close when tapping anywhere outside the menu.
  document.addEventListener("click", function (event) {
    if (
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Close with the Escape key.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}


/* =========================================
   3. WHATSAPP ENQUIRY BUTTONS
========================================= */

const whatsappFloat = document.getElementById("whatsappFloat");

if (whatsappFloat) {
  whatsappFloat.href = whatsappLink;
  whatsappFloat.target = "_blank";
  whatsappFloat.rel = "noopener noreferrer";
}

document.querySelectorAll(".whatsapp-contact").forEach(function (button) {
  button.href = whatsappLink;
  button.target = "_blank";
  button.rel = "noopener noreferrer";
});


/* =========================================
   4. HERO IMAGE SLIDESHOW
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");

const heroIndicators = document.querySelectorAll(
  ".hero-indicators button"
);

let currentHeroSlide = 0;
let heroSlideshowTimer = null;

function showHeroSlide(index) {
  if (!heroSlides.length) return;

  currentHeroSlide = index;

  heroSlides.forEach(function (slide, slideIndex) {
    slide.classList.toggle("active", slideIndex === index);
  });

  heroIndicators.forEach(function (indicator, indicatorIndex) {
    indicator.classList.toggle(
      "active",
      indicatorIndex === index
    );

    indicator.setAttribute(
      "aria-pressed",
      indicatorIndex === index ? "true" : "false"
    );
  });
}

function nextHeroSlide() {
  if (!heroSlides.length) return;

  const nextIndex =
    (currentHeroSlide + 1) % heroSlides.length;

  showHeroSlide(nextIndex);
}

function startHeroSlideshow() {
  if (heroSlides.length <= 1) return;

  clearInterval(heroSlideshowTimer);

  heroSlideshowTimer = setInterval(nextHeroSlide, 7000);
}

heroIndicators.forEach(function (indicator, index) {
  indicator.addEventListener("click", function () {
    if (index >= heroSlides.length) return;

    showHeroSlide(index);
    startHeroSlideshow();
  });
});

if (heroSlides.length > 0) {
  showHeroSlide(0);
  startHeroSlideshow();
}


/* =========================================
   5. ROOFING PRICE CALCULATOR
========================================= */

// Add confirmed prices per metre here when supplied.
// Do not enter estimated or unconfirmed prices.

const roofingPrices = {
  "box-profile": null,
  "tile-profile": null,
  "stone-coated": null,
  "corrugated": null,
  "industrial": null
};

// Connect each selectable product to its category.

const productCategories = {
  "MaxCover": "box-profile",
  "Covermax": "box-profile",
  "Dumu Rangi Box Profile": "box-profile",
  "Versatile": "tile-profile",
  "Orientile": "tile-profile",
  "Elegantile": "tile-profile",
  "Galsheet Resincot": "corrugated"
};

const calcProduct = document.getElementById("calcProduct");

const decreaseMetres = document.getElementById("decreaseMetres");
const metreQuantity = document.getElementById("metreQuantity");
const increaseMetres = document.getElementById("increaseMetres");

const pricePerMetre = document.getElementById("pricePerMetre");
const estimatedTotal = document.getElementById("estimatedTotal");

let selectedMetres = 2;

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 2
  }).format(amount);
}

function getSelectedPrice() {
  if (!calcProduct || !calcProduct.value) return null;

  const category = productCategories[calcProduct.value];

  if (!category) return null;

  return roofingPrices[category];
}

function updateCalculator() {
  const price = getSelectedPrice();

  if (metreQuantity) {
    metreQuantity.textContent = selectedMetres;
  }

  if (pricePerMetre) {
    pricePerMetre.textContent =
      price === null
        ? "To be confirmed"
        : formatCurrency(price);
  }

  if (estimatedTotal) {
    estimatedTotal.textContent =
      price === null
        ? "To be confirmed"
        : formatCurrency(selectedMetres * price);
  }
}

if (decreaseMetres) {
  decreaseMetres.addEventListener("click", function () {
    if (selectedMetres > 1) {
      selectedMetres--;
      updateCalculator();
    }
  });
}

if (increaseMetres) {
  increaseMetres.addEventListener("click", function () {
    selectedMetres++;
    updateCalculator();
  });
}

if (calcProduct) {
  calcProduct.addEventListener("change", updateCalculator);
}

updateCalculator();


/* =========================================
   6. FAQ INTERACTION
========================================= */

// Only one FAQ item stays open at a time.

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {
  item.addEventListener("toggle", function () {
    if (item.open) {
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    }
  });
});


/* =========================================
   7. FOOTER YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   8. SMOOTH SECTION NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


/* =========================================
   9. WEBSITE INITIALISATION
========================================= */

console.log("MABATI ROLLING MILLS website loaded.");
console.log("WhatsApp contact:", WHATSAPP_NUMBER);
console.log("Hero slides found:", heroSlides.length);
console.log("FAQ items found:", faqItems.length);
