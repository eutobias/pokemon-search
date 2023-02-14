export type PokemonDataStats = {
  hp?: number;
  attack?: number;
  defense?: number;
  speed?: number;
};

export type PokemonData = {
  name: string;
  phrase: string;
  image: string;
  stats: PokemonDataStats;
};
