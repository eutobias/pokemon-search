import { render, screen } from "@testing-library/react";

import { PokemonInfo } from "../PokemonInfo";

const mockData = {
  name: "Test Name",
  phrase: "A test phrase",
  image:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png ",
  stats: {
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
  },
};

describe("SubmitButton", () => {
  it("Button should render default label", () => {
    render(<PokemonInfo data={mockData} />);

    const titleElement = screen.getByText("Test Name");
    expect(titleElement).toBeInTheDocument();

    const textElement = screen.getByText("A test phrase");
    expect(textElement).toBeInTheDocument();
  });
});
