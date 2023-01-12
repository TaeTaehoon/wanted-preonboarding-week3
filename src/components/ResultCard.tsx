import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function ResultCard({ input, content }: { input: string; content: string }) {
  return (
    <StCardBody>
      {content.split(input)[0]}
      <span className="highlight">{input}</span>
      {content.split(input)[1]}
    </StCardBody>
  );
}

const StCardBody = styled.div`
  width: 100%;
  height: 2rem;
  font-size: 1.6rem;
  .highlight {
    font-weight: bold;
    color: #ff0000;
  }
`;

export default ResultCard;
