import { render, screen } from "@testing-library/react";

import { SubmitButton } from "../SubmitButton";

describe("SubmitButton", () => {
  it("Button should render default label", () => {
    render(<SubmitButton />);

    const buttonElement = screen.getByText("Enviar");
    expect(buttonElement).toBeInTheDocument();
  });

  it("Button should render the label", () => {
    render(<SubmitButton label="Buscar" />);

    const buttonElement = screen.getByText("Buscar");
    expect(buttonElement).toBeInTheDocument();
  });
});
