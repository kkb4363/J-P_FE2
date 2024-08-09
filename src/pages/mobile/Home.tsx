import CustomInput from "../../components/mobile/CustomInput";
import BellIcon from "../../icons/BellIcon";
import ImageView from "../../components/mobile/ImageView";
import CommentIcon from "../../icons/CommentIcon";
import HeartIcon from "../../icons/HeartIcon";
import StarIcon from "../../icons/StarIcon";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { placeApiProps, reviewApiProps } from "../../types/home";
import {
  CarouselLocationTitle,
  CarouselRow,
  CarouselTitle,
  CarouselWithText,
  HomeBody,
  HomeContainer,
  HomeHeader,
  InfoRow,
  InfoText,
  LikeCommentBox,
  MoreText,
  ReviewCol,
  ReviewDetailText,
  ReviewLikeCommentRow,
  ReviewProfile,
  ReviewProfileRow,
  ReviewRow,
  ReviewTag,
  ReviewTagRow,
  ReviewTextCol,
} from "../../styles/home.style";

export default function Home() {
  // 인기 여행지
  const [travelPlace, setTravelPlace] = useState([]);
  // 인기 도시
  const [city, setCity] = useState([]);
  // 테마별 여행지
  const [themePlace, setThemePlace] = useState([]);

  // TODO : 사람들이 찜한 여행기 api 요청 해야함
  // const [lovePlace, setLovePlace] = useState([]);

  // 지금 뜨는 리뷰
  const [review, setReview] = useState([]);

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
      }
    };

    requestApi();
  }, []);

  return (
    <HomeContainer>
      <HomeHeader>
        <div>Logo</div>
        <BellIcon />
      </HomeHeader>

      <CustomInput text="여행지를 입력해주세요" />

      <HomeBody>
        <InfoRow>
          <InfoText>지금 가장 인기있는 여행지</InfoText>
          <MoreText>더보기</MoreText>
        </InfoRow>
        <CarouselRow>
          {travelPlace?.map((item: placeApiProps) => (
            <CarouselWithText key={item.id}>
              <ImageView
                src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
                alt={item.name}
              />

              <CarouselTitle>{item.name}</CarouselTitle>
              <CarouselLocationTitle>{item.subName}</CarouselLocationTitle>
            </CarouselWithText>
          ))}
        </CarouselRow>

        <InfoRow>
          <InfoText>인기 여행 도시</InfoText>
          <MoreText>더보기</MoreText>
        </InfoRow>
        <CarouselRow>
          {city?.map((item: placeApiProps) => (
            <ImageView
              key={item.id}
              src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              alt={item.name}
              bottomText={item.name}
            />
          ))}
        </CarouselRow>

        <InfoRow>
          <InfoText>지금 가면 좋은 여행지</InfoText>
          <MoreText>더보기</MoreText>
        </InfoRow>
        <CarouselRow>
          {themePlace?.map((item: placeApiProps) => (
            <CarouselWithText key={item.id}>
              <ImageView
                src={
                  "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
                }
                alt={item.name}
                topText="여행지"
              />
              <CarouselTitle>{item.name}</CarouselTitle>
              <CarouselLocationTitle>{item.subName}</CarouselLocationTitle>
            </CarouselWithText>
          ))}
        </CarouselRow>

        <InfoRow>
          <InfoText>사람들이 찜한 여행기</InfoText>
          <MoreText>더보기</MoreText>
        </InfoRow>
        <ReviewCol>
          <ReviewRow>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
              width="85px"
              height="80px"
            />

            <ReviewTextCol>
              <ReviewTagRow>
                <ReviewTag>
                  <span>#안동</span>
                </ReviewTag>
                <ReviewTag>
                  <span>#2박3일</span>
                </ReviewTag>
              </ReviewTagRow>

              <p>안동 혼자 뚜벅이 여행 떠나기</p>

              <ReviewProfileRow>
                <ReviewProfile>
                  <img src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__" />
                  <span>coco1202</span>
                </ReviewProfile>

                <ReviewLikeCommentRow>
                  <LikeCommentBox>
                    <HeartIcon />
                    <span>26</span>
                  </LikeCommentBox>

                  <LikeCommentBox>
                    <CommentIcon />
                    <span>16</span>
                  </LikeCommentBox>
                </ReviewLikeCommentRow>
              </ReviewProfileRow>
            </ReviewTextCol>
          </ReviewRow>
          <ReviewRow>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
              width="85px"
              height="80px"
            />

            <ReviewTextCol>
              <ReviewTagRow>
                <ReviewTag>
                  <span>#안동</span>
                </ReviewTag>
                <ReviewTag>
                  <span>#2박3일</span>
                </ReviewTag>
              </ReviewTagRow>

              <p>안동 혼자 뚜벅이 여행 떠나기</p>

              <ReviewProfileRow>
                <ReviewProfile>
                  <img src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__" />
                  <span>coco1202</span>
                </ReviewProfile>

                <ReviewLikeCommentRow>
                  <LikeCommentBox>
                    <HeartIcon />
                    <span>26</span>
                  </LikeCommentBox>

                  <LikeCommentBox>
                    <CommentIcon />
                    <span>16</span>
                  </LikeCommentBox>
                </ReviewLikeCommentRow>
              </ReviewProfileRow>
            </ReviewTextCol>
          </ReviewRow>
        </ReviewCol>

        <InfoRow>
          <InfoText>지금 뜨는 리뷰</InfoText>
          <MoreText>더보기</MoreText>
        </InfoRow>
        <ReviewCol>
          {review?.slice(0, 2).map((item: reviewApiProps) => (
            <ReviewRow key={item.id}>
              <ImageView
                src={
                  "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
                }
                alt={""}
                width="85px"
                height="80px"
              />

              <ReviewTextCol>
                <p>{item.subject}</p>
                <ReviewDetailText>{item.content}</ReviewDetailText>
                <ReviewProfileRow>
                  <ReviewProfile>
                    <img src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__" />
                    <span>{item.userCompactResDto.nickname}</span>
                  </ReviewProfile>

                  <ReviewLikeCommentRow>
                    <LikeCommentBox>
                      <StarIcon />
                      <span>{item.star}</span>
                    </LikeCommentBox>

                    <LikeCommentBox>
                      <CommentIcon />
                      <span>{item.commentCnt}</span>
                    </LikeCommentBox>
                  </ReviewLikeCommentRow>
                </ReviewProfileRow>
              </ReviewTextCol>
            </ReviewRow>
          ))}
        </ReviewCol>
      </HomeBody>
    </HomeContainer>
  );
}
