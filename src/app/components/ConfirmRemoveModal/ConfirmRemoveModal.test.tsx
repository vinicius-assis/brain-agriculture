import { screen, render, fireEvent } from "@testing-library/react";
import ConfirmRemoveModal from ".";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { closeDeleteModal } from "../../../../store/reducers/actions";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("#ConfirmRemoveModal Suite without store", () => {
  const mockDispatch = jest.fn() as unknown as AppDispatch;

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it("should render ConfirmRemoveModal when show is true", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      show: true,
      id: "123",
    });

    render(<ConfirmRemoveModal />);

    const modalElement = screen.getByText(
      /are you sure you want to delete this item/i
    );
    expect(modalElement).toBeInTheDocument();
  });

  it("should not render ConfirmRemoveModal when show is false", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      show: false,
      id: null,
    });

    render(<ConfirmRemoveModal />);

    const modalElement = screen.queryByText(
      /are you sure you want to delete this item/i
    );
    expect(modalElement).not.toBeInTheDocument();
  });

  it("should call handleClose when 'No, cancel' button is clicked", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      show: true,
      id: "123",
    });

    render(<ConfirmRemoveModal />);

    const cancelButton = screen.getByText(/no, cancel/i);
    fireEvent.click(cancelButton);

    expect(mockDispatch).toHaveBeenCalledWith(closeDeleteModal());
  });

  it("should call deleteProducer and closeDeleteModal when 'Yes, I'm sure' button is clicked", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      show: true,
      id: "123",
    });

    render(<ConfirmRemoveModal />);

    const confirmButton = screen.getByText(/yes, i'm sure/i);
    fireEvent.click(confirmButton);

    expect(mockDispatch).toHaveBeenNthCalledWith(2, closeDeleteModal());
  });

  it("should close the modal when the close icon (X) is clicked", () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      show: true,
      id: "123",
    });

    render(<ConfirmRemoveModal />);

    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith(closeDeleteModal());
  });
});
