import React, { useState } from "react";

import styles from "./App.module.css";
import { Header } from "./components/Header/Header";
import { Modal } from "./components/Modal/Modal";
import { PokemonInfo } from "./components/PokemonInfo/PokemonInfo";
import { SubmitButton } from "./components/SubmitButton/SubmitButton";
import { TextInput } from "./components/TextInput/TextInput";
import { usePokemonSearch } from "./hooks/usePokemonSearch";

const App: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { pokemonData, searchPokemon, resetErrors } = usePokemonSearch();

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOnSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    searchPokemon(searchInput);
  };

  const handleCloseModal = () => {
    resetErrors();
  };

  return (
    <>
      <Header />
      <form onSubmit={handleOnSubmit}>
        <div className={styles.form}>
          <TextInput
            name="search"
            value={searchInput}
            placeholder="Busque por um pokemon..."
            onChange={handleOnChange}
          />
          <SubmitButton label="Buscar" />
        </div>
      </form>
      {pokemonData.data && <PokemonInfo data={pokemonData.data} />}
      {pokemonData && (
        <Modal show={pokemonData.error} onClose={handleCloseModal}>
          {pokemonData.errorMessage}
        </Modal>
      )}
    </>
  );
};

export default App;
