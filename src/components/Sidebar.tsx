import { FC } from "react";

interface Props {
  pokemonTypes: string[];
  setSelectedType: (type: string) => void;
}

const Sidebar: FC<Props> = ({ pokemonTypes, setSelectedType }) => {
  const handleChangeType = (type: any) => {
    setSelectedType(type);
  };
  return (
    <div className="w-full gap-1 bg-black">
      {pokemonTypes.map((type) => (
        <button
          key={type}
          className="m-1 bg-red-500 hover:bg-yellow-400 text-white font-bold py-1 px-2 rounded "
          onClick={() => handleChangeType(type)}
        >
          <p className="capitalize">{type}</p>
        </button>
      ))}
    </div>
  );
};
export default Sidebar;
