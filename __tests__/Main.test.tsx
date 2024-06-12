import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Main from "../src/components/Main";
import { lightTheme } from "../src/style/theme";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockToggleTheme = jest.fn();

const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </MemoryRouter>
  );
};

beforeEach(() => {
  localStorage.clear();
});

test("renders Main component with title and theme toggle button", () => {
  renderWithTheme(<Main isDarkMode={false} toggleTheme={mockToggleTheme} />);
  expect(screen.getByText(/Notes App/i)).toBeInTheDocument();
  expect(screen.getByText(/기록하기!/i)).toBeInTheDocument();
  expect(screen.getByText(/☀️/i)).toBeInTheDocument();
});

test("toggles theme when theme button is clicked", () => {
  renderWithTheme(<Main isDarkMode={false} toggleTheme={mockToggleTheme} />);
  fireEvent.click(screen.getByText(/☀️/i));
  expect(mockToggleTheme).toHaveBeenCalled();
});

test("loads and displays notes from localStorage", () => {
  const mockNotes = [
    {
      id: "1",
      title: "Note 1",
      content: "Content 1",
      createdAt: "2023-06-12T00:00:00Z",
      updatedAt: "2023-06-12T00:00:00Z",
    },
    {
      id: "2",
      title: "Note 2",
      content: "Content 2",
      createdAt: "2023-06-11T00:00:00Z",
      updatedAt: "2023-06-11T00:00:00Z",
    },
  ];
  localStorage.setItem("noteList", JSON.stringify(mockNotes));

  renderWithTheme(<Main isDarkMode={false} toggleTheme={mockToggleTheme} />);

  expect(screen.getByText(/Note 1/i)).toBeInTheDocument();
  expect(screen.getByText(/Note 2/i)).toBeInTheDocument();
});

test("navigates to create note page on button click", () => {
  renderWithTheme(<Main isDarkMode={false} toggleTheme={mockToggleTheme} />);
  fireEvent.click(screen.getByText(/노트 생성/i));
  expect(mockNavigate).toHaveBeenCalledWith("/note");
});
