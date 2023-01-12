import axios from "axios";
import { useRef, useState } from "react";
import styled from "styled-components";
import "./App.css";

import SearchBar from "./components/SearchBar";
import ResultContainer from "./components/ResultContainer";
import ResultCard from "./components/ResultCard";

function App() {
  const debouncer = useRef<NodeJS.Timeout | null>(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ sickCd: string; sickNm: string }[]>(
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debouncer.current) {
      clearTimeout(debouncer.current);
    }
    debouncer.current = setTimeout(async function () {
      const userInput = e.target.value;
      const URL = `http://localhost:3001/sick?q=${e.target.value}`;
      setInput(userInput);
      let db;
      const requestDb = window.indexedDB.open("test");

      requestDb.onsuccess = function (e) {
        db = requestDb.result;
      };
      requestDb.onupgradeneeded = (e: any) => {
        db = e.target.result;
        const objStore = db.createObjectStore("search", {
          keyPath: userInput,
        });
      };
      requestDb.onerror = function (e) {
        alert("Why didn't you allow my web app to use IndexedDB?!");
      };
      if (e.target.value.length !== 0) {
        const reqRes = await axios.get(URL);
        setResult([...reqRes.data]);
        console.info("calling api");
      } else {
        setResult([]);
      }
    }, 300);
  };
  return (
    <StAppBody>
      <h1>Search</h1>
      <SearchBar onChange={handleInputChange} />
      {result.length !== 0 && (
        <ResultContainer>
          {result.map((el) => {
            return (
              <ResultCard input={input} content={el.sickNm} key={el.sickCd} />
            );
          })}
        </ResultContainer>
      )}
      {result.length === 0 && !debouncer.current && <>검색어 없음!</>}
    </StAppBody>
  );
}

const StAppBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default App;
