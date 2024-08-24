import { useNavigate } from "react-router-dom";
import CustomHeader from "../../../components/mobile/CustomHeader";
import {
  scrollHidden,
  ReviewCol as SuggestionCol,
} from "../../../assets/styles/home.style";
import { SuggestionBox, SuggestTextCol } from "./Schedule";
import ImageView from "../../../components/mobile/ImageView";
import testImg from "../../../assets/images/testImg.png";
import styled from "styled-components";

export default function TravelMore() {
  const navigate = useNavigate();
  return (
    <>
      <CustomHeader title="여행 일정 추천" handleClick={() => navigate(-1)} />
      <TravelMoreBody>
        <SuggestionCol>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <div>
                <img src={testImg} alt="user" />
                Minah
                <span>| 1박 2일</span>
              </div>

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <div>
                <img src={testImg} alt="user" />
                Minah
                <span>| 1박 2일</span>
              </div>

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <div>
                <img src={testImg} alt="user" />
                Minah
                <span>| 1박 2일</span>
              </div>

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <div>
                <img src={testImg} alt="user" />
                Minah
                <span>| 1박 2일</span>
              </div>

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <div>
                <img src={testImg} alt="user" />
                Minah
                <span>| 1박 2일</span>
              </div>

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <div>
                <img src={testImg} alt="user" />
                Minah
                <span>| 1박 2일</span>
              </div>

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <div>
                <img src={testImg} alt="user" />
                Minah
                <span>| 1박 2일</span>
              </div>

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <div>
                <img src={testImg} alt="user" />
                Minah
                <span>| 1박 2일</span>
              </div>

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
        </SuggestionCol>
      </TravelMoreBody>
    </>
  );
}

const TravelMoreBody = styled.div`
  padding: 0 20px;
  height: calc(100% - 50px - 20px);
  overflow-y: auto;
  ${scrollHidden};
`;