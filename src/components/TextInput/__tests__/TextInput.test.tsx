import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import { TextInput } from "../TextInput";

const MockTextInput = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder?: string;
}) => {
  const [value, setValue] = useState<string>("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <TextInput
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

describe("TextInput", () => {
  it("Should render empty placeholder", () => {
    render(<MockTextInput name="test-field" />);

    const textElement: HTMLInputElement = screen.getByPlaceholderText("");
    expect(textElement).toBeInTheDocument();
  });

  it("Should render defined placeholder", () => {
    render(<MockTextInput name="test-field" placeholder="Test placeholder" />);

    const textElement: HTMLInputElement =
      screen.getByPlaceholderText("Test placeholder");
    expect(textElement).toBeInTheDocument();
  });

  it("Should render typed value", () => {
    render(<MockTextInput name="busca" />);

    const textElement: HTMLInputElement = screen.getByPlaceholderText("");
    fireEvent.change(textElement, { target: { value: "Test value" } });

    expect(textElement.value).toBe("Test value");
  });
});
