
/* =========================================
   MRM ROOFING PRODUCTS WEBSITE
   Main JavaScript
========================================= */

// MRM WHATSAPP CONTACT
const WHATSAPP_NUMBER = "254756393875";

// Approved WhatsApp enquiry message
const WHATSAPP_MESSAGE = `Hello MRM Team,

I hope you are doing well. I am interested in placing an order for your roofing products. Kindly assist me with the available products, pricing and ordering process.

Thank you. I look forward to your response.`;


/* =========================================
   1. MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active");

        const isOpen = mainNav.classList.contains("active");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu after selecting a navigation link
    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================================
   2. WHATSAPP ENQUIRY BUTTONS
========================================= */

const whatsappLink =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

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
   3. ROOFING CALCULATOR
========================================= */

// Prices will be added when confirmed.
// Do not enter estimated or unverified prices.

const roofingPrices = {
    "box-profile": null,
    "tile-profile": null,
    "stone-coated": null,
    "corrugated": null,
    "industrial": null,
    "polycarbonate": null
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
    if (!calcProduct) return null;

    const selectedValue = calcProduct.value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    return Object.prototype.hasOwnProperty.call(roofingPrices, selectedValue)
        ? roofingPrices[selectedValue]
        : null;
}

function updateCalculator() {
    const price = getSelectedPrice();

    // Display the selected metres
    if (metreQuantity) {
        if (metreQuantity.tagName === "INPUT") {
            metreQuantity.value = selectedMetres;
        } else {
            metreQuantity.textContent = selectedMetres;
        }
    }

    // Display price per metre and estimated total
    if (pricePerMetre) {
        pricePerMetre.textContent = price === null
            ? "To be confirmed"
            : formatCurrency(price);
    }

    if (estimatedTotal) {
        estimatedTotal.textContent = price === null
            ? "Price to be confirmed"
            : formatCurrency(selectedMetres * price);
    }
}

// Reduce metres, minimum 1 metre
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

// Update when a different roofing product is selected
if (calcProduct) {
    calcProduct.addEventListener("change", updateCalculator);
}

// Start calculator at 2 metres
updateCalculator();


/* =========================================
   4. FOOTER YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   5. SMOOTH NAVIGATION
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
   6. INITIALISE WEBSITE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    console.log("MRM Roofing Products website loaded.");
    console.log("WhatsApp contact:", WHATSAPP_NUMBER);
});
