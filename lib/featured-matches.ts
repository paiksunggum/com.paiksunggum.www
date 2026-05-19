export type MatchTeam = {
  name: string;
  abbr: string;
  logo: string;
  color: string;
  score: number;
};

export type FeaturedMatch = {
  id: string;
  sportSlug: string;
  league: string;
  status: "FINAL" | "LIVE" | "UPCOMING";
  date: string;
  venue?: string;
  home: MatchTeam;
  away: MatchTeam;
};

export const featuredMatches: FeaturedMatch[] = [
  {
    id: "nba-tor-mia",
    sportSlug: "basketball",
    league: "NBA",
    status: "FINAL",
    date: "Friday, Dec 13",
    venue: "Kaseya Center",
    home: {
      name: "Toronto Raptors",
      abbr: "TOR",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/3/36/Toronto_Raptors_logo.svg",
      color: "#1a1a1a",
      score: 104,
    },
    away: {
      name: "Miami Heat",
      abbr: "MIA",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/f/fb/Miami_Heat_logo.svg",
      color: "#98002E",
      score: 114,
    },
  },
  {
    id: "nba-mil-bos",
    sportSlug: "basketball",
    league: "NBA",
    status: "FINAL",
    date: "Saturday, Dec 14",
    venue: "Fiserv Forum",
    home: {
      name: "Milwaukee Bucks",
      abbr: "MIL",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/4/4a/Milwaukee_Bucks_logo.svg",
      color: "#00471B",
      score: 121,
    },
    away: {
      name: "Boston Celtics",
      abbr: "BOS",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
      color: "#007A33",
      score: 118,
    },
  },
  {
    id: "epl-liv-mci",
    sportSlug: "soccer",
    league: "EPL",
    status: "FINAL",
    date: "Sunday, Dec 15",
    venue: "Anfield",
    home: {
      name: "Liverpool",
      abbr: "LIV",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
      color: "#C8102E",
      score: 2,
    },
    away: {
      name: "Man City",
      abbr: "MCI",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
      color: "#6CABDD",
      score: 1,
    },
  },
  {
    id: "nfl-kc-buf",
    sportSlug: "football",
    league: "NFL",
    status: "FINAL",
    date: "Sunday, Dec 15",
    venue: "Arrowhead Stadium",
    home: {
      name: "Kansas City Chiefs",
      abbr: "KC",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/e/e1/Kansas_City_Chiefs_logo.svg",
      color: "#E31837",
      score: 27,
    },
    away: {
      name: "Buffalo Bills",
      abbr: "BUF",
      logo:
        "https://upload.wikimedia.org/wikipedia/en/7/77/Buffalo_Bills_logo.svg",
      color: "#00338D",
      score: 24,
    },
  },
];
