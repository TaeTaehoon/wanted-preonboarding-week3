import styled from "styled-components";

function ResultContainer({ children }: { children: any }) {
  return <StContainerBody>{children}</StContainerBody>;
}
const StContainerBody = styled.div`
  width: 60rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ResultContainer;
