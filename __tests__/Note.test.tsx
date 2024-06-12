import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Note from "../src/components/Note";
import { lightTheme } from "../src/style/theme"; // Import the lightTheme

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}));

const mockToggleTheme = jest.fn();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </MemoryRouter>
  );
};

describe("<Note />", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders Note component with initial elements", () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
    renderWithTheme(<Note isDarkMode={false} toggleTheme={mockToggleTheme} />);

    expect(screen.getByText(/Notes App/i)).toBeInTheDocument();
    expect(screen.getByText(/기록하기!/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/노트 제목을 입력해주세요./i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/노트 내용을 입력해주세요./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/확인/i)).toBeInTheDocument();
  });

  it("saves a new note to localStorage", () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
    renderWithTheme(<Note isDarkMode={false} toggleTheme={mockToggleTheme} />);

    fireEvent.change(
      screen.getByPlaceholderText(/노트 제목을 입력해주세요./i),
      { target: { value: "Test Title" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(/노트 내용을 입력해주세요./i),
      { target: { value: "Test Content" } }
    );
    fireEvent.click(screen.getByText(/확인/i));

    const savedNotes = JSON.parse(localStorage.getItem("noteList") || "[]");
    expect(savedNotes).toHaveLength(1);
    expect(savedNotes[0].title).toBe("Test Title");
    expect(savedNotes[0].content).toBe("Test Content");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("loads and updates an existing note", () => {
    const mockNote = {
      id: "1",
      title: "Existing Note",
      content: "Existing Content",
      createdAt: "2023-06-12T00:00:00Z",
      updatedAt: "2023-06-12T00:00:00Z",
    };
    localStorage.setItem("noteList", JSON.stringify([mockNote]));

    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    renderWithTheme(<Note isDarkMode={false} toggleTheme={mockToggleTheme} />);

    expect(screen.getByDisplayValue(/Existing Note/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Existing Content/i)).toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText(/노트 제목을 입력해주세요./i),
      { target: { value: "Updated Title" } }
    );
    fireEvent.change(
      screen.getByPlaceholderText(/노트 내용을 입력해주세요./i),
      { target: { value: "Updated Content" } }
    );
    fireEvent.click(screen.getByText(/확인/i));

    const updatedNotes = JSON.parse(localStorage.getItem("noteList") || "[]");
    expect(updatedNotes).toHaveLength(1);
    expect(updatedNotes[0].title).toBe("Updated Title");
    expect(updatedNotes[0].content).toBe("Updated Content");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("deletes an existing note", () => {
    const mockNote = {
      id: "1",
      title: "Existing Note",
      content: "Existing Content",
      createdAt: "2023-06-12T00:00:00Z",
      updatedAt: "2023-06-12T00:00:00Z",
    };
    localStorage.setItem("noteList", JSON.stringify([mockNote]));

    (useParams as jest.Mock).mockReturnValue({ id: "1" });
    renderWithTheme(<Note isDarkMode={false} toggleTheme={mockToggleTheme} />);

    fireEvent.click(screen.getByText(/삭제/i));

    const updatedNotes = JSON.parse(localStorage.getItem("noteList") || "[]");
    expect(updatedNotes).toHaveLength(0);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("toggles theme when theme button is clicked", () => {
    (useParams as jest.Mock).mockReturnValue({ id: undefined });
    renderWithTheme(<Note isDarkMode={false} toggleTheme={mockToggleTheme} />);

    fireEvent.click(screen.getByText(/☀️/i));
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
