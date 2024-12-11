import styled, { css } from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import ImageAddIcon from "../../../assets/icons/ImageAddIcon";
import useImagesUploadHook from "../../../hooks/useImagesUpload";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowLeftIcon from "../../../assets/icons/ArrowLeftIcon";
import ArrowRightIcon from "../../../assets/icons/ArrowRightIcon";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useWriteReviewStore } from "../../../store/writeReview.store";
import {
  createDiary,
  getDiaryDetail,
  updateDiary,
  uploadFiles,
} from "../../../service/axios";
import { toast } from "react-toastify";
import { scrollHidden } from "../../../assets/styles/home.style";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";
import PlusIcon from "../../../assets/icons/PlusIcon";
import TrashIcon from "../../../assets/icons/TrashIcon";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortablePhoto from "../../../components/web/mypage/SortablePhoto";
import PrimaryButton from "../../../components/PrimaryButton";
import OneButtonModal from "../../../components/OneButtonModal";

export default function WriteTravelogue() {
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
          }));
        }
      });
    }
  }, [location.state]);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleHeaderPrev = () => {
    if (state.imgEdit) return setState((p) => ({ ...p, imgEdit: false }));

    return navigate(-1);
  };

  useEffect(() => {
    setSelectedImg([]);
  }, []);

  return (
    <>
      <CustomHeader
        handleClick={handleHeaderPrev}
        title={state.imgEdit ? "이미지 수정" : "여행기 작성"}
      >
        <HeaderRightSection>
          {state.imgEdit ? (
            <span onClick={deleteImg}>
              <TrashIcon width={18} height={18} stroke="#6979f8" />
              삭제
            </span>
          ) : (
            <>
              <span>임시저장</span>
              <span onClick={handleSubmit}>완료</span>
            </>
          )}
        </HeaderRightSection>
      </CustomHeader>

      <WriteTravelogueCol>
        {!state.imgEdit && (
          <>
            <AddImgBtn onClick={handleButtonClick}>
              <ImageAddIcon stroke="#6979f8" />
              이미지 첨부
            </AddImgBtn>

            <ImageBox>
              {images.length !== 0 && (
                <ImgEditBtn
                  onClick={() => setState((p) => ({ ...p, imgEdit: true }))}
                >
                  수정
                </ImgEditBtn>
              )}

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

              {imgIdx !== 0 && (
                <PrevButton onClick={() => handleImgIdx(true)}>
                  <ArrowLeftIcon stroke="white" />
                </PrevButton>
              )}

              {imgIdx !== images.length - 1 && (
                <NextButton onClick={() => handleImgIdx(false)}>
                  <ArrowRightIcon stroke="white" />
                </NextButton>
              )}

              <ImgInfoTxt>
                {" "}
                {isEdit ? `최대 ${10 - form?.imgs.length}장` : "최대 10장"}
              </ImgInfoTxt>
            </ImageBox>

            <TitleInputBox
              placeholder="제목을 작성해주세요."
              defaultValue={form.title}
              ref={titleRef}
            />

            <TextAreaBox>
              <textarea
                placeholder="나만의 여행기를 작성해주세요.(여행 계획, 일정, 기억에 남는 장소 등)"
                defaultValue={form.content}
                ref={contentRef}
              />
              <TextBoxInfoTxt>최소 100자</TextBoxInfoTxt>
            </TextAreaBox>

            <TagInputBox
              placeholder="태그를 작성해주세요. (최대 5개/10자 이내)"
              ref={tagRef}
              onKeyDown={handleTag}
            />

            <TagRow>
              {form?.tags?.map((tag) => (
                <span onClick={() => deleteTag(tag)} key={tag}>
                  # {tag}
                </span>
              ))}
            </TagRow>

            <PublicCheckBox
              onClick={() => setForm((p) => ({ ...p, isPublic: !p.isPublic }))}
            >
              <CheckOnlyIcon stroke={form.isPublic ? "#6979f8" : "#B8B8B8"} />
              <span>{form.isPublic ? "공개" : "비공개"}</span>
            </PublicCheckBox>

            <AddPlaceBtn>
              <PlusIcon stroke="white" />
              장소 등록
            </AddPlaceBtn>
          </>
        )}

        {state.imgEdit && images && (
          <>
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

            <ImgEditBtnBox>
              <PrimaryButton
                text="완료"
                onClick={handleSubmit}
                blue={true}
                width="190px"
                height="45px"
              />
            </ImgEditBtnBox>
          </>
        )}

        {state.success && (
          <OneButtonModal
            isMobile={true}
            buttonText="확인"
            onClick={() => {
              setState((p) => ({ ...p, success: false }));
              navigate("/home/mypage/travelogue");
            }}
            onClose={() => {
              setState((p) => ({ ...p, success: false }));
              navigate("/home/mypage/travelogue");
            }}
            width="320px"
            height="230px"
            noCloseBtn={true}
          >
            <SuccessModalContainer>
              <h1>여행기 {isEdit ? "수정" : "등록"}이 완료되었습니다!</h1>
              <p>다른 여행객들에게도 도움이 될 거에요.</p>
            </SuccessModalContainer>
          </OneButtonModal>
        )}
      </WriteTravelogueCol>
    </>
  );
}

const SuccessModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > h1 {
    color: ${(props) => props.theme.color.gray900};
    font-size: 16px;
    font-weight: 700;
  }

  & > p {
    color: ${(props) => props.theme.color.gray500};
    font-size: 14px;
  }
`;

const HeaderRightSection = styled.section`
  display: flex;
  align-items: center;
  gap: 6px;

  & > span:first-child {
    color: ${(props) => props.theme.color.gray400};
    font-size: 12px;
    font-weight: 700;
  }

  & > span:last-child {
    color: ${(props) => props.theme.color.secondary};
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
  }
`;

const WriteTravelogueCol = styled.div`
  padding: 0 16px;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
`;

const AddImgBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  color: ${(props) => props.theme.color.secondary};
  font-size: 13px;

  margin-bottom: 6px;
`;

const ImageBox = styled.div`
  position: relative;

  width: 100%;
  height: 180px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.gray100};
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
  }

  & > span {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  margin-bottom: 16px;
`;

const ImgInfoTxt = styled.span`
  position: absolute;
  right: 7px;
  bottom: 12px;

  color: ${(props) => props.theme.color.gray300};
  font-size: 12px;
`;

const ImgEditBtn = styled.button`
  color: ${(props) => props.theme.color.white};
  font-size: 14px;
  position: absolute;
  top: 10px;
  right: 12px;
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

const TitleInputBox = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray200};
  background-color: ${(props) => props.theme.color.white};
  outline: none;
  padding: 12px 30px;
  &::placeholder {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
  }

  margin-bottom: 12px;
`;

const TextAreaBox = styled.div`
  width: 100%;
  min-height: 200px;
  position: relative;
  border-radius: 16px;
  background-color: ${(props) => props.theme.color.white};

  & > textarea {
    width: 100%;
    height: 100%;
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

  margin-bottom: 20px;
`;

const TextBoxInfoTxt = styled.span`
  position: absolute;
  right: 21px;
  bottom: 17px;

  color: ${(props) => props.theme.color.gray300};
  font-size: 14px;
`;

const TagInputBox = styled.input`
  width: 100%;
  background-color: inherit;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.color.gray300};
    font-size: 14px;
  }

  margin-bottom: 8px;
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  width: 100%;
  white-space: nowrap;
  ${scrollHidden};

  & > span {
    color: ${(props) => props.theme.color.gray600};
    font-size: 14px;
  }

  margin-bottom: 23px;
`;

const PublicCheckBox = styled.div`
  display: flex;
  align-items: center;

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
  }
`;

const AddPlaceBtn = styled.div`
  position: fixed;
  bottom: 70px;
  right: 20px;

  width: 103px;
  height: 43px;
  border-radius: 30px;
  background-color: ${(props) => props.theme.color.main};
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.08),
    0px 4px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  color: ${(props) => props.theme.color.white};
  font-size: 14px;
  font-weight: 700;
`;

const ImgEditGridBox = styled.div`
  display: grid;
  margin-top: 16px;
  grid-template-columns: repeat(3, 1fr);
  height: calc(100% - 114px);

  gap: 8px;

  & > img {
    width: 106px;
    height: 114px;
  }
`;

const ImgEditBtnBox = styled.div`
  height: 114px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const DraggableImg = styled.img`
  width: 106px;
  height: 114px;
`;
