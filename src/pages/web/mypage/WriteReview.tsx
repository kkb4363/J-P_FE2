import styled from "styled-components";
import Container from "../../../components/web/Container";
import MarkIcon from "../../../assets/icons/MarkIcon";
import ActionButton from "../../../components/ActionButton";
import PlusIcon from "../../../assets/icons/PlusIcon";
import StarIcon from "../../../assets/icons/StarIcon";
import { useEffect, useRef, useState } from "react";
import { HalfStarIcon } from "../../../assets/icons/HalfStarIcon";
import { InfoText, SuccessModalContainer, TextBox } from "./WriteTravelouge";
import ImageAddIcon from "../../../assets/icons/ImageAddIcon";
import useImagesUploadHook from "../../../hooks/useImagesUpload";
import XIcon from "../../../assets/icons/XIcon";
import { toast } from "react-toastify";
import PrimaryButton from "../../../components/PrimaryButton";
import OneButtonModal from "../../../components/OneButtonModal";
import { useModalStore } from "../../../store/modal.store";
import { useWriteReviewStore } from "../../../store/writeReview.store";
import {
  createReview,
  getReviewDetail,
  updateReview,
  uploadFiles,
} from "../../../service/axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function WriteReview() {
  const {
    imageRef,
    images,
    handleImageChange,
    handleButtonClick,
    handleImageDelete,
  } = useImagesUploadHook();
  const navigate = useNavigate();
  const writeReviewStore = useWriteReviewStore();

  const [form, setForm] = useState({
    content: "",
    star: 0,
    imgs: [],
  });

  const { setCurrentModal } = useModalStore();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [ratingFixed, setRatingFixed] = useState(form.star);

  const handleLeftHalfEnter = (idx: number) => {
    setForm((p) => ({ ...p, star: idx + 0.5 }));
  };
  const handleRightHalfEnter = (idx: number) =>
    setForm((p) => ({ ...p, star: idx + 1 }));
  const handleRatingClick = () => {
    setRatingFixed(form.star);
  };
  const handleRatingLeave = () => {
    if (form.star !== ratingFixed) {
      setForm((p) => ({ ...p, star: ratingFixed }));
    }
  };

  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (images.length !== 0 && contentRef.current) {
      uploadFiles(images, "REVIEW").then((res) => {
        if (res) {
          if (isEdit) {
            const body = {
              subject: writeReviewStore.getSelectedPlace(),
              content: contentRef?.current?.value,
              placeId: writeReviewStore.getSelectedPlaceId(),
              star: form.star,
              newFileIds: res.data.data.map((file: any) => file.fileId),
            };

            updateReview(body, isEdit).then((res) => {
              if (res?.status === 200) setOpenSuccess(true);
            });
          } else {
            const body = {
              subject: writeReviewStore.getSelectedPlace(),
              content: contentRef?.current?.value,
              placeId: writeReviewStore.getSelectedPlaceId(),
              star: form.star,
              fileIds: res.data.data.map((file: any) => file.fileId),
            };

            createReview(body).then((res) => {
              if (res?.status === 200) setOpenSuccess(true);
            });
          }
        }
      });
    } else {
      const body = {
        subject: writeReviewStore.getSelectedPlace(),
        content: contentRef?.current?.value,
        placeId: writeReviewStore.getSelectedPlaceId(),
        star: form.star,
      };

      if (isEdit) {
        updateReview(body, isEdit).then((res) => {
          if (res?.status === 200) setOpenSuccess(true);
        });
      } else {
        createReview(body).then((res) => {
          if (res?.status === 200) setOpenSuccess(true);
        });
      }
    }
  };

  const handleSuccess = () => {
    setOpenSuccess(false);
    navigate("/home/mypage/reviews");
    writeReviewStore.clear();
  };

  const location = useLocation();
  const isEdit = location.state && location.state.reviewId;
  useEffect(() => {
    if (isEdit) {
      toast(<span>이미지는 추가,수정만 가능합니다</span>);
      getReviewDetail(isEdit).then((res) => {
        if (res) {
          writeReviewStore.setSelectedPlace(res?.data.subject);
          writeReviewStore.setSelectedPlaceId(res?.data.placeId);
          setForm((p) => ({
            ...p,
            star: res?.data.star,
            content: res?.data.content,
            imgs: res?.data.fileInfos,
          }));
        }
      });
    }
  }, []);

  return (
    <>
      <Container>
        <h1>리뷰 쓰기</h1>

        <MarkerBox $isActive={writeReviewStore.getSelectedPlace() !== ""}>
          <div>
            <MarkIcon stroke="#6979f8" />
          </div>
        </MarkerBox>

        {writeReviewStore.getSelectedPlace() === "" ? (
          <AddPlaceBtnBox>
            <ActionButton
              add={true}
              onClick={() => setCurrentModal("selectPlace")}
            >
              <PlusIcon />
              장소 등록
            </ActionButton>
          </AddPlaceBtnBox>
        ) : (
          <SelectedPlaceText>
            <MarkIcon width="18" height="18" stroke="#6979f8" />
            {writeReviewStore.getSelectedPlace()}
          </SelectedPlaceText>
        )}

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
                {form.star - Math.floor(form.star) === 0.5 &&
                Math.floor(form.star) === idx ? (
                  <HalfStarIcon
                    key={`halfstar-${idx}`}
                    width="32"
                    height="32"
                  />
                ) : idx + 1 > form.star ? (
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
          <textarea
            placeholder="여행지의 리뷰를 남겨주세요!"
            ref={contentRef}
            defaultValue={form?.content}
          />
          <InfoText>최소 50자</InfoText>
        </TextBox>

        <ImageRow>
          <AddImgBtn onClick={handleButtonClick}>
            <PlusIcon stroke="#b8b8b8" />
            <input
              hidden
              type="file"
              accept="images/*"
              multiple
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

        <ImgInfo>
          {isEdit ? `(최대 ${10 - form?.imgs.length}장)` : "(최대 10장)"}
        </ImgInfo>

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
            onClick={handleSubmit}
            blue={true}
          />
        </ButtonsRow>
      </Container>
      {openSuccess && (
        <OneButtonModal
          isMobile={false}
          buttonText="확인"
          onClick={handleSuccess}
          onClose={handleSuccess}
          width="360px"
          height="260px"
        >
          <SuccessModalContainer>
            <h1>리뷰 {isEdit ? "수정" : "등록"}이 완료되었습니다!</h1>
            <p>다른 여행객들에게도 도움이 될 거에요.</p>
          </SuccessModalContainer>
        </OneButtonModal>
      )}
    </>
  );
}

const MarkerBox = styled.div<{ $isActive: boolean }>`
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
    background-color: ${(props) =>
      props.$isActive
        ? props.theme.color.secondaryLight
        : props.theme.color.gray100};
  }
`;

const AddPlaceBtnBox = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectedPlaceText = styled.p`
  margin-top: 24px;
  display: flex;
  color: ${(props) => props.theme.color.secondary};
  font-size: 16px;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
