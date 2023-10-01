import FoldersAndFiles from "./FoldersAndFiles/FoldersAndFiles";

function SidePanel({ notes, setCurrent, folderToggle,createFile,currentFile }) {
  return (
    <div className="sidePanelContainer">
      <FoldersAndFiles
        notes={notes}
        setCurrent={setCurrent}
        folderToggle={folderToggle}
        createFile={createFile}
        currentFile={currentFile}
      />
    </div>
  );
}

export default SidePanel;
