import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import NoteItem from "../src/components/NoteItem";
import { lightTheme } from "../src/style/theme";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const noteItemProps = {
  id: "1",
  title: "Test Title",
  content: "Test Content",
  updatedAt: "2023-06-12T00:00:00Z",
};

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </MemoryRouter>
  );
};

describe("<NoteItem />", () => {
  it("renders NoteItem component with title and content", () => {
    renderWithTheme(<NoteItem {...noteItemProps} />);

    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Content/i)).toBeInTheDocument();
    // Using a function to match the date text more flexibly
    expect(
      screen.getByText((content, element) => {
        const hasText = (text: string) => element.textContent === text;
        const date = new Date("2023-06-12T00:00:00Z").toLocaleString();
        return hasText(date);
      })
    ).toBeInTheDocument();
  });

  it("navigates to the correct page on click", () => {
    renderWithTheme(<NoteItem {...noteItemProps} />);

    fireEvent.click(screen.getByText(/Test Title/i));
    expect(mockNavigate).toHaveBeenCalledWith("/note/1");
  });
});
