import CalendarIcon from "../assets/icons/CalendarIcon";
import HomeIcon from "../assets/icons/HomeIcon";
import MessageIcon from "../assets/icons/MessageIcon";
import ProfileIcon from "../assets/icons/ProfileIcon";
import SearchIcon from "../assets/icons/SearchIcon";

export const footerTabs = [
  { icon: HomeIcon, label: "홈", route: "/home" },
  { icon: SearchIcon, label: "검색", route: "/home/search" },
  { icon: CalendarIcon, label: "일정", route: "/home" },
  { icon: MessageIcon, label: "리뷰/여행기", route: "/home/travel-review"},
  { icon: ProfileIcon, label: "마이페이지", route: "/home"},
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

export const testImg1 =
  "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__";

export const testImg2 =
  "https://s3-alpha-sig.figma.com/img/4de5/c6cd/4d2c94956b12da010b7b99e5d5a92224?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lZ2c4t3VMX6f294Wf7WfbN8I3w1F8kPIYESWvv8AExhb8e3~KJyk51jjkqmg4SZJhqj5fuQwcXlFyGrHgbAho7~Ayb5dB2Si3~m4ymVzHrkQZYRmaiwXOMPoCY~fgwBT3rMYUbv8EVQ56-mzMpqthcFNoUv7bOmPKDq7v~OHIWJfFonhH4R4NC9L3n53aSUs5qXuEuG-qku7vQltRVE-oTzyrYzpbVYTDkzP~E3qgo~0-UZHPTzbThN1rlaDqUUUXSma9lpze94lezKHpvrRm0DhkPvyfbSSVdWswiodrO7eWUTH33uQv2RIYJiLbxckUlwsv5Bmhgdzm5YAVJrHGw__";
