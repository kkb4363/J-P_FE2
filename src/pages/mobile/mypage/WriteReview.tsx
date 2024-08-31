import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import MarkIcon from "../../../assets/icons/MarkIcon";
import ActionButton from "../../../components/mobile/ActionButton";
import StarIcon from "../../../assets/icons/StarIcon";
import { useState } from "react";

export default function WriteReview() {
  const [star, setStar] = useState(0);

  return (
    <>
      <CustomHeader title="리뷰 작성">
        <HeaderText>완료</HeaderText>
      </CustomHeader>

      <WriteReviewBody>
        <MarkerBox>
          <Marker>
            <MarkIcon width="20" height="20" />
          </Marker>
        </MarkerBox>

        <ActionButtonBox>
          <ActionButton add={true}>+ 장소 등록</ActionButton>
        </ActionButtonBox>

        <InfoText>방문한 여행지는 어떠셨나요?</InfoText>

        <StarRow>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} onClick={() => setStar(idx + 1)}>
              <StarIcon
                width="32"
                height="32"
                fill={idx < star ? "#ffd990" : "#e6e6e6"}
                stroke={idx < star ? "#ffd990" : "#e6e6e6"}
              />
            </div>
          ))}
        </StarRow>

        <TitleInputBox>
          <input placeholder="제목을 작성해주세요" />
        </TitleInputBox>

        <TextAreaBox>
          <textarea placeholder="여행지의 리뷰를 남겨주세요!" />
          <span>최소 50자</span>
        </TextAreaBox>
      </WriteReviewBody>
    </>
  );
}

const HeaderText = styled.span`
  color: ${(props) => props.theme.color.gray500};
  font-size: 14px;
  font-weight: 700;
`;

const WriteReviewBody = styled.div`
  height: calc(100dvh - 50px - 20px);
  box-sizing: border-box;
  padding: 0 16px;
`;

const MarkerBox = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Marker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  border-radius: 50px;
  border: 1px solid ${(props) => props.theme.color.gray100};
  background-color: ${(props) => props.theme.color.gray100};
`;

const ActionButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15px 0 21px 0;
`;

const InfoText = styled.p`
  text-align: center;
  color: ${(props) => props.theme.color.black};
  font-size: 14px;
  font-weight: 500;

  margin-bottom: 10px;
`;

const StarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const TitleInputBox = styled.div`
  height: 45px;

  margin: 26px 0 22px 0;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  padding: 0 30px;

  & > input {
    width: 100%;
    height: 100%;
    background-color: transparent;

    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
    font-weight: 400;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
      font-size: 14px;
      font-weight: 400;
    }

    &:hover {
      outline: none;
    }
  }
`;

const TextAreaBox = styled.div`
  height: 200px;
  padding: 30px;
  position: relative;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};

  & > textarea {
    width: 100%;
    height: 100%;
    background-color: transparent;
    resize: none;
    border: none;
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
    font-weight: 400;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
      font-size: 14px;
      font-weight: 400;
    }

    &:hover {
      outline: none;
    }
  }

  & > span {
    position: absolute;
    right: 30px;
    bottom: 20px;

    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
    font-weight: 400;
  }
`;

const ImgAddBox = styled.div``;
