import threeDotMenu from "../../../svg/threeDotMenu.svg";
import { useState } from "react";

function GenerateFile({
  dataPoint,
  setCurrent,
  currentFile,
  deleteFile,
  renameFile,
}) {
  const [showMenu, setShowMenu] = useState(false);
  function toggleMenu() {
    setShowMenu((preValue) => !preValue);
  }

  return (
    <>
      <div className="generateFile">
        <p
          data-id={dataPoint.id}
          onClick={(event) => setCurrent(event.target.dataset.id)}
          onDoubleClick={(event) => renameFile(event.target.dataset.id)}
          className="fileWithoutFolder"
          style={currentFile.id === dataPoint.id ? { color: "#48baff" } : null}
        >
          {dataPoint.name}
        </p>
        <button data-id={dataPoint.id} onClick={() => toggleMenu()}>
          <img data-id={dataPoint.id} src={threeDotMenu} alt="file menu" />
        </button>
        {showMenu && (
          <div className="menuPopUp" data-id={dataPoint.id}>
            <ul>
              <li
                data-id={dataPoint.id}
                onClick={(event) => {
                  deleteFile(event.target.dataset.id);
                  toggleMenu();
                }}
              >
                Delete
              </li>
              <li
                data-id={dataPoint.id}
                onClick={(event) => {
                  renameFile(event.target.dataset.id);
                  toggleMenu();
                }}
              >
                Rename
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default GenerateFile;
