
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
   2. MOBILE THREE-DOT NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

    });

    // Close menu after selecting a section

    mainNav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

        });

    });

    // Close menu when clicking outside it

    document.addEventListener("click", event => {

        if (
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            mainNav.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

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

document.querySelectorAll(".whatsapp-contact").forEach(button => {

    button.href = whatsappLink;
    button.target = "_blank";
    button.rel = "noopener noreferrer";

});


/* =========================================
   4. HERO IMAGE SLIDESHOW
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroIndicators = document.querySelectorAll(
    ".hero-indicators button, .hero-indicators span"
);

let currentHeroSlide = 0;
let heroSlideshowTimer = null;

function showHeroSlide(index) {

    if (!heroSlides.length) return;

    heroSlides.forEach((slide, slideIndex) => {

        slide.classList.toggle("active", slideIndex === index);

    });

    heroIndicators.forEach((indicator, indicatorIndex) => {

        indicator.classList.toggle(
            "active",
            indicatorIndex === index
        );

        if (indicator.tagName === "BUTTON") {

            indicator.setAttribute(
                "aria-pressed",
                indicatorIndex === index ? "true" : "false"
            );

        }

    });

    currentHeroSlide = index;

}

function nextHeroSlide() {

    if (!heroSlides.length) return;

    const nextIndex = (currentHeroSlide + 1) % heroSlides.length;

    showHeroSlide(nextIndex);

}

function startHeroSlideshow() {

    if (heroSlides.length <= 1) return;

    clearInterval(heroSlideshowTimer);

    heroSlideshowTimer = setInterval(nextHeroSlide, 7000);

}

// Allow users to select a slide using its indicator

heroIndicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {

        if (index >= heroSlides.length) return;

        showHeroSlide(index);
        startHeroSlideshow();

    });

});

// Start slideshow

if (heroSlides.length > 0) {

    showHeroSlide(0);
    startHeroSlideshow();

}


/* =========================================
   5. ROOFING PRICE CALCULATOR
========================================= */

// Prices remain unconfirmed until supplied.
// Enter confirmed prices per metre here later.

const roofingPrices = {

    "box-profile": null,
    "tile-profile": null,
    "stone-coated": null,
    "corrugated": null,
    "industrial": null

};

const calcProduct = document.getElementById("calcProduct");

const decreaseMetres = document.getElementById("decreaseMetres");
const metreQuantity = document.getElementById("metreQuantity");
const increaseMetres = document.getElementById("increaseMetres");

const pricePerMetre = document.getElementById("pricePerMetre");
const estimatedTotal = document.getElementById("estimatedTotal");

let selectedMetres = 2;


// Format Kenyan currency

function formatCurrency(amount) {

    return new Intl.NumberFormat("en-KE", {

        style: "currency",
        currency: "KES",
        maximumFractionDigits: 2

    }).format(amount);

}


// Get selected product price

function getSelectedPrice() {

    if (!calcProduct) return null;

    const selectedValue = calcProduct.value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    if (
        Object.prototype.hasOwnProperty.call(
            roofingPrices,
            selectedValue
        )
    ) {

        return roofingPrices[selectedValue];

    }

    return null;

}


// Update calculator display

function updateCalculator() {

    const price = getSelectedPrice();

    // Display selected metres

    if (metreQuantity) {

        if (metreQuantity.tagName === "INPUT") {

            metreQuantity.value = selectedMetres;

        } else {

            metreQuantity.textContent = selectedMetres;

        }

    }

    // Display price per metre

    if (pricePerMetre) {

        pricePerMetre.textContent =
            price === null
                ? "To be confirmed"
                : formatCurrency(price);

    }

    // Display estimated total

    if (estimatedTotal) {

        estimatedTotal.textContent =
            price === null
                ? "Price to be confirmed"
                : formatCurrency(selectedMetres * price);

    }

}


// Decrease metres

if (decreaseMetres) {

    decreaseMetres.addEventListener("click", () => {

        if (selectedMetres > 1) {

            selectedMetres--;

            updateCalculator();

        }

    });

}


// Increase metres

if (increaseMetres) {

    increaseMetres.addEventListener("click", () => {

        selectedMetres++;

        updateCalculator();

    });

}


// Update when product changes

if (calcProduct) {

    calcProduct.addEventListener("change", updateCalculator);

}


// Initialise calculator

updateCalculator();


/* =========================================
   6. FAQ INTERACTION
========================================= */

// HTML details elements open and close automatically.
// This section ensures only one FAQ is open at a time.

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

        if (item.open) {

            faqItems.forEach(otherItem => {

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

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

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

document.addEventListener("DOMContentLoaded", () => {

    console.log("MABATI ROLLING MILLS website loaded.");

    console.log("WhatsApp contact:", WHATSAPP_NUMBER);

    console.log("Hero slides found:", heroSlides.length);

    console.log("FAQ items found:", faqItems.length);

});
