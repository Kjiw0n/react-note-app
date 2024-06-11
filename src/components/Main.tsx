import { useState } from "react";
import styled from "styled-components";
import NoteItem from "./NoteItem";

const Main = () => {
  const [sortOption, setSortOption] = useState("recentlyCreated");
  const [isLight, setIsLight] = useState(true);

  const toggleTheme = () => {
    setIsLight(!isLight);
    // TODO: 실제로 테마 바뀌도록 마저 구현
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    // TODO: 정렬 기능 마저 구현
  };
  return (
    <Container>
      <NoteContainer>
        <NoteTitleContainer>
          <NoteTitle>Notes App</NoteTitle>
          <ThemeToggleButton onClick={toggleTheme}>
            {isLight ? "☀️" : "🌙"}
          </ThemeToggleButton>
        </NoteTitleContainer>
        <NoteDescription>기록하기!</NoteDescription>
        <SearchContainer>
          <SearchInput type="text" placeholder="search" />
          <SortDropdown value={sortOption} onChange={handleSortChange}>
            <option value="recentlyCreated">최근 생성순</option>
            <option value="recentlyModified">최신 수정순</option>
          </SortDropdown>
        </SearchContainer>
        <NoteItem title="할일1" description="할일을하자" />
        <NoteItem title="할일2" description="할일을하자" />
        <NoteItem title="할일3" description="할일을하자" />
        <CreateNoteButton>노트 생성</CreateNoteButton>
      </NoteContainer>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const NoteContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.transparentBackground};
  width: 36rem;
  padding: 2rem;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const NoteTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoteTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.black};
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const NoteDescription = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 2rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 1rem;
`;

const SortDropdown = styled.select`
  margin-left: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 1rem;
  background-color: #fff;
`;

const CreateNoteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;
