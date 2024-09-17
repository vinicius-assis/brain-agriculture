import { render, screen } from "@testing-library/react";
import Table from ".";
import { AppDispatch } from "../../../../store";
import { useDispatch } from "react-redux";

const mockItems = ["Name", "Document", "Farm Name"];
const mockRows = [
  { document: "12345", name: "John Doe", farmname: "Farm A", id: "123" },
  { document: "67890", name: "Jane Smith", farmname: "Farm B", id: "432" },
];

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("#Table Suite", () => {
  const mockDispatch = jest.fn() as unknown as AppDispatch;

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it("should render the table with headers", () => {
    render(<Table headers={mockItems} rows={mockRows} />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should render the rows with correct data", () => {
    render(<Table headers={mockItems} rows={mockRows} />);

    mockRows.forEach(({ name, document, farmname }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(document)).toBeInTheDocument();
      expect(screen.getByText(farmname)).toBeInTheDocument();
    });
  });
});
