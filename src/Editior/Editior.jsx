import { FAFContext } from "../App";
import { useContext } from "react";
import { useRef } from "react";

function Editior({ editiorRef, previewRef }) {
  const { setText, currentFile, currentMode } = useContext(FAFContext);
  return (
    <section className="editiorWrapper">
      <textarea
        name="editior"
        className={currentMode === "Split" ? "split-editior" : "editior"}
        rows={4}
        cols={21}
        value={currentFile.content}
        autoFocus
        onChange={(event) => setText(currentFile.id, event.target.value)}
        id="editior"
        ref={editiorRef}
        onScroll={() => {
          console.log("ran");
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
