import styled, { css } from "styled-components";

export const extendedContainerStyle = css`
  width: calc(100% + 240px);
  height: calc(100% + 80px);
  margin-left: -120px;
  margin-bottom: -80px;
`;

export const scrollHidden = css`
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const HomeContainer = styled.section`
  padding: 0 18px 18px 18px;
  height: 100%;
  overflow-y: scroll;
  ${scrollHidden};
`;

export const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin: 10px 0;

  & > img {
    width: 36px;
    height: 36px;
  }
`;

export const HomeBody = styled.main`
  flex: 1;
  height: calc(100% - 50px - 45px);
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0 12px 0;
`;

export const InfoText = styled.span`
  color: ${(props) => props.theme.color.gray900};
  font-size: 20px;
  font-weight: 700;
`;

export const MoreText = styled.span`
  color: ${(props) => props.theme.color.gray300};
  font-size: 12px;
  font-weight: 400;
  line-height: 140%;
`;

export const CarouselRow = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  ${scrollHidden};
`;

export const CarouselWithText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 160px;
`;

export const CarouselTitle = styled.span`
  color: ${(props) => props.theme.color.gray900};
  font-size: 14px;
  font-weight: 700;
`;

export const CarouselLocationTitle = styled.span`
  color: ${(props) => props.theme.color.gray600};
  font-size: 12px;
  font-weight: 700;
`;

export const ReviewCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

export const ReviewRow = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReviewTextCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  overflow: hidden;

  & > span {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  & > p {
    color: ${(props) => props.theme.color.gray900};
    font-size: 14px;
    font-weight: 700;
    line-height: 140%;
  }
`;

export const ReviewTagRow = styled.ul`
  display: flex;
  gap: 3px;
`;

export const ReviewTag = styled.li`
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray700};
  background: ${(props) => props.theme.color.white};
  display: flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;

  & > span {
    color: ${(props) => props.theme.color.gray700};
    font-size: 12px;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const ReviewProfileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  & > span {
    color: ${(props) => props.theme.color.gray900};
    font-size: 12px;
    font-weight: 400;
    line-height: 140%;
  }
`;

export const ReviewLikeCommentRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const ReviewDetailText = styled.span`
  color: ${(props) => props.theme.color.gray900};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;
`;
