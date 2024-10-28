import styled, { css } from "styled-components";
import Container from "../../../components/web/Container";
import ImageAddIcon from "../../../assets/icons/ImageAddIcon";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";
import { AddTravelButton } from "../../../components/web/mypage/SelectTravelModal";
import PlusIcon from "../../../assets/icons/PlusIcon";
import PrimaryButton from "../../../components/PrimaryButton";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import useImagesUploadHook from "../../../hooks/useImagesUpload";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import OneButtonModal from "../../../components/OneButtonModal";

export default function WriteTravelouge() {
  const {
    imageRef,
    images,
    handleImageChange,
    handleButtonClick,
    handleImageDelete,
  } = useImagesUploadHook();

  const tagRef = useRef<HTMLInputElement>(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [tags, setTags] = useState(["산책코스", "태그입력"]);
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleImgIdx = (isPrev: boolean) => {
    setImgIdx((p) => {
      if (isPrev) {
        return p > 0 ? p - 1 : p;
      } else {
        return p < images.length - 1 ? p + 1 : p;
      }
    });
  };

  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tagRef.current && e.key === "Enter") {
      const newTag = tagRef.current.value;
      if (newTag) {
        setTags((p) => [...p, newTag]);
        tagRef.current.value = "";
      }
    }
  };

  const deleteTag = (tag: string) => {
    const newTags = tags.filter((prev) => prev !== tag);
    setTags(newTags);
  };

  return (
    <>
      <Container>
        <h1>여행기 작성</h1>

        <ImageBox>
          {imgIdx !== 0 && (
            <PrevButton onClick={() => handleImgIdx(true)}>
              <ArrowLeftIcon stroke="white" />
            </PrevButton>
          )}

          <AddImageBtn onClick={handleButtonClick}>
            <ImageAddIcon stroke="#6979f8" />
            <span>이미지 첨부</span>
          </AddImageBtn>

          {images.length === 0 ? (
            <span>
              <ImageAddIcon />
              이미지를 등록해주세요.
            </span>
          ) : (
            <img src={URL.createObjectURL(images[imgIdx])} alt="travel" />
          )}

          <input
            hidden
            ref={imageRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <InfoText>최대 10장</InfoText>

          {imgIdx !== images.length - 1 && (
            <NextButton onClick={() => handleImgIdx(false)}>
              <ArrowRightIcon stroke="white" />
            </NextButton>
          )}
        </ImageBox>

        <TitleBox placeholder="제목을 작성해주세요." />

        <TextBox>
          <textarea placeholder="나만의 여행기를 작성해주세요.(여행 계획, 일정, 기억에 남는 장소 등)" />
          <InfoText>최소 100자</InfoText>
        </TextBox>

        <InfoTag
          placeholder="태그를 작성해주세요. (최대 5개/10자 이내)"
          ref={tagRef}
          onKeyDown={handleTag}
        />

        <TagRow>
          {tags?.map((tag) => (
            <div onClick={() => deleteTag(tag)} key={tag}>
              # {tag}
            </div>
          ))}
        </TagRow>

        <PublicCheckBox>
          <CheckOnlyIcon stroke="#4d4d4d" />
          <span>공개</span>
        </PublicCheckBox>

        <AddTravelBtnBox>
          <AddTravelButton>
            <PlusIcon stroke="white" />
            <span>장소등록</span>
          </AddTravelButton>
        </AddTravelBtnBox>

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
            <h1>여행기 등록이 완료되었습니다!</h1>
            <p>다른 여행객들에게도 도움이 될 거에요.</p>
          </SuccessModalContainer>
        </OneButtonModal>
      )}
    </>
  );
}

export const SuccessModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 8px;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 20px;
    font-weight: 700;
  }

  & > p {
    color: ${(props) => props.theme.color.gray500};
    font-size: 15px;
  }
`;

const ImageBox = styled.div`
  position: relative;

  margin-top: 32px;
  width: 790px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.gray100};

  & > img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }

  & > span {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
  }
`;

const ArrowStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevButton = styled.div`
  ${ArrowStyle};
  left: 8px;
  cursor: pointer;
`;

const NextButton = styled.div`
  ${ArrowStyle};
  right: 18px;
  cursor: pointer;
`;

const AddImageBtn = styled.button`
  display: flex;
  align-items: center;

  position: absolute;
  right: 0;
  top: -57px;

  & > span {
    color: ${(props) => props.theme.color.secondary};
    font-size: 12px;
  }
`;

export const InfoText = styled.span`
  position: absolute;
  right: 33px;
  bottom: 25px;

  color: ${(props) => props.theme.color.gray300};
  font-size: 14px;
`;

const TitleBox = styled.input`
  margin: 16px 0;
  width: 790px;
  height: 60px;
  padding: 24px 44px;
  display: flex;
  align-items: center;

  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
  }
`;

export const TextBox = styled.div`
  width: 790px;
  min-height: 203px;
  position: relative;

  border-radius: 16px;
  background-color: ${(props) => props.theme.color.white};

  & > textarea {
    width: 790px;
    min-height: 203px;
    border-radius: inherit;
    padding: 24px 27px;
    border: 1px solid ${(props) => props.theme.color.gray200};
    outline: none;
    resize: none;

    &::placeholder {
      color: ${(props) => props.theme.color.gray300};
      font-size: 14px;
    }
  }
`;

const InfoTag = styled.input`
  margin-top: 34px;
  width: 100%;
  background-color: inherit;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
  }
`;

const TagRow = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 10px;

  & > div {
    color: ${(props) => props.theme.color.gray700};
    font-size: 14px;
    cursor: pointer;
  }
`;

const PublicCheckBox = styled.div`
  margin-top: 16px;
  margin-left: -5px;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
  }
`;

const AddTravelBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ButtonsRow = styled.div`
  margin-top: 77px;

  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
