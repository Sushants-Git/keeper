import FoldersAndFiles from "./FoldersAndFiles/FoldersAndFiles";

function SidePanel({ notes, setCurrent, folderToggle,createFile,currentFile,createFolder }) {
  return (
    <div className="sidePanelContainer">
      <FoldersAndFiles
        notes={notes}
        setCurrent={setCurrent}
        folderToggle={folderToggle}
        createFile={createFile}
        currentFile={currentFile}
        createFolder={createFolder}
      />
    </div>
  );
}

export default SidePanel;
