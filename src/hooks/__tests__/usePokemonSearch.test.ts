import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { usePokemonSearch } from "../usePokemonSearch";
import nock from "nock";

const mockServer = "http://pokeapi.co";

const mockSpeciesUrl = "/api/v2/pokemon-species/pikachu";
const mockSpeciesData = {
  names: [
    {
      language: { name: "en", url: "https://pokeapi.co/api/v2/language/9/" },
      name: "Pikachu",
    },
  ],
  flavor_text_entries: {
    flavor_text:
      "When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms.",
  },
};

const mockPokemoUrl = "/api/v2/pokemon/pikachu";
const mockPokemonData = {
  sprites: {
    other: {
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      },
    },
  },
  stats: [
    {
      base_stat: 35,
      effort: 0,
      stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
    },

    {
      base_stat: 55,
      effort: 0,
      stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" },
    },
    {
      base_stat: 40,
      effort: 0,
      stat: { name: "defense", url: "https://pokeapi.co/api/v2/stat/3/" },
    },
    {
      base_stat: 90,
      effort: 2,
      stat: { name: "speed", url: "https://pokeapi.co/api/v2/stat/6/" },
    },
  ],
};

describe("usePokemonSearch", () => {
  it("should get pokemon data", async () => {
    const scope = nock(mockServer)
      .defaultReplyHeaders({
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      })
      .get(mockPokemoUrl)
      .reply(200, mockPokemonData)
      .get(mockSpeciesUrl)
      .reply(200, mockSpeciesData);

    const { result } = renderHook(() => usePokemonSearch());

    await act(async () => {
      await result.current?.searchPokemon("pikachu");
    });

    expect(result.current?.pokemonData?.data?.name).toBe("Pikachu");

    await act(async () => {
      await result.current?.searchPokemon("invalid pokemon");
    });

    expect(result.current?.pokemonData?.error).toBe(true);
  });
});
