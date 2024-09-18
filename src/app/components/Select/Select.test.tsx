import { screen, render, fireEvent } from "@testing-library/react";
import SelectInput from ".";
import { useForm } from "react-hook-form";

const MockFormWrapper = ({
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (register: any) => JSX.Element;
}) => {
  const { register } = useForm();
  return <form>{children(register)}</form>;
};

const mockOptions = [
  { value: "SP", label: "São Paulo" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "MG", label: "Minas Gerais" },
];

describe("#SelectInput Suite", () => {
  it("should render SelectInput component", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <SelectInput
            label="State"
            register={register}
            name="state"
            options={mockOptions}
          />
        )}
      </MockFormWrapper>
    );

    const selectElement = screen.getByText("Select State");
    expect(selectElement).toBeInTheDocument();
  });

  it("should display placeholder option by default", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <SelectInput
            label="State"
            register={register}
            name="state"
            options={mockOptions}
          />
        )}
      </MockFormWrapper>
    );

    const placeholderOption = screen.getByText("Select State");
    expect(placeholderOption).toBeInTheDocument();
  });

  it("should display all the options passed to the component when opened", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <SelectInput
            label="State"
            register={register}
            name="state"
            options={mockOptions}
          />
        )}
      </MockFormWrapper>
    );

    const selectElement = screen.getByText("Select State");
    fireEvent.mouseDown(selectElement);

    expect(screen.getByText("São Paulo")).toBeInTheDocument();
    expect(screen.getByText("Rio de Janeiro")).toBeInTheDocument();
    expect(screen.getByText("Minas Gerais")).toBeInTheDocument();
  });

  it("should display an error message when there is a validation error", () => {
    const errorMessage = "State is required";

    render(
      <MockFormWrapper>
        {(register) => (
          <SelectInput
            label="State"
            register={register}
            name="state"
            options={mockOptions}
            errors={{
              state: { message: errorMessage, type: "required" },
            }}
          />
        )}
      </MockFormWrapper>
    );

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("text-red-500");
  });

  it("should handle single option selection", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <SelectInput
            label="State"
            register={register}
            name="state"
            options={mockOptions}
          />
        )}
      </MockFormWrapper>
    );

    const selectElement = screen.getByText("Select State");
    fireEvent.mouseDown(selectElement);

    const optionElement = screen.getByText("São Paulo");
    fireEvent.click(optionElement);

    expect(screen.getByText("São Paulo")).toBeInTheDocument();
  });

  it("should display a placeholder when no options are selected in multi-select", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <SelectInput
            label="State"
            register={register}
            name="state"
            options={mockOptions}
            isMulti={true}
          />
        )}
      </MockFormWrapper>
    );

    const selectElement = screen.getByText("Select State");
    expect(selectElement).toBeInTheDocument();
  });
});
