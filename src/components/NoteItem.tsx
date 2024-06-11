import styled from "styled-components";

interface NoteItemProps {
  title: string;
  description: string;
}

const NoteItem = (props: NoteItemProps) => {
  const { title, description } = props;
  return (
    <NoteItemContainer>
      <NoteItemText>{title}</NoteItemText>
      <NoteDescription>{description}</NoteDescription>
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
`;
