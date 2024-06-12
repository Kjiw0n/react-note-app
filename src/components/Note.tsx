import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

interface NoteProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Note = ({ isDarkMode, toggleTheme }: NoteProps) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      // TODO: id를 이용해 노트 데이터를 불러와서 title과 content 상태 set
    }
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    const noteList = JSON.parse(localStorage.getItem("noteList") || "[]");
    if (id) {
      const updatedNoteList = noteList.map((note: any) =>
        note.id === id
          ? { ...note, title, content, updatedAt: moment().format() }
          : note
      );
      localStorage.setItem("noteList", JSON.stringify(updatedNoteList));
    } else {
      const newNote = {
        id: uuidv4(),
        title,
        content,
        createdAt: moment().format(),
        updatedAt: moment().format(),
      };
      noteList.push(newNote);
      localStorage.setItem("noteList", JSON.stringify(noteList));
    }
    navigate("/");
  };

  const handleDelete = () => {
    const noteList = JSON.parse(localStorage.getItem("noteList") || "[]");
    const updatedNoteList = noteList.filter((note: any) => note.id !== id);
    localStorage.setItem("noteList", JSON.stringify(updatedNoteList));
    navigate("/");
  };

  return (
    <Container>
      <NoteContainer>
        <NoteTitleContainer>
          <NoteTitle>Notes App</NoteTitle>
          <ThemeToggleButton onClick={toggleTheme}>
            {isDarkMode ? "🌙" : "☀️"}
          </ThemeToggleButton>
        </NoteTitleContainer>
        <NoteDescription>기록하기!</NoteDescription>
        <Input
          type="text"
          placeholder="노트 제목을 입력해주세요."
          value={title}
          onChange={handleTitleChange}
        />
        <Textarea
          placeholder="노트 내용을 입력해주세요."
          value={content}
          onChange={handleContentChange}
        />
        <ButtonContainer>
          {id && <DeleteButton onClick={handleDelete}>삭제</DeleteButton>}
          <SubmitButton onClick={handleSubmit}>확인</SubmitButton>
        </ButtonContainer>
      </NoteContainer>
    </Container>
  );
};

export default Note;

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

const NoteTitleContainer = styled.div`
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

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 1rem;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 1rem;
  margin-bottom: 1rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 1rem;
  width: 90%;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.red};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;
