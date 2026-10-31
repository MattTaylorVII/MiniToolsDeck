# MiniToolsDeck — ProfitLeak Intelligence™
## Phase 01 — Financial Foundation & Contribution Engine (REVIEW BUILD)

**Status:** Ready for user review. Not a production release. The final Master File was not modified or deployed.

### Approved Product Thesis
ProfitLeak Intelligence™ is a privacy-first profit diagnostics and growth decision engine. The product must help a merchant or marketer (1) assemble defensible numbers, (2) discover costly problems, (3) model proposed decisions, and (4) establish evidence-backed actions. Never claim a causal lift, predictive accuracy, or verified return on ad spend from transaction and channel labels alone.

### Phased Build Roadmap

**Phase 01 — Financial Foundation (this build)**
- Separate drag-and-drop CSV ingestion for transactions and marketing spend with adjustable field mappings, duplicate order detection, manual entry and downloadable templates.
- Accurate gross / net / direct cost / ad spend / period cost accounting waterfall, channel contribution, currency display labels (no FX conversion), and data coverage checks.
- Initial rule-based profit signals, downloadable breakdown CSV and JSON report, self-contained review preview and clean UX.

**Phase 02 — Profit Leak Intelligence**
- Richer diagnostics by product, channel, cohort, refund category and period, depending on available data.
- Data freshness, historical comparisons, reliable spend-to-order matching, attribution limitations, missing-cost severity, impact quantification and transparent confidence scores.
- Duplicate refund/order handling, tax inclusive/exclusive distinctions, returns reconciliation, order-line aggregation, mixed currency warnings, cross-period checks.

**Phase 03 — Growth Decision Simulator**
- Scenario baselines, explicit price / cost / discount / fulfillment / ad-efficiency / refund assumptions, margin guardrails, break-even sensitivity and conservative/base/optimistic bands.
- Scenario comparisons, contribution changes, threshold sensitivity, assumptions editing, and visual charts. No unsubstantiated causal forecasts.

**Phase 04 — Action Planner & Professional Reporting**
- Ranked high-confidence experiments and next actions linked to supporting evidence, data gaps, expected scenario range, recommended metrics and validation methods.
- Report-ready dashboards, multi-section printable reports, exports, session save/reopen, optional comparison to prior sessions.

**Phase 05 — Reliability, Integration & Release Sign-off**
- Realistic financial datasets, independent calculation verification, XSS/CSV-injection security tests, Chrome/Safari/Firefox, desktop/mobile, screen readers and keyboard focus, large-file stress, accessibility, error handling, performance, privacy claims.
- Match site design, footer, personalized privacy banner, header, consistent theme control; final home spotlight image and legal/founder pages happen *after* tool approval per user's final roadmap.

### Financial Math in Phase 01
- Net sales = gross sales − discounts − refunds.
- Pre-marketing contribution = net sales − cost of goods − fulfillment/shipping − transaction fees.
- Contribution after advertising = pre-marketing contribution − reported ad spend.
- Modeled profit = contribution after advertising − additional period operating costs.
- Contribution margin shown in the dashboard = contribution after ads ÷ net sales.
- **Caution:** Modeled profit is not audited GAAP/IFRS net income. Missing costs may inflate estimates. Matching channel names does not prove attribution or incremental sales.

### Validation Completed
- Browser-injected HTML + same application JavaScript tested in Chromium at 1440px desktop and 390px mobile.
- Demo math independently reconciles to net sales $87,750, ad spend $25,350 and modeled profit $10,605. Meta Ads channel has a negative contribution.
- Tested actual CSV imports with quoted commas and duplicate order IDs; separate spend upload; period costs, manual orders; JSON and CSV downloads with parsed results.
- No JavaScript runtime exceptions in those scenarios and no horizontal overflow at tested widths.
- Node syntax check and independent unit checks passed on CSV parsing, quoted fields, numeric conversion, formula constraints and channel aggregation.
- Static audit confirms 26 HTML routes (home plus 25 tool pages), all local script/style/image references present, and 25 homepage tool cards with one ProfitLeak card.
- Chrome test limitations: direct navigation to localhost and direct inline-script load were restricted by the test environment. The DOM and application logic were tested by injecting the same JavaScript after loading the preview document. Hosted and cross-browser tests are still required.

### Important Current Constraints
- Order file should contain **one order per row**, not individual SKU line items; duplicate IDs are rejected. Phase 02 will support better transaction aggregation.
- No automatic currency conversion. Use the same source currency for all uploaded numbers and choose the matching display currency.
- Date range matching, tax treatment, grouped product profit, scenario simulation, longer-horizon comparisons, workspace restore and client-ready reports are **not yet implemented**.
- The Phase 01 homepage card is for review only. Do not deploy over the final Master until all phases, homepage promo and legal pages are approved.
