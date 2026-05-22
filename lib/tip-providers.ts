export type TipProvider = {
  id: string;
  name: string;
  sportSlug: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
};

export const tipProviders: TipProvider[] = [
  // 농구 — 슛 · 드리블 자세
  {
    id: "basketball-kim",
    name: "김슛코치",
    sportSlug: "basketball",
    specialty: "원핸드 슛 · 릴리스 각도",
    bio: "NBA 스카우트 출신. 팔꿈치 정렬과 손목 스냅으로 슛 궤적을 교정합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "basketball-park",
    name: "박드리블",
    sportSlug: "basketball",
    specialty: "로우 드리블 · 코어 밸런스",
    bio: "유소년 지도 10년. 시선과 볼 높이를 맞춰 드리블 실수를 줄이는 루틴을 공유합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1519861531473-920026218dc7?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "basketball-lee",
    name: "이레이업",
    sportSlug: "basketball",
    specialty: "레이업 · 마무리 손",
    bio: "프로팀 어시스트 코치. 보드 사이드 스텝과 비전드 핸드 마무리를 단계별로 안내합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1547347298-4074fc3086a0?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "basketball-choi",
    name: "최풋워크",
    sportSlug: "basketball",
    specialty: "피벗 · 방향 전환",
    bio: "하체 안정화 전문. 피벗 발 위치와 무게 중심 이동으로 수비 돌파 동작을 다듬습니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1504450758481-7338eba2ccd2?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "basketball-jung",
    name: "정프리",
    sportSlug: "basketball",
    specialty: "프리스로 · 슛 루틴",
    bio: "슈팅 코치. 호흡·바운스·릴리스까지 프리스로 루틴을 NBA 스타일로 맞춥니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1517649763962-0c62306601b7?auto=format&fit=crop&w=200&q=80",
  },

  // 야구 — 타격 · 투구 자세
  {
    id: "baseball-choi",
    name: "최타격",
    sportSlug: "baseball",
    specialty: "타격 스탠스 · 허리 회전",
    bio: "MLB 타격 분석 경력. 밸런스와 힙 턴 타이밍으로 배트 스피드를 살립니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1593341646782-e0b495cff90d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "baseball-kim",
    name: "김투구",
    sportSlug: "baseball",
    specialty: "투구 윈드업 · 릴리스",
    bio: "투수 코치. 다리 킥과 팔 슬롯을 맞춰 구속과 제구를 동시에 잡습니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "baseball-park",
    name: "박배트",
    sportSlug: "baseball",
    specialty: "배트 스윙 궤적 · 손목",
    bio: "스윙 플레인 교정 전문. 인사이드아웃 궤적과 탑핸드 롤오버를 체크리스트로 제공합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1521417533801-9f7a4b0dd0a0?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "baseball-lee",
    name: "이피처",
    sportSlug: "baseball",
    specialty: "변화구 그립 · 손가락 압력",
    bio: "불펜 코치. 슬라이더·체인지업 그립과 릴리스 포인트를 종목별로 비교합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "baseball-han",
    name: "한스탠스",
    sportSlug: "baseball",
    specialty: "타석·마운드 밸런스",
    bio: "재활·자세 코치. 무릎·골반 정렬로 타격·투구 공통 부하 분산을 돕습니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },

  // 미식축구 — 쿼터백 · 수비 자세
  {
    id: "football-jay",
    name: "제이쿼터",
    sportSlug: "football",
    specialty: "쿼터백 패스 · 릴리스",
    bio: "NFL QB 트레이너. 3스텝·5스텝 드롭과 어깨 개방 각도를 영상으로 교정합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "football-kim",
    name: "김수비",
    sportSlug: "football",
    specialty: "수비 스탠스 · 백패달",
    bio: "세컨더리 코치. 힙·무릎 굴곡과 시선 리드로 커버리지 반응을 높입니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1574629810360-7d2ba3252672?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "football-park",
    name: "박블로킹",
    sportSlug: "football",
    specialty: "오라인 패스 블로킹",
    bio: "OL 코치. 핸드 플레이스먼트와 첫 스텝 파워로 패스 러시를 막는 자세를 가르칩니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "football-lee",
    name: "이루트",
    sportSlug: "football",
    specialty: "루트 런 · 컷 각도",
    bio: "WR 코치. 브레이크·컷 타이밍과 상체 기울기로 패스 옵션을 넓힙니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "football-choi",
    name: "최태클",
    sportSlug: "football",
    specialty: "태클 폼 · 어깨 정렬",
    bio: "라인백 코치. 헤드업 태클과 랩업 자세로 파울·부상 위험을 줄입니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },

  // 축구 — 킥 · 드리블 자세
  {
    id: "soccer-han",
    name: "한킥",
    sportSlug: "soccer",
    specialty: "인스텝 · 볼 접촉점",
    bio: "EPL 출신 코치. 발등 잠금과 축 위치로 킥 정확도와 구질을 맞춥니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "soccer-yoon",
    name: "윤드리블",
    sportSlug: "soccer",
    specialty: "클로즈 컨트롤 · 드리블",
    bio: "미드필더 코치. 몸 사이드 볼·시선 분리로 압박 속 드리블을 안정화합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "soccer-kim",
    name: "김터치",
    sportSlug: "soccer",
    specialty: "퍼스트 터치 · 트래핑",
    bio: "유소년 엘리트 코치. 발 안쪽·허벅지 터치로 공을 몸 안으로 모읍니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "soccer-park",
    name: "박바디",
    sportSlug: "soccer",
    specialty: "바디 페인트 · 방향 전환",
    bio: "윙어 전문. 상체 페인트와 첫 터치 방향으로 1대1 돌파를 가르칩니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "soccer-lee",
    name: "이크로스",
    sportSlug: "soccer",
    specialty: "크로스 · 스윙 궤적",
    bio: "풀백 코치. 지지발·스윙 플레인으로 크로스 높이와 커브를 조절합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1517466787929-bc90951f0977?auto=format&fit=crop&w=200&q=80",
  },

  // 아이스하키 — 스케이팅 · 스틱 자세
  {
    id: "hockey-kim",
    name: "김스케이트",
    sportSlug: "hockey",
    specialty: "스트라이드 · 엣지 워크",
    bio: "NHL 스케이팅 코치. 무릎 굴곡과 엣지 각도로 가속과 코너링을 개선합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1515703407324-5f753afd8beb?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "hockey-park",
    name: "박스틱",
    sportSlug: "hockey",
    specialty: "스틱 핸들링 · 포핸드",
    bio: "포워드 코치. 탑 핸드·바텀 핸드 역할로 퍽 컨트롤과 패스를 다듬습니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1547036967-23d11aee5463?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "hockey-lee",
    name: "이슬랩",
    sportSlug: "hockey",
    specialty: "슬랩샷 · 체중 이동",
    bio: "파워플레이 전문. 체중 전이와 팔로우스루로 슬랩샷 파워를 올립니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "hockey-choi",
    name: "최체크",
    sportSlug: "hockey",
    specialty: "바디 체크 · 저자세",
    bio: "수비 코치. 힙·어깨 정렬로 안전한 체크와 퍽 회수 자세를 교육합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "hockey-jung",
    name: "정골리",
    sportSlug: "hockey",
    specialty: "골리 스탠스 · 리버스",
    bio: "골리 코치. 버터플리·리버스 각도와 리바운드 컨트롤 포지션을 맞춥니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1483721310020-033d1c0aee0a?auto=format&fit=crop&w=200&q=80",
  },

  // 테니스 — 서브 · 스트로크 자세
  {
    id: "tennis-yoon",
    name: "윤서브",
    sportSlug: "tennis",
    specialty: "서브 토스 · 어깨 라인",
    bio: "ATP급 서브 코치. 토스 높이와 트로피 포지션으로 1서브 성공률을 높입니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1622279457126-a79205ffae38?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tennis-kim",
    name: "김포핸드",
    sportSlug: "tennis",
    specialty: "포핸드 · 힙 회전",
    bio: "베이스라인 코치. 오픈 스탠스와 라켓 헤드 스피드로 탑스핀을 만듭니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tennis-park",
    name: "박백핸드",
    sportSlug: "tennis",
    specialty: "투핸드 백핸드 · 그립",
    bio: "백핸드 전문. 비전드·투핸드 그립 전환과 임팩트 포인트를 교정합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e48c?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tennis-lee",
    name: "이발리",
    sportSlug: "tennis",
    specialty: "발리 · 네트 어프로치",
    bio: "공격 테니스 코치. 스플릿 스텝과 컴팩트 스윙으로 발리 마무리를 가르칩니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1534367507873-d2d305e4b555?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "tennis-choi",
    name: "최풋워크",
    sportSlug: "tennis",
    specialty: "코트 이동 · 스플릿",
    bio: "피지컬 코치. 리커버리 스텝과 무게 중심으로 랠리 지구력을 키웁니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=200&q=80",
  },

  // 크리켓 — 배팅 · 볼링 자세
  {
    id: "cricket-sharma",
    name: "샤르마배트",
    sportSlug: "cricket",
    specialty: "배팅 스탠스 · 백스윙",
    bio: "IPL 배팅 코치. 사이드온·백스윙 타이밍으로 파워샷과 방어를 균형 맞춥니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1531415071318-de6869b6453a?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cricket-patel",
    name: "파텔볼",
    sportSlug: "cricket",
    specialty: "패스트 볼링 · 런업",
    bio: "패스트볼러 코치. 런업 리듬과 브래킹 암으로 속도와 제구를 잡습니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1540747913346-19eb383adc3c?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cricket-khan",
    name: "칸스핀",
    sportSlug: "cricket",
    specialty: "스핀 볼링 · 릴리스",
    bio: "스피너 전문. 손목·손가락 릴리스로 턴과 바운스를 조절합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cricket-singh",
    name: "싱크래시",
    sportSlug: "cricket",
    specialty: "크래시 샷 · 체중 이동",
    bio: "T20 공격 코치. 프론트풋·백풋 크래시 타이밍과 배트 스윙을 맞춥니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "cricket-roy",
    name: "로이필드",
    sportSlug: "cricket",
    specialty: "필딩 · 쓰로잉 자세",
    bio: "필딩 코치. 언더암·사이드암 쓰로우와 저자세 캐치 포지션을 교육합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1504257432553-a422b4d3a8a0?auto=format&fit=crop&w=200&q=80",
  },

  // 배구 — 서브 · 스파이크 자세
  {
    id: "volleyball-kim",
    name: "김서브",
    sportSlug: "volleyball",
    specialty: "플로트 서브 · 토스",
    bio: "FIVB 서브 코치. 손타격점과 체중 이동으로 서브 에이스율을 높입니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1612872086560-52aa824e5d47?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "volleyball-park",
    name: "박스파이크",
    sportSlug: "volleyball",
    specialty: "스파이크 어프로치 · 스윙",
    bio: "아웃사이드 히터 코치. 3스텝 어프로치와 하이엘보 스윙 각도를 교정합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1611532736597-de2d426f4c62?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "volleyball-lee",
    name: "이블록",
    sportSlug: "volleyball",
    specialty: "미들 블로킹 · 타이밍",
    bio: "미들 블로커 전문. 점프 타이밍과 손 폭으로 블로킹 효율을 올립니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "volleyball-choi",
    name: "최리시브",
    sportSlug: "volleyball",
    specialty: "리시브 · 저자세",
    bio: "리베로 코치. 플랫폼·팔 각도로 서브 리시브 안정성을 키웁니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "volleyball-jung",
    name: "정세터",
    sportSlug: "volleyball",
    specialty: "세트 · 손가락 터치",
    bio: "세터 코치. 손가락 스프레드와 접촉 소리로 정확한 토스를 만듭니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1594381898411-846e7d193b39?auto=format&fit=crop&w=200&q=80",
  },

  // 탁구 — 포핸드 · 백핸드 자세
  {
    id: "table-tennis-wang",
    name: "왕포핸드",
    sportSlug: "table-tennis",
    specialty: "포핸드 루프 · 무릎 각도",
    bio: "ITTF 코치. 브러시·루프 스윙과 하체 회전으로 탑스핀을 만듭니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1609716882731-3519a77b4a86?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "table-tennis-li",
    name: "리백핸드",
    sportSlug: "table-tennis",
    specialty: "백핸드 플릭 · 손목",
    bio: "백핸드 전문. 짧은 볼 플릭과 손목 스냅으로 공격 기회를 만듭니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "table-tennis-chen",
    name: "천서브",
    sportSlug: "table-tennis",
    specialty: "서브 · 마스킹",
    bio: "서브 코치. 토스 높이·콘택트 숨김으로 서브 회전과 변화를 가르칩니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1526401485004-2aa4f780b6ae?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "table-tennis-zhang",
    name: "장풋워크",
    sportSlug: "table-tennis",
    specialty: "사이드스텝 · 복귀",
    bio: "풋워크 코치. 인·아웃 사이드스텝으로 랠리 중 포지션을 유지합니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "table-tennis-ma",
    name: "마초크",
    sportSlug: "table-tennis",
    specialty: "초크 · 타이밍",
    bio: "공격 코치. 초크 타이밍과 라켓 각도로 상대 리듬을 끊습니다.",
    avatarUrl:
      "https://images.unsplash.com/photo-1587280501635-68a0e82cd1ff?auto=format&fit=crop&w=200&q=80",
  },
];

export function getTipProviderById(id: string): TipProvider | undefined {
  return tipProviders.find((p) => p.id === id);
}

export function getTipProvidersBySport(sportSlug: string): TipProvider[] {
  return tipProviders.filter((p) => p.sportSlug === sportSlug);
}

export function getRecommendedProvidersForSport(
  sportSlug: string,
  subscribedIds: string[],
  limit = 8,
): TipProvider[] {
  const subscribed = new Set(subscribedIds);
  return tipProviders
    .filter((p) => p.sportSlug === sportSlug && !subscribed.has(p.id))
    .slice(0, limit);
}

export type ProvidersBySport = {
  sportSlug: string;
  sportName: string;
  providers: TipProvider[];
};

export function getProvidersGroupedBySport(
  sportNames: Map<string, string>,
): ProvidersBySport[] {
  const bySlug = new Map<string, TipProvider[]>();

  for (const provider of tipProviders) {
    const list = bySlug.get(provider.sportSlug) ?? [];
    list.push(provider);
    bySlug.set(provider.sportSlug, list);
  }

  return [...bySlug.entries()]
    .map(([sportSlug, providers]) => ({
      sportSlug,
      sportName: sportNames.get(sportSlug) ?? sportSlug,
      providers,
    }))
    .sort((a, b) => a.sportName.localeCompare(b.sportName, "ko"));
}
