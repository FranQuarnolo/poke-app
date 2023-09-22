import { FC, useEffect, useState } from "react";
import "./Card.css";

interface Props {
  tipeSelected: string[];
}

export const Card: FC<Props> = ({ tipeSelected }) => {
  const [pokemons, setPokemos] = useState<any>([]);

  useEffect(() => {
    console.log(pokemons);
    setPokemos(tipeSelected);
  }, [tipeSelected]);

  return (
    <div className="card__container bg-gray-700 grid grid-cols-5 gap-4 justify-center">
      {pokemons.map(({ name, imageUrl, attributes }: any) => (
        <div className="card">
          <div className="card-image">
            <img src={imageUrl} alt={name} />
          </div>
          <div className="card-content">
            <p className="capitalize antialiased text-lg font-semibold">
              {name}
            </p>
            <ul>
            <li>
                <strong>Life:</strong> {attributes.life}
              </li>
              
              <li>
                <strong>Attack:</strong> {attributes.attack}
              </li>
              <li>
                <strong>Defense:</strong> {attributes.defense}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
