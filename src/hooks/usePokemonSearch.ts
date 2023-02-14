import { useState } from "react";
import { PokemonData, PokemonDataStats } from "../shared/PokemonInfo";
import { MainClient, Pokemon, PokemonSpecies } from "pokenode-ts";

type State = {
  data: PokemonData | undefined;
  error: boolean;
  errorMessage: string;
};

const usePokemonSearch = () => {
  const api = new MainClient();

  const initialState: State = {
    data: undefined,
    error: false,
    errorMessage: "",
  };
  const [pokemonData, setPokemonData] = useState<State>(initialState);

  const getPokemonName = (pokemonSpecies: PokemonSpecies): string => {
    const found = pokemonSpecies.names.find(
      (item) => item.language.name === "en"
    );

    if (!found) throw new Error("O nome do pokemon não foi encontrado");

    return found.name;
  };

  const getPokemonImage = (pokemon: Pokemon): string => {
    const found = pokemon?.sprites?.other?.["official-artwork"]?.front_default;

    if (!found) throw new Error("A imagem do pokemon não foi encontrada");

    return found;
  };

  const getPokemonStats = (pokemon: Pokemon): PokemonDataStats => {
    const stats: PokemonDataStats = {
      hp: 0,
      speed: 0,
      attack: 0,
      defense: 0,
    };

    pokemon.stats.forEach((item) => {
      if (stats.hasOwnProperty(item.stat.name)) {
        stats[item.stat.name as keyof PokemonDataStats] = item.base_stat;
      }
    });

    return stats;
  };

  const getPokemonPhrase = (pokemonSpecies:PokemonSpecies) => {
    return pokemonSpecies?.flavor_text_entries?.[0].flavor_text
  }

  const setErrorMessage = (errorMessage: string) => {
    setPokemonData((state) => ({
      data: undefined,
      error: true,
      errorMessage,
    }));
  };

  const searchPokemon = async (searchInput: string) => {
    setPokemonData((state) => ({ ...state, error: false }));

    try {
      const pokemonSpecies: PokemonSpecies =
        await api.pokemon.getPokemonSpeciesByName(searchInput);
      const pokemon: Pokemon = await api.pokemon.getPokemonByName(searchInput);

      const pokemonFound: PokemonData = {
        name: getPokemonName(pokemonSpecies),
        phrase: getPokemonPhrase(pokemonSpecies),
        image: getPokemonImage(pokemon),
        stats: getPokemonStats(pokemon),
      };

      setPokemonData((state) => ({ ...state, data: pokemonFound, error: false }));
    } catch (error: any) {
      if (!(error instanceof Error))
        return setErrorMessage(
          "Erro inesperado no servidor, aguarde alguns instantes e tente novamente."
        );

      if (error.message.includes("404"))
        return setErrorMessage("Pokemon não encontrado");

      setErrorMessage(error.message);
    }
  };

  const resetErrors = () => setPokemonData(initialState)

  return { pokemonData, searchPokemon, resetErrors };
};

export { usePokemonSearch };
