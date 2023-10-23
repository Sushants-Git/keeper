import { useEffect, useState, useCallback } from "react";

import Editior from "./Editior/Editior";
import Preview from "./Preview/Preview";
import Modes from "./Modes/Modes";
import SidePanel from "./SidePanel/SidePanel";
import data from "./data/data";

import Split from "react-split";
import { v4 as uuidv4 } from "uuid";

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

  const setCurrent = useCallback(
    (id) => {
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
    },
    [notes]
  );

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

  function deleteFile(id) {
    setNotes((prevValue) => {
      let temp = [...prevValue];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp.splice(i, 1);
        }
      }
      return temp;
    });
    setCurrentFile((prevValue) => notes[0]);
    setCurrentNoteId((prevValue) => notes[0].id);
  }

  // useEffect(() => {
  //   console.log("Useffect Ran");
  //   setCurrentFile((prevValue) => {
  //     let id = currentNoteId;
  //     let temp = notes;
  //     let returnValue = null;
  //     temp.forEach((note) => {
  //       if (note.files) {
  //         note.files.forEach((file) => {
  //           if (file.id === id) {
  //             returnValue = file;
  //           }
  //         });
  //       } else {
  //         if (note.id === id) {
  //           returnValue = note;
  //         }
  //       }
  //     });
  //     return returnValue;
  //   });
  // }, [JSON.stringify(notes)]);

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
            <Preview content={currentFile.content} />
          </div>
        </Split>
      ) : (
        <Split className="split" sizes={[25, 75]} gutterSize={2}>
          <div className="left-side">
            <SidePanel
              currentFile={currentFile}
              createFile={createFile}
              createFolder={createFolder}
              deleteFile={deleteFile}
              folderToggle={folderToggle}
              notes={notes}
              setCurrent={setCurrent}
            />
          </div>
          <div className="right-side">
            {currentMode === "Preview" ? (
              <Preview content={currentFile.content} />
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
