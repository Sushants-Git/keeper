import editior from "../../svg/editior.svg";
import preview from "../../svg/preview.svg";
import split from "../../svg/split.svg";

const modes = [
  { modeName: "Editior", imageSrc: editior },
  { modeName: "Preview", imageSrc: preview },
  { modeName: "Split", imageSrc: split },
];

function Modes({ changeMode }) {
  const handleClick = (modeName) => {
    changeMode(modeName);
  };

  return (
    <div className="modes">
      {modes.map(({ modeName, imageSrc }) => (
        <img
          key={modeName}
          id={modeName}
          src={imageSrc}
          alt={modeName}
          onClick={() => handleClick(modeName)}
        />
      ))}
    </div>
  );
}

export default Modes;
