import threeDotMenu from "../../../../svg/threeDotMenu.svg";

function GenerateFile({
  dataPoint,
  setCurrent,
  currentFile,
  deleteFile,
  renameFile,
  toggleMenu,
  menuOpen,
}) {
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
        <button
          data-id={dataPoint.id}
          data-menuopen={dataPoint.menuOpen}
          onClick={(event) => {
            toggleMenu(event.target.dataset.id);
          }}
        >
          <img data-id={dataPoint.id} src={threeDotMenu} alt="file menu" />
        </button>
        {menuOpen && (
          <div className="menuPopUp" data-id={dataPoint.id}>
            <ul>
              <li
                data-id={dataPoint.id}
                onClick={(event) => {
                  deleteFile(event.target.dataset.id);
                  toggleMenu(event.target.dataset.id);
                }}
              >
                Delete
              </li>
              <li
                data-id={dataPoint.id}
                onClick={(event) => {
                  renameFile(event.target.dataset.id);
                  toggleMenu(event.target.dataset.id);
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
