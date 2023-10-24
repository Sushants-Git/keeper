import FoldersAndFiles from "./FoldersAndFiles/FoldersAndFiles";

function SidePanel(props) {
  return (
    <div className="sidePanelContainer">
      <FoldersAndFiles {...props} />
    </div>
  );
}

export default SidePanel;
