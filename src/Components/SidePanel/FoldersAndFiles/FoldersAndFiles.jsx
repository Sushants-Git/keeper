import addFile from "../../../svg/addFile.svg";
import sort from "../../../svg/sort.svg";

import GenerateFile from "./GenerateFile/GenerateFile";

import { FAFContext } from "../../../App";
import { useContext } from "react";

function FoldersAndFiles({
  notes,
  setCurrent,
  createFile,
  deleteFile,
  renameFile,
  sortFiles,
  toggleMenu,
  menuOpenArray,
}) {
  const { currentFile } = useContext(FAFContext);
  return (
    <>
      <div className="add">
        <img src={addFile} onClick={() => createFile()} alt="createFile" />
        <img src={sort} alt="sort" onClick={() => sortFiles()} />
      </div>

      <div className="folderAndFilesContainer">
        {notes.map((dataPoint, index) => (
          <GenerateFile
            dataPoint={dataPoint}
            setCurrent={setCurrent}
            currentFile={currentFile}
            key={dataPoint.id}
            deleteFile={deleteFile}
            renameFile={renameFile}
            toggleMenu={toggleMenu}
            menuOpen={menuOpenArray[index].menuOpen}
          />
        ))}
      </div>
    </>
  );
}

export default FoldersAndFiles;
