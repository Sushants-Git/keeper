import { useEffect, useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import Split from "react-split";
import data from "./data/data";
import { v4 as uuidv4 } from "uuid";
import Editior from "./Editior/Editior";
import Preview from "./Preview/Preview";
import Modes from "./Modes/Modes";

import "./Split.css";

function App() {
  const [notes, setNotes] = useState(data);
  const [currentMode, setCurrentMode] = useState("Preview");
  const [currentFolder, setCurrentFolder] = useState(
    notes[0].files ? notes[0] : null
  );
  const [currentFile, setCurrentFile] = useState(
    currentFolder == null ? notes[0] : currentFolder.files[0]
  );
  const [currentNoteId, setCurrentNoteId] = useState(currentFile.id);

  // console.log(currentFile);

  function setCurrent(id) {
    setCurrentFolder((prevValue) => {
      let found = notes.find((note) => {
        if (note.files) {
          return note.files.find((file) => file.id === id);
        }
        return note.id === id;
      });

      found.files ? found : null;
    });

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
  }

  function folderToggle(id) {
    setNotes((prevValue) => {
      return prevValue.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            state: note.state === "Open" ? "Closed" : "Open",
          };
        }
        return note;
      });
    });
  }

  function createFile() {
    let fileName = prompt("File Name :");
    let id = uuidv4();
    let createdFile = {
      id: id,
      name: fileName,
      dateOfCreation: new Date(),
      content: `# ${fileName}`,
    };
    if (createdFile.name) {
      setNotes((prevValue) => [...prevValue, createdFile]);
      setCurrentFile((prevValue) => createdFile);
      setCurrentFolder((prevValue) => null);
      setCurrentNoteId(id);
    }
  }

  function changeMode(id) {
    setCurrentMode((prevValue) => id);
  }

  function setText(id, value) {
    setNotes((prevValue) => {
      let temp = [...prevValue];
      temp.forEach((note) => {
        if (note.files) {
          note.files.forEach((file) => {
            if (file.id === id) {
              file.content = value;
            }
          });
        } else {
          if (note.id === id) {
            note.content = value;
          }
        }
      });
      return temp;
    });

    setCurrentNoteId((prevValue) => id);
  }

  function createFolder() {
    let folderName = prompt("Folder Name :");
    let id = uuidv4();
    let createFolder = {
      id: id,
      name: folderName,
      state: "Closed",
      noOfSubFolders: 1,
      isFolder: true,
      dateOfCreation: new Date(),
      files: [],
    };

    if (createFolder.name) {
      setNotes((prevValue) => [...prevValue, createFolder]);
    }
  }

  useEffect(() => {
    setCurrentFile((prevValue) => {
      let id = currentNoteId;
      let temp = notes;
      let returnValue = null;
      temp.forEach((note) => {
        if (note.files) {
          note.files.forEach((file) => {
            if (file.id === id) {
              returnValue = file;
            }
          });
        } else {
          if (note.id === id) {
            returnValue = note;
          }
        }
      });
      return returnValue;
    });
  }, [JSON.stringify(notes)]);

  return (
    <>
      <Modes changeMode={changeMode} />
      {currentMode === "Split" ? (
        <Split className="split" sizes={[50, 50]} gutterSize={2}>
          <div className="left-side">
            <Editior
              setText={setText}
              currentFile={currentFile}
              currentMode={currentMode}
            />
          </div>
          <div className="right-side">
            <Preview content={currentFile.content} currentMode={currentMode} />
          </div>
        </Split>
      ) : (
        <Split className="split" sizes={[16, 84]} gutterSize={2}>
          <div className="left-side">
            <SidePanel
              notes={notes}
              currentFile={currentFile}
              setCurrent={setCurrent}
              folderToggle={folderToggle}
              createFile={createFile}
              createFolder={createFolder}
            />
          </div>
          <div className="right-side">
            {currentMode === "Preview" ? (
              <Preview
                content={currentFile.content}
                currentMode={currentMode}
              />
            ) : (
              <Editior
                setText={setText}
                currentFile={currentFile}
                currentMode={currentMode}
              />
            )}
          </div>
        </Split>
      )}
    </>
  );
}

export default App;
