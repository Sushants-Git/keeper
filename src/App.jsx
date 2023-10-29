import { useState, useCallback, createContext, useRef } from "react";
import Split from "react-split";

import Editior from "./Components/Editior/Editior";
import Preview from "./Components/Preview/Preview";
import Modes from "./Components/Modes/Modes";
import SidePanel from "./Components/SidePanel/SidePanel";
import data from "./data/data";
import util from "./Components/util/util";

const FAFContext = createContext({});
const ContentContext = createContext({});

function App() {
  const [notes, setNotes] = useState(data);
  const [currentMode, setCurrentMode] = useState("Preview");
  const [currentFile, setCurrentFile] = useState(notes[0]);
  const [currentNoteId, setCurrentNoteId] = useState(currentFile.id);
  const [menuOpenArray, setMenuOpenArray] = useState(
    util.createMenuOpenArray(notes)
  );
  const [sorted, setSorted] = useState(false);

  const editiorRef = useRef(null);
  const previewRef = useRef(null);
  const importFile = useRef(null);

  const setCurrent = useCallback(
    (id) => {
      setCurrentFile((prevValue) => {
        let found = null;
        notes.forEach((note) => {
          if (note.files) {
            note.files.forEach((file) => {
              if (file.id === id) {
                found = file;
              }
            });
          } else if (note.id === id) {
            found = note;
          }
        });
        return found;
      });
      setCurrentNoteId((prevValue) => id);
    },
    [notes]
  );

  /*---------------------- Utility Functions Start----------------------*/

  function test() {
    util.test({ notes, currentFile, currentNoteId });
  }

  function exportFiles() {
    util.exportFiles({ notes });
  }

  function importFiles() {
    util.importFiles({
      importFile,
      setNotes,
      setMenuOpenArray,
      setCurrentFile,
      setCurrentNoteId,
    });
  }

  function createFile() {
    util.createFile({
      setNotes,
      setMenuOpenArray,
      setCurrentFile,
      setCurrentNoteId,
    });
  }

  function changeMode(id) {
    util.changeMode(id, { setCurrentMode });
  }

  function setText(id, value) {
    util.setText(id, value, {
      setNotes,
      setCurrentNoteId,
    });
  }

  function deleteFile(id) {
    util.deleteFile(id, {
      notes,
      setNotes,
      setMenuOpenArray,
      setCurrentFile,
      setCurrentNoteId,
    });
  }

  function renameFile(id) {
    util.renameFile(id, { setNotes });
  }

  function sortFiles() {
    util.sortFiles({ setNotes, setMenuOpenArray, sorted, setSorted });
  }

  function toggleMenu(id) {
    util.toggleMenu(id, { setMenuOpenArray });
  }

  /*---------------------- Utility Functions End----------------------*/

  const sidePanelProps = {
    createFile,
    deleteFile,
    notes,
    renameFile,
    setCurrent,
    sortFiles,
    toggleMenu,
    menuOpenArray,
  };

  return (
    <>
      <FAFContext.Provider
        value={{
          content: currentFile.content,
          currentFile,
          currentMode,
          setText,
        }}
      >
        <Modes changeMode={changeMode} />
        {currentMode === "Split" ? (
          <SplitScreen
            editiorRef={editiorRef}
            previewRef={previewRef}
            currentFile={currentFile}
          />
        ) : (
          <NormalScreen
            sidePanelProps={sidePanelProps}
            currentMode={currentMode}
            exportFiles={exportFiles}
            importFiles={importFiles}
            importFile={importFile}
            currentFile={currentFile}
          />
        )}
      </FAFContext.Provider>
    </>
  );
}

function SplitScreen({ editiorRef, previewRef, currentFile }) {
  return (
    <Split className="split" sizes={[50, 50]} gutterSize={2}>
      <div className="left-side" id="left-side">
        <Editior editiorRef={editiorRef} previewRef={previewRef} />
      </div>
      <div className="right-side" id="right-side" ref={previewRef}>
        <ContentContext.Provider value={currentFile.content}>
          <Preview previewRef={previewRef} />
        </ContentContext.Provider>
      </div>
    </Split>
  );
}

function NormalScreen({
  sidePanelProps,
  currentMode,
  exportFiles,
  importFiles,
  importFile,
  currentFile,
}) {
  return (
    <Split className="split" sizes={[25, 75]} gutterSize={2}>
      <div className="left-side">
        <div className="importAndExport">
          <button onClick={() => exportFiles()}>Export</button>
          <label htmlFor="upload-file">Import</label>
          <input
            id="upload-file"
            type="file"
            ref={importFile}
            onChange={(event) => importFiles(event)}
          />
        </div>
        <SidePanel {...sidePanelProps} />
      </div>
      <div className="right-side">
        {currentMode === "Preview" ? (
          <>
            <ContentContext.Provider value={currentFile.content}>
              <Preview />
            </ContentContext.Provider>
          </>
        ) : (
          <Editior />
        )}
      </div>
    </Split>
  );
}

export default App;
export { FAFContext, ContentContext };
