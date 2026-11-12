"""Programmatic SEO generator for QuickPercent.

Generates standalone static landing pages for high-volume percentage and financial calculator queries.
All output is pure static HTML with Schema.org JSON-LD and zero runtime dependencies.
"""
import os
import json

BASE_URL = "https://quickpercent.othrys.be"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_CALCS = os.path.join(ROOT, "public", "calculators")

PAGES = [
    {
        "slug": "percentage-increase-calculator",
        "mode": "2",
        "a_default": "100",
        "b_default": "125",
        "title": "Percentage Increase Calculator - Calculate % Growth Online Free",
        "meta_desc": "Calculate percentage increase between two numbers instantly. Free in-browser percentage growth calculator with step-by-step formula and zero tracking cookies.",
        "h1": "Percentage Increase Calculator",
        "subtitle": "Calculate percentage growth and relative increase between an initial and final value with instant mathematical accuracy.",
        "badge": "Growth & Variance Tool",
        "formula": "Percentage Increase = ((Final Value - Initial Value) / Initial Value) × 100%",
        "example": "If your revenue grew from $100,000 to $125,000: ((125,000 - 100,000) / 100,000) × 100% = +25.0% increase.",
        "faqs": [
            {
                "q": "How is percentage increase calculated?",
                "a": "Subtract the original value from the new value, divide the difference by the original value, and multiply by 100. If the result is positive, it represents an increase."
            },
            {
                "q": "Can the original value be negative or zero?",
                "a": "In strict mathematics, percentage change from zero is undefined because division by zero is mathematically impossible. A positive baseline is required."
            },
            {
                "q": "Is my calculation saved or tracked?",
                "a": "No. QuickPercent is 100% client-side and sovereign. All calculations happen inside your browser memory with zero tracking cookies and zero third-party analytics."
            }
        ],
        "use_cases": [
            "Calculating salary raises, bonuses, and compensation growth",
            "Measuring year-over-year (YoY) business revenue and profit increases",
            "Tracking investment portfolio and stock appreciation",
            "Analyzing website traffic and subscriber growth rates"
        ]
    },
    {
        "slug": "percentage-decrease-calculator",
        "mode": "2",
        "a_default": "200",
        "b_default": "150",
        "title": "Percentage Decrease Calculator - Calculate % Reduction Online Free",
        "meta_desc": "Calculate percentage decrease between two numbers online for free. Clear formula, step-by-step working, and zero third-party trackers.",
        "h1": "Percentage Decrease Calculator",
        "subtitle": "Determine the exact percentage reduction or drop from an original number to a lower value.",
        "badge": "Reduction & Loss Tool",
        "formula": "Percentage Decrease = ((Original Value - New Value) / Original Value) × 100%",
        "example": "If a product price dropped from $200 to $150: ((200 - 150) / 200) × 100% = 25.0% decrease (-25.0% change).",
        "faqs": [
            {
                "q": "What is the difference between percentage decrease and negative change?",
                "a": "Percentage decrease is expressed as a positive percentage indicating how much was lost (e.g., 'a 25% decrease'), while percentage change is expressed with a negative sign (e.g., '-25%'). Both refer to the same mathematical variance."
            },
            {
                "q": "How do I calculate a price markdown?",
                "a": "Enter the original price as Value A and the clearance price as Value B. The percentage change will show the exact markdown percentage."
            }
        ],
        "use_cases": [
            "Calculating weight loss or body fat percentage reductions",
            "Tracking budget cuts and operating cost reductions",
            "Analyzing retail price reductions and clearance markdowns",
            "Monitoring decrease in defect rates or server latency"
        ]
    },
    {
        "slug": "discount-calculator",
        "mode": "3",
        "a_default": "80",
        "b_default": "25",
        "title": "Discount Calculator - Calculate Sale Price & Money Saved Free",
        "meta_desc": "Calculate sales discounts, clearance markdowns, and final prices with tax. Free client-side discount calculator with instant savings breakdown.",
        "h1": "Shopping Discount & Sale Price Calculator",
        "subtitle": "Quickly determine how much you save on retail sales, coupons, and clearance items with optional sales tax.",
        "badge": "Retail Shopping Tool",
        "formula": "Savings = Original Price × (Discount % / 100) | Final Price = (Original Price - Savings) × (1 + Tax % / 100)",
        "example": "An $80 jacket with a 25% discount saves $20.00, resulting in a sale price of $60.00 (or $64.80 with 8% sales tax).",
        "faqs": [
            {
                "q": "How do I calculate a 30% discount in my head?",
                "a": "Find 10% of the price by moving the decimal point one place to the left, multiply by 3, and subtract that amount from the original price."
            },
            {
                "q": "Does this calculator support local sales tax?",
                "a": "Yes! Enter your city or state sales tax percentage to see both the discounted subtotal and the final out-of-pocket register total."
            }
        ],
        "use_cases": [
            "Black Friday, Cyber Monday, and seasonal clearance shopping",
            "Applying promotional discount codes and coupons",
            "Calculating wholesale trade and supplier discounts",
            "Estimating final purchases with variable regional sales tax"
        ]
    },
    {
        "slug": "tip-calculator",
        "mode": "0",
        "a_default": "18",
        "b_default": "75",
        "title": "Tip Calculator - Calculate Restaurant Gratuity & Bill Split Free",
        "meta_desc": "Calculate restaurant tip amounts (15%, 18%, 20%) and total bill costs quickly. Free in-browser tip calculator with zero ads and zero tracking cookies.",
        "h1": "Tip & Gratuity Calculator",
        "subtitle": "Calculate fair tipping amounts for dining, delivery, taxi, and hospitality services in seconds.",
        "badge": "Dining & Gratuity Tool",
        "formula": "Tip Amount = Bill Total × (Tip % / 100) | Total Bill = Bill Total + Tip Amount",
        "example": "On a $75.00 dining bill, an 18% tip is $13.50, bringing the total payment to $88.50.",
        "faqs": [
            {
                "q": "What is the standard tip percentage in the United States?",
                "a": "Standard tipping in US restaurants typically ranges from 15% (adequate service), 18% (good service), to 20%+ (exceptional service)."
            },
            {
                "q": "Should tips be calculated before or after tax?",
                "a": "Etiquette guides generally recommend calculating the tip based on the pre-tax food and beverage subtotal, though tipping on the post-tax total is also widely practiced."
            }
        ],
        "use_cases": [
            "Splitting restaurant and bar bills fairly among friends",
            "Calculating food delivery (DoorDash, UberEats) driver tips",
            "Tipping hair stylists, taxi drivers, and hotel staff",
            "Expense reporting for business travel meals"
        ]
    },
    {
        "slug": "percentage-of-a-number-calculator",
        "mode": "0",
        "a_default": "15",
        "b_default": "250",
        "title": "Percentage of a Number Calculator - What is X% of Y? Free",
        "meta_desc": "Calculate what is X percent of any number. Fast, accurate, and completely client-side percentage calculator with zero third-party telemetry.",
        "h1": "Percentage of a Number Calculator",
        "subtitle": "Answer the question: 'What is X% of Y?' instantly for any number, fraction, or financial amount.",
        "badge": "Core Percentage Tool",
        "formula": "Result = (X / 100) × Y",
        "example": "What is 15% of 250? (15 / 100) × 250 = 37.5.",
        "faqs": [
            {
                "q": "How do you find a percentage of a number without a calculator?",
                "a": "Convert the percentage to a decimal by dividing by 100 (e.g. 15% = 0.15) and multiply by the target number (0.15 × 250 = 37.5)."
            },
            {
                "q": "Can I calculate percentages greater than 100%?",
                "a": "Yes! For example, 150% of 80 is (1.50 × 80) = 120. QuickPercent supports values up to ±1 trillion."
            }
        ],
        "use_cases": [
            "Calculating down payments (e.g. 20% on a mortgage)",
            "Calculating commission earnings on sales contracts",
            "Determining test and exam grade weights",
            "Nutritional daily value (DV%) calculations"
        ]
    },
    {
        "slug": "fraction-to-percentage-calculator",
        "mode": "1",
        "a_default": "18",
        "b_default": "24",
        "title": "Fraction to Percentage Calculator - Convert Part of Whole Online Free",
        "meta_desc": "Convert any fraction, score, or part-to-whole ratio into an exact percentage. Free in-browser math calculator with zero tracking cookies.",
        "h1": "Fraction & Part-to-Whole Percentage Calculator",
        "subtitle": "Convert test scores, fractions, and proportions into clear, clean percentage figures.",
        "badge": "Proportion & Ratio Tool",
        "formula": "Percentage = (Part / Whole) × 100%",
        "example": "A score of 18 correct answers out of 24 questions: (18 / 24) × 100% = 75.0%.",
        "faqs": [
            {
                "q": "How do you turn a fraction into a percentage?",
                "a": "Divide the numerator (top number) by the denominator (bottom number) to get a decimal, then multiply by 100 to get the percentage."
            },
            {
                "q": "What happens if the denominator is 0?",
                "a": "Division by zero is mathematically undefined. QuickPercent will prompt you to enter a nonzero total."
            }
        ],
        "use_cases": [
            "Calculating test scores and academic grading percentages",
            "Survey results (e.g., 42 out of 60 respondents agreed = 70%)",
            "Project completion and milestone tracking",
            "Polls, voter turnout, and sample statistical proportions"
        ]
    },
    {
        "slug": "percentage-difference-calculator",
        "mode": "2",
        "a_default": "50",
        "b_default": "70",
        "title": "Percentage Difference Calculator - Compare Two Numbers Free",
        "meta_desc": "Calculate the percentage difference between two independent numbers. Free online calculator with step-by-step formula and zero tracking cookies.",
        "h1": "Percentage Difference Calculator",
        "subtitle": "Compare two positive numbers and calculate their relative percentage variance in seconds.",
        "badge": "Variance Comparison Tool",
        "formula": "Percentage Difference = (|Value A - Value B| / ((Value A + Value B) / 2)) × 100%",
        "example": "Between 50 and 70, the absolute difference is 20 and average is 60: (20 / 60) × 100% = 33.33% difference.",
        "faqs": [
            {
                "q": "What is the difference between percentage change and percentage difference?",
                "a": "Percentage change has a directional starting point (from A to B). Percentage difference compares two values where neither is explicitly the 'original' baseline."
            },
            {
                "q": "Can I copy the formula result to my clipboard?",
                "a": "Yes! QuickPercent includes a one-click 'Copy shareable link' and result copy button."
            }
        ],
        "use_cases": [
            "Scientific experiment measurement discrepancies",
            "Benchmarking competing product prices",
            "Comparing speed, latency, or energy efficiency between two models",
            "Quality assurance calibration tolerances"
        ]
    },
    {
        "slug": "sales-tax-calculator",
        "mode": "3",
        "a_default": "150",
        "b_default": "0",
        "title": "Sales Tax Calculator - Calculate Total Cost with Tax Online Free",
        "meta_desc": "Calculate sales tax amount and final purchase price online for free. Clean in-browser calculator for retail, invoices, and budgeting.",
        "h1": "Sales Tax & VAT Calculator",
        "subtitle": "Determine the exact sales tax amount and gross total for any purchase, invoice, or retail transaction.",
        "badge": "Tax & Invoice Tool",
        "formula": "Tax Amount = Pre-Tax Price × (Tax Rate % / 100) | Final Total = Pre-Tax Price + Tax Amount",
        "example": "A $150.00 purchase with an 8.25% sales tax incurs $12.38 in tax, for a total of $162.38.",
        "faqs": [
            {
                "q": "How do you calculate sales tax backward from a total price?",
                "a": "To find the pre-tax price from a tax-inclusive total, divide the total by (1 + Tax Rate / 100). For example, $108 with 8% tax: $108 / 1.08 = $100."
            },
            {
                "q": "Are calculations private?",
                "a": "Yes, QuickPercent runs 100% client-side with zero network requests and zero cookies."
            }
        ],
        "use_cases": [
            "Estimating final retail checkout costs before paying",
            "Freelance and business invoice preparation",
            "Calculating VAT (Value Added Tax) on European goods",
            "Expense reimbursement receipts verification"
        ]
    }
]

HTML_TEMPLATE = """<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="theme-color" content="#18181b"/>
  <title>{title} | QuickPercent</title>
  <meta name="description" content="{meta_desc}"/>
  <meta name="robots" content="index,follow,max-image-preview:large"/>
  <link rel="canonical" href="{canonical}"/>
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg"/>
  <style>
    :root {{
      --primary: #f59e0b;
      --primary-hover: #d97706;
      --bg: #09090b;
      --card-bg: #18181b;
      --text: #fafafa;
      --text-muted: #a1a1aa;
      --border: #27272a;
      --radius: 12px;
    }}
    * {{ box-sizing: border-box; }}
    body {{
      margin: 0;
      background: var(--bg);
      color: var(--text);
      font: 16px/1.6 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }}
    .container {{
      max-width: 820px;
      margin: 4vh auto;
      padding: 0 20px;
    }}
    header {{
      text-align: center;
      margin-bottom: 32px;
    }}
    .badge {{
      display: inline-block;
      background: rgba(245, 158, 11, 0.15);
      color: #fbbf24;
      font-size: 13px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 999px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1px solid rgba(245, 158, 11, 0.3);
    }}
    h1 {{
      font-size: clamp(26px, 4.5vw, 40px);
      line-height: 1.2;
      margin: 0 0 14px 0;
      color: #ffffff;
    }}
    .subtitle {{
      font-size: 18px;
      color: var(--text-muted);
      margin: 0 0 24px 0;
    }}
    .cta-box {{
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 32px 24px;
      text-align: center;
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      margin-bottom: 36px;
    }}
    .start-button {{
      display: inline-block;
      background: var(--primary);
      color: #000000;
      font-size: 18px;
      font-weight: 700;
      padding: 16px 36px;
      border-radius: 8px;
      text-decoration: none;
      transition: background 0.15s ease-in-out, transform 0.1s ease;
    }}
    .start-button:hover {{
      background: var(--primary-hover);
      transform: translateY(-1px);
    }}
    .guarantees {{
      margin-top: 16px;
      font-size: 14px;
      color: var(--text-muted);
    }}
    .content-card {{
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px;
      margin-bottom: 24px;
    }}
    h2, h3 {{ color: #ffffff; margin-top: 0; }}
    ul, ol {{ padding-left: 20px; }}
    li {{ margin-bottom: 8px; color: var(--text-muted); }}
    li strong {{ color: var(--text); }}
    .formula-box {{
      background: #27272a;
      border-left: 4px solid var(--primary);
      padding: 16px;
      border-radius: 0 var(--radius) var(--radius) 0;
      margin: 20px 0;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 15px;
      color: #fef08a;
    }}
    .example-box {{
      background: rgba(245, 158, 11, 0.08);
      border: 1px dashed rgba(245, 158, 11, 0.3);
      padding: 16px;
      border-radius: var(--radius);
      margin: 16px 0;
      font-size: 15px;
      color: #fde68a;
    }}
    .faq-item {{
      border-bottom: 1px solid var(--border);
      padding: 14px 0;
    }}
    .faq-item summary {{
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      color: #ffffff;
    }}
    .faq-item p {{
      margin: 10px 0 0 0;
      color: var(--text-muted);
    }}
    footer {{
      text-align: center;
      padding: 32px 0;
      font-size: 14px;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      margin-top: 40px;
    }}
    footer a {{ color: #fbbf24; text-decoration: none; margin: 0 8px; }}
    footer a:hover {{ text-decoration: underline; }}
  </style>
  <script type="application/ld+json">
  {schema_json}
  </script>
</head>
<body>
  <div class="container">
    <header>
      <span class="badge">{badge}</span>
      <h1>{h1}</h1>
      <p class="subtitle">{subtitle}</p>
    </header>

    <div class="cta-box">
      <a href="/?mode={mode}&a={a_default}&b={b_default}" class="start-button">
        Open Interactive Calculator ↗
      </a>
      <div class="guarantees">
        ⚡ Instant Calculations · 🔒 Zero Cookies · 🆓 100% Free Forever
      </div>
    </div>

    <div class="content-card">
      <h2>Mathematical Formula</h2>
      <div class="formula-box">{formula}</div>
      <h3>Step-by-Step Example</h3>
      <div class="example-box">{example}</div>
    </div>

    <div class="content-card">
      <h2>Common Use Cases</h2>
      <ul>
        {use_cases_html}
      </ul>
    </div>

    <div class="content-card">
      <h2>Frequently Asked Questions</h2>
      {faqs_html}
    </div>

    <footer>
      <div>
        <a href="/">QuickPercent Home</a> ·
        <a href="https://shrinkmyphoto.othrys.be">ShrinkMyPhoto</a> ·
        <a href="https://freeqr.othrys.be">FreeQR</a> ·
        <a href="https://unixtime.othrys.be">UnixTime</a> ·
        <a href="https://vintagetoycatalog.com">Vintage Toy Catalog</a>
      </div>
      <p style="margin-top: 12px;">© 2026 OTHRYS. Built to be useful, private, and durable.</p>
    </footer>
  </div>
</body>
</html>"""

def generate():
    os.makedirs(PUBLIC_CALCS, exist_ok=True)
    sitemap_urls = []

    for page in PAGES:
        slug_dir = os.path.join(PUBLIC_CALCS, page["slug"])
        os.makedirs(slug_dir, exist_ok=True)
        canonical = f"{BASE_URL}/calculators/{page['slug']}/"
        sitemap_urls.append(canonical)

        use_cases_html = "\n        ".join(f"<li><strong>{uc}</strong></li>" for uc in page["use_cases"])
        faqs_html = "\n      ".join(
            f'<details class="faq-item"><summary>{faq["q"]}</summary><p>{faq["a"]}</p></details>'
            for faq in page["faqs"]
        )

        schema = {
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebApplication",
                    "name": page["title"],
                    "applicationCategory": "EducationalApplication",
                    "operatingSystem": "Any modern web browser",
                    "url": canonical,
                    "description": page["meta_desc"],
                    "offers": {"@type": "Offer", "price": "0", "priceCurrency": "EUR"},
                    "isAccessibleForFree": True,
                    "featureList": [
                        page["h1"],
                        "Pure client-side math calculations",
                        "Zero tracking cookies & zero server storage",
                        "High-precision floating point validation"
                    ]
                },
                {
                    "@type": "FAQPage",
                    "mainEntity": [
                        {
                            "@type": "Question",
                            "name": faq["q"],
                            "acceptedAnswer": {"@type": "Answer", "text": faq["a"]}
                        }
                        for faq in page["faqs"]
                    ]
                }
            ]
        }

        html = HTML_TEMPLATE.format(
            title=page["title"],
            meta_desc=page["meta_desc"],
            canonical=canonical,
            badge=page["badge"],
            h1=page["h1"],
            subtitle=page["subtitle"],
            mode=page["mode"],
            a_default=page["a_default"],
            b_default=page["b_default"],
            formula=page["formula"],
            example=page["example"],
            use_cases_html=use_cases_html,
            faqs_html=faqs_html,
            schema_json=json.dumps(schema, indent=2)
        )

        file_path = os.path.join(slug_dir, "index.html")
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"Generated {file_path}")

    # Generate sitemap-calculators.xml
    sitemap_content = ['<?xml version="1.0" encoding="UTF-8"?>',
                       '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url in sitemap_urls:
        sitemap_content.append(f"  <url><loc>{url}</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>")
    sitemap_content.append('</urlset>')

    sitemap_path = os.path.join(ROOT, "public", "sitemap-calculators.xml")
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write("\n".join(sitemap_content))
    print(f"Generated {sitemap_path}")

    # Update sitemap.xml to be a sitemap index
    index_sitemap = f'''<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>{BASE_URL}/sitemap-core.xml</loc></sitemap>
  <sitemap><loc>{BASE_URL}/sitemap-calculators.xml</loc></sitemap>
</sitemapindex>'''

    core_sitemap = f'''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>{BASE_URL}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>'''

    with open(os.path.join(ROOT, "public", "sitemap-core.xml"), "w", encoding="utf-8") as f:
        f.write(core_sitemap)
    with open(os.path.join(ROOT, "public", "sitemap.xml"), "w", encoding="utf-8") as f:
        f.write(index_sitemap)
    print("Updated sitemap.xml to sitemapindex with sitemap-core.xml & sitemap-calculators.xml")

if __name__ == "__main__":
    generate()
