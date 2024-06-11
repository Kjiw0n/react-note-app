import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

const Note = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    if (id) {
      // TODO: id를 이용해 노트 데이터를 불러와서 title과 content 상태 set
    }
  }, [id]);

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    if (id) {
      // TODO: 노트 수정 로직 추가
    } else {
      // TODO: 노트 생성 로직 추가
    }
    navigate("/");
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
        <SubmitButton onClick={handleSubmit}>확인</SubmitButton>
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
  background-color: #f0f0f0;
`;

const NoteContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.transparentBackground};
  width: 40rem;
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

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.lightgray};
  border-radius: 1rem;
  margin-bottom: 1rem;
  height: 10rem;
`;

const SubmitButton = styled.button`
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
