import { FAFContext } from "../../App";
import { useContext } from "react";

function Editior({ editiorRef, previewRef }) {
  const { setText, currentFile, currentMode } = useContext(FAFContext);
  return (
    <section className="editiorWrapper">
      <textarea
        autoFocus
        id="editior"
        name="editior"
        className={currentMode === "Split" ? "split-editior" : "editior"}
        value={currentFile.content}
        onChange={(event) => setText(currentFile.id, event.target.value)}
        ref={editiorRef}
        onScroll={() => {
          const multiElementScroll = (elem1, elem2) => {
            elem1.onscroll = function () {
              elem2.scrollTop = this.scrollTop;
            };
          };
          multiElementScroll(editiorRef.current, previewRef.current);
        }}
      />
    </section>
  );
}

export default Editior;
