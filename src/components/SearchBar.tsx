import React from "react";
import styled from "styled-components";

function SearchBar({
  onChange,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return <StBarBody type="text" onChange={onChange}></StBarBody>;
}

const StBarBody = styled.input`
  width: 60rem;
  height: 5rem;
  border-radius: 5rem;
  border: 0.1rem solid black;
`;

export default SearchBar;
