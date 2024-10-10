import styled from "styled-components";

interface Props {
  stroke?: string;
}
const EtcIcon = ({ stroke = "#6978F8" }: Props) => {
  return <EtcText $stroke={stroke}>Etc</EtcText>;
};

const EtcText = styled.div<{ $stroke?: string }>`
  color: ${({ $stroke }) => $stroke};
	font-size: 12px;
`;

export default EtcIcon;
