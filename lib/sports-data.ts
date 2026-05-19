export type SportItem = {
  slug: string;
  name: string;
  league: string;
  leagueLogo: string;
  image: string;
  imageAlt: string;
  caption: string;
};

export const sports: SportItem[] = [
  {
    slug: "basketball",
    name: "농구",
    league: "NBA",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg",
    image:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80",
    imageAlt: "농구 슛 자세",
    caption: "슛 · 드리블 자세",
  },
  {
    slug: "baseball",
    name: "야구",
    league: "MLB",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a6/Major_League_Baseball_logo.svg",
    image:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf3935?auto=format&fit=crop&w=400&q=80",
    imageAlt: "야구 타격 자세",
    caption: "타격 · 투구 자세",
  },
  {
    slug: "football",
    name: "미식축구",
    league: "NFL",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/en/a/a2/National_Football_League_logo.svg",
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=400&q=80",
    imageAlt: "미식축구 플레이",
    caption: "쿼터백 · 수비 자세",
  },
  {
    slug: "soccer",
    name: "축구",
    league: "EPL",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg",
    image:
      "https://images.unsplash.com/photo-1574629810360-7d2ba3252672?auto=format&fit=crop&w=400&q=80",
    imageAlt: "축구 킥 자세",
    caption: "킥 · 드리블 자세",
  },
  {
    slug: "hockey",
    name: "아이스하키",
    league: "NHL",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/en/3/3a/05_NHL_Shield.svg",
    image:
      "https://images.unsplash.com/photo-1515703407324-5f753afd8beb?auto=format&fit=crop&w=400&q=80",
    imageAlt: "아이스하키 플레이",
    caption: "스케이팅 · 스틱 자세",
  },
  {
    slug: "tennis",
    name: "테니스",
    league: "ATP",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/en/3/3f/ATP_Tour_logo.svg",
    image:
      "https://images.unsplash.com/photo-1622279457126-a79205ffae38?auto=format&fit=crop&w=400&q=80",
    imageAlt: "테니스 서브 자세",
    caption: "서브 · 스트로크 자세",
  },
  {
    slug: "cricket",
    name: "크리켓",
    league: "IPL",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/commons/5/52/Ipl.svg",
    image:
      "https://images.unsplash.com/photo-1531415071318-de6869b6453a?auto=format&fit=crop&w=400&q=80",
    imageAlt: "크리켓 배팅 자세",
    caption: "배팅 · 볼링 자세",
  },
  {
    slug: "volleyball",
    name: "배구",
    league: "FIVB",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/commons/a/ae/F%C3%A9d%C3%A9ration_Internationale_de_Volleyball_logo.svg",
    image:
      "https://images.unsplash.com/photo-1612872086560-52aa824e5d47?auto=format&fit=crop&w=400&q=80",
    imageAlt: "배구 스파이크 자세",
    caption: "서브 · 스파이크 자세",
  },
  {
    slug: "table-tennis",
    name: "탁구",
    league: "ITTF",
    leagueLogo:
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/Logo_of_ITTF.svg",
    image:
      "https://images.unsplash.com/photo-1609716882731-3519a77b4a86?auto=format&fit=crop&w=400&q=80",
    imageAlt: "탁구 포핸드 자세",
    caption: "포핸드 · 백핸드 자세",
  },
];

export function getSportBySlug(slug: string): SportItem | undefined {
  return sports.find((sport) => sport.slug === slug);
}
