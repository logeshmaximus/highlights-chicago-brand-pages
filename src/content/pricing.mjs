// Variable prices for brand service pages, from the user's permit and cost sheet
// (C:\HCHICAGO\Highlights Chicago — Chicago Permit & Building Data.xlsx, tab "1 Costs").
// Each value is the median reported construction value on City of Chicago electrical permits,
// Aug 2024 to Aug 2026: not a quote and not what a client pays. Only categories with 100+ costed
// permits are used. The sheet has no row per Generac job, so each job takes the closest row;
// a missing key renders the pendingLabel fallback.
export const PRICING = {
  generac: {
    install: '$15,000', // Generator: 161 costed permits
    repairVisit: '$3,000', // 100 amp service: 2,189 (no repair row; smallest reliable median)
    ats: 'Typical $4,700', // 200 amp service upgrade: 2,862
    loadModules: 'Typical $4,000', // Electrical service / new service: 6,667
    replace: 'Typical $15,000', // Generator: 161
    battery: 'Typical $19,000', // Solar / photovoltaic $18,992: 4,022 (closest row for a battery)
    inlet: 'Typical $3,750', // Outlets / receptacles: 9,304
  },
};
