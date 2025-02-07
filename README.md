# HVNT Pricing Calculator

A dynamic pricing calculator integrated with Webflow CMS.

## Development Setup

1. Clone the repository
2. Use a local server (e.g., live-server) to serve the project
3. Update script tag in /pricing before `</body>` tag in Webflow if necessary

```javascript
//update this if your local server uses a different port
loadScript("http://127.0.0.1:5500/script.js");
```

4. Enable development mode by pasting below in chrome console:

```javascript
toggleDevMode();
```

5. Refresh page and check console for `✅ Dev Mode Active`

## Dependencies

- Webflow CMS: Source of pricing data
- FlagCDN: Currency flag images
- jsDelivr: Script delivery

### Data Flow

1. Webflow CMS → HTML data attributes (via Collection List)
2. HTML data attributes → script.js
3. script.js → DOM updates based on:
   - Slider input changes
   - Currency selection
   - Monthly/Yearly toggle

## Required HTML, ID's and Data-Attributes

### Input slider

```html
<input type="range" class="input_range" min="5" max="250" />
```

ID to display the number of players and price per event.

- `#total-players`
- `#price-per-event`

### Currency buttons

> Currency buttons must live inside a Collection List.

Required Data-attributes, connect values to CMS data in webflow.

- `[data-currency]`
- `[data-price-1-10]`
- `[data-price-11-50]`
- `[data-price-above-50]`
- `[monthly-price-original]`
- `[monthly-price-offer]`
- `[yearly-price-original]`
- `[yearly-price-offer]`

Required class for the country flag `<img>` element.

- `.currency-flag`

### Example of a currency button, see webflow for more details.

```html
<button
  data-currency='{{wf {"path":"currency","type":"PlainText"\} }}'
  data-price-1-10='{{wf {"path":"monthly-price-offer","type":"PlainText"\} }}'
  data-price-11-50='{{wf {"path":"monthly-price","type":"PlainText"\} }}'
  data-price-above-50='{{wf {"path":"sek-price-50-players","type":"PlainText"\} }}'
  monthly-price-original='{{wf {"path":"monthly-price","type":"PlainText"\} }}'
  monthly-price-offer='{{wf {"path":"monthly-price-offer","type":"PlainText"\} }}'
  yearly-price-original='{{wf {"path":"yearly-price","type":"PlainText"\} }}'
  yearly-price-offer='{{wf {"path":"yearly-price-offer","type":"PlainText"\} }}'
  class="price_currency">
  <div class="p2 text-weight-medium">
    {{wf {"path":"currency","type":"PlainText"\} }}
  </div>
  <img class="currency-flag" />
</button>
```

### Monthly/Yearly toggle

```html
<button id="monthly" class="is-active">Monthly</button>
<button id="yearly">Yearly</button>
```

Elements with the following ID's will be toggled with `display: none` when monthly/yearly buttons are clicked.

- `monthly-price`
- `yearly-price`

Elements with the following ID's will display the price from the CMS.

- `monthly-price-text-original`
- `monthly-price-text-offer`
- `yearly-price-text-original`
- `yearly-price-text-offer`

### Price display

```html
<span id="value">Number of players will be displayed here</span>
<span id="cost">Price will be displayed here</span>
```

## Deployment Process

1. Test changes locally using development mode eg. `toggleDevMode();`
2. Push changes to GitHub repository
3. Update jsDelivr link if needed
4. Purge jsDelivr cache at [jsDelivr Purge Tool](https://www.jsdelivr.com/tools/purge)
5. Test on Webflow staging domain by untoggling development mode eg. `toggleDevMode();`

## Modifying the Calculator

### Common Modifications

1. **Pricing Tiers:**

   - Update calculation logic in `calculatePrice()` function
   - Modify data attributes in Webflow CMS
   - Test with various player counts

2. **Slider Configuration:**

   - Adjust min/max in HTML attributes
   - Modify step interval if needed
   - Update UI feedback in `updateUI()` function

3. **Adding New Currencies:**
   - Add currency to Webflow CMS
   - Update `getCurrencyCountryCode()` for special cases
   - Verify flag display and formatting

### Testing Changes

1. Test locally with development mode enabled on Webflow staging domain
2. Verify calculations manually
3. Check responsive behavior
4. Verify all currency options
5. Test edge cases (min/max players)

### Tips

- Use `console.log()` for error monitoring
- Check Network tab for FlagCDN requests
- Verify HTML data attributes in Elements panel
- Check webflow CMS fields are populated

### Potential Issues

2. **FlagCDN Issues:**
   - Default fallback image is provided
   - Check network connectivity
   - Verify country codes in `getCurrencyCountryCode()`

## Performance

The calculator is lightweight and performs calculations client-side. No known performance bottlenecks exist, but consider:

- Minimizing DOM updates
- Efficient event listener usage
- Browser compatibility (uses modern JS features)

## Future Improvements

Potential areas for enhancement:

- Additional error logging
- Enhanced FlagCDN error handling
- More sophisticated state management
- Additional pricing tiers

```

```
