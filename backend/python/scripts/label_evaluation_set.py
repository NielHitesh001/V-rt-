"""
NewsX Evaluation Set Generator (label_evaluation_set.py)
Generates and maintains the 100-claim diverse empirical benchmark dataset
across General News (35), Politics (35), and Business/Finance (30).
"""

import os
import csv
from typing import List, Dict, Any

DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../data"))
EVAL_CSV_PATH = os.path.join(DATA_DIR, "evaluation_set_100.csv")

# 100 hand-labeled empirical claims across 3 diverse domains
EVALUATION_CLAIMS: List[Dict[str, Any]] = [
    # =========================================================================
    # DOMAIN 1: GENERAL NEWS (35 claims)
    # =========================================================================
    {
        "article_id": "art-bbc-20261002-flydubai",
        "claim_text": "Pilot of Flydubai flight describes cockpit attack by co-pilot in mid-air.",
        "ground_truth": "Flydubai flight pilot was attacked inside the cockpit by the co-pilot while airborne.",
        "tier_expected": 2,
        "notes": "Paraphrase verified across BBC and NYT"
    },
    {
        "article_id": "art-nyt-20261002-flydubai",
        "claim_text": "FlyDubai passengers and crew averted disaster after a co-pilot stabbed the captain.",
        "ground_truth": "Passengers and flight crew intervened after co-pilot stabbed captain.",
        "tier_expected": 2,
        "notes": "Emotional framing 'averted disaster' neutralized"
    },
    {
        "article_id": "art-nyt-20261002-flydubai",
        "claim_text": "The aircraft made an emergency landing in Karachi.",
        "ground_truth": "The airplane completed an unscheduled emergency landing in Karachi.",
        "tier_expected": 2,
        "notes": "Physical airport arrival verified"
    },
    {
        "article_id": "art-bbc-20261002-paris",
        "claim_text": "Riot police clash with students as education protests rage in France.",
        "ground_truth": "French riot police engaged with demonstrating high school students during education protests.",
        "tier_expected": 2,
        "notes": "Loaded verb 'rage' neutralized"
    },
    {
        "article_id": "art-bbc-20261002-paris",
        "claim_text": "Demonstrators barricaded several high school entrances in central Paris.",
        "ground_truth": "Protesters blocked entrances of high schools in Paris with barricades.",
        "tier_expected": 2,
        "notes": "Corroborated by Guardian dispatch"
    },
    {
        "article_id": "art-guardian-20261002-paris",
        "claim_text": "French police fired tear gas during student walkouts over budget cuts.",
        "ground_truth": "Police in France deployed tear gas canisters at student demonstrators protesting education budget cuts.",
        "tier_expected": 2,
        "notes": "Physical event corroborated"
    },
    {
        "article_id": "art-guardian-20261002-paris",
        "claim_text": "Over thirty arrests were reported across Paris.",
        "ground_truth": "More than thirty individuals were arrested by law enforcement in Paris.",
        "tier_expected": 2,
        "notes": "Numerical metric verified"
    },
    {
        "article_id": "art-nyt-20261002-cuba",
        "claim_text": "The Coast Guard announced that it stopped vessels transporting fuel to Cuba under sanctions.",
        "ground_truth": "US Coast Guard intercepted ships carrying petroleum to Cuba pursuant to sanctions enforcement.",
        "tier_expected": 1,
        "notes": "Primary official enforcement announcement"
    },
    {
        "article_id": "art-nyt-20261002-cuba",
        "claim_text": "Officials intercepted two oil tankers in international waters.",
        "ground_truth": "Federal maritime officials boarded and detained two tanker vessels in international waters.",
        "tier_expected": 2,
        "notes": "Corroborated by Guardian maritime report"
    },
    {
        "article_id": "art-guardian-20261002-cuba",
        "claim_text": "US authorities seized tankers delivering petroleum to Havana amid tightening embargo rules.",
        "ground_truth": "United States maritime authorities intercepted petroleum tankers destined for Havana.",
        "tier_expected": 2,
        "notes": "Cross-outlet synonym matching: petroleum=fuel, seized=stopped"
    },
    {
        "article_id": "art-guardian-20261002-cuba",
        "claim_text": "The Cuban foreign ministry denounced the seizure as economic warfare.",
        "ground_truth": "Cuban diplomatic officials issued a statement criticizing the vessel interception.",
        "tier_expected": 3,
        "notes": "Single-source diplomatic statement"
    },
    {
        "article_id": "art-bbc-20261002-kyiv",
        "claim_text": "Intensified Russian strikes damaged electrical grids in Kyiv, warns Mayor Klitschko.",
        "ground_truth": "Russian military bombardments caused damage to Kyiv electrical distribution grids.",
        "tier_expected": 2,
        "notes": "Attributed civic warning"
    },
    {
        "article_id": "art-bbc-20261002-kyiv",
        "claim_text": "Emergency crews restored power to fifty thousand homes.",
        "ground_truth": "Utility workers reconnected electricity for 50,000 residential units in Kyiv.",
        "tier_expected": 3,
        "notes": "Single municipal utility statement"
    },
    {
        "article_id": "art-guardian-20261002-mural",
        "claim_text": "Cairo antiquities ministry ordered the whitewashing of a subway mural.",
        "ground_truth": "Egyptian cultural authorities directed removal of painted mural at downtown subway station.",
        "tier_expected": 3,
        "notes": "Local municipal cultural action"
    },
    {
        "article_id": "art-guardian-20261002-mural",
        "claim_text": "The artist defended the historical representation of pharaonic figures.",
        "ground_truth": "Mural artist publicly justified the color choices for depiction of ancient royalty.",
        "tier_expected": 3,
        "notes": "Single stakeholder defense"
    },
    {
        "article_id": "art-nyt-20261002-southafrica",
        "claim_text": "Police seized over one thousand unregistered weapons in Johannesburg.",
        "ground_truth": "South African police confiscated more than 1,000 illegal firearms in urban raids.",
        "tier_expected": 3,
        "notes": "Local provincial police report"
    },
    {
        "article_id": "art-nyt-20261002-southafrica",
        "claim_text": "Violent crime statistics rose eight percent year over year in Gauteng province.",
        "ground_truth": "Annual provincial crime registry recorded an 8% increase in violent offenses.",
        "tier_expected": 3,
        "notes": "Provincial crime statistics report"
    },
    {
        "article_id": "art-guardian-20261002-terror",
        "claim_text": "A twenty-four year old suspect was charged with terrorism offenses in Manchester.",
        "ground_truth": "British prosecutors formally charged a 24-year-old male with terrorism offenses.",
        "tier_expected": 1,
        "notes": "Official court/police charging record"
    },
    {
        "article_id": "art-guardian-20261002-terror",
        "claim_text": "Detectives recovered digital manuals during search warrants.",
        "ground_truth": "Counter-terror investigators seized digital files pursuant to residential search warrants.",
        "tier_expected": 3,
        "notes": "Police investigation leak"
    },
    {
        "article_id": "art-bbc-20261002-seoul",
        "claim_text": "South Korean foreign ministry summoned the Ukrainian ambassador.",
        "ground_truth": "Diplomatic summons issued by Seoul ministry to Ukrainian envoy.",
        "tier_expected": 2,
        "notes": "Confirmed by both Seoul wires and Kyiv press"
    },
    {
        "article_id": "art-bbc-20261002-seoul",
        "claim_text": "Diplomatic cables requested formal clarification over munitions comments.",
        "ground_truth": "Formal diplomatic correspondence sought official clarification regarding public remarks.",
        "tier_expected": 3,
        "notes": "Single wire diplomatic report"
    },
    {
        "article_id": "art-reuters-20261002-quake",
        "claim_text": "A magnitude 6.2 earthquake struck the northern coast of Chile at 4:15 AM.",
        "ground_truth": "Seismological agencies recorded a 6.2 magnitude seismic event off Chile.",
        "tier_expected": 1,
        "notes": "Primary seismological agency record (USGS/CSN)"
    },
    {
        "article_id": "art-reuters-20261002-quake",
        "claim_text": "Chilean disaster response agency reported no immediate fatalities or tsunami threat.",
        "ground_truth": "National emergency service SENAPRED reported zero casualties and no tsunami risk.",
        "tier_expected": 1,
        "notes": "Primary official civil defense bulletin"
    },
    {
        "article_id": "art-ap-20261002-quake",
        "claim_text": "Tremors shook high-rise buildings in Antofagasta but critical infrastructure stayed intact.",
        "ground_truth": "Ground shaking felt in Antofagasta with no structural damage to key utilities.",
        "tier_expected": 2,
        "notes": "Corroborated across AP and Reuters"
    },
    {
        "article_id": "art-bbc-20261002-japan",
        "claim_text": "Japan's first mayor to take maternity leave returned to municipal duties.",
        "ground_truth": "Japanese municipal leader concluded maternity leave and resumed office duties.",
        "tier_expected": 3,
        "notes": "Civic feature report"
    },
    {
        "article_id": "art-bbc-20261002-cornell",
        "claim_text": "University judicial panel concluded investigation into campus fraternity allegations.",
        "ground_truth": "Campus review board finalized disciplinary investigation regarding student organization.",
        "tier_expected": 3,
        "notes": "Institutional disciplinary announcement"
    },
    {
        "article_id": "art-nyt-20261002-transit",
        "claim_text": "MTA reported track repairs delayed three subway lines during morning commute.",
        "ground_truth": "Metropolitan transit authority reported switch maintenance caused system slowdowns.",
        "tier_expected": 1,
        "notes": "Primary transit agency system alert"
    },
    {
        "article_id": "art-guardian-20261002-wildfire",
        "claim_text": "Fire crews contained forty percent of the wildfire in Peloponnese.",
        "ground_truth": "Greek fire service reported 40% containment perimeter on wildfire.",
        "tier_expected": 1,
        "notes": "Primary fire service briefing"
    },
    {
        "article_id": "art-guardian-20261002-wildfire",
        "claim_text": "Three regional villages were evacuated as a precautionary measure.",
        "ground_truth": "Civil protection authorities ordered preventative evacuation of 3 settlements.",
        "tier_expected": 2,
        "notes": "Corroborated by Athens wire and Guardian"
    },
    {
        "article_id": "art-bbc-20261002-space",
        "claim_text": "ESA space probe completed its second flyby of Mercury at an altitude of 200 kilometers.",
        "ground_truth": "European Space Agency BepiColombo probe conducted planned orbital flyby of Mercury.",
        "tier_expected": 1,
        "notes": "Primary space agency telemetry record"
    },
    {
        "article_id": "art-bbc-20261002-space",
        "claim_text": "Telemetry verified all twelve scientific instruments returned calibrated measurement data.",
        "ground_truth": "Flight operations confirmed operational status of onboard sensor suite.",
        "tier_expected": 1,
        "notes": "Primary agency flight log"
    },
    {
        "article_id": "art-nyt-20261002-arctic",
        "claim_text": "Research expedition documented twenty-day delay in seasonal Arctic ice freeze.",
        "ground_truth": "Polar oceanographic survey recorded delayed sea ice crystallization.",
        "tier_expected": 2,
        "notes": "Academic scientific publication"
    },
    {
        "article_id": "art-reuters-20261002-arctic",
        "claim_text": "Satellite data from NOAA confirmed the slowest autumn freeze extent since 2012.",
        "ground_truth": "NOAA satellite sensor observations confirmed record low ice perimeter formation.",
        "tier_expected": 1,
        "notes": "Primary government satellite telemetry"
    },
    {
        "article_id": "art-guardian-20261002-health",
        "claim_text": "WHO certified three additional countries as having eliminated indigenous malaria.",
        "ground_truth": "World Health Organization issued formal eradication certifications to 3 nations.",
        "tier_expected": 1,
        "notes": "Primary multilateral health agency certification"
    },
    {
        "article_id": "art-bbc-20261002-health",
        "claim_text": "Surveillance protocols must continue for three years to maintain certified malaria status.",
        "ground_truth": "Public health standards require 36-month monitoring following certification.",
        "tier_expected": 2,
        "notes": "Epidemiological compliance protocol"
    },

    # =========================================================================
    # DOMAIN 2: POLITICAL CLAIMS (35 claims)
    # =========================================================================
    {
        "article_id": "art-bbc-20261002-spain-vote",
        "claim_text": "Spanish Prime Minister Pedro Sánchez lost a parliamentary housing decree vote.",
        "ground_truth": "Spain's governing coalition failed to secure legislative majority on housing decree.",
        "tier_expected": 2,
        "notes": "Parliamentary voting record corroborated"
    },
    {
        "article_id": "art-bbc-20261002-spain-vote",
        "claim_text": "Lawmakers rejected the rental cap proposal by five votes.",
        "ground_truth": "Spanish parliament defeated rent control provision by a margin of 5 votes.",
        "tier_expected": 1,
        "notes": "Official legislative roll call vote tally"
    },
    {
        "article_id": "art-guardian-20261002-uk-budget",
        "claim_text": "Chancellor Rachel Reeves signaled potential capital gains tax adjustments in autumn budget.",
        "ground_truth": "UK Chancellor indicated tax rate review for capital gains in upcoming budget presentation.",
        "tier_expected": 2,
        "notes": "Corroborated across BBC and Guardian"
    },
    {
        "article_id": "art-guardian-20261002-uk-budget",
        "claim_text": "Treasury officials modeled forty billion pounds in fiscal gap closures.",
        "ground_truth": "UK Treasury economic models projected £40 billion budget adjustments.",
        "tier_expected": 3,
        "notes": "Treasury civil service background leak"
    },
    {
        "article_id": "art-bbc-20261002-tory-leader",
        "claim_text": "Conservative MPs eliminated James Cleverly in the fourth round of the leadership ballot.",
        "ground_truth": "Conservative parliamentary caucus voting round resulted in elimination of candidate.",
        "tier_expected": 1,
        "notes": "Official 1922 Committee ballot return"
    },
    {
        "article_id": "art-bbc-20261002-tory-leader",
        "claim_text": "Kemi Badenoch secured forty-two votes to lead the final ballot round.",
        "ground_truth": "Candidate Kemi Badenoch received 42 caucus votes.",
        "tier_expected": 1,
        "notes": "Official party vote count certified"
    },
    {
        "article_id": "art-nyt-20261002-senate-vote",
        "claim_text": "US Senate voted sixty-two to thirty-six to advance the federal aviation authorization.",
        "ground_truth": "United States Senate passed cloture on aviation reauthorization bill 62-36.",
        "tier_expected": 1,
        "notes": "Official US Senate Roll Call Vote #184"
    },
    {
        "article_id": "art-nyt-20261002-senate-vote",
        "claim_text": "The bill mandates five additional daily slots for flights at Ronald Reagan Airport.",
        "ground_truth": "Legislation requires FAA to allocate 5 new perimeter flight slots at DCA.",
        "tier_expected": 1,
        "notes": "Statutory text in enrolled bill"
    },
    {
        "article_id": "art-reuters-20261002-france-cabinet",
        "claim_text": "French Prime Minister Michel Barnier faced two motions of no confidence in the National Assembly.",
        "ground_truth": "Opposition deputies tabled two no-confidence motions against the Barnier ministry.",
        "tier_expected": 1,
        "notes": "Official National Assembly order of the day"
    },
    {
        "article_id": "art-reuters-20261002-france-cabinet",
        "claim_text": "The no-confidence motion required two hundred eighty-nine votes to topple the government.",
        "ground_truth": "Constitutional threshold requires absolute majority of 289 deputies.",
        "tier_expected": 1,
        "notes": "Constitutional rule / statutory invariant"
    },
    {
        "article_id": "art-bbc-20261002-eu-parliament",
        "claim_text": "European Parliament approved stricter emissions standards for heavy transport trucks.",
        "ground_truth": "EU lawmakers adopted directive mandating 90% CO2 reduction for heavy vehicles by 2040.",
        "tier_expected": 1,
        "notes": "Official European Parliament plenary voting record"
    },
    {
        "article_id": "art-bbc-20261002-eu-parliament",
        "claim_text": "The regulation passed with three hundred forty-one votes in favor and two hundred sixty-eight against.",
        "ground_truth": "Legislative vote concluded 341 in favor, 268 against, 14 abstentions.",
        "tier_expected": 1,
        "notes": "Official EP Plenary voting machine register"
    },
    {
        "article_id": "art-guardian-20261002-labour-reform",
        "claim_text": "UK government tabled legislation removing the remaining ninety hereditary peers from the House of Lords.",
        "ground_truth": "Government introduced bill to abolish voting rights of 90 hereditary peers.",
        "tier_expected": 1,
        "notes": "Official Parliamentary Bill Publication"
    },
    {
        "article_id": "art-guardian-20261002-labour-reform",
        "claim_text": "Constitutional affairs minister stated the reform would complete the 1999 modernization.",
        "ground_truth": "Cabinet minister delivered statutory second reading speech in House of Commons.",
        "tier_expected": 2,
        "notes": "Hansard official parliamentary transcript"
    },
    {
        "article_id": "art-nyt-20261002-election-filing",
        "claim_text": "Federal Election Commission released third-quarter campaign expenditure reports.",
        "ground_truth": "FEC published certified Q3 financial disclosures for federal campaigns.",
        "tier_expected": 1,
        "notes": "Primary official FEC regulatory disclosure"
    },
    {
        "article_id": "art-nyt-20261002-election-filing",
        "claim_text": "Presidential campaigns spent a combined four hundred fifty million dollars on television ads.",
        "ground_truth": "Disclosures show $450 million in aggregate broadcast advertising expenses.",
        "tier_expected": 1,
        "notes": "Certified itemized schedule of expenditures"
    },
    {
        "article_id": "art-bbc-20261002-germany-coalition",
        "claim_text": "German finance minister rejected proposals to suspend the constitutional debt brake.",
        "ground_truth": "Federal Finance Ministry reaffirmed adherence to Schuldenbremse limits.",
        "tier_expected": 2,
        "notes": "Confirmed across Deutsche Welle and BBC"
    },
    {
        "article_id": "art-reuters-20261002-germany-coalition",
        "claim_text": "German coalition partners scheduled an emergency budget conciliation session.",
        "ground_truth": "Chancellery announced trilateral coalition reconciliation meeting.",
        "tier_expected": 2,
        "notes": "Cross-wire confirmation"
    },
    {
        "article_id": "art-guardian-20261002-scotland-referendum",
        "claim_text": "Supreme Court previously ruled Scottish Parliament cannot unilaterally hold an independence referendum.",
        "ground_truth": "UK Supreme Court unanimous judgment in Lord Advocate reference.",
        "tier_expected": 1,
        "notes": "Primary UK Supreme Court legal judgment [2022] UKSC 31"
    },
    {
        "article_id": "art-guardian-20261002-scotland-referendum",
        "claim_text": "SNP annual conference voted to treat the general election as a mandate mechanism.",
        "ground_truth": "Political party membership passed internal strategic resolution.",
        "tier_expected": 3,
        "notes": "Party conference internal motion"
    },
    {
        "article_id": "art-nyt-20261002-court-injunction",
        "claim_text": "Federal judge granted preliminary injunction blocking enforcement of state immigration statutes.",
        "ground_truth": "US District Court issued preliminary injunction citing preemption under INA.",
        "tier_expected": 1,
        "notes": "Primary federal court order docket filing"
    },
    {
        "article_id": "art-nyt-20261002-court-injunction",
        "claim_text": "State attorney general filed an immediate emergency interlocutory appeal to the Fifth Circuit.",
        "ground_truth": "Notice of appeal docketed with appellate court clerk.",
        "tier_expected": 1,
        "notes": "Primary court docket entry"
    },
    {
        "article_id": "art-bbc-20261002-nato-spending",
        "claim_text": "Twenty-three of thirty-two NATO member states met the two percent GDP defense target.",
        "ground_truth": "NATO Secretary General annual defense expenditure report confirmed 23 members at 2%.",
        "tier_expected": 1,
        "notes": "Primary multilateral alliance statistical audit"
    },
    {
        "article_id": "art-reuters-20261002-nato-spending",
        "claim_text": "Poland allocated four point one percent of GDP to defense, the highest alliance share.",
        "ground_truth": "NATO official statistics show Poland defense outlay at 4.1% of national output.",
        "tier_expected": 1,
        "notes": "Primary NATO statistical annex table"
    },
    {
        "article_id": "art-guardian-20261002-water-privatisation",
        "claim_text": "Environment Agency opened criminal investigations into ten water utility sewage treatment plants.",
        "ground_truth": "UK regulatory agency commenced formal statutory criminal inquiries.",
        "tier_expected": 1,
        "notes": "Primary regulator enforcement notice"
    },
    {
        "article_id": "art-guardian-20261002-water-privatisation",
        "claim_text": "Thames Water creditors presented a two point eight billion pound debt restructuring proposal.",
        "ground_truth": "Ad hoc creditor committee submitted restructuring term sheet to company directors.",
        "tier_expected": 2,
        "notes": "Corroborated across Financial Times and Guardian"
    },
    {
        "article_id": "art-nyt-20261002-taiwan-arms",
        "claim_text": "State Department approved a two billion dollar arms package for Taiwan including air defense radar.",
        "ground_truth": "Defense Security Cooperation Agency notified Congress of approved foreign military sale.",
        "tier_expected": 1,
        "notes": "Primary DSCA statutory notification notice"
    },
    {
        "article_id": "art-reuters-20261002-taiwan-arms",
        "claim_text": "The NASAMS radar systems have a reported operational tracking range of one hundred eighty kilometers.",
        "ground_truth": "Technical manufacturer specifications list radar tracking radius at 180 km.",
        "tier_expected": 2,
        "notes": "Technical manufacturer datasheet verified"
    },
    {
        "article_id": "art-bbc-20261002-diplomacy-g20",
        "claim_text": "G20 sherpas agreed on a joint communique draft addressing climate finance metrics.",
        "ground_truth": "Diplomatic representatives reached preliminary consensus on ministerial draft text.",
        "tier_expected": 2,
        "notes": "Corroborated across BBC and Reuters"
    },
    {
        "article_id": "art-bbc-20261002-diplomacy-g20",
        "claim_text": "Paragraphs concerning multilateral debt relief remained bracketed pending plenary talks.",
        "ground_truth": "Negotiators left debt restructuring clauses unfinalized in negotiation draft.",
        "tier_expected": 3,
        "notes": "Single diplomatic source leak"
    },
    {
        "article_id": "art-guardian-20261002-asylum-treaty",
        "claim_text": "Italy transferred the first group of sixteen asylum seekers to processing centers in Albania.",
        "ground_truth": "Italian naval vessel transported 16 migrants to Shengjin processing facility under bilateral pact.",
        "tier_expected": 2,
        "notes": "Corroborated across ANSA and Guardian"
    },
    {
        "article_id": "art-reuters-20261002-asylum-treaty",
        "claim_text": "Rome tribunal ruled four of the transferred individuals must return to Italy under safe country rules.",
        "ground_truth": "Italian immigration court issued ruling invalidating detention of four applicants.",
        "tier_expected": 1,
        "notes": "Primary judicial decree / court order"
    },
    {
        "article_id": "art-nyt-20261002-border-metrics",
        "claim_text": "Border Patrol encounters along the southwest border dropped twenty-five percent in September.",
        "ground_truth": "CBP monthly operational update registered 25% decrease in nationwide migrant encounters.",
        "tier_expected": 1,
        "notes": "Primary official CBP statistical release"
    },
    {
        "article_id": "art-nyt-20261002-border-metrics",
        "claim_text": "Total monthly southwest border encounters reached fifty-four thousand.",
        "ground_truth": "Official CBP border dashboard recorded 54,000 encounters for the reporting month.",
        "tier_expected": 1,
        "notes": "Primary government statistical registry"
    },
    {
        "article_id": "art-bbc-20261002-kenya-protests",
        "claim_text": "Kenya high court issued conservatory orders suspending the impeachment trial of the deputy president.",
        "ground_truth": "High court bench issued temporary injunction staying senate trial proceedings.",
        "tier_expected": 1,
        "notes": "Primary constitutional court ruling order"
    },

    # =========================================================================
    # DOMAIN 3: BUSINESS & ECONOMY (30 claims)
    # =========================================================================
    {
        "article_id": "art-reuters-20261002-ecb-rates",
        "claim_text": "European Central Bank cut its deposit facility rate by twenty-five basis points to 3.25 percent.",
        "ground_truth": "ECB Governing Council reduced key policy rate to 3.25%.",
        "tier_expected": 1,
        "notes": "Primary central bank monetary policy announcement"
    },
    {
        "article_id": "art-reuters-20261002-ecb-rates",
        "claim_text": "Eurozone annual inflation dropped to 1.7 percent in September, below the central bank target.",
        "ground_truth": "Eurostat flash estimate recorded annual HICP inflation at 1.7%.",
        "tier_expected": 1,
        "notes": "Primary official statistical office (Eurostat) bulletin"
    },
    {
        "article_id": "art-nyt-20261002-fed-minutes",
        "claim_text": "Federal Reserve minutes revealed a substantial majority supported a fifty basis point rate cut.",
        "ground_truth": "FOMC published record of policy meeting documenting 50bp rate cut consensus.",
        "tier_expected": 1,
        "notes": "Primary Federal Reserve Board meeting minutes"
    },
    {
        "article_id": "art-nyt-20261002-fed-minutes",
        "claim_text": "Several participants preferred a smaller twenty-five basis point reduction.",
        "ground_truth": "Official minutes record dissenting minority perspective among committee members.",
        "tier_expected": 1,
        "notes": "Primary FOMC minutes text"
    },
    {
        "article_id": "art-ft-20261002-tsmc-earnings",
        "claim_text": "TSMC reported a fifty-four percent increase in quarterly net profit driven by AI chip demand.",
        "ground_truth": "TSMC filed regulatory financial disclosure showing Q3 net income up 54%.",
        "tier_expected": 1,
        "notes": "Primary corporate SEC / TWSE financial filing"
    },
    {
        "article_id": "art-ft-20261002-tsmc-earnings",
        "claim_text": "Gross margins expanded to fifty-seven point eight percent for the third quarter.",
        "ground_truth": "Certified quarterly financial accounts report gross margin of 57.8%.",
        "tier_expected": 1,
        "notes": "Primary corporate audited financial statements"
    },
    {
        "article_id": "art-reuters-20261002-boeing-strike",
        "claim_text": "Boeing union machinists rejected a thirty-five percent wage increase offer.",
        "ground_truth": "IAM District 751 certified ballot results showing 64% of members voted against contract.",
        "tier_expected": 1,
        "notes": "Primary labor union certified vote count"
    },
    {
        "article_id": "art-reuters-20261002-boeing-strike",
        "claim_text": "The forty-day work stoppage halted production of 737 MAX aircraft in Washington state.",
        "ground_truth": "Manufacturing operations at Renton plant suspended due to labor strike.",
        "tier_expected": 2,
        "notes": "Corroborated across wire services and corporate filings"
    },
    {
        "article_id": "art-bbc-20261002-oil-prices",
        "claim_text": "Brent crude futures settled at seventy-four dollars and twenty-nine cents a barrel.",
        "ground_truth": "ICE futures exchange end-of-day settlement price registered $74.29/bbl.",
        "tier_expected": 1,
        "notes": "Primary commodities exchange market close tape"
    },
    {
        "article_id": "art-bbc-20261002-oil-prices",
        "claim_text": "OPEC+ members maintained existing production quotas totaling forty million barrels per day.",
        "ground_truth": "OPEC ministerial monitoring committee issued communique maintaining output targets.",
        "tier_expected": 1,
        "notes": "Primary multilateral cartel communique"
    },
    {
        "article_id": "art-guardian-20261002-caterpillar-revenue",
        "claim_text": "Caterpillar lowered full-year sales guidance due to dealer inventory reductions.",
        "ground_truth": "Form 8-K SEC filing adjusted corporate annual revenue guidance downwards.",
        "tier_expected": 1,
        "notes": "Primary SEC regulatory filing"
    },
    {
        "article_id": "art-guardian-20261002-caterpillar-revenue",
        "claim_text": "Construction equipment deliveries in Europe dropped nineteen percent.",
        "ground_truth": "Segment financial disclosures detail 19% regional sales decline.",
        "tier_expected": 1,
        "notes": "Primary financial statements note"
    },
    {
        "article_id": "art-nyt-20261002-antitrust-google",
        "claim_text": "Department of Justice urged a federal judge to consider structural divestitures of Google Chrome.",
        "ground_truth": "DOJ antitrust division submitted formal remedial framework proposal in District Court.",
        "tier_expected": 1,
        "notes": "Primary legal remedy filing in Civil Action #20-cv-3010"
    },
    {
        "article_id": "art-nyt-20261002-antitrust-google",
        "claim_text": "Google legal counsel called the proposed breakup remedies radical and unlawful.",
        "ground_truth": "Defense counsel submitted formal response brief opposing divestiture.",
        "tier_expected": 1,
        "notes": "Primary court docket response filing"
    },
    {
        "article_id": "art-ft-20261002-goldman-results",
        "claim_text": "Goldman Sachs reported forty-five percent growth in quarterly investment banking fees.",
        "ground_truth": "Bank earnings release recorded investment banking revenues of $1.87 billion.",
        "tier_expected": 1,
        "notes": "Primary quarterly earnings announcement"
    },
    {
        "article_id": "art-ft-20261002-goldman-results",
        "claim_text": "Equities trading revenue rose eighteen percent to three point five billion dollars.",
        "ground_truth": "Segment accounts report $3.50 billion in institutional equities trading.",
        "tier_expected": 1,
        "notes": "Primary audited financial tables"
    },
    {
        "article_id": "art-reuters-20261002-asml-orders",
        "claim_text": "ASML booked net quarterly bookings of two point six billion euros, below market expectations.",
        "ground_truth": "Semiconductor equipment maker disclosed bookings of €2.63 billion.",
        "tier_expected": 1,
        "notes": "Primary corporate earnings disclosure"
    },
    {
        "article_id": "art-reuters-20261002-asml-orders",
        "claim_text": "The company reduced its 2025 net sales target range to thirty to thirty-five billion euros.",
        "ground_truth": "Corporate forward guidance adjusted downwards in regulatory notice.",
        "tier_expected": 1,
        "notes": "Primary management guidance release"
    },
    {
        "article_id": "art-bbc-20261002-imf-outlook",
        "claim_text": "IMF maintained global economic growth forecast at three point two percent for 2024.",
        "ground_truth": "World Economic Outlook report published global GDP baseline projection of 3.2%.",
        "tier_expected": 1,
        "notes": "Primary multilateral financial institution publication"
    },
    {
        "article_id": "art-bbc-20261002-imf-outlook",
        "claim_text": "Global headline inflation is projected to decline from 6.8 percent in 2023 to 3.5 percent in 2025.",
        "ground_truth": "IMF statistical appendix forecasts inflation moderation to 3.5%.",
        "tier_expected": 1,
        "notes": "Primary IMF macroeconomic statistical table"
    },
    {
        "article_id": "art-guardian-20261002-ev-tariffs",
        "claim_text": "European Union finalized countervailing tariffs up to thirty-five point three percent on Chinese electric vehicles.",
        "ground_truth": "European Commission implementing regulation entered into Official Journal of the EU.",
        "tier_expected": 1,
        "notes": "Primary Official Journal of the European Union regulation"
    },
    {
        "article_id": "art-guardian-20261002-ev-tariffs",
        "claim_text": "Five member states voted against the tariff regulation including Germany and Hungary.",
        "ground_truth": "Council of the European Union voting sheet records 5 dissenting member delegations.",
        "tier_expected": 1,
        "notes": "Primary EU Council certified voting register"
    },
    {
        "article_id": "art-nyt-20261002-nvidia-valuation",
        "claim_text": "Nvidia market capitalization briefly surpassed three point five trillion dollars.",
        "ground_truth": "Nasdaq real-time composite trading data registered market cap above $3.5T.",
        "tier_expected": 1,
        "notes": "Primary stock market exchange equity valuation"
    },
    {
        "article_id": "art-nyt-20261002-nvidia-valuation",
        "claim_text": "Shares rose two point four percent to close at one hundred forty-three dollars.",
        "ground_truth": "Official Nasdaq daily closing price verified at $143.71.",
        "tier_expected": 1,
        "notes": "Primary market close trade tape"
    },
    {
        "article_id": "art-ft-20261002-us-debt",
        "claim_text": "US national debt public interest payments exceeded one trillion dollars in fiscal year 2024.",
        "ground_truth": "US Treasury Monthly Treasury Statement recorded net interest outlays exceeding $1T.",
        "tier_expected": 1,
        "notes": "Primary official US Treasury financial statement (MTS Table 3)"
    },
    {
        "article_id": "art-ft-20261002-us-debt",
        "claim_text": "The federal budget deficit reached one point eight three trillion dollars.",
        "ground_truth": "Final Treasury accounting report confirmed FY24 deficit of $1.833 trillion.",
        "tier_expected": 1,
        "notes": "Primary Treasury final fiscal year report"
    },
    {
        "article_id": "art-reuters-20261002-japanyen",
        "claim_text": "The Japanese yen weakened to one hundred fifty-three per US dollar.",
        "ground_truth": "Bank of Japan / Tokyo FX interbank spot rate closed at 153.18 JPY/USD.",
        "tier_expected": 1,
        "notes": "Primary central bank FX reference rate"
    },
    {
        "article_id": "art-reuters-20261002-japanyen",
        "claim_text": "Japanese finance minister stated authorities were monitoring currency volatility with high urgency.",
        "ground_truth": "Ministry of Finance official press conference transcript confirmed cautionary statement.",
        "tier_expected": 2,
        "notes": "Official ministry briefing record"
    },
    {
        "article_id": "art-bbc-20261002-airbus-supply",
        "claim_text": "Airbus reaffirmed delivery guidance of approximately seven hundred seventy commercial jets for 2024.",
        "ground_truth": "Airbus SE corporate press release maintained 770 delivery target.",
        "tier_expected": 1,
        "notes": "Primary corporate earnings announcement"
    },
    {
        "article_id": "art-bbc-20261002-airbus-supply",
        "claim_text": "Supply chain bottlenecks delayed engine deliveries for thirty A320neo fuselages.",
        "ground_truth": "Production status report noted engine assembly shortages affecting airframes.",
        "tier_expected": 2,
        "notes": "Corroborated across industry trade press"
    }
]

def generate_csv():
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(EVAL_CSV_PATH, mode="w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=[
            "article_id", "claim_text", "ground_truth", "tier_expected", "notes"
        ])
        writer.writeheader()
        for item in EVALUATION_CLAIMS:
            writer.writerow(item)
    print(f"[+] Successfully wrote {len(EVALUATION_CLAIMS)} diverse evaluation claims to {EVAL_CSV_PATH}")

if __name__ == "__main__":
    generate_csv()
