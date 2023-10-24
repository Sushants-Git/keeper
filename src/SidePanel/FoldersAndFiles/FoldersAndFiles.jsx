import addFolder from "../../svg/addFolder.svg";
import addFile from "../../svg/addFile.svg";
import sort from "../../svg/sort.svg";

import GenerateFile from "./GenerateFile/GenerateFile";
import GenerateFolder from "./GenerateFolder/GenerateFolder";

import { FAFContext } from "../../App";
import { useContext, useEffect } from "react";

function FoldersAndFiles({
  notes,
  setCurrent,
  folderToggle,
  createFile,
  createFolder,
  deleteFile,
  renameFile,
  sortFiles,
  toggleMenu,
  menuOpenArray,
}) {
  // console.log(JSON.stringify(menuOpenArray));
  const { currentFile } = useContext(FAFContext);
  return (
    <>
      <div className="add">
        {/* <img
          src={addFolder}
          onClick={() => createFolder()}
          alt="createFolder"
        /> */}
        <img src={addFile} onClick={() => createFile()} alt="createFile" />
        <img src={sort} alt="sort" onClick={() => sortFiles()} />
      </div>

      <div className="folderAndFilesContainer">
        {notes.map((dataPoint, index) =>
          dataPoint.files === undefined ? (
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
          ) : (
            <GenerateFolder
              dataPoint={dataPoint}
              setCurrent={setCurrent}
              folderToggle={folderToggle}
              currentFile={currentFile}
              key={dataPoint.id}
            />
          )
        )}
      </div>
    </>
  );
}

export default FoldersAndFiles;
