import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface NoteItemProps {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const NoteItem = (props: NoteItemProps) => {
  const { id, title, content, updatedAt } = props;
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/note/${id}`);
  };

  return (
    <NoteItemContainer onClick={handleEdit}>
      <NoteItemText>{title}</NoteItemText>
      <NoteDescription>{content}</NoteDescription>
      <NoteUpdated>{updatedAt}</NoteUpdated>
    </NoteItemContainer>
  );
};

export default NoteItem;

const NoteItemContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.6rem;
  margin: 0.8rem 0;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.1);
  cursor: pointer;

  ${({ theme }) =>
    theme.isDarkMode &&
    `
    background-color: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.text};
  `}
`;

const NoteItemText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
`;

const NoteDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.gray};
  margin-top: 0.4rem;

  ${({ theme }) =>
    theme.isDarkMode &&
    `
    color: ${theme.colors.lightgray};
  `}
`;

const NoteUpdated = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.lightgray};
  margin-top: 0.4rem;
`;
