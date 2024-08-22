import CustomInput from "../../components/mobile/CustomInput";
import BellIcon from "../../assets/icons/BellIcon";
import ImageView from "../../components/mobile/ImageView";
import CommentIcon from "../../assets/icons/CommentIcon";
import HeartIcon from "../../assets/icons/HeartIcon";
import StarIcon from "../../assets/icons/StarIcon";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { placeApiProps, reviewApiProps } from "../../types/home";
import CarouselTitleBox from "../../components/mobile/CarouselTitleBox";
import * as S from "../../assets/styles/home.style";

import { useNavigate } from "react-router-dom";
import testImg from "../../assets/images/testImg.png";
import CustomSkeleton from "../../components/mobile/CustomSkeleton";
import BottomSheet from "../../components/mobile/BottomSheet";
import styled from "styled-components";
import CalendarIcon from "../../assets/icons/CalendarIcon";

export type MoreProps = "TRAVEL_PLACE" | "CITY" | "THEME";

export default function Home() {
  const navigate = useNavigate();

  // 인기 여행지
  const [travelPlace, setTravelPlace] = useState([]);
  // 인기 도시
  const [city, setCity] = useState([]);
  // 테마별 여행지
  const [themePlace, setThemePlace] = useState([]);
  // 지금 뜨는 리뷰
  const [review, setReview] = useState([]);

  const [loading, setLoading] = useState(true);
  // TODO : 사람들이 찜한 여행기 api = 아직 백엔드 개발 중

  const handleMoreClick = (type: MoreProps) => {
    // 모바일은 새로고침이 없으니깐 state 옵션을 써도 될 것 같아요.
    navigate("more", {
      state: {
        type: type,
      },
    });
  };

  useEffect(() => {
    const requestApi = async () => {
      try {
        const [travelPlaceRes, cityRes, themePlaceRes, reviewRes] =
          await Promise.all([
            axiosInstance.get("/place/page?page=1&placeType=TRAVEL_PLACE"),
            axiosInstance.get("/place/page?page=1&placeType=CITY"),
            axiosInstance.get("/place/page?page=1&placeType=THEME"),
            axiosInstance.get("/reviews?page=1&sort=NEW"),
          ]);

        if (travelPlaceRes.status === 200) {
          setTravelPlace(travelPlaceRes.data.data);
        }
        if (cityRes.status === 200) {
          setCity(cityRes.data.data);
        }
        if (themePlaceRes.status === 200) {
          setThemePlace(themePlaceRes.data.data);
        }
        if (reviewRes.status === 200) {
          setReview(reviewRes.data.data);
        }
      } catch (error) {
        console.error("api error=", error);
      } finally {
        // setLoading(false);
      }
    };

    requestApi();
  }, []);

  // testing add place...
  const [isSelect, setIsSelect] = useState(false);
  const handleSelect = () => {
    setIsSelect(true);
  };

  return (
    <S.HomeContainer>
      {/* <BottomSheet minH={6} maxH={0.8}>
        <div>Testing Bottom Sheet...</div>
      </BottomSheet> */}

      <BottomSheet isBlocking={true} maxH={0.5} isDismiss={true}>
        {/* 일정 있을 때 */}
        {/* <AddPlaceContainer>
          <h1>내 여행 일정</h1>
          <AddPlaceCard $isSelect={isSelect}>
            <span>경주</span>
            <div>4.25 ~ 4.27(2박 3일)</div>
            <span onClick={handleSelect}>{!isSelect && "선택"}</span>
          </AddPlaceCard>

          <AddPlaceDayListRow>
            <AddPlaceDayListBox $isSelect={true}>
              <p>Day1</p>
              <span>4.25(목)</span>
            </AddPlaceDayListBox>
            <AddPlaceDayListBox $isSelect={false}>
              <p>Day2</p>
              <span>4.26(금)</span>
            </AddPlaceDayListBox>
            <AddPlaceDayListBox $isSelect={false}>
              <p>Day3</p>
              <span>4.27(토)</span>
            </AddPlaceDayListBox>
          </AddPlaceDayListRow>

          <AddPlaceButton>
            <span>추가하기</span>
          </AddPlaceButton>
        </AddPlaceContainer> */}

        {/* 일정 없을 때 */}
        <AddPlaceContainer>
          <NoScheduleTitle>
            <CalendarIcon />
            <span> 일정이 없어요. 여행 일정을 등록해봐요!</span>
          </NoScheduleTitle>

          <AddScheduleButton>
            <span>일정 등록하기</span>
          </AddScheduleButton>
        </AddPlaceContainer>
      </BottomSheet>

      <S.HomeHeader>
        <div>Logo</div>
        <BellIcon />
      </S.HomeHeader>

      <CustomInput
        text="여행지를 입력해주세요"
        onClick={() => navigate("search")}
        value=""
      />

      <S.HomeBody>
        <S.InfoRow>
          <S.InfoText>지금 가장 인기있는 여행지</S.InfoText>
          <S.MoreText
            onClick={() => handleMoreClick("TRAVEL_PLACE" as MoreProps)}
          >
            더보기
          </S.MoreText>
        </S.InfoRow>
        <S.CarouselRow>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <S.CarouselWithText key={index}>
                  <CustomSkeleton
                    width="120px"
                    height="120px"
                    borderRadius="16px"
                  />
                  <CustomSkeleton style={{ borderRadius: "16px" }} />
                  <CustomSkeleton style={{ borderRadius: "16px" }} />
                </S.CarouselWithText>
              ))
            : travelPlace?.map((item: placeApiProps) => (
                <S.CarouselWithText key={item.id}>
                  <ImageView
                    src={testImg}
                    alt={item.name}
                    handleClick={() => navigate(`${item.placeId}`)}
                  />
                  <CarouselTitleBox name={item.name} subName={item.subName} />
                </S.CarouselWithText>
              ))}
        </S.CarouselRow>

        <S.InfoRow>
          <S.InfoText>인기 여행 도시</S.InfoText>
          <S.MoreText onClick={() => handleMoreClick("CITY" as MoreProps)}>
            더보기
          </S.MoreText>
        </S.InfoRow>
        <S.CarouselRow>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <S.CarouselWithText key={index}>
                  <CustomSkeleton
                    width="120px"
                    height="120px"
                    borderRadius="16px"
                  />
                </S.CarouselWithText>
              ))
            : city?.map((item: placeApiProps) => (
                <ImageView
                  key={item.id}
                  src={testImg}
                  alt={item.name}
                  bottomText={item.name}
                  handleClick={() => navigate(`city/${item.placeId}`)}
                />
              ))}
        </S.CarouselRow>

        <S.InfoRow>
          <S.InfoText>지금 가면 좋은 여행지</S.InfoText>
          <S.MoreText onClick={() => handleMoreClick("THEME" as MoreProps)}>
            더보기
          </S.MoreText>
        </S.InfoRow>
        <S.CarouselRow>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <S.CarouselWithText key={index}>
                  <CustomSkeleton
                    width="120px"
                    height="120px"
                    borderRadius="16px"
                  />
                </S.CarouselWithText>
              ))
            : themePlace?.map((item: placeApiProps) => (
                <S.CarouselWithText key={item.id}>
                  <ImageView src={testImg} alt={item.name} topText="여행지" />
                  <CarouselTitleBox name={item.name} subName={item.subName} />
                </S.CarouselWithText>
              ))}
        </S.CarouselRow>

        <S.InfoRow>
          <S.InfoText>사람들이 찜한 여행기</S.InfoText>
          <S.MoreText>더보기</S.MoreText>
        </S.InfoRow>
        <S.ReviewCol>
          <S.ReviewRow>
            <ImageView
              src={testImg}
              alt={"소금산 출렁다리"}
              width="85px"
              height="80px"
            />

            <S.ReviewTextCol>
              <S.ReviewTagRow>
                <S.ReviewTag>
                  <span>#안동</span>
                </S.ReviewTag>
                <S.ReviewTag>
                  <span>#2박3일</span>
                </S.ReviewTag>
              </S.ReviewTagRow>

              <p>안동 혼자 뚜벅이 여행 떠나기</p>

              <S.ReviewProfileRow>
                <S.ReviewProfile>
                  <img src={testImg} />
                  <span>coco1202</span>
                </S.ReviewProfile>

                <S.ReviewLikeCommentRow>
                  <S.LikeCommentBox>
                    <HeartIcon />
                    <span>26</span>
                  </S.LikeCommentBox>

                  <S.LikeCommentBox>
                    <CommentIcon />
                    <span>16</span>
                  </S.LikeCommentBox>
                </S.ReviewLikeCommentRow>
              </S.ReviewProfileRow>
            </S.ReviewTextCol>
          </S.ReviewRow>
          <S.ReviewRow>
            <ImageView
              src={testImg}
              alt={"소금산 출렁다리"}
              width="85px"
              height="80px"
            />

            <S.ReviewTextCol>
              <S.ReviewTagRow>
                <S.ReviewTag>
                  <span>#안동</span>
                </S.ReviewTag>
                <S.ReviewTag>
                  <span>#2박3일</span>
                </S.ReviewTag>
              </S.ReviewTagRow>

              <p>안동 혼자 뚜벅이 여행 떠나기</p>

              <S.ReviewProfileRow>
                <S.ReviewProfile>
                  <img src={testImg} />
                  <span>coco1202</span>
                </S.ReviewProfile>

                <S.ReviewLikeCommentRow>
                  <S.LikeCommentBox>
                    <HeartIcon />
                    <span>26</span>
                  </S.LikeCommentBox>

                  <S.LikeCommentBox>
                    <CommentIcon />
                    <span>16</span>
                  </S.LikeCommentBox>
                </S.ReviewLikeCommentRow>
              </S.ReviewProfileRow>
            </S.ReviewTextCol>
          </S.ReviewRow>
        </S.ReviewCol>

        <S.InfoRow>
          <S.InfoText>지금 뜨는 리뷰</S.InfoText>
          <S.MoreText>더보기</S.MoreText>
        </S.InfoRow>
        <S.ReviewCol>
          {review?.slice(0, 2).map((item: reviewApiProps) => (
            <S.ReviewRow key={item.id}>
              <ImageView src={testImg} alt={""} width="85px" height="80px" />

              <S.ReviewTextCol>
                <p>{item.subject}</p>
                <S.ReviewDetailText>{item.content}</S.ReviewDetailText>
                <S.ReviewProfileRow>
                  <S.ReviewProfile>
                    <img src={testImg} />
                    <span>{item.userCompactResDto.nickname}</span>
                  </S.ReviewProfile>

                  <S.ReviewLikeCommentRow>
                    <S.LikeCommentBox>
                      <StarIcon />
                      <span>{item.star}</span>
                    </S.LikeCommentBox>

                    <S.LikeCommentBox>
                      <CommentIcon />
                      <span>{item.commentCnt}</span>
                    </S.LikeCommentBox>
                  </S.ReviewLikeCommentRow>
                </S.ReviewProfileRow>
              </S.ReviewTextCol>
            </S.ReviewRow>
          ))}
        </S.ReviewCol>
      </S.HomeBody>
    </S.HomeContainer>
  );
}

const AddPlaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 5px 8px;
  min-height: 330px;
  & > h1 {
    text-align: center;
    color: ${(props) => props.theme.color.black};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

// 일정 있을 때
const AddPlaceCard = styled.div<{ $isSelect: boolean }>`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) =>
    props.$isSelect ? props.theme.color.gray200 : props.theme.color.white};
  padding: 0 16px;

  & > span:first-child {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
    flex: 1;
    white-space: nowrap;
  }

  & > div {
    flex: 3;
    font-size: 14px;
    color: ${(props) => props.theme.color.gray900};
    line-height: 150%;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
    flex: 0.5;
    white-space: nowrap;
  }
`;

const AddPlaceDayListRow = styled.div`
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 18px;
`;

const AddPlaceDayListBox = styled.div<{ $isSelect: boolean }>`
  width: 80px;
  height: 61px;
  border: 1px solid
    ${(props) =>
      props.$isSelect ? props.theme.color.main : props.theme.color.gray200};
  border-radius: 12px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  & > p {
    color: ${(props) =>
      props.$isSelect ? props.theme.color.main : props.theme.color.gray700};
    font-weight: 700;
    font-size: 14px;
  }

  & > span {
    color: ${(props) =>
      props.$isSelect ? props.theme.color.main : props.theme.color.gray400};
    font-weight: 500;
    font-size: 12px;
  }
`;

const AddPlaceButton = styled.button`
  width: 190px;
  height: 45px;
  padding: 12px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.main};
  margin-top: 30px;

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }
`;

// 일정 없을 때
const NoScheduleTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
  padding-bottom: 50px;
  flex: 1;
  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 16px;
    font-weight: 400;
  }
`;

const AddScheduleButton = styled.button`
  width: 190px;
  height: 45px;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray300};
  background-color: ${(props) => props.theme.color.white};

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    font-weight: 700;
  }
`;
