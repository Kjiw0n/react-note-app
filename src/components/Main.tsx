import { useState } from "react";
import styled from "styled-components";

const Main = () => {
  const [sortOption, setSortOption] = useState("recentlyCreated");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    // TODO: 정렬 기능 마저 구현
  };
  return (
    <Container>
      <NoteContainer>
        <NoteTitle>Note App</NoteTitle>
        <NoteDescription>기록하기!</NoteDescription>
        <SearchContainer>
          <SearchInput type="text" placeholder="search" />
          <SortDropdown value={sortOption} onChange={handleSortChange}>
            <option value="recentlyCreated">최근 생성순</option>
            <option value="recentlyModified">최신 수정순</option>
          </SortDropdown>
        </SearchContainer>
        <div>노트아이템</div>
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

const NoteTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
`;

const NoteDescription = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 1.6rem;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.8rem;
`;

const SortDropdown = styled.select`
  margin-left: 0.8rem;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 0.8rem;
  background-color: #fff;
`;

const CreateNoteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;
`;
