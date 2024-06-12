import { useState, useEffect } from "react";
import styled from "styled-components";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

interface MainProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const Main = ({ isDarkMode, toggleTheme }: MainProps) => {
  const navigate = useNavigate();
  const [noteList, setNoteList] = useState<Note[]>([]);
  const [sortedNotes, setSortedNotes] = useState<Note[]>([]);
  const [sortOption, setSortOption] = useState("recentlyCreated");

  const selectList = ["recentlyCreated", "recentlyModified"];

  useEffect(() => {
    const savedNotes = JSON.parse(
      localStorage.getItem("noteList") || "[]"
    ) as Note[];
    console.log("Loaded notes from localStorage:", savedNotes);
    setNoteList(savedNotes);
  }, []);

  useEffect(() => {
    const sortNotes = () => {
      if (noteList.length > 0) {
        const sorted = [...noteList];
        if (sortOption === "recentlyCreated") {
          sorted.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else if (sortOption === "recentlyModified") {
          sorted.sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        }
        setSortedNotes(sorted);
      }
    };

    sortNotes();
  }, [sortOption, noteList]);

  const handleCreateNote = () => {
    navigate("/note");
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  return (
    <Container>
      <NoteContainer>
        <NoteHeaderContainer>
          <NoteTitle>Notes App</NoteTitle>
          <ThemeToggleButton onClick={toggleTheme}>
            {isDarkMode ? "🌙" : "☀️"}
          </ThemeToggleButton>
        </NoteHeaderContainer>
        <NoteDescription>기록하기!</NoteDescription>
        <SearchContainer>
          <SearchInput type="text" placeholder="검색" />
          <SortDropdown value={sortOption} onChange={handleSortChange}>
            {selectList.map((option, index) => (
              <option key={index} value={option}>
                {option === "recentlyCreated" ? "최근 생성순" : "최근 수정순"}
              </option>
            ))}
          </SortDropdown>
        </SearchContainer>
        <NoteListContainer>
          {sortedNotes.length > 0 ? (
            sortedNotes.map((note) => (
              <NoteItem
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                updatedAt={note.updatedAt}
              />
            ))
          ) : (
            <p>노트가 없습니다.</p>
          )}
        </NoteListContainer>
        <CreateNoteButton onClick={handleCreateNote}>
          노트 생성
        </CreateNoteButton>
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
  background-color: ${({ theme }) => theme.colors.lightgray};
`;

const NoteContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  width: 36rem;
  height: 60rem;
  padding: 2rem;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
`;

const NoteHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoteTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
`;

const NoteDescription = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
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
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 1rem;
`;

const SortDropdown = styled.select`
  margin-left: 1rem;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const NoteListContainer = styled.div`
  height: calc(100% - 16rem);
  overflow-y: auto;
`;

const CreateNoteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
