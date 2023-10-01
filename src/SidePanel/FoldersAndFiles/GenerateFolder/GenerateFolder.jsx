import folderOpen from "../../../svg/folderOpen.svg";
import folderClosed from "../../../svg/folderClosed.svg";

function GenerateFolder({ dataPoint, setCurrent, folderToggle, currentFile }) {
  return (
    <figure className="folderContainer">
      <figcaption
        data-id={dataPoint.id}
        className="folder"
        onClick={(event) => folderToggle(event.target.dataset.id)}
      >
        <div className="folderIconWrapper">
          {dataPoint.state === "Open" ? (
            <img src={folderOpen} alt="FolderOpen" data-id={dataPoint.id} />
          ) : (
            <img src={folderClosed} alt="FolderClosed" data-id={dataPoint.id} />
          )}
        </div>
        <span className="folderName" data-id={dataPoint.id}>
          {dataPoint.name}
        </span>
      </figcaption>
      {dataPoint.state === "Open" ? (
        <ul>
          {dataPoint.files.map((file) => (
            <li
              data-id={file.id}
              key={file.id}
              onClick={(event) => setCurrent(event.target.dataset.id)}
              className="file"
              style={currentFile.id === file.id ? { color: "#48baff" } : null}
            >
              {file.name}
            </li>
          ))}
        </ul>
      ) : null}
    </figure>
  );
}

export default GenerateFolder;
