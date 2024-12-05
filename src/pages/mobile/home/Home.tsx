import CustomInput from "../../../components/CustomInput";
import BellIcon from "../../../assets/icons/BellIcon";
import * as S from "../../../assets/styles/home.style";
import { useNavigate } from "react-router-dom";
import CardSlide from "../../../components/mobile/home/CardSlide";
import TitleMoreBox from "../../../components/mobile/home/TitleMoreBox";
import TravelogueCard from "../../../components/mobile/home/TravelogueCard";
import logoImg from "../../../assets/images/logo.png";

export type MoreProps = "TRAVEL_PLACE" | "CITY" | "THEME";

export default function Home() {
  const navigate = useNavigate();

  const handleMore = (type: MoreProps) => {
    navigate("more", {
      state: {
        type: type,
      },
    });
  };

  return (
    <S.HomeContainer>
      <S.HomeHeader>
        <img src={logoImg} alt="로고이미지" />
        <BellIcon />
      </S.HomeHeader>

      <CustomInput
        text="여행지를 입력해주세요"
        onClick={() => navigate("/home/search")}
        value=""
        onChange={() => {}}
      />

      <S.HomeBody>
        <TitleMoreBox
          title="지금 가장 인기있는 여행지"
          handleClick={() => handleMore("TRAVEL_PLACE")}
        />
        <CardSlide placeType="TRAVEL_PLACE" />

        <TitleMoreBox
          title="인기 여행 도시"
          handleClick={() => handleMore("CITY")}
        />
        <CardSlide placeType="CITY" bottomText={true} />

        <TitleMoreBox
          title="지금 가면 좋은 여행지"
          handleClick={() => handleMore("THEME")}
        />
        <CardSlide placeType="THEME" topText={true} />

        <TitleMoreBox title="사람들이 찜한 여행기" handleClick={() => {}} />
        <S.ReviewCol>
          <TravelogueCard />
          <TravelogueCard />
        </S.ReviewCol>

        <TitleMoreBox title="지금 뜨는 리뷰" handleClick={() => {}} />
        {/* <S.ReviewCol>
          {review?.slice(0, 2).map((item: ReviewProps) => (
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
        </S.ReviewCol> */}
      </S.HomeBody>
    </S.HomeContainer>
  );
}
