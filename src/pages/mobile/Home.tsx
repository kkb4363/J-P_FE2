import styled from "styled-components";
import CustomInput from "../../components/mobile/CustomInput";
import BellIcon from "../../icons/BellIcon";
import ImageView from "../../components/mobile/ImageView";
import CommentIcon from "../../icons/CommentIcon";
import HeartIcon from "../../icons/HeartIcon";
import StarIcon from "../../icons/StarIcon";

export default function Home() {
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
          <CarouselWithText>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
            />
            <CarouselTitle>소금산 출렁다리</CarouselTitle>
            <CarouselLocationTitle>강원도 원주</CarouselLocationTitle>
          </CarouselWithText>
          <CarouselWithText>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
            />
            <CarouselTitle>소금산 출렁다리</CarouselTitle>
            <CarouselLocationTitle>강원도 원주</CarouselLocationTitle>
          </CarouselWithText>
          <CarouselWithText>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
            />
            <CarouselTitle>소금산 출렁다리</CarouselTitle>
            <CarouselLocationTitle>강원도 원주</CarouselLocationTitle>
          </CarouselWithText>
          <CarouselWithText>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
            />
            <CarouselTitle>소금산 출렁다리</CarouselTitle>
            <CarouselLocationTitle>강원도 원주</CarouselLocationTitle>
          </CarouselWithText>
        </CarouselRow>

        <InfoRow>
          <InfoText>인기 여행 도시</InfoText>
          <MoreText>더보기</MoreText>
        </InfoRow>
        <CarouselRow>
          <ImageView
            src={
              "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
            }
            alt={"소금산 출렁다리"}
            bottomText="고성"
          />
          <ImageView
            src={
              "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
            }
            alt={"소금산 출렁다리"}
            bottomText="경주"
          />
          <ImageView
            src={
              "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
            }
            alt={"소금산 출렁다리"}
            bottomText="부산"
          />
        </CarouselRow>

        <InfoRow>
          <InfoText>지금 가면 좋은 여행지</InfoText>
          <MoreText>더보기</MoreText>
        </InfoRow>
        <CarouselRow>
          <CarouselWithText>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
              topText="여행지"
            />
            <CarouselTitle>소금산 출렁다리</CarouselTitle>
            <CarouselLocationTitle>강원도 원주</CarouselLocationTitle>
          </CarouselWithText>
          <CarouselWithText>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
              topText="여행지"
            />
            <CarouselTitle>소금산 출렁다리</CarouselTitle>
            <CarouselLocationTitle>강원도 원주</CarouselLocationTitle>
          </CarouselWithText>
          <CarouselWithText>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
              topText="여행지"
            />
            <CarouselTitle>소금산 출렁다리</CarouselTitle>
            <CarouselLocationTitle>강원도 원주</CarouselLocationTitle>
          </CarouselWithText>
          <CarouselWithText>
            <ImageView
              src={
                "https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__"
              }
              alt={"소금산 출렁다리"}
              topText="여행지"
            />
            <CarouselTitle>소금산 출렁다리</CarouselTitle>
            <CarouselLocationTitle>강원도 원주</CarouselLocationTitle>
          </CarouselWithText>
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
              <p>안동 혼자 뚜벅이 여행 떠나기</p>
              <ReviewDetailText>
                자연의 힐링을 동시에 누릴 수 있는 최고의
              </ReviewDetailText>
              <ReviewProfileRow>
                <ReviewProfile>
                  <img src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__" />
                  <span>coco1202</span>
                </ReviewProfile>

                <ReviewLikeCommentRow>
                  <LikeCommentBox>
                    <StarIcon />
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
              <p>안동 혼자 뚜벅이 여행 떠나기</p>
              <ReviewDetailText>
                자연의 힐링을 동시에 누릴 수 있는 최고의
              </ReviewDetailText>
              <ReviewProfileRow>
                <ReviewProfile>
                  <img src="https://s3-alpha-sig.figma.com/img/82ac/4f82/5cbe8bae096f592edde440a9ff3651d1?Expires=1724025600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kSD35h8~WYXG1blwZdEu4473T9uNBFlr709crKwRGGPGuAWKCB1CzUK8el5vW22KvP3dXxSVxAFiOxfhneviqZTNbyJvlMuieSmS2Pcn~QnpccTnipv~rEIt4ZX7wlt7Aczfmc7kdNf0inS1Qai~XEcPJbbGE9hYufKcwEPulB5Vq71WdUVj3Ba4UjSUxZWIS3iQFsSHNWXCXAC105FDXX7F6nH6MjWx9rgNfNii63vkQZLyUI0YmUUq9ksU06qHLCCKpFzeL541OQX763sqwck~j2GIshgYYSNefXf37ArW85Wprh7MY83~s~0O4ZvHEe4ybLEuLAthZgdIBqvznw__" />
                  <span>coco1202</span>
                </ReviewProfile>

                <ReviewLikeCommentRow>
                  <LikeCommentBox>
                    <StarIcon />
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
      </HomeBody>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  padding: 0 18px 18px 18px;
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const HomeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 10px 0;
`;

const HomeBody = styled.div`
  flex: 1;
  height: calc(100% - 50px - 45px);
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 12px 0;
`;

const InfoText = styled.span`
  color: #1a1a1a;
  font-size: 20px;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const MoreText = styled.span`
  color: #b8b8b8;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const CarouselRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const CarouselWithText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CarouselTitle = styled.span`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const CarouselLocationTitle = styled.span`
  color: #666;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-transform: capitalize;
`;

const ReviewCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const ReviewRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ReviewTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;

  & > span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & > p {
    color: #1a1a1a;
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
  }
`;

const ReviewTagRow = styled.div`
  display: flex;
  gap: 3px;
`;

const ReviewTag = styled.div`
  border-radius: 16px;
  border: 1px solid #4d4d4d;
  background: #fff;
  display: flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  & > span {
    color: #4d4d4d;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const ReviewProfileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReviewProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  & > span {
    color: #1a1a1a;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const ReviewLikeCommentRow = styled.div`
  display: flex;
  gap: 8px;
`;

const LikeCommentBox = styled.div`
  gap: 3px;
  display: flex;

  & > span {
    color: #b8b8b8;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }
`;

const ReviewDetailText = styled.span`
  color: #1a1a1a;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
