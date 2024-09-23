import CalendarIcon from "../assets/icons/CalendarIcon";
import HeartIcon from "../assets/icons/HeartIcon";
import HomeIcon from "../assets/icons/HomeIcon";
import LuggageIcon from "../assets/icons/LuggageIcon";
import MessageIcon from "../assets/icons/MessageIcon";
import NoteIcon from "../assets/icons/NoteIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import { reviewApiProps } from "../types/home";
import { userCompactResDto } from "../types/res.dto";
import { planItemProps } from "../types/schedule";

export const footerTabs = [
  { icon: HomeIcon, label: "홈", route: "/home" },
  { icon: SearchIcon, label: "검색", route: "/home/search" },
  { icon: CalendarIcon, label: "일정", route: "/home/schedule" },
  { icon: MessageIcon, label: "리뷰/여행기", route: "/home/travel-review" },
  { icon: ProfileIcon, label: "마이페이지", route: "/home/mypage" },
];

export const mypageTabs = [
  { icon: LuggageIcon, label: "여행", route: "" },
  { icon: NoteIcon, label: "여행기", route: "Travelogue" },
  { icon: MessageIcon, label: "리뷰", route: "review" },
  { icon: HeartIcon, label: "찜 목록", route: "likes" },
];

export const mypageLikesTabs = [
  { label: "전체", value: "" },
  { label: "여행지", value: "place" },
  { label: "도시", value: "city" },
  { label: "여행기", value: "placeLog" },
];

export const RECENT_SEARCH_KEY = "recentSearches";

export const realTimeWords: string[] = [
  "제주도",
  "여수",
  "강릉",
  "부산",
  "전주",
  "남해",
  "가평",
  "진천",
  "담양",
  "곡성",
];

export const testLogTags: string[] = ["안동", "2박3일", "월영교", "혼행"];

export const testImg1 =
  "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__";

export const testImg2 =
  "https://s3-alpha-sig.figma.com/img/4de5/c6cd/4d2c94956b12da010b7b99e5d5a92224?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lZ2c4t3VMX6f294Wf7WfbN8I3w1F8kPIYESWvv8AExhb8e3~KJyk51jjkqmg4SZJhqj5fuQwcXlFyGrHgbAho7~Ayb5dB2Si3~m4ymVzHrkQZYRmaiwXOMPoCY~fgwBT3rMYUbv8EVQ56-mzMpqthcFNoUv7bOmPKDq7v~OHIWJfFonhH4R4NC9L3n53aSUs5qXuEuG-qku7vQltRVE-oTzyrYzpbVYTDkzP~E3qgo~0-UZHPTzbThN1rlaDqUUUXSma9lpze94lezKHpvrRm0DhkPvyfbSSVdWswiodrO7eWUTH33uQv2RIYJiLbxckUlwsv5Bmhgdzm5YAVJrHGw__";

export const testImageList: string[] = [
  "/src/assets/images/testImg.png",
  "/src/assets/images/testImg1.png",
  "/src/assets/images/testImg2.png",
  "/src/assets/images/testImg3.png",
  "/src/assets/images/testImg.png",
  "/src/assets/images/testImg1.png",
  "/src/assets/images/testImg2.png",
  "/src/assets/images/testImg3.png",
];

export const testLogContents1 =
  "사람들이 많이 없는 고즈넉한 분위기 여행지가 좋아서 안동으로 여행 결정! " +
  "제일 유명한 안동 하회마을밖에 생각이 안나서 구경할게 많이 없을려나 생각했는데 " +
  "생각보다 혼자 산책하고 힐링 할 수 있는 장소들이 많아서 좋았다.";

export const testLogContents2 =
  "입장료를 구매하면 하회마을 입구까지 셔틀버스타고 갈수 있어서 편하게 이동! " +
  "옛날 가옥들도 보고 꽃도 구경하면서 천천히 구경하니 2시간 가까이 돌아다닌것 같다. " +
  "<br>" +
  "하회마을 쭉 돌아보고 나오니 근처에 전망대가 있다고해서 한번 올라가 보았다. 별로 가파르지않는 산책로여서 여유롭게 걸어가기 딱 좋았다. ";

export const testLogContents3 =
  "첫째 날 밤에는 날도 선선하고 너무 좋아 야경 볼 겸 월영교를 갔다왔다. " +
  "월영교는 낙동강이 흐르는 물길을 가로지르는 다리라고하는데 내가 간 날은 다리에서 분수쇼도 하고 야간 조명도 함께 어우러져 너무너무 이뻤다. " +
  "밤에는 달모양의 보트를 탈 수 있는데 나는 혼자라 타지는 않았다. " +
  "근데 너무 달모양의 조명이 들어오는 보트라서 멀리서 보니 너무 이뻤다.";

export const testUserDto: userCompactResDto = {
  id: 123456,
  nickname: "coco1202",
  picture: "null",
};

export const testPlanItems: planItemProps[] = [
  {
    id: "1",
    time: "10:10",
    title: "금산 보리암",
    subtitle: "명소",
  },
  {
    id: "2",
    time: "12:00",
    title: "물건항",
    subtitle: "명소",
  },
  {
    id: "3",
    time: "14:00",
    title: "남해 보물섬전망대",
    subtitle: "명소",
  },
];

export const testReviewItem: reviewApiProps = {
  commentCnt: 1,
  id: 1,
  createdAt: "24.9.15",
  likeCnt: 8,
  placeId: "placeId",
  star: 4.9,
  subject: "d",
  content:
    "오대산 선재길에서 산책하기 자연의 힐링을 동시에 누릴 수 있는 최고의 장소였어요!",
  userCompactResDto: testUserDto,
};

export const testDayList: number[] = Array.from({ length: 7 }, (_, i) => i);

export const testTransportList: string[] = [
  "자동차",
  "버스/지하철",
  "기차",
  "택시",
  "도보",
];
