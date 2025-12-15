
// 커뮤니티 Mock 데이터
export const MOCK_COMMUNITY_POSTS = [
  { 
    id: 101, 
    title: "안녕하세요! 처음 가입했습니다.", 
    content: `반갑습니다. 앞으로 잘 부탁드립니다! 개발 공부 중인 학생입니다.
    
    열심히 배우고 소통하겠습니다!`, 
    date: "2025.06.01", 
    likes: 12, 
    comments: 4,
    category: "Notices",
    author: "newbie_dev",
    recentComments: [
      { id: 1001, user: "admin", text: "환영합니다!", date: "2025.06.01" },
      { id: 1002, user: "user1", text: "같이 열심히 해요", date: "2025.06.01" }
    ]
  },
  { 
    id: 102, 
    title: "React vs Vue, 당신의 선택은?", 
    content: `회사에서 기술 스택을 정해야 하는데 고민이네요. 의견 부탁드립니다.
    
    React는 생태계가 넓고, Vue는 생산성이 좋다고 들었는데...
    실무에서 어떤 걸 더 선호하시나요?`, 
    date: "2025.05.30", 
    likes: 89, 
    comments: 45,
    category: "Dev",
    author: "tech_lead",
    recentComments: [
      { id: 1003, user: "react_fan", text: "생태계는 리액트죠", date: "2025.05.30" },
      { id: 1004, user: "vue_lover", text: "생산성은 뷰가 압도적입니다", date: "2025.05.31" },
      { id: 1005, user: "angular_user", text: "앵귤러는요...?", date: "2025.05.31" }
    ]
  },
  { 
    id: 103, 
    title: "오늘 점심 메뉴 추천받습니다", 
    content: `판교 근처 맛집 아시는 분 계신가요? 매번 구내식당만 가니 질리네요.
    
    한식, 일식 상관 없습니다. 추천 부탁드려요!`, 
    date: "2025.05.29", 
    likes: 23, 
    comments: 10,
    category: "Daily",
    author: "hungry_coder",
    recentComments: [
      { id: 1006, user: "local_guide", text: "유스페이스 2층 돈까스집 추천요", date: "2025.05.29" },
      { id: 1007, user: "gourmet", text: "현대백화점 지하도 괜찮아요", date: "2025.05.29" }
    ]
  },
  { 
    id: 104, 
    title: "디자인 영감 어디서 얻으시나요?", 
    content: "핀터레스트 말고 다른 좋은 사이트 있으면 공유 부탁드립니다.", 
    date: "2025.05.28", 
    likes: 45, 
    comments: 8,
    category: "Design",
    author: "pixel_artist",
    recentComments: [
      { id: 1008, user: "be_hance", text: "Behance 많이 봅니다", date: "2025.05.28" },
      { id: 1009, user: "awwwards", text: "Awwwards 추천해요", date: "2025.05.28" }
    ]
  },
  { 
    id: 105, 
    title: "개발자 노트북 추천해조세요", 
    content: "맥북 프로랑 에어 중에 고민 중입니다. 웹 개발 위주로 할 것 같아요.", 
    date: "2025.05.25", 
    likes: 15, 
    comments: 22,
    category: "Dev",
    author: "laptop_buyer",
    recentComments: [
      { id: 1010, user: "apple_fan", text: "무조건 프로 가세요", date: "2025.05.25" },
      { id: 1011, user: "money_saver", text: "에어로도 충분합니다", date: "2025.05.26" }
    ]
  },
  { 
    id: 106, 
    title: "주말에 코딩하는 사람 있나요?", 
    content: "저는 사이드 프로젝트 하느라 주말도 없네요 ㅠㅠ 다들 쉬시나요?", 
    date: "2025.05.24", 
    likes: 67, 
    comments: 31,
    category: "Daily",
    author: "side_pro",
    recentComments: [
      { id: 1012, user: "weekend_coder", text: "저도 달리는 중입니다", date: "2025.05.24" },
      { id: 1013, user: "burnout", text: "쉬어야 오래 갑니다...", date: "2025.05.25" }
    ]
  },
  { 
    id: 107, 
    title: "Void* 커뮤니티 너무 좋네요", 
    content: "디자인도 깔끔하고 기능도 심플해서 마음에 듭니다. 개발자분 화이팅!", 
    date: "2025.05.20", 
    likes: 102, 
    comments: 15,
    category: "Notices",
    author: "early_adopter",
    recentComments: [
      { id: 1014, user: "admin", text: "감사합니다! 더 노력하겠습니다.", date: "2025.05.21" },
      { id: 1015, user: "user99", text: "인정합니다", date: "2025.05.21" }
    ]
  },
  { 
    id: 108, 
    title: "CSS Grid vs Flexbox", 
    content: "아직도 헷갈리는데 언제 뭘 써야 할까요? 정리가 안 되네요.", 
    date: "2025.05.18", 
    likes: 34, 
    comments: 12,
    category: "Dev",
    author: "css_master_wannabe",
    recentComments: [
      { id: 1016, user: "grid_god", text: "2차원은 Grid, 1차원은 Flex입니다", date: "2025.05.18" },
      { id: 1017, user: "old_school", text: "float 쓰던 시절이 그리...울 리가 없지", date: "2025.05.19" }
    ]
  }
];
