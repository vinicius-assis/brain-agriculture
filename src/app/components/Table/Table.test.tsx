import { render, screen } from "@testing-library/react";
import Table from ".";

const mockItems = ["Name", "Document", "Farm Name"];
const mockRows = [
  { document: "12345", name: "John Doe", farmName: "Farm A" },
  { document: "67890", name: "Jane Smith", farmName: "Farm B" },
];

describe("#Table Suite", () => {
  it("should render the table with headers", () => {
    render(<Table headers={mockItems} rows={mockRows} />);

    mockItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should render the rows with correct data", () => {
    render(<Table headers={mockItems} rows={mockRows} />);

    mockRows.forEach(({ name, document, farmName }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByText(document)).toBeInTheDocument();
      expect(screen.getByText(farmName)).toBeInTheDocument();
    });
  });
});
