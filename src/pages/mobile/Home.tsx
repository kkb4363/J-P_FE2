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

type MoreProps = "travel-place" | "city" | "theme-place";

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
    navigate(`${type}`);
  };

  useEffect(() => {
    const requestApi = async () => {
      try {
        const [travelPlaceRes, cityRes, themePlaceRes, reviewRes] = await Promise.all([
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

  return (
    <S.HomeContainer>
      <BottomSheet minH={6} maxH={0.8}>
        <div>Testing Bottom Sheet...</div>
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
          <S.MoreText onClick={() => handleMoreClick("travel-place" as MoreProps)}>
            더보기
          </S.MoreText>
        </S.InfoRow>
        <S.CarouselRow>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <S.CarouselWithText key={index}>
                  <CustomSkeleton width="120px" height="120px" borderRadius="16px" />
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
          <S.MoreText onClick={() => handleMoreClick("city" as MoreProps)}>
            더보기
          </S.MoreText>
        </S.InfoRow>
        <S.CarouselRow>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <S.CarouselWithText key={index}>
                  <CustomSkeleton width="120px" height="120px" borderRadius="16px" />
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
          <S.MoreText onClick={() => handleMoreClick("theme-place" as MoreProps)}>
            더보기
          </S.MoreText>
        </S.InfoRow>
        <S.CarouselRow>
          {loading
            ? Array.from({ length: 3 }).map((_, index) => (
                <S.CarouselWithText key={index}>
                  <CustomSkeleton width="120px" height="120px" borderRadius="16px" />
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
            <ImageView src={testImg} alt={"소금산 출렁다리"} width="85px" height="80px" />

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
            <ImageView src={testImg} alt={"소금산 출렁다리"} width="85px" height="80px" />

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
