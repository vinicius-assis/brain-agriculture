import { screen, render } from "@testing-library/react";
import Select from ".";
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
];

describe("#Select Suite", () => {
  it("should render Select component", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <Select
            label="State"
            register={register}
            name="state"
            options={mockOptions}
          />
        )}
      </MockFormWrapper>
    );

    const selectElement = screen.getByLabelText("State");
    expect(selectElement).toBeInTheDocument();
  });

  it("should display placeholder option by default", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <Select
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

  it("should display all the options passed to the component", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <Select
            label="State"
            register={register}
            name="state"
            options={mockOptions}
          />
        )}
      </MockFormWrapper>
    );

    const options = screen.getAllByRole("option");
    expect(options.length).toBe(3);
    expect(screen.getByText("São Paulo")).toBeInTheDocument();
    expect(screen.getByText("Rio de Janeiro")).toBeInTheDocument();
  });

  it("should display an error message when there is a validation error", () => {
    const errorMessage = "State is required";

    render(
      <MockFormWrapper>
        {(register) => (
          <Select
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
});
