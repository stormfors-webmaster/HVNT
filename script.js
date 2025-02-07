document.addEventListener("DOMContentLoaded", function () {
  // DOM element selections
  const numberOfPlayers = document.querySelector("#value");
  const price = document.querySelector("#cost");
  const input = document.querySelector(".input_range");
  const createAccountBtn = document.querySelector("#create-account");
  const contactUsBtn = document.querySelector("#contact-us");
  const currencyButtons = document.querySelectorAll("[data-currency]");

  // Price toggle elements
  const monthlyBtn = document.getElementById("monthly");
  const yearlyBtn = document.getElementById("yearly");
  const monthlyPrice = document.getElementById("monthly-price");
  const yearlyPrice = document.getElementById("yearly-price");

  // Default ISO 4217 currency code (EUR = Euro)
  let selectedCurrency = "EUR";

  // Hide yearly price by default
  yearlyPrice.style.display = "none";

  function calculatePrice(players, currency) {
    const selectedButton = document.querySelector(
      `[data-currency="${currency}"]`
    );
    let price;

    if (players <= 10) {
      price = parseInt(selectedButton.getAttribute("data-price-1-10"));
    } else if (players <= 50) {
      price = parseInt(selectedButton.getAttribute("data-price-11-50"));
    } else {
      price = parseInt(selectedButton.getAttribute("data-price-above-50"));
    }

    return price * players;
  }

  function updateTrackFill() {
    const min = input.getAttribute("min") || 5;
    const max = input.getAttribute("max") || 250;
    const currentValue = parseInt(input.value, 10);
    const fillPercentage = ((currentValue - min) / (max - min)) * 100;

    input.style.setProperty("--track-fill-percentage", fillPercentage + "%");
  }

  function updateUI(valueElement) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const players = parseInt(input.value);
    const calculatedPrice = calculatePrice(players, selectedCurrency);

    valueElement.textContent = players;
    price.textContent = formatter.format(calculatedPrice);
    updateTrackFill();
  }

  function updateBusinessPlanPrices(currency) {
    const selectedButton = document.querySelector(
      `[data-currency="${currency}"]`
    );
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    // Update all price elements with formatted values
    const priceElements = {
      "#monthly-price-text-original": "monthly-price-original",
      "#monthly-price-text-offer": "monthly-price-offer",
      "#yearly-price-text-original": "yearly-price-original",
      "#yearly-price-text-offer": "yearly-price-offer",
    };

    Object.entries(priceElements).forEach(([selector, attribute]) => {
      const price = selectedButton.getAttribute(attribute);
      document.querySelector(selector).textContent = formatter.format(price);
    });
  }

  function toggleButtons() {
    const isMaxPlayers =
      parseInt(input.value, 10) === parseInt(input.getAttribute("max"), 10);
    createAccountBtn.style.display = isMaxPlayers ? "none" : "block";
    contactUsBtn.style.display = isMaxPlayers ? "block" : "none";
  }

  function getCurrencyCountryCode(currencyCode) {
    // Special cases
    const specialCases = {
      EUR: "eu", // European Union
      USD: "us", // United States
      GBP: "gb", // United Kingdom
    };

    if (specialCases[currencyCode]) {
      return specialCases[currencyCode];
    }

    // For most currencies, the first two letters correspond to the country code
    // Convert to lowercase as Flagcdn expects lowercase country codes
    return currencyCode.slice(0, 2).toLowerCase();
  }

  function updateFlagImages() {
    const currencyButtons = document.querySelectorAll("[data-currency]");
    currencyButtons.forEach((button) => {
      const currency = button.getAttribute("data-currency");
      const countryCode = getCurrencyCountryCode(currency);

      if (countryCode) {
        const flagImg = button.querySelector("img");
        flagImg.src = `https://flagcdn.com/20x15/${countryCode}.png`;
        // Add support for high-DPI displays
        flagImg.srcset = `https://flagcdn.com/40x30/${countryCode}.png 2x`;
        flagImg.alt = `${currency} flag`;
      }
    });
  }

  // Event Listeners
  currencyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currencyButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      selectedCurrency = button.getAttribute("data-currency");
      updateUI(numberOfPlayers);
      updateBusinessPlanPrices(selectedCurrency);
    });
  });

  input.addEventListener("input", () => {
    updateUI(numberOfPlayers);
    toggleButtons();
  });

  // Price toggle event listeners
  monthlyBtn.addEventListener("click", function () {
    monthlyPrice.style.display = "flex";
    yearlyPrice.style.display = "none";

    // Toggle active state
    monthlyBtn.classList.add("is-active");
    yearlyBtn.classList.remove("is-active");
  });

  yearlyBtn.addEventListener("click", function () {
    monthlyPrice.style.display = "none";
    yearlyPrice.style.display = "flex";

    // Toggle active state
    yearlyBtn.classList.add("is-active");
    monthlyBtn.classList.remove("is-active");
  });

  // Initialize UI
  updateUI(numberOfPlayers);
  updateBusinessPlanPrices(selectedCurrency);
  toggleButtons();
  contactUsBtn.style.display = "none";
  document
    .querySelector(`[data-currency="${selectedCurrency}"]`)
    .classList.add("active");
  updateFlagImages();
});
