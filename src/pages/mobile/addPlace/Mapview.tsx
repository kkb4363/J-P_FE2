import styled from "styled-components";
import MarkIcon from "../../../assets/icons/MarkIcon";
import CustomGoogleMap from "../../../components/mobile/googleMap/CustomGoogleMap";

export default function Mapview() {
  const mapStyle = {
    marginLeft: "-20px",
  };

  return (
    <>
      <Header>
        <MarkIcon stroke="#6979f8" width="20" height="20" />
        <span>주변 장소 더보기</span>
      </Header>

      <CustomGoogleMap
        width="calc(100% + 20px * 2)"
        height="calc(100% - 30px - 10px)"
        lat={37.579617}
        lng={126.977041}
        style={mapStyle}
      />
    </>
  );
}

const Header = styled.div`
  height: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
  margin-bottom: 10px;

  & > span {
    color: ${(props) => props.theme.color.secondary};
    font-size: 14px;
    font-weight: 700;
  }
`;
