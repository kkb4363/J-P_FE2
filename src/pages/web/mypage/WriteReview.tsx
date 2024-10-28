import styled from "styled-components";
import Container from "../../../components/web/Container";
import MarkIcon from "../../../assets/icons/MarkIcon";
import ActionButton from "../../../components/ActionButton";
import PlusIcon from "../../../assets/icons/PlusIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import { useEffect, useState } from "react";
import { HalfStarIcon } from "../../../assets/icons/HalfStarIcon";
import { InfoText, SuccessModalContainer, TextBox } from "./WriteTravelouge";
import ImageAddIcon from "../../../assets/icons/ImageAddIcon";
import useImagesUploadHook from "../../../hooks/useImagesUpload";
import XIcon from "../../../assets/icons/XIcon";
import { scrollHidden } from "../../../assets/styles/home.style";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/PrimaryButton";
import OneButtonModal from "../../../components/OneButtonModal";
import { useModalStore } from "../../../store/modal.store";

export default function WriteReview() {
  const {
    imageRef,
    images,
    handleImageChange,
    handleButtonClick,
    handleImageDelete,
  } = useImagesUploadHook();

  const { setCurrentModal } = useModalStore();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [ratingFixed, setRatingFixed] = useState(rating);

  const handleLeftHalfEnter = (idx: number) => {
    setRating(idx + 0.5);
  };
  const handleRightHalfEnter = (idx: number) => setRating(idx + 1);

  const handleRatingClick = () => {
    setRatingFixed(rating);
  };

  const handleRatingLeave = () => {
    if (rating !== ratingFixed) {
      setRating(ratingFixed);
    }
  };

  return (
    <>
      <Container>
        <h1>리뷰 쓰기</h1>

        <MarkerBox>
          <div>
            <MarkIcon stroke="#6979f8" />
          </div>
        </MarkerBox>

        <AddPlaceBtnBox>
          <ActionButton
            add={true}
            onClick={() => setCurrentModal("selectPlace")}
          >
            <PlusIcon />
            장소 등록
          </ActionButton>
        </AddPlaceBtnBox>

        <SubText>방문한 여행지는 어떠셨나요?</SubText>

        <RatingRow>
          {Array(5)
            .fill(0)
            .map((_, idx) => (
              <StarBox
                key={`starbox-${idx}`}
                onClick={() => handleRatingClick()}
              >
                <DefaultStar>
                  <StarIcon
                    key={`defaultstar-${idx}`}
                    width="32"
                    height="32"
                    fill="lightgray"
                    stroke="lightgray"
                  />
                </DefaultStar>
                {rating - Math.floor(rating) === 0.5 &&
                Math.floor(rating) === idx ? (
                  <HalfStarIcon
                    key={`halfstar-${idx}`}
                    width="32"
                    height="32"
                  />
                ) : idx + 1 > rating ? (
                  <StarIcon
                    key={`emptystar-${idx}`}
                    width="32"
                    height="32"
                    fill="lightgray"
                    stroke="lightgray"
                  />
                ) : (
                  <StarIcon key={`fullstar-${idx}`} width="32" height="32" />
                )}

                <StarLeft
                  key={`starleft-${idx}`}
                  onMouseEnter={() => handleLeftHalfEnter(idx)}
                  onMouseLeave={handleRatingLeave}
                />
                <StarRight
                  key={`starright-${idx}`}
                  onMouseEnter={() => handleRightHalfEnter(idx)}
                  onMouseLeave={handleRatingLeave}
                />
              </StarBox>
            ))}
        </RatingRow>

        <TextBox>
          <textarea placeholder="여행지의 리뷰를 남겨주세요!" />
          <InfoText>최소 50자</InfoText>
        </TextBox>

        <ImageRow>
          <AddImgBtn onClick={handleButtonClick}>
            <PlusIcon stroke="#b8b8b8" />
            <input
              hidden
              type="file"
              accept="images/*"
              onChange={handleImageChange}
              ref={imageRef}
            />
          </AddImgBtn>

          {images.length === 0 ? (
            <ImageBox>
              <div>
                <ImageAddIcon />
                이미지 첨부
              </div>
            </ImageBox>
          ) : (
            images?.map((img, idx) => (
              <ImageBox key={idx}>
                <img src={URL.createObjectURL(img)} alt="review" />
                <DeleteImgBtn
                  onClick={() => handleImageDelete(img.lastModified)}
                >
                  <XIcon stroke="#e6e6e6" />
                </DeleteImgBtn>
              </ImageBox>
            ))
          )}
        </ImageRow>

        <ImgInfo>(최대 10장)</ImgInfo>

        <ButtonsRow>
          <PrimaryButton
            width="120px"
            text="임시저장"
            onClick={() => toast(<span>임시 저장되었습니다.</span>)}
            secondary={true}
          />
          <PrimaryButton
            width="120px"
            text="완료"
            onClick={() => setOpenSuccess(true)}
            blue={true}
          />
        </ButtonsRow>
      </Container>
      {openSuccess && (
        <OneButtonModal
          buttonText="확인"
          onClick={() => setOpenSuccess(false)}
          onClose={() => setOpenSuccess(false)}
          width="360px"
          height="260px"
        >
          <SuccessModalContainer>
            <h1>리뷰 등록이 완료되었습니다!</h1>
            <p>다른 여행객들에게도 도움이 될 거에요.</p>
          </SuccessModalContainer>
        </OneButtonModal>
      )}
    </>
  );
}

const MarkerBox = styled.div`
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 86px;
    height: 86px;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.theme.color.gray100};
    background-color: ${(props) => props.theme.color.gray100};
  }
`;

const AddPlaceBtnBox = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubText = styled.p`
  margin-top: 24px;
  color: ${(props) => props.theme.color.gray900};
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

const RatingRow = styled.div`
  margin-top: 12px;
  margin-bottom: 45px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const StarBox = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  & > svg {
    position: absolute;
    z-index: 1;
  }
`;

const StarLeft = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  cursor: pointer;
`;

const StarRight = styled.div`
  width: 50%;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  cursor: pointer;
`;

const DefaultStar = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
`;

const AddImgBtn = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.gray100};
`;

const ImgInfo = styled.p`
  margin-top: 17px;
  margin-left: 60px;

  color: ${(props) => props.theme.color.gray300};
  font-size: 12px;
`;

const ImageRow = styled.div`
  margin-top: calc(45px - 9px);
  margin-left: 5px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  min-height: 200px;
  overflow-x: auto;
`;

const ImageBox = styled.div`
  width: 183px;
  min-width: 183px;
  height: 166px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.gray100};
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }

  & > div {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.gray300};
    font-size: 12px;
  }
`;

const DeleteImgBtn = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: -9px;
  top: -9px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;
`;

const ButtonsRow = styled.div`
  margin-top: 67px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
