import editior from "../svg/editior.svg";
import preview from "../svg/preview.svg";
import split from "../svg/split.svg";

function Modes({ changeMode }) {
  return (
    <div className="modes">
      <img
        id="Editior"
        src={editior}
        alt="editior"
        onClick={(event) => changeMode(event.target.id)}
      />
      <img
        id="Preview"
        src={preview}
        alt="preview"
        onClick={(event) => changeMode(event.target.id)}
      />
      <img
        id="Split"
        src={split}
        alt="split"
        onClick={(event) => changeMode(event.target.id)}
      />
    </div>
  );
}

export default Modes;
