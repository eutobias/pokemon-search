import { render, screen } from "@testing-library/react";

import { Header } from "../Header";

describe("Header", () => {
  it("should render logo image", () => {
    render(<Header />);

    const headerElement = screen.getByAltText("Pokemon Logo");
    expect(headerElement).toBeInTheDocument();
  });
});
