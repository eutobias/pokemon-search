import React from "react";
import { PokemonData, PokemonDataStats } from "../../shared/PokemonInfo";

import styles from "./PokemonInfo.module.css";

type PokemonInfoProps = {
  data: PokemonData;
};

const PokemonInfo: React.FC<PokemonInfoProps> = ({ data }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.name}>{data.name}</h2>
      <p className={styles.text}>{data.phrase}</p>
      <img className={styles.image} src={data.image} />

      <table className={styles.table}>
        <tbody>
          {Object.keys(data.stats).map((item, index) => (
            <tr key={`item-${index}`}>
              <td>{item}</td>
              <td>{data.stats[item as keyof PokemonDataStats]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { PokemonInfo };
