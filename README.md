# HVNT Pricing Calculator

A dynamic pricing calculator that allows users to calculate costs based on the number of players and selected currency.

## Features

- Dynamic slider for selecting number of players (5-250)
- Multiple currency support with automatic flag display
- Tiered pricing system based on player count
- Monthly/Yearly pricing toggle
- Responsive price calculations
- Contact form display for maximum player count

## Technical Implementation

### Price Calculation

The calculator uses three pricing tiers:

- 1-10 players
- 11-50 players
- 50+ players

### Currency Handling

- Supports multiple currencies (EUR, USD, GBP, etc.)
- Uses Intl.NumberFormat for proper currency formatting
- Integrates with FlagCDN for currency flag display

### UI Components

1. **Slider**

   - Range: 5-250 players
   - Dynamic fill effect
   - Real-time price updates

2. **Price Display**

   - Monthly/Yearly toggle
   - Original and offer prices
   - Currency-specific formatting

3. **Business Plan Display**
   - Toggleable monthly/yearly views
   - Automatic price updates based on currency selection

## File Structure

- `script.js` - Main JavaScript functionality
- `index.html` - Main HTML structure
- `.gitignore` - Git ignore configuration

## Dependencies

- FlagCDN for currency flag images
