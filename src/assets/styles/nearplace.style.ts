import styled from "styled-components";

export const NearPlaceContainer = styled.div`
  width: 100%;
  height: 100%;
  padding-bottom: 10px;
`;

export const NearPlaceMapBox = styled.div`
  width: 100%;
  height: calc(100% - 50px);
`;

export const PlaceMarkerName = styled.div`
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12),
    2px 6px 12px 0px rgba(0, 0, 0, 0.12);

  & > strong {
    color: #1a1a1a;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.6px;
  }

  & > .gm-style-iw-chr > button {
    display: none;
    background-color: tomato;
  }
`;

export const SelectPlaceCol = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px 24px 24px;
`;

export const SelectPlaceCard = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  gap: 8px;
`;

export const CardCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  height: 100%;

  & > p {
    color: #1a1a1a;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.048px;
  }

  & > span {
    color: #4d4d4d;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.036px;
  }

  & > div {
    color: #808080;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.036px;

    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

export const Divider = styled.div`
  background: #e6e6e6;
  width: 100%;
  height: 1px;
  margin: 16px 0;
`;

export const SelectPlaceDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
    & > span {
      color: #4d4d4d;
      font-size: 14px;
      font-weight: 400;
      text-transform: capitalize;
    }
  }
`;

export const NearPlaceBox = styled.div<{ $height: string }>`
  height: ${({ $height }) => $height && $height};
  min-height: ${({ $height }) => $height && $height};
  border-radius: 16px;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const NearPlaceDetailCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 0.8;

  & > div:first-child {
    display: inline-flex;
    padding: 1px 8px;
    justify-content: center;
    align-items: center;
    gap: 8px;

    border-radius: 16px;
    border: 1px solid #4d4d4d;
    background: #fff;

    width: auto;
    align-self: flex-start;
  }
  overflow: hidden;

  & > p {
    color: #1a1a1a;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.048px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > div {
    color: #808080;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 18px */
    letter-spacing: -0.036px;

    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

export const NearPlaceAddBtn = styled.button`
  display: flex;
  width: 66px;
  height: 34px;
  padding: 8px 12px;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border-radius: 30px;
  border: 1px solid #4d4d4d;
  background: #fff;

  & > span {
    color: #4d4d4d;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: -0.6px;
    white-space: nowrap;
  }
`;

export const ButtonCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;

  & > span {
    color: #808080;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 16.8px */
  }
`;
