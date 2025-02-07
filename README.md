# HVNT Pricing Calculator

A dynamic pricing calculator that allows users to calculate costs based on the number of players and selected currency. Web admins can update the pricing tiers and currencies through the webflow CMS.

## Quick Start

1. Clone the repository
2. Open `/pricing` in your web browser
3. To modify pricing tiers, update the data attributes in the HTML for each currency button

## Features

- Dynamic slider for selecting number of players (5-250)
- Multiple currency support (EUR, USD, GBP) with automatic flag display
- Three-tiered pricing system based on player count
- Monthly/Yearly pricing toggle with active state indicators
- Responsive price calculations
- Automatic switch to contact form at maximum player count

## Technical Implementation

### Price Calculation Logic

The calculator determines prices based on three player ranges, pulling rates from currency button data attributes:

```javascript
// Price calculation logic
if (players <= 10) {
  price = data - price - 1 - 10;
} else if (players <= 50) {
  price = data - price - 11 - 50;
} else {
  price = data - price - above - 50;
}

final_price = price * players;
```

### Currency Handling

- Supports multiple currencies through data attributes
- Uses `Intl.NumberFormat` for locale-specific currency formatting
- Integrates with FlagCDN for currency flag display (20x15px, with 2x support)
- Special country code handling for EUR, USD, and GBP

Configuration example:

```javascript
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: selectedCurrency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
```

### UI Components

1. **Slider**

   - Range: 5-250 players (configurable via HTML attributes)
   - Dynamic fill effect using CSS custom properties
   - Real-time price updates
   - Toggles between "Create Account" and "Contact Us" buttons at max value

2. **Currency Selection**

   - Currency buttons with data attributes for pricing tiers
   - Active state indication
   - Automatic flag image loading from FlagCDN
   - Data attributes required:
     - `data-currency`: Currency code (e.g., "EUR")
     - `data-price-1-10`: Rate for 1-10 players
     - `data-price-11-50`: Rate for 11-50 players
     - `data-price-above-50`: Rate for 50+ players
     - `monthly-price-original`: Original monthly price
     - `monthly-price-offer`: Offer monthly price
     - `yearly-price-original`: Original yearly price
     - `yearly-price-offer`: Offer yearly price

3. **Price Display**
   - Monthly/Yearly toggle with active state
   - Original and offer prices for both periods
   - Currency-specific formatting
   - Automatic updates on currency change

## Required HTML Elements

```html
<!-- Slider elements -->
<input type="range" class="input_range" min="5" max="250" />
<span id="value"><!-- Player count --></span>
<span id="cost"><!-- Calculated price --></span>

<!-- Buttons -->
<button id="create-account">Create Account</button>
<button id="contact-us">Contact Us</button>

<!-- Price toggle -->
<button id="monthly">Monthly</button>
<button id="yearly">Yearly</button>
<div id="monthly-price"><!-- Monthly price content --></div>
<div id="yearly-price"><!-- Yearly price content --></div>

<!-- Currency buttons -->
<button data-currency="EUR" data-price-1-10="10" ...>
  <img src="" alt="EUR flag" />
</button>
```

## Dependencies

- FlagCDN: Used for currency flag images
  - Base URL: `https://flagcdn.com/20x15/`
  - High-DPI URL: `https://flagcdn.com/40x30/`
  - Supported country codes: lowercase two-letter codes

## Common Issues & Solutions

1. **Prices not displaying:**

   - Verify all required data attributes on currency buttons
   - Check browser console for JavaScript errors
   - Ensure HTML elements match expected IDs and classes

2. **Currency flags not loading:**
   - Check network connectivity
   - Verify country codes in `getCurrencyCountryCode()` function
   - Ensure currency codes match special cases (EUR, USD, GBP)

## Local Development

1. Clone the repository
2. Open in a browser - no build process required
3. Modify currency button data attributes to test different pricing tiers

## Project Structure

```
/
├── pricing/              # Main application directory
│   ├── index.html       # Main HTML file
│   ├── slider.js        # Slider functionality
│   ├── price-display.js # Price display logic
│   └── business-plan.js # Business plan component
├── script.js            # Core JavaScript functionality
└── .gitignore          # Git ignore configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## CMS Updates (for Web Admins)

1. Log into Webflow CMS
2. Navigate to "Pricing Tiers"
3. Update values as needed
4. Publish changes

## Support

For technical issues:

- Open a GitHub issue
- Contact: [Your contact information]

For pricing inquiries:

- Use the contact form within the calculator
