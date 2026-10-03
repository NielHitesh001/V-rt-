import { Item, Passage, Claim, EventSummary } from '../types';

export const RAW_ITEMS: Item[] = [
  {
    "id": "gold-art-001",
    "source_id": "ntsb-gov",
    "url": "https://www.ntsb.gov/investigations/Pages/DCA24MM031.aspx",
    "title": "NTSB Issues Preliminary Report on Containership Dali Collision with Francis Scott Key Bridge",
    "byline": "Office of Public Affairs",
    "dateline": "WASHINGTON \u2014 May 14, 2024",
    "published_time": "2024-05-14T14:00:00Z",
    "captured_time": "2024-05-14T15:30:00Z",
    "text": "The National Transportation Safety Board issued its preliminary report Tuesday on the collision of the cargo vessel Dali with the Francis Scott Key Bridge in Baltimore.\nThe cargo ship experienced two electrical blackouts in port prior to departure and two additional blackouts before striking the bridge support column on March 26.\nSix road maintenance workers died in the collapse, and one crew member sustained minor injuries during the incident.\nNTSB investigators recovered voyage data recorder audio and electrical system logs from the vessel.",
    "event_id": "event-key-bridge-01",
    "event_kind": "hard-fact",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-002",
    "source_id": "ap-news",
    "url": "https://apnews.com/article/baltimore-key-bridge-channel-reopened-salvage",
    "title": "Full navigation channel reopens in Baltimore after salvage crews remove Key Bridge wreckage",
    "byline": "Brian Witte",
    "dateline": "BALTIMORE (AP) \u2014 June 10, 2024",
    "published_time": "2024-06-10T22:15:00Z",
    "captured_time": "2024-06-11T01:00:00Z",
    "text": "Federal and state officials announced that the main 700-foot-wide shipping channel into the Port of Baltimore fully reopened Monday following weeks of salvage operations.\nCrews removed approximately 50,000 tons of steel and concrete debris from the Patapsco River.\n\"This milestone restores commercial maritime traffic to one of America's vital ports,\" Maryland Governor Wes Moore said in a statement.\nCommercial cargo vessels began scheduled transit through the channel on Tuesday morning.",
    "event_id": "event-key-bridge-01",
    "event_kind": "hard-fact",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-003",
    "source_id": "bbc-news",
    "url": "https://www.bbc.com/news/world-asia-68722134",
    "title": "Magnitude 7.4 earthquake strikes eastern Taiwan, triggering tsunami warnings",
    "byline": "Rupert Wingfield-Hayes",
    "dateline": "TAIPEI \u2014 April 3, 2024",
    "published_time": "2024-04-03T03:30:00Z",
    "captured_time": "2024-04-03T04:15:00Z",
    "text": "A powerful magnitude 7.4 earthquake struck off the eastern coast of Taiwan on Wednesday morning, according to the Central Weather Administration.\nThe earthquake occurred at 07:58 local time at a depth of 34.8 kilometers near Hualien County.\nTsunami advisories were issued for southern Japan and the northern Philippines before being cancelled three hours later.\nEmergency authorities reported that at least nine people were killed and more than 900 were injured.",
    "event_id": "event-taiwan-quake-01",
    "event_kind": "hard-fact",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-004",
    "source_id": "the-guardian",
    "url": "https://www.theguardian.com/world/2024/jan/14/iceland-volcano-erupts-near-grindavik",
    "title": "Iceland volcano erupts near Grindav\u00edk as lava flows toward evacuated town",
    "byline": "Miranda Bryant",
    "dateline": "REYKJAVIK \u2014 January 14, 2024",
    "published_time": "2024-01-14T09:45:00Z",
    "captured_time": "2024-01-14T11:00:00Z",
    "text": "A volcanic fissure opened on the Reykjanes peninsula in south-west Iceland on Sunday morning, sending molten lava toward the fishing town of Grindav\u00edk.\nCivil protection authorities completed the emergency evacuation of approximately 3,800 residents before the fissure breached protective earth barriers.\n\"No lives are in danger, but infrastructure may be threatened,\" President Gu\u00f0ni J\u00f3hannesson stated on social media.\nFlights to and from Keflav\u00edk International Airport operated normally throughout the day.",
    "event_id": "event-iceland-volcano-01",
    "event_kind": "hard-fact",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-005",
    "source_id": "bls-gov",
    "url": "https://www.bls.gov/news.release/empsit.nr0.htm",
    "title": "The Employment Situation \u2014 September 2024",
    "byline": "Bureau of Labor Statistics",
    "dateline": "WASHINGTON \u2014 October 4, 2024",
    "published_time": "2024-10-04T12:30:00Z",
    "captured_time": "2024-10-04T13:00:00Z",
    "text": "Total nonfarm payroll employment increased by 254,000 in September, and the unemployment rate changed little at 4.1 percent, the U.S. Bureau of Labor Statistics reported today.\nEmployment continued to trend up in food services and drinking places (+69,000), health care (+45,000), and government (+31,000).\nAverage hourly earnings for all employees on private nonfarm payrolls rose by 13 cents, or 0.4 percent, to $35.36.\nOver the past 12 months, average hourly earnings have increased by 4.0 percent.",
    "event_id": "event-us-jobs-01",
    "event_kind": "numeric",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-006",
    "source_id": "reuters",
    "url": "https://www.reuters.com/markets/europe/ecb-cuts-rates-again-growth-falters-2024-09-12/",
    "title": "ECB cuts interest rates again as euro zone growth falters",
    "byline": "Balazs Koranyi and Francesco Canepa",
    "dateline": "FRANKFURT \u2014 September 12, 2024",
    "published_time": "2024-09-12T13:15:00Z",
    "captured_time": "2024-09-12T14:30:00Z",
    "text": "The European Central Bank lowered its key deposit facility rate by 25 basis points to 3.50% on Thursday.\nThe Governing Council voted unanimously in favor of the reduction following a previous rate cut in June.\n\"Inflation is expected to rise again in the latter part of this year before declining toward our 2% target next year,\" ECB President Christine Lagarde told a press conference.\nEuro zone headline inflation dropped to 2.2% in August, down from 2.6% in July.",
    "event_id": "event-ecb-ratecut-01",
    "event_kind": "numeric",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-007",
    "source_id": "deutsche-welle",
    "url": "https://www.dw.com/en/eu-court-upholds-24-billion-fine-against-google/a-70176543",
    "title": "Analysis: EU top court cements \u20ac2.4 billion antitrust penalty against Google",
    "byline": "Business & Technology Desk (Analysis)",
    "dateline": "BRUSSELS / LUXEMBOURG \u2014 September 10, 2024",
    "published_time": "2024-09-10T11:00:00Z",
    "captured_time": "2024-09-10T12:00:00Z",
    "text": "The European Court of Justice dismissed Google's final appeal Tuesday, upholding a \u20ac2.42 billion fine imposed by the European Commission for abusing search market dominance.\nThe ruling brings a seven-year legal battle over Google Shopping comparison services to a definitive close.\nLegal analysts suggest the verdict signals greater regulatory willingness to penalize anti-competitive self-preferencing by dominant platforms.\nGoogle said in a statement that it had modified its shopping product in 2017 to comply with Commission mandates.",
    "event_id": "event-google-eu-fine-01",
    "event_kind": "numeric",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-008",
    "source_id": "ap-news",
    "url": "https://apnews.com/article/london-mayoral-election-results-sadiq-khan-2024",
    "title": "Sadiq Khan wins historic third term as London Mayor with 43.8% of vote",
    "byline": "Jill Lawless",
    "dateline": "LONDON (AP) \u2014 May 4, 2024",
    "published_time": "2024-05-04T17:45:00Z",
    "captured_time": "2024-05-04T18:30:00Z",
    "text": "London Mayor Sadiq Khan secured a third consecutive term Saturday, winning 1,088,214 votes across the capital.\nOfficial election returns showed Khan defeated Conservative challenger Susan Hall by a margin of 276,428 votes, securing 43.8% against Hall's 32.7%.\nVoter turnout across Greater London reached 40.5%, slightly lower than the 42.0% recorded in 2021.\n\"It is the honor of my life to serve the city I love for another four years,\" Khan said in his victory address at City Hall.",
    "event_id": "event-london-mayor-01",
    "event_kind": "numeric",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-009",
    "source_id": "reuters",
    "url": "https://www.reuters.com/world/asia-pacific/philippines-china-clash-second-thomas-shoal-resupply-2024-06-17/",
    "title": "Philippines and China trade blame over collision near Second Thomas Shoal",
    "byline": "Mikhail Flores and Karen Lema",
    "dateline": "MANILA / BEIJING \u2014 June 17, 2024",
    "published_time": "2024-06-17T10:30:00Z",
    "captured_time": "2024-06-17T11:45:00Z",
    "text": "Philippine and Chinese maritime vessels collided near Second Thomas Shoal on Monday during a Philippine resupply mission to stationed troops.\nThe Philippine military stated that Chinese coast guard vessels deliberately rammed and boarded Philippine naval boats, injuring eight personnel.\nChina's Coast Guard disputed the account, asserting that the Philippine transport craft illegally intruded into Chinese territorial waters and ignored verbal warnings.\nThe U.S. State Department condemned what it characterized as dangerous maneuvers by Chinese maritime forces.",
    "event_id": "event-south-china-sea-01",
    "event_kind": "contested",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-010",
    "source_id": "al-jazeera",
    "url": "https://www.aljazeera.com/economy/2024/10/1/us-east-coast-port-strike-begins-shutting-vital-supply-chains",
    "title": "US East Coast dockworkers launch massive strike as contract negotiations collapse",
    "byline": "Economy Desk",
    "dateline": "NEW YORK \u2014 October 1, 2024",
    "published_time": "2024-10-01T06:00:00Z",
    "captured_time": "2024-10-01T07:15:00Z",
    "text": "Around 45,000 members of the International Longshoremen's Association walked off the job at 36 ports from Maine to Texas at midnight on Tuesday.\nUnion leadership demanded a 61.5% wage increase over six years and strict prohibitions on automated cargo-handling machinery.\nThe United States Maritime Alliance said in a statement that its latest offer included a wage increase of nearly 50% and protections against full automation.\nSupply chain analysts warn that prolonged port closures could cost the U.S. economy up to $5 billion per day.",
    "event_id": "event-us-port-strike-01",
    "event_kind": "contested",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-011",
    "source_id": "the-guardian-opinion",
    "url": "https://www.theguardian.com/commentisfree/2024/jul/18/housing-crisis-zoning-reform-planning-laws",
    "title": "Opinion: The government's cowardly planning reforms will do nothing to solve our housing catastrophe",
    "byline": "Simon Jenkins (Columnist)",
    "dateline": "LONDON \u2014 July 18, 2024",
    "published_time": "2024-07-18T15:00:00Z",
    "captured_time": "2024-07-18T16:20:00Z",
    "text": "Ministers have once again shamefully caved in to developer lobbies with a disastrous deregulation bill that will desecrate green belts across England.\nThe housing secretary announced mandatory local building targets of 370,000 homes a year on Tuesday.\nIn my view, concreting over the countryside to build unaffordable executive homes is an act of pure vandalism that must be resisted by every community.\nWe should instead prioritize renovating empty urban properties and taxing land speculation.",
    "event_id": "event-uk-housing-reform-01",
    "event_kind": "contested",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  },
  {
    "id": "gold-art-012",
    "source_id": "deutsche-welle",
    "url": "https://www.dw.com/en/georgia-foreign-agents-bill-protests-tbilisi-parliament/a-69081234",
    "title": "Tbilisi police clash with thousands protesting controversial 'foreign agents' bill",
    "byline": "Caucasus Bureau",
    "dateline": "TBILISI \u2014 May 14, 2024",
    "published_time": "2024-05-14T20:30:00Z",
    "captured_time": "2024-05-14T21:45:00Z",
    "text": "Georgian security forces deployed water cannon and tear gas to disperse thousands of demonstrators gathered outside parliament in Tbilisi on Tuesday night.\nLawmakers voted 84 to 30 to pass the final reading of the law requiring organizations receiving over 20% of funding from abroad to register as foreign agents.\nThe interior ministry said 13 police officers were injured and 20 protesters were detained for public order offenses.\nOpposition organizers alleged that riot police launched unprovoked baton charges against peaceful crowds.",
    "event_id": "event-georgia-protests-01",
    "event_kind": "contested",
    "article_type": "reporting",
    "duplicate_of": null,
    "republished_from": null
  }
];

export const PASSAGES: Passage[] = [
  {
    "id": "gold-art-001-p0",
    "item_id": "gold-art-001",
    "position": 0,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-001-p1",
    "item_id": "gold-art-001",
    "position": 1,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-001-p2",
    "item_id": "gold-art-001",
    "position": 2,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-001-p3",
    "item_id": "gold-art-001",
    "position": 3,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-002-p0",
    "item_id": "gold-art-002",
    "position": 0,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-002-p1",
    "item_id": "gold-art-002",
    "position": 1,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-002-p2",
    "item_id": "gold-art-002",
    "position": 2,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-002-p3",
    "item_id": "gold-art-002",
    "position": 3,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-003-p0",
    "item_id": "gold-art-003",
    "position": 0,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-003-p1",
    "item_id": "gold-art-003",
    "position": 1,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-003-p2",
    "item_id": "gold-art-003",
    "position": 2,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-003-p3",
    "item_id": "gold-art-003",
    "position": 3,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-004-p0",
    "item_id": "gold-art-004",
    "position": 0,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-004-p1",
    "item_id": "gold-art-004",
    "position": 1,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-004-p2",
    "item_id": "gold-art-004",
    "position": 2,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-004-p3",
    "item_id": "gold-art-004",
    "position": 3,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-005-p0",
    "item_id": "gold-art-005",
    "position": 0,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-005-p1",
    "item_id": "gold-art-005",
    "position": 1,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-005-p2",
    "item_id": "gold-art-005",
    "position": 2,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-005-p3",
    "item_id": "gold-art-005",
    "position": 3,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-006-p0",
    "item_id": "gold-art-006",
    "position": 0,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-006-p1",
    "item_id": "gold-art-006",
    "position": 1,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-006-p2",
    "item_id": "gold-art-006",
    "position": 2,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-006-p3",
    "item_id": "gold-art-006",
    "position": 3,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-007-p0",
    "item_id": "gold-art-007",
    "position": 0,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-007-p1",
    "item_id": "gold-art-007",
    "position": 1,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-007-p2",
    "item_id": "gold-art-007",
    "position": 2,
    "text": "",
    "passage_type": "interpretation",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-007-p3",
    "item_id": "gold-art-007",
    "position": 3,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-008-p0",
    "item_id": "gold-art-008",
    "position": 0,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-008-p1",
    "item_id": "gold-art-008",
    "position": 1,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-008-p2",
    "item_id": "gold-art-008",
    "position": 2,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-008-p3",
    "item_id": "gold-art-008",
    "position": 3,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-009-p0",
    "item_id": "gold-art-009",
    "position": 0,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-009-p1",
    "item_id": "gold-art-009",
    "position": 1,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-009-p2",
    "item_id": "gold-art-009",
    "position": 2,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-009-p3",
    "item_id": "gold-art-009",
    "position": 3,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-010-p0",
    "item_id": "gold-art-010",
    "position": 0,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-010-p1",
    "item_id": "gold-art-010",
    "position": 1,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-010-p2",
    "item_id": "gold-art-010",
    "position": 2,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-010-p3",
    "item_id": "gold-art-010",
    "position": 3,
    "text": "",
    "passage_type": "prediction",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-011-p0",
    "item_id": "gold-art-011",
    "position": 0,
    "text": "",
    "passage_type": "rhetoric",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-011-p1",
    "item_id": "gold-art-011",
    "position": 1,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-011-p2",
    "item_id": "gold-art-011",
    "position": 2,
    "text": "",
    "passage_type": "rhetoric",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-011-p3",
    "item_id": "gold-art-011",
    "position": 3,
    "text": "",
    "passage_type": "rhetoric",
    "feeds_fact_base": false,
    "feedsFactBase": false
  },
  {
    "id": "gold-art-012-p0",
    "item_id": "gold-art-012",
    "position": 0,
    "text": "",
    "passage_type": "observed event",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-012-p1",
    "item_id": "gold-art-012",
    "position": 1,
    "text": "",
    "passage_type": "quantitative",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-012-p2",
    "item_id": "gold-art-012",
    "position": 2,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  },
  {
    "id": "gold-art-012-p3",
    "item_id": "gold-art-012",
    "position": 3,
    "text": "",
    "passage_type": "attributed statement",
    "feeds_fact_base": true,
    "feedsFactBase": true
  }
];

export const CLAIMS: Claim[] = [
  {
    "id": "claim-001",
    "passage_id": "gold-art-001-p0",
    "item_id": "gold-art-001",
    "claim_type": "statement",
    "original_wording": "The National Transportation Safety Board issued its preliminary report Tuesday on the collision of the cargo vessel Dali with the Francis Scott Key Bridge in Baltimore.",
    "neutralized_wording": "The National Transportation Safety Board issued its preliminary report Tuesday on the collision of the cargo vessel Dali with the Francis Scott Key Bridge in Baltimore.",
    "changes": [],
    "provenance_chain": [
      "gold-art-001",
      "gold-art-001-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 168,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-002",
    "passage_id": "gold-art-001-p1",
    "item_id": "gold-art-001",
    "claim_type": "event",
    "original_wording": "The cargo ship experienced two electrical blackouts in port prior to departure and two additional blackouts before striking the bridge support column on March 26.",
    "neutralized_wording": "The cargo ship experienced two electrical blackouts in port prior to departure and two additional blackouts before striking the bridge support column on March 26.",
    "changes": [],
    "provenance_chain": [
      "gold-art-001",
      "gold-art-001-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 162,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-003",
    "passage_id": "gold-art-001-p2",
    "item_id": "gold-art-001",
    "claim_type": "quantity",
    "original_wording": "Six road maintenance workers died in the collapse, and one crew member sustained minor injuries during the incident.",
    "neutralized_wording": "Six road maintenance workers died in the collapse, and one crew member sustained minor injuries during the incident.",
    "changes": [],
    "provenance_chain": [
      "gold-art-001",
      "gold-art-001-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 116,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-004",
    "passage_id": "gold-art-001-p3",
    "item_id": "gold-art-001",
    "claim_type": "event",
    "original_wording": "NTSB investigators recovered voyage data recorder audio and electrical system logs from the vessel.",
    "neutralized_wording": "NTSB investigators recovered voyage data recorder audio and electrical system logs from the vessel.",
    "changes": [],
    "provenance_chain": [
      "gold-art-001",
      "gold-art-001-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 99,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-005",
    "passage_id": "gold-art-002-p0",
    "item_id": "gold-art-002",
    "claim_type": "statement",
    "original_wording": "Federal and state officials announced that the main 700-foot-wide shipping channel into the Port of Baltimore fully reopened Monday following weeks of salvage operations.",
    "neutralized_wording": "Federal and state officials announced that the main 700-foot-wide shipping channel into the Port of Baltimore fully reopened Monday following weeks of salvage operations.",
    "changes": [],
    "provenance_chain": [
      "gold-art-002",
      "gold-art-002-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 170,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-006",
    "passage_id": "gold-art-002-p1",
    "item_id": "gold-art-002",
    "claim_type": "quantity",
    "original_wording": "Crews removed approximately 50,000 tons of steel and concrete debris from the Patapsco River.",
    "neutralized_wording": "Crews removed approximately 50,000 tons of steel and concrete debris from the Patapsco River.",
    "changes": [],
    "provenance_chain": [
      "gold-art-002",
      "gold-art-002-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 93,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-007",
    "passage_id": "gold-art-002-p2",
    "item_id": "gold-art-002",
    "claim_type": "statement",
    "original_wording": "\"This milestone restores commercial maritime traffic to one of America's vital ports,\" Maryland Governor Wes Moore said in a statement.",
    "neutralized_wording": "\"This milestone restores commercial maritime traffic to one of America's vital ports,\" Maryland Governor Wes Moore said in a statement.",
    "changes": [],
    "provenance_chain": [
      "gold-art-002",
      "gold-art-002-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 135,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-008",
    "passage_id": "gold-art-002-p3",
    "item_id": "gold-art-002",
    "claim_type": "event",
    "original_wording": "Commercial cargo vessels began scheduled transit through the channel on Tuesday morning.",
    "neutralized_wording": "Commercial cargo vessels began scheduled transit through the channel on Tuesday morning.",
    "changes": [],
    "provenance_chain": [
      "gold-art-002",
      "gold-art-002-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 88,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-009",
    "passage_id": "gold-art-003-p0",
    "item_id": "gold-art-003",
    "claim_type": "statement",
    "original_wording": "A powerful magnitude 7.4 earthquake struck off the eastern coast of Taiwan on Wednesday morning, according to the Central Weather Administration.",
    "neutralized_wording": "A powerful magnitude 7.4 earthquake struck off the eastern coast of Taiwan on Wednesday morning, according to the Central Weather Administration.",
    "changes": [],
    "provenance_chain": [
      "gold-art-003",
      "gold-art-003-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 145,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-010",
    "passage_id": "gold-art-003-p1",
    "item_id": "gold-art-003",
    "claim_type": "quantity",
    "original_wording": "The earthquake occurred at 07:58 local time at a depth of 34.8 kilometers near Hualien County.",
    "neutralized_wording": "The earthquake occurred at 07:58 local time at a depth of 34.8 kilometers near Hualien County.",
    "changes": [],
    "provenance_chain": [
      "gold-art-003",
      "gold-art-003-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 94,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-011",
    "passage_id": "gold-art-003-p2",
    "item_id": "gold-art-003",
    "claim_type": "event",
    "original_wording": "Tsunami advisories were issued for southern Japan and the northern Philippines before being cancelled three hours later.",
    "neutralized_wording": "Tsunami advisories were issued for southern Japan and the northern Philippines before being cancelled three hours later.",
    "changes": [],
    "provenance_chain": [
      "gold-art-003",
      "gold-art-003-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 120,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-012",
    "passage_id": "gold-art-003-p3",
    "item_id": "gold-art-003",
    "claim_type": "quantity",
    "original_wording": "Emergency authorities reported that at least nine people were killed and more than 900 were injured.",
    "neutralized_wording": "Emergency authorities reported that at least nine people were killed and more than 900 were injured.",
    "changes": [],
    "provenance_chain": [
      "gold-art-003",
      "gold-art-003-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 100,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-013",
    "passage_id": "gold-art-004-p0",
    "item_id": "gold-art-004",
    "claim_type": "event",
    "original_wording": "A volcanic fissure opened on the Reykjanes peninsula in south-west Iceland on Sunday morning, sending molten lava toward the fishing town of Grindav\u00edk.",
    "neutralized_wording": "A volcanic fissure opened on the Reykjanes peninsula in south-west Iceland on Sunday morning, sending molten lava toward the fishing town of Grindav\u00edk.",
    "changes": [],
    "provenance_chain": [
      "gold-art-004",
      "gold-art-004-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 151,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-014",
    "passage_id": "gold-art-004-p1",
    "item_id": "gold-art-004",
    "claim_type": "quantity",
    "original_wording": "Civil protection authorities completed the emergency evacuation of approximately 3,800 residents before the fissure breached protective earth barriers.",
    "neutralized_wording": "Civil protection authorities completed the emergency evacuation of approximately 3,800 residents before the fissure breached protective earth barriers.",
    "changes": [],
    "provenance_chain": [
      "gold-art-004",
      "gold-art-004-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 151,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-015",
    "passage_id": "gold-art-004-p2",
    "item_id": "gold-art-004",
    "claim_type": "statement",
    "original_wording": "\"No lives are in danger, but infrastructure may be threatened,\" President Gu\u00f0ni J\u00f3hannesson stated on social media.",
    "neutralized_wording": "\"No lives are in danger, but infrastructure may be threatened,\" President Gu\u00f0ni J\u00f3hannesson stated on social media.",
    "changes": [],
    "provenance_chain": [
      "gold-art-004",
      "gold-art-004-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 115,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-016",
    "passage_id": "gold-art-004-p3",
    "item_id": "gold-art-004",
    "claim_type": "event",
    "original_wording": "Flights to and from Keflav\u00edk International Airport operated normally throughout the day.",
    "neutralized_wording": "Flights to and from Keflav\u00edk International Airport operated normally throughout the day.",
    "changes": [],
    "provenance_chain": [
      "gold-art-004",
      "gold-art-004-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 88,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-017",
    "passage_id": "gold-art-005-p0",
    "item_id": "gold-art-005",
    "claim_type": "quantity",
    "original_wording": "Total nonfarm payroll employment increased by 254,000 in September, and the unemployment rate changed little at 4.1 percent, the U.S. Bureau of Labor Statistics reported today.",
    "neutralized_wording": "Total nonfarm payroll employment increased by 254,000 in September, and the unemployment rate changed little at 4.1 percent, the U.S. Bureau of Labor Statistics reported today.",
    "changes": [],
    "provenance_chain": [
      "gold-art-005",
      "gold-art-005-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 176,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-018",
    "passage_id": "gold-art-005-p1",
    "item_id": "gold-art-005",
    "claim_type": "quantity",
    "original_wording": "Employment continued to trend up in food services and drinking places (+69,000), health care (+45,000), and government (+31,000).",
    "neutralized_wording": "Employment continued to trend up in food services and drinking places (+69,000), health care (+45,000), and government (+31,000).",
    "changes": [],
    "provenance_chain": [
      "gold-art-005",
      "gold-art-005-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 129,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-019",
    "passage_id": "gold-art-005-p2",
    "item_id": "gold-art-005",
    "claim_type": "quantity",
    "original_wording": "Average hourly earnings for all employees on private nonfarm payrolls rose by 13 cents, or 0.4 percent, to $35.36.",
    "neutralized_wording": "Average hourly earnings for all employees on private nonfarm payrolls rose by 13 cents, or 0.4 percent, to $35.36.",
    "changes": [],
    "provenance_chain": [
      "gold-art-005",
      "gold-art-005-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 114,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-020",
    "passage_id": "gold-art-005-p3",
    "item_id": "gold-art-005",
    "claim_type": "quantity",
    "original_wording": "Over the past 12 months, average hourly earnings have increased by 4.0 percent.",
    "neutralized_wording": "Over the past 12 months, average hourly earnings have increased by 4.0 percent.",
    "changes": [],
    "provenance_chain": [
      "gold-art-005",
      "gold-art-005-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 79,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-021",
    "passage_id": "gold-art-006-p0",
    "item_id": "gold-art-006",
    "claim_type": "quantity",
    "original_wording": "The European Central Bank lowered its key deposit facility rate by 25 basis points to 3.50% on Thursday.",
    "neutralized_wording": "The European Central Bank lowered its key deposit facility rate by 25 basis points to 3.50% on Thursday.",
    "changes": [],
    "provenance_chain": [
      "gold-art-006",
      "gold-art-006-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 104,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-022",
    "passage_id": "gold-art-006-p1",
    "item_id": "gold-art-006",
    "claim_type": "event",
    "original_wording": "The Governing Council voted unanimously in favor of the reduction following a previous rate cut in June.",
    "neutralized_wording": "The Governing Council voted unanimously in favor of the reduction following a previous rate cut in June.",
    "changes": [],
    "provenance_chain": [
      "gold-art-006",
      "gold-art-006-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 104,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-023",
    "passage_id": "gold-art-006-p2",
    "item_id": "gold-art-006",
    "claim_type": "statement",
    "original_wording": "\"Inflation is expected to rise again in the latter part of this year before declining toward our 2% target next year,\" ECB President Christine Lagarde told a press conference.",
    "neutralized_wording": "\"Inflation is expected to rise again in the latter part of this year before declining toward our 2% target next year,\" ECB President Christine Lagarde told a press conference.",
    "changes": [],
    "provenance_chain": [
      "gold-art-006",
      "gold-art-006-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 175,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-024",
    "passage_id": "gold-art-006-p3",
    "item_id": "gold-art-006",
    "claim_type": "quantity",
    "original_wording": "Euro zone headline inflation dropped to 2.2% in August, down from 2.6% in July.",
    "neutralized_wording": "Euro zone headline inflation dropped to 2.2% in August, down from 2.6% in July.",
    "changes": [],
    "provenance_chain": [
      "gold-art-006",
      "gold-art-006-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 79,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-025",
    "passage_id": "gold-art-008-p0",
    "item_id": "gold-art-008",
    "claim_type": "quantity",
    "original_wording": "London Mayor Sadiq Khan secured a third consecutive term Saturday, winning 1,088,214 votes across the capital.",
    "neutralized_wording": "London Mayor Sadiq Khan secured a third consecutive term Saturday, winning 1,088,214 votes across the capital.",
    "changes": [],
    "provenance_chain": [
      "gold-art-008",
      "gold-art-008-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 110,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-026",
    "passage_id": "gold-art-008-p1",
    "item_id": "gold-art-008",
    "claim_type": "quantity",
    "original_wording": "Official election returns showed Khan defeated Conservative challenger Susan Hall by a margin of 276,428 votes, securing 43.8% against Hall's 32.7%.",
    "neutralized_wording": "Official election returns showed Khan defeated Conservative challenger Susan Hall by a margin of 276,428 votes, securing 43.8% against Hall's 32.7%.",
    "changes": [],
    "provenance_chain": [
      "gold-art-008",
      "gold-art-008-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 148,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-027",
    "passage_id": "gold-art-008-p2",
    "item_id": "gold-art-008",
    "claim_type": "quantity",
    "original_wording": "Voter turnout across Greater London reached 40.5%, slightly lower than the 42.0% recorded in 2021.",
    "neutralized_wording": "Voter turnout across Greater London reached 40.5%, slightly lower than the 42.0% recorded in 2021.",
    "changes": [],
    "provenance_chain": [
      "gold-art-008",
      "gold-art-008-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 98,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-028",
    "passage_id": "gold-art-008-p3",
    "item_id": "gold-art-008",
    "claim_type": "statement",
    "original_wording": "\"It is the honor of my life to serve the city I love for another four years,\" Khan said in his victory address at City Hall.",
    "neutralized_wording": "\"It is the honor of my life to serve the city I love for another four years,\" Khan said in his victory address at City Hall.",
    "changes": [],
    "provenance_chain": [
      "gold-art-008",
      "gold-art-008-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 124,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-029",
    "passage_id": "gold-art-009-p0",
    "item_id": "gold-art-009",
    "claim_type": "event",
    "original_wording": "Philippine and Chinese maritime vessels collided near Second Thomas Shoal on Monday during a Philippine resupply mission to stationed troops.",
    "neutralized_wording": "Philippine and Chinese maritime vessels collided near Second Thomas Shoal on Monday during a Philippine resupply mission to stationed troops.",
    "changes": [],
    "provenance_chain": [
      "gold-art-009",
      "gold-art-009-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 141,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-030",
    "passage_id": "gold-art-009-p1",
    "item_id": "gold-art-009",
    "claim_type": "statement",
    "original_wording": "The Philippine military stated that Chinese coast guard vessels deliberately rammed and boarded Philippine naval boats, injuring eight personnel.",
    "neutralized_wording": "The Philippine military stated that Chinese coast guard vessels deliberately rammed and boarded Philippine naval boats, injuring eight personnel.",
    "changes": [],
    "provenance_chain": [
      "gold-art-009",
      "gold-art-009-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 145,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-031",
    "passage_id": "gold-art-009-p2",
    "item_id": "gold-art-009",
    "claim_type": "statement",
    "original_wording": "China's Coast Guard disputed the account, asserting that the Philippine transport craft illegally intruded into Chinese territorial waters and ignored verbal warnings.",
    "neutralized_wording": "China's Coast Guard disputed the account, asserting that the Philippine transport craft illegally intruded into Chinese territorial waters and ignored verbal warnings.",
    "changes": [],
    "provenance_chain": [
      "gold-art-009",
      "gold-art-009-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 167,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-032",
    "passage_id": "gold-art-009-p3",
    "item_id": "gold-art-009",
    "claim_type": "statement",
    "original_wording": "The U.S. State Department condemned what it characterized as dangerous maneuvers by Chinese maritime forces.",
    "neutralized_wording": "The U.S. State Department condemned what it characterized as dangerous maneuvers by Chinese maritime forces.",
    "changes": [],
    "provenance_chain": [
      "gold-art-009",
      "gold-art-009-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 108,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-033",
    "passage_id": "gold-art-010-p0",
    "item_id": "gold-art-010",
    "claim_type": "quantity",
    "original_wording": "Around 45,000 members of the International Longshoremen's Association walked off the job at 36 ports from Maine to Texas at midnight on Tuesday.",
    "neutralized_wording": "Around 45,000 members of the International Longshoremen's Association walked off the job at 36 ports from Maine to Texas at midnight on Tuesday.",
    "changes": [],
    "provenance_chain": [
      "gold-art-010",
      "gold-art-010-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 144,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-034",
    "passage_id": "gold-art-010-p1",
    "item_id": "gold-art-010",
    "claim_type": "statement",
    "original_wording": "Union leadership demanded a 61.5% wage increase over six years and strict prohibitions on automated cargo-handling machinery.",
    "neutralized_wording": "Union leadership demanded a 61.5% wage increase over six years and strict prohibitions on automated cargo-handling machinery.",
    "changes": [],
    "provenance_chain": [
      "gold-art-010",
      "gold-art-010-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 125,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-035",
    "passage_id": "gold-art-010-p2",
    "item_id": "gold-art-010",
    "claim_type": "statement",
    "original_wording": "The United States Maritime Alliance said in a statement that its latest offer included a wage increase of nearly 50% and protections against full automation.",
    "neutralized_wording": "The United States Maritime Alliance said in a statement that its latest offer included a wage increase of nearly 50% and protections against full automation.",
    "changes": [],
    "provenance_chain": [
      "gold-art-010",
      "gold-art-010-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 157,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-036",
    "passage_id": "gold-art-012-p0",
    "item_id": "gold-art-012",
    "claim_type": "event",
    "original_wording": "Georgian security forces deployed water cannon and tear gas to disperse thousands of demonstrators gathered outside parliament in Tbilisi on Tuesday night.",
    "neutralized_wording": "Georgian security forces deployed water cannon and tear gas to disperse thousands of demonstrators gathered outside parliament in Tbilisi on Tuesday night.",
    "changes": [],
    "provenance_chain": [
      "gold-art-012",
      "gold-art-012-p0"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 155,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-037",
    "passage_id": "gold-art-012-p1",
    "item_id": "gold-art-012",
    "claim_type": "quantity",
    "original_wording": "Lawmakers voted 84 to 30 to pass the final reading of the law requiring organizations receiving over 20% of funding from abroad to register as foreign agents.",
    "neutralized_wording": "Lawmakers voted 84 to 30 to pass the final reading of the law requiring organizations receiving over 20% of funding from abroad to register as foreign agents.",
    "changes": [],
    "provenance_chain": [
      "gold-art-012",
      "gold-art-012-p1"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 158,
    "attribution_speaker": null,
    "attribution_anonymous": false
  },
  {
    "id": "claim-038",
    "passage_id": "gold-art-012-p2",
    "item_id": "gold-art-012",
    "claim_type": "statement",
    "original_wording": "The interior ministry said 13 police officers were injured and 20 protesters were detained for public order offenses.",
    "neutralized_wording": "The interior ministry said 13 police officers were injured and 20 protesters were detained for public order offenses.",
    "changes": [],
    "provenance_chain": [
      "gold-art-012",
      "gold-art-012-p2"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 117,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  },
  {
    "id": "claim-039",
    "passage_id": "gold-art-012-p3",
    "item_id": "gold-art-012",
    "claim_type": "statement",
    "original_wording": "Opposition organizers alleged that riot police launched unprovoked baton charges against peaceful crowds.",
    "neutralized_wording": "Opposition organizers alleged that riot police launched unprovoked baton charges against peaceful crowds.",
    "changes": [],
    "provenance_chain": [
      "gold-art-012",
      "gold-art-012-p3"
    ],
    "status": "neutralized",
    "span_start": 0,
    "span_end": 105,
    "attribution_speaker": "Reported Source",
    "attribution_anonymous": false
  }
];

export const EVENTS: EventSummary[] = [
  {
    "id": "event-key-bridge-01",
    "label": "Baltimore Francis Scott Key Bridge Collision",
    "kind": "hard-fact",
    "neutral_headline": "Containership Dali Collides with Francis Scott Key Bridge in Baltimore; Navigation Channel Reopened",
    "sources": [
      "ntsb-gov",
      "ap-news"
    ],
    "article_count": 2,
    "claims_count": 8,
    "primary_source_present": true,
    "has_disputes": false
  },
  {
    "id": "event-taiwan-quake-01",
    "label": "Hualien County Taiwan 7.4 Earthquake",
    "kind": "hard-fact",
    "neutral_headline": "Magnitude 7.4 Earthquake Strikes Eastern Taiwan; 9 Fatalities and Over 900 Injuries Reported",
    "sources": [
      "cwa-gov-tw",
      "bbc-news"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": true,
    "has_disputes": false
  },
  {
    "id": "event-iceland-volcano-01",
    "label": "Reykjanes Peninsula Volcanic Fissure Eruption",
    "kind": "hard-fact",
    "neutral_headline": "Volcanic Eruption on Reykjanes Peninsula Prompts Evacuation of Grindav\u00edk",
    "sources": [
      "the-guardian",
      "ap-news"
    ],
    "article_count": 1,
    "claims_count": 3,
    "primary_source_present": false,
    "has_disputes": false
  },
  {
    "id": "event-us-jobs-01",
    "label": "US September 2024 Nonfarm Payrolls & Unemployment",
    "kind": "numeric",
    "neutral_headline": "US Nonfarm Payroll Employment Rises by 254,000; Unemployment Rate Holds at 4.1%",
    "sources": [
      "bls-gov",
      "reuters"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": true,
    "has_disputes": false
  },
  {
    "id": "event-ecb-ratecut-01",
    "label": "ECB Deposit Facility Rate Reduction to 3.50%",
    "kind": "numeric",
    "neutral_headline": "European Central Bank Cuts Deposit Facility Rate by 25 Basis Points to 3.50%",
    "sources": [
      "ecb-europa",
      "reuters"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": true,
    "has_disputes": false
  },
  {
    "id": "event-google-eu-fine-01",
    "label": "EU Court Final Judgment on Google Shopping Antitrust Fine",
    "kind": "numeric",
    "neutral_headline": "Court of Justice of the European Union Upholds \u20ac2.42 Billion Antitrust Fine Against Google",
    "sources": [
      "curia-europa",
      "deutsche-welle"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": true,
    "has_disputes": false
  },
  {
    "id": "event-london-mayor-01",
    "label": "2024 London Mayoral Election Results",
    "kind": "numeric",
    "neutral_headline": "Sadiq Khan Elected to Third Term as London Mayor with 43.8% of Total Votes",
    "sources": [
      "ap-news",
      "bbc-news"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": false,
    "has_disputes": false
  },
  {
    "id": "event-south-china-sea-01",
    "label": "Second Thomas Shoal Maritime Confrontation",
    "kind": "contested",
    "neutral_headline": "Philippine and Chinese Vessels Collide Near Second Thomas Shoal with Contested Attributions",
    "sources": [
      "reuters",
      "al-jazeera"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": false,
    "has_disputes": true
  },
  {
    "id": "event-us-port-strike-01",
    "label": "ILA East Coast and Gulf Coast Port Strike",
    "kind": "contested",
    "neutral_headline": "45,000 ILA Dockworkers Strike at 36 US Ports Amid Automation and Wage Negotiations",
    "sources": [
      "al-jazeera",
      "reuters"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": false,
    "has_disputes": true
  },
  {
    "id": "event-uk-housing-reform-01",
    "label": "UK Mandatory Housing Targets & Planning Reform",
    "kind": "contested",
    "neutral_headline": "UK Government Proposes Mandatory Annual 370,000 Housing Targets Amid Planning Debate",
    "sources": [
      "the-guardian-opinion",
      "bbc-news"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": false,
    "has_disputes": true
  },
  {
    "id": "event-georgia-protests-01",
    "label": "Tbilisi Parliamentary Foreign Agents Law Vote & Demonstrations",
    "kind": "contested",
    "neutral_headline": "Georgian Parliament Passes Foreign Agents Legislation (84-30) Amid Demonstrations in Tbilisi",
    "sources": [
      "deutsche-welle",
      "reuters"
    ],
    "article_count": 1,
    "claims_count": 4,
    "primary_source_present": false,
    "has_disputes": true
  }
];
