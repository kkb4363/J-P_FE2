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
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import OneButtonModal from "../../../components/OneButtonModal";
import TrashIcon from "../../../assets/icons/TrashIcon";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortablePhoto from "../../../components/web/mypage/SortablePhoto";
import { useWriteReviewStore } from "../../../store/writeReview.store";
import {
  createDiary,
  getDiaryDetail,
  updateDiary,
  uploadFiles,
} from "../../../service/axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function WriteTravelouge() {
  const {
    imageRef,
    images,
    handleImageChange,
    handleButtonClick,
    handleImageDelete,
  } = useImagesUploadHook();

  const [state, setState] = useState({
    success: false,
    imgEdit: false,
  });
  const [form, setForm] = useState({
    title: "",
    content: "",
    tags: ["태그 작성"],
    isPublic: true,
    imgs: [],
  });
  const param = useParams();
  const navigate = useNavigate();
  const tagRef = useRef<HTMLInputElement>(null);
  const handleTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (tagRef.current && e.key === "Enter") {
      const newTag = tagRef.current.value;
      if (newTag) {
        tagRef.current.value = "";
        setForm((p) => ({ ...p, tags: [...p.tags, newTag] }));
      }
    }
  };
  const deleteTag = (tag: string) => {
    const newTags = form.tags.filter((prev) => prev !== tag);
    setForm((p) => ({ ...p, tags: newTags }));
  };

  const [imgIdx, setImgIdx] = useState(0);
  const handleImgIdx = (isPrev: boolean) => {
    setImgIdx((p) => {
      if (isPrev) {
        return p > 0 ? p - 1 : p;
      } else {
        return p < images.length - 1 ? p + 1 : p;
      }
    });
  };
  const deleteImg = () => {
    handleImageDelete(images[imgIdx].lastModified);
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const [activeUrl, setActiveUrl] = useState<any>("");
  const { setSelectedImg } = useWriteReviewStore();
  const handleDragStart = (e: any) => {
    setImgIdx(images.findIndex((p) => p.name === e.active.id));
    setActiveUrl(
      URL.createObjectURL(images.find((i) => i.name === e.active.id))
    );
  };
  const handleDragEnd = (e: any) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      const oldIdx = images.findIndex((p) => p.name === active.id);
      const newIdx = images.findIndex((p) => p.name === over.id);

      const updatedArr = [...images];
      const [movedArr] = updatedArr.splice(oldIdx, 1);
      updatedArr.splice(newIdx, 0, movedArr);
      return setSelectedImg(updatedArr);
    }

    setActiveUrl(null);
  };
  const handleDragCancel = () => {
    setActiveUrl(null);
  };

  const handleSubmit = () => {
    if (state.imgEdit) {
      setState((p) => ({ ...p, imgEdit: false }));
      setImgIdx(0);
    } else {
      if (images.length !== 0) {
        uploadFiles(images, "DIARY").then((res) => {
          if (res) {
            if (isEdit) {
              const body = {
                subject: titleRef?.current?.value,
                content: contentRef?.current?.value,
                newFileIds: res.data.data.map((file: any) => file.fileId),
                isPublic: form.isPublic,
              };
              updateDiary(body, Number(location.state.diaryId)).then((res) => {
                if (res) {
                  setState((p) => ({ ...p, success: true }));
                }
              });
            } else {
              const body = {
                subject: titleRef?.current?.value,
                content: contentRef?.current?.value,
                fileIds: res.data.data.map((file: any) => file.fileId),
                isPublic: form.isPublic,
              };
              createDiary(body, Number(param.id)).then((res) => {
                if (res) {
                  setState((p) => ({ ...p, success: true }));
                }
              });
            }
          }
        });
      } else {
        const body = {
          subject: titleRef?.current?.value,
          content: contentRef?.current?.value,
          isPublic: form.isPublic,
        };

        if (isEdit) {
          updateDiary(body, Number(location.state.diaryId)).then((res) => {
            if (res) {
              setState((p) => ({ ...p, success: true }));
            }
          });
        } else {
          createDiary(body, Number(param.id)).then((res) => {
            if (res) {
              setState((p) => ({ ...p, success: true }));
            }
          });
        }
      }
    }
  };

  const location = useLocation();
  const isEdit = location.state && location.state.diaryId;
  useEffect(() => {
    if (isEdit) {
      toast(<span>이미지는 추가,수정만 가능합니다</span>);
      getDiaryDetail(location.state.diaryId).then((res) => {
        if (res) {
          setForm((p) => ({
            ...p,
            title: res?.data.subject,
            content: res?.data.content,
            imgs: res?.data.fileInfos,
            isPublic: res?.data.isPublic,
          }));
        }
      });
    }
  }, [location.state]);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setSelectedImg([]);
  }, []);

  return (
    <>
      <Container>
        <h1>{state.imgEdit ? "이미지 수정" : "여행기 작성"}</h1>

        {!state.imgEdit && (
          <>
            <ImageBox>
              {images.length !== 0 && (
                <ImgEditBtn
                  onClick={() => setState((p) => ({ ...p, imgEdit: true }))}
                >
                  수정
                </ImgEditBtn>
              )}

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
                <img src={URL?.createObjectURL(images[imgIdx])} alt="travel" />
              )}

              <input
                hidden
                ref={imageRef}
                type="file"
                accept="images/*"
                onChange={handleImageChange}
              />

              <InfoText>
                {isEdit ? `최대 ${10 - form?.imgs.length}장` : "최대 10장"}
              </InfoText>

              {imgIdx !== images.length - 1 && (
                <NextButton onClick={() => handleImgIdx(false)}>
                  <ArrowRightIcon stroke="white" />
                </NextButton>
              )}
            </ImageBox>

            <TitleInputBox
              placeholder="제목을 작성해주세요."
              defaultValue={form.title}
              ref={titleRef}
            />

            <TextBox>
              <textarea
                placeholder="나만의 여행기를 작성해주세요.(여행 계획, 일정, 기억에 남는 장소 등)"
                defaultValue={form.content}
                ref={contentRef}
              />
              <InfoText>최소 100자</InfoText>
            </TextBox>

            <TagInputBox
              placeholder="태그를 작성해주세요. (최대 5개/10자 이내)"
              ref={tagRef}
              onKeyDown={handleTag}
            />

            <TagRow>
              {form?.tags?.map((tag) => (
                <div onClick={() => deleteTag(tag)} key={tag}>
                  # {tag}
                </div>
              ))}
            </TagRow>

            <PublicCheckBox
              onClick={() => setForm((p) => ({ ...p, isPublic: !p.isPublic }))}
            >
              <CheckOnlyIcon stroke={form.isPublic ? "#6979f8" : "#B8B8B8"} />
              <span>{form.isPublic ? "공개" : "비공개"}</span>
            </PublicCheckBox>

            <AddTravelBtnBox>
              <AddTravelButton>
                <PlusIcon stroke="white" />
                <span>장소등록</span>
              </AddTravelButton>
            </AddTravelBtnBox>
          </>
        )}

        {state.imgEdit && images && (
          <>
            <ImgDeleteBtn onClick={deleteImg}>
              <TrashIcon width={18} height={18} stroke="#6979F8" />
              삭제
            </ImgDeleteBtn>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext items={images} strategy={rectSortingStrategy}>
                <ImgEditGridBox>
                  {images?.map((i, idx) => (
                    <SortablePhoto
                      key={idx}
                      url={URL?.createObjectURL(i)}
                      isChecked={imgIdx === idx}
                      data={i}
                    />
                  ))}
                </ImgEditGridBox>
              </SortableContext>

              <DragOverlay adjustScale={true}>
                {activeUrl && <DraggableImg src={activeUrl} />}
              </DragOverlay>
            </DndContext>
          </>
        )}

        <ButtonsRow>
          {!state.imgEdit && (
            <PrimaryButton
              width="120px"
              text="임시저장"
              onClick={() => toast(<span>임시 저장되었습니다.</span>)}
              secondary={true}
            />
          )}
          <PrimaryButton
            width="120px"
            text="완료"
            onClick={handleSubmit}
            blue={true}
          />
        </ButtonsRow>
      </Container>

      {state.success && (
        <OneButtonModal
          isMobile={false}
          buttonText="확인"
          onClick={() => {
            setState((p) => ({ ...p, success: false }));
            navigate("/home/mypage/travelogue");
          }}
          onClose={() => {
            setState((p) => ({ ...p, success: false }));
            navigate("/home/mypage/travelogue");
          }}
          width="470px"
          height="390px"
          noCloseBtn={true}
        >
          <SuccessModalContainer>
            <h1>여행기 {isEdit ? "수정" : "등록"}이 완료되었습니다!</h1>
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

const ImgEditBtn = styled.aside`
  color: ${(props) => props.theme.color.white};
  font-size: 14px;
  position: absolute;
  top: 19px;
  right: 22px;
  cursor: pointer;
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

const TitleInputBox = styled.input`
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

const TagInputBox = styled.input`
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

const ImgDeleteBtn = styled.button`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  margin-top: 6px;
  font-size: 12px;
  color: ${(props) => props.theme.color.secondary};
`;

const ImgEditGridBox = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  gap: 20px;

  & > img {
    width: 383px;
    height: 251px;
  }
`;

const DraggableImg = styled.img`
  width: 383px;
  height: 251px;
`;
