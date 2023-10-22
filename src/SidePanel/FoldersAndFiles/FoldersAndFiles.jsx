import addFolder from "../../svg/addFolder.svg";
import addFile from "../../svg/addFile.svg";
import sort from "../../svg/sort.svg";

import GenerateFile from "./GenerateFile/GenerateFile";
import GenerateFolder from "./GenerateFolder/GenerateFolder";

function FoldersAndFiles({
  notes,
  setCurrent,
  folderToggle,
  createFile,
  currentFile,
  createFolder,
}) {
  return (
    <>
      <div className="add">
        <img
          src={addFolder}
          onClick={() => createFolder()}
          alt="createFolder"
        />
        <img src={addFile} onClick={() => createFile()} alt="createFile" />
        <img src={sort} alt="sort" />
      </div>

      <div className="folderAndFilesContainer">
        {notes.map((dataPoint) =>
          dataPoint.files === undefined ? (
            <GenerateFile
              dataPoint={dataPoint}
              setCurrent={setCurrent}
              currentFile={currentFile}
              key={dataPoint.id}
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
