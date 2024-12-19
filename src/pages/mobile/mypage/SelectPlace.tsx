import styled from "styled-components";
import CustomHeader from "../../../components/mobile/CustomHeader";
import CustomInput from "../../../components/CustomInput";
import {
  PlaceCard,
  PlaceCardAddButton,
  PlaceCardCol,
  PlaceCardTextCol,
  SaveButtonBox,
} from "../addPlace/ListView";
import StarIcon from "../../../assets/icons/StarIcon";
import { scrollHidden } from "../../../assets/styles/home.style";
import CheckOnlyIcon from "../../../assets/icons/CheckOnlyIcon";
import { useWriteReviewStore } from "../../../store/writeReview.store";
import { useNavigate } from "react-router-dom";
import useSearchHook from "../../../hooks/useSearch";
import { useState } from "react";

export default function SelectPlace() {
  const { setSelectedPlaceId, setSelectedPlace } = useWriteReviewStore();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSelectedPlaceId(select.id + "");
    setSelectedPlace(select.name);
    navigate(-1);
  };

  const [select, setSelect] = useState({
    id: -1,
    name: "",
  });

  const handleSelect = (id: number, name: string) => {
    setSelect({
      id: id,
      name: name,
    });
  };

  const { search, searchData, setSearch, handleInput, handleInputSubmit } =
    useSearchHook();

  return (
    <>
      <CustomHeader title="장소 등록" />
      <SelectPlaceBody>
        <CustomInput
          text="장소를 입력해주세요."
          value={search}
          onChange={handleInput}
          onSubmit={handleInputSubmit}
          onDelete={() => setSearch("")}
        />

        <PlaceCardCol>
          {searchData?.map((d) => (
            <PlaceCard key={d.id}>
              <img src={d.photoUrl} alt="장소 등록" />

              <PlaceCardTextCol>
                <h1>{d.name}</h1>
                <span>{d.subName}</span>
                <div>
                  <StarIcon />
                  <span>{d.rating}</span>
                </div>
              </PlaceCardTextCol>

              <PlaceAddButtonBox>
                <PlaceAddButton
                  $isActive={d.id === select.id}
                  onClick={() => handleSelect(d.id, d.name)}
                >
                  <CheckOnlyIcon
                    stroke={d.id === select.id ? "#6979f8" : "#b8b8b8"}
                  />
                </PlaceAddButton>
              </PlaceAddButtonBox>
            </PlaceCard>
          ))}
        </PlaceCardCol>

        <SelectPlaceSaveButtonBox>
          <button onClick={handleSubmit}>
            <span>완료</span>
          </button>
        </SelectPlaceSaveButtonBox>
      </SelectPlaceBody>
    </>
  );
}

const SelectPlaceBody = styled.div`
  height: calc(100dvh - 50px - 20px);
  overflow: auto;
  ${scrollHidden};
  padding: 16px;
`;

const SelectPlaceSaveButtonBox = styled(SaveButtonBox)`
  border: none;
`;

const PlaceAddButtonBox = styled.div`
  height: 100%;
  margin-right: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceAddButton = styled(PlaceCardAddButton)<{ $isActive: boolean }>`
  border: 1px solid
    ${(props) =>
      props.$isActive
        ? props.theme.color.secondary
        : props.theme.color.gray300};
`;
