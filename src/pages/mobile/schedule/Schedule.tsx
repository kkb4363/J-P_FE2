import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import ScheduleIcon from "../../../assets/icons/ScheduleIcon";
import {
  InfoRow,
  InfoText,
  MoreText,
  scrollHidden,
  ReviewCol as SuggestionCol,
} from "../../../assets/styles/home.style";
import testImg from "../../../assets/images/testImg.png";
import ImageView from "../../../components/ImageView";
import BellIcon from "../../../assets/icons/BellIcon";
import CheckIcon from "../../../assets/icons/CheckIcon";
import { useNavigate } from "react-router-dom";
import CustomProfile from "../../../components/CustomProfile";
import { useEffect, useState } from "react";
import { getMySchedules } from "../../../service/axios";

export default function Schedule() {
  const navigate = useNavigate();

  const [mySchedules, setMySchedules] = useState([]);

  useEffect(() => {
    getMySchedules().then((res) => {
      if (res) {
        setMySchedules(res?.data?.data);
      }
    });
  });

  return (
    <ScheduleContainer>
      <CustomHeader title="일정" hidePrevIcon={true}>
        <ScheduleLayout onClick={() => navigate("/Schedule")}>
          <ScheduleIcon />
          <span>일정 생성</span>
        </ScheduleLayout>
      </CustomHeader>

      {/* 일정이 없는 경우 */}
      <ScheduleBody>
        <InfoRow>
          <InfoText>내 일정</InfoText>
        </InfoRow>

        <NoSchedule>
          <ScheduleIcon stroke="#b8b8b8" />
          <span>일정이 없어요. 새로운 여행 일정을 추가해요!</span>
        </NoSchedule>

        <InfoRow>
          <InfoText>여행 일정 추천</InfoText>
          <MoreText onClick={() => navigate("/home/travels")}>더보기</MoreText>
        </InfoRow>

        <SuggestionCol>
          <SuggestionBox>
            <ImageView
              src={testImg}
              alt="여행 일정 추천 이미지"
              width="80px"
              height="80px"
            />

            <SuggestTextCol>
              <CustomProfile
                src={testImg}
                nickname="Minah"
                content="1박 2일"
                fontSize="12px"
              />

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
              <CustomProfile
                src={testImg}
                nickname="Minah"
                content="1박 2일"
                fontSize="12px"
              />

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
              <CustomProfile
                src={testImg}
                nickname="Minah"
                content="1박 2일"
                fontSize="12px"
              />

              <p>남해로 힐링 여행 떠나기</p>

              <div>
                <span>#한려해상국립공원</span>
                <span>#바람흔적미술관</span>
              </div>
            </SuggestTextCol>
          </SuggestionBox>
        </SuggestionCol>

        <MoreButtonBox>
          <AlarmButton>
            <BellIcon stroke="#fff" width="18" height="18" />
            <span>초대 알림</span>
          </AlarmButton>
        </MoreButtonBox>
      </ScheduleBody>

      {/* 일정이 있는 경우 */}
      {/* <ScheduleBody2>
        <p>내 일정</p>

        <ScheduleCol>
          <ScheduleCard>
            <ImageView src={testImg} alt="일정" width="66px" height="66px" />

            <TextCol>
              <p>남해 여행</p>
              <div>
                <ScheduleIcon stroke="#4d4d4d" />
                <span>4.17 ~ 4.19</span>
              </div>
            </TextCol>

            <VisibilityToggle>
              <CheckIcon />
              <span>공개</span>
            </VisibilityToggle>
          </ScheduleCard>
        </ScheduleCol>

        <MoreButtonBox>
          <AlarmButton>
            <BellIcon stroke="#fff" width="18" height="18" />
            <span>초대 알림</span>
          </AlarmButton>
        </MoreButtonBox>
      </ScheduleBody2> */}
    </ScheduleContainer>
  );
}

const ScheduleContainer = styled.div`
  overflow: auto;
  ${scrollHidden};
  height: 100%;
`;

const ScheduleLayout = styled.div`
  min-width: 60px;
  display: flex;
  gap: 3px;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.secondary};
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
  }
`;

export const ScheduleBody = styled.div`
  padding: 0 20px;
  height: calc(100% - 50px - 20px);
`;

const NoSchedule = styled.div`
  padding: 32px 0 70px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
    font-weight: 400;
    white-space: nowrap;
  }
`;

export const SuggestionBox = styled.div`
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100px;
  padding: 0 12px;
`;

export const SuggestTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  overflow: hidden;
  & > div:first-child {
    display: flex;
    gap: 6px;
    align-items: center;
    color: ${(props) => props.theme.color.gray900};
    font-size: 12px;
    & > img {
      width: 18px;
      height: 18px;
      border-radius: 9px;
    }
    & > span {
      color: ${(props) => props.theme.color.gray500};
      font-size: 12px;
    }
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-weight: 700;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & > div:last-child {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    gap: 3px;
    align-items: center;

    & > span {
      color: ${(props) => props.theme.color.secondary};
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

const MoreButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 55px 0;
  position: relative;
`;

const AlarmButton = styled.button`
  position: absolute;
  right: 0;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 8px 12px;
  min-height: 44px;
  background-color: ${(props) => props.theme.color.main};
  border-radius: 30px;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 14px;
    font-weight: 600;
  }
`;

const ScheduleBody2 = styled.div`
  padding: 0 20px;
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }
`;

const ScheduleCol = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const ScheduleCard = styled.div`
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  height: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const TextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  flex: 1;
  padding-left: 20px;

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 3px;

    & > span {
      color: ${(props) => props.theme.color.gray700};
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

const VisibilityToggle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
    font-weight: 400;
  }
`;
