import CustomInput from "../../../components/mobile/CustomInput";
import BellIcon from "../../../assets/icons/BellIcon";
import ImageView from "../../../components/mobile/ImageView";
import CommentIcon from "../../../assets/icons/CommentIcon";
import HeartIcon from "../../../assets/icons/HeartIcon";
import * as S from "../../../assets/styles/home.style";
import { useNavigate } from "react-router-dom";
import testImg from "../../../assets/images/testImg.png";
import "react-toastify/dist/ReactToastify.css";
import CustomProfile from "../../../components/mobile/CustomProfile";
import HashtagsBox from "../../../components/mobile/HashtagsBox";
import CardSlide from "../../../components/mobile/home/CardSlide";
import TitleMoreBox from "../../../components/mobile/home/TitleMoreBox";

export type MoreProps = "TRAVEL_PLACE" | "CITY" | "THEME";

export default function Home() {
  const navigate = useNavigate();

  return (
    <S.HomeContainer>
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
        <TitleMoreBox
          title="지금 가장 인기있는 여행지"
          moreType="TRAVEL_PLACE"
        />
        <CardSlide placeType="TRAVEL_PLACE" />

        <TitleMoreBox title="인기 여행 도시" moreType="CITY" />
        <CardSlide placeType="CITY" isCity={true} bottomText={true} />

        <TitleMoreBox title="지금 가면 좋은 여행지" moreType="THEME" />
        <CardSlide placeType="THEME" topText={true} />

        <TitleMoreBox title="사람들이 찜한 여행기" moreType="CITY" />
        <S.ReviewCol>
          <S.ReviewRow>
            <ImageView
              src={testImg}
              alt={"소금산 출렁다리"}
              width="85px"
              height="80px"
            />

            <S.ReviewTextCol>
              <HashtagsBox hashTags={["안동", "2박3일"]} />
              <p>안동 혼자 뚜벅이 여행 떠나기</p>

              <S.ReviewProfileRow>
                <CustomProfile
                  src={testImg}
                  nickname="coco1202"
                  fontSize="12px"
                />

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
              <HashtagsBox hashTags={["안동", "2박3일"]} />

              <p>안동 혼자 뚜벅이 여행 떠나기</p>

              <S.ReviewProfileRow>
                <CustomProfile
                  src={testImg}
                  nickname="coco1202"
                  fontSize="12px"
                />

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

        <TitleMoreBox title="지금 뜨는 리뷰" moreType="CITY" />
        {/* <S.ReviewCol>
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
        </S.ReviewCol> */}
      </S.HomeBody>
    </S.HomeContainer>
  );
}
