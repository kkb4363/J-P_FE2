import styled from "styled-components";
import { MypageTitleWithButton } from "./MyTravel";
import PlusIcon from "../../../assets/icons/PlusIcon";
import testImg from "../../../assets/images/testImg1.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTravelModal from "../../../components/web/mypage/SelectTravelModal";

export default function MyTravelogue() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <MypageTitleWithButton>
        목록
        <div onClick={() => setOpenModal(true)}>
          <div>
            <PlusIcon />
          </div>
          작성하기
        </div>
      </MypageTitleWithButton>

      <ImgCardGridBox>
        <ImgCard>
          <p>제주</p>
          <span>03.21 ~ 03.24</span>

          <WritingTag>
            <span>작성중</span>
          </WritingTag>
        </ImgCard>
        <ImgCard>
          <p>제주</p>
          <span>03.21 ~ 03.24</span>
        </ImgCard>
        <ImgCard>
          <p>제주</p>
          <span>03.21 ~ 03.24</span>
        </ImgCard>
      </ImgCardGridBox>

      {openModal && <SelectTravelModal onClose={() => setOpenModal(false)} />}
    </>
  );
}

const ImgCardGridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 60px;
`;

const ImgCard = styled.div`
  position: relative;
  background-image: url(${testImg});
  background-position: center;
  background-size: cover;
  width: 225px;
  height: 225px;
  border-radius: 16px;

  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.08),
    2px 2px 10px 0px rgba(0, 0, 0, 0.08);
  & > p {
    color: ${(props) => props.theme.color.white};
    font-size: 24px;
    font-weight: 700;
  }

  & > span {
    color: ${(props) => props.theme.color.white};
    font-size: 16px;
    font-weight: 400;
  }
`;

const WritingTag = styled.div`
  position: absolute;
  width: 56px;
  height: 29px;
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.secondary};
  background-color: ${(props) => props.theme.color.white};
  display: flex;
  justify-content: center;
  align-items: center;
  top: 18px;
  right: 18px;

  & > span {
    color: ${(props) => props.theme.color.secondary};
    font-size: 12px;
    user-select: none;
  }
`;
