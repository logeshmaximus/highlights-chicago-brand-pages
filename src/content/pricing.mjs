// Variable prices for brand service pages, from the user's permit and cost sheet
// (C:\HCHICAGO\Highlights Chicago — Chicago Permit & Building Data.xlsx, tab "1 Costs").
// Each value is the median reported construction value on City of Chicago electrical permits,
// Aug 2024 to Aug 2026: not a quote and not what a client pays. Only categories with 100+ costed
// permits get a value; a missing key renders as "Price pending".
export const PRICING = {
  generac: { install: '$15,000' }, // Generator: 161 permits, 161 with a cost
};
