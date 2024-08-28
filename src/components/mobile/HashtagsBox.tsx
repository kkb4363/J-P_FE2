import styled from "styled-components";

interface Props { 
	hashTags: string[];
}

export default function HashtagsBox({hashTags}:Props) {
	return (
		<HashTagsContainer>
			{hashTags.map((tag: string, index: number) => 
				<HashTag key={index}>#{tag}</HashTag>
			)}
		</HashTagsContainer>
	);
}

const HashTagsContainer = styled.div`
	display: flex;
	gap: 5px;
`

const HashTag = styled.div`
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.color.gray700};
  background: ${(props) => props.theme.color.white};
  padding: 4px 8px;
  color: ${(props) => props.theme.color.gray700};
	font-size: 12px;
`;
