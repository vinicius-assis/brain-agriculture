import { render, screen } from "@testing-library/react";
import Input from "./index";
import { useForm, FieldError } from "react-hook-form";

const MockFormWrapper = ({
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (register: any) => JSX.Element;
}) => {
  const { register } = useForm();
  return <form>{children(register)}</form>;
};

describe("#Input Suite", () => {
  it("should render Input component with a label", () => {
    render(
      <MockFormWrapper>
        {(register) => <Input label="Name" register={register} name="name" />}
      </MockFormWrapper>
    );

    const labelElement = screen.getByLabelText("Name");
    expect(labelElement).toBeInTheDocument();
  });

  it("should display the correct placeholder text", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <Input
            label="Email"
            placeholder="Enter your email"
            register={register}
            name="email"
          />
        )}
      </MockFormWrapper>
    );

    const inputElement = screen.getByPlaceholderText("Enter your email");
    expect(inputElement).toBeInTheDocument();
  });

  it("should display an error message if provided", () => {
    // Mocking FieldErrors properly
    const mockErrors = {
      name: {
        type: "required",
        message: "Name is required",
      } as FieldError, // Correctly cast the type here
    };

    render(
      <MockFormWrapper>
        {(register) => (
          <Input
            label="Name"
            register={register}
            name="name"
            errors={mockErrors}
          />
        )}
      </MockFormWrapper>
    );

    const errorMessage = screen.getByText("Name is required");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render input with the correct type", () => {
    render(
      <MockFormWrapper>
        {(register) => (
          <Input
            label="Password"
            type="password"
            register={register}
            name="password"
          />
        )}
      </MockFormWrapper>
    );

    const inputElement = screen.getByLabelText("Password");
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("should not display an error message if no error is provided", () => {
    render(
      <MockFormWrapper>
        {(register) => <Input label="Name" register={register} name="name" />}
      </MockFormWrapper>
    );

    const errorMessage = screen.queryByText("Name is required");
    expect(errorMessage).not.toBeInTheDocument();
  });
});
