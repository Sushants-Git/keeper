import { useEffect, useState, useCallback, createContext, useRef } from "react";

import Editior from "./Editior/Editior";
import Preview from "./Preview/Preview";
import Modes from "./Modes/Modes";
import SidePanel from "./SidePanel/SidePanel";
import data from "./data/data";

import Split from "react-split";
import { v4 as uuidv4 } from "uuid";

const FAFContext = createContext({});

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
  const [menuOpenArray, setMenuOpenArray] = useState(function () {
    let temp = [];
    notes.forEach((note) => {
      if (note.files) {
        note.files.forEach((file) => {
          temp.push({
            id: file.id,
            menuOpen: false,
            dateOfCreation: file.dateOfCreation,
          });
        });
      } else {
        temp.push({
          id: note.id,
          menuOpen: false,
          dateOfCreation: note.dateOfCreation,
        });
      }
    });
    return temp;
  });

  const editiorRef = useRef(null);
  const previewRef = useRef(null);
  const importFile = useRef(null);

  const [sorted, setSorted] = useState(false);

  // test();

  // console.log(JSON.stringify(menuOpenArray));

  function test() {
    notes.map((note, index) =>
      console.log(`Notes[${index}].name: ${note.name}\nid: ${note.id}\n`)
    );

    console.log(
      `currentFile.name: ${currentFile.name}\ncurrentFolder: ${currentFolder}\ncurrentNoteId: ${currentNoteId}\nDateofCreation: ${currentFile.dateOfCreation}\nmenuOpen: ${currentFile.menuOpen}`
    );
  }

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
      setCurrentNoteId((prevValue) => id);
    },
    [notes]
  );

  function exportFiles() {
    const filename = "data.json";
    const jsonStr = JSON.stringify(notes);

    let element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(jsonStr)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function importFiles(event) {
    const selectedFile = importFile.current.files[0];
    let importedNotes = null;

    if (selectedFile) {
      const reader = new FileReader();
      let jsonData = null;

      reader.onload = function (e) {
        const jsonContent = e.target.result;
        try {
          jsonData = JSON.parse(jsonContent);
          setNotes((prevValue) => jsonData);
          setMenuOpenArray((preValue) => {
            {
              let temp = [];
              jsonData.forEach((note) => {
                if (note.files) {
                  note.files.forEach((file) => {
                    temp.push({
                      id: file.id,
                      menuOpen: false,
                      dateOfCreation: file.dateOfCreation,
                    });
                  });
                } else {
                  temp.push({
                    id: note.id,
                    menuOpen: false,
                    dateOfCreation: note.dateOfCreation,
                  });
                }
              });
              return temp;
            }
          });
          setCurrentFile((prevValue) => jsonData[0]);
          setCurrentFolder((prevValue) => null);
          setCurrentNoteId((prevValue) => jsonData[0].id);
        } catch (error) {
          alert(`Error parsing JSON:\n ${error.message}`);
        }
      };

      reader.readAsText(selectedFile);
    }
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
    fileName = fileName?.trim();
    let id = uuidv4();
    if (fileName) {
      let createdFile = {
        id: id,
        name: fileName,
        dateOfCreation: new Date(),
        content: `# ${fileName}`,
      };
      setNotes((prevValue) => [...prevValue, createdFile]);
      setMenuOpenArray((prevValue) => [
        ...prevValue,
        { id: id, menuOpen: false, dateOfCreation: createdFile.dateOfCreation },
      ]);
      setCurrentFile((prevValue) => createdFile);
      setCurrentFolder((prevValue) => null);
      setCurrentNoteId(id);
    } else if (fileName === "") {
      alert("File Name Cannot be Empty");
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
    folderName = folderName?.trim();
    let id = uuidv4();
    if (folderName) {
      let createFolder = {
        id: id,
        name: folderName,
        state: "Closed",
        noOfSubFolders: 1,
        isFolder: true,
        dateOfCreation: new Date(),
        files: [],
      };
      setNotes((prevValue) => [...prevValue, createFolder]);
    } else if (folderName === "") {
      alert("Folder Name Cannot be Empty");
    }
  }

  function deleteFile(id) {
    let currentNoteLength = notes.length;
    if (id === "111" && currentNoteLength === 1) {
      alert(
        "** This File Cannot be Deleted **\n It is the only file in your Notes"
      );
      return;
    }
    if (currentNoteLength === 1) {
      let id = uuidv4();
      let fileName = "Empty File";
      let createdFile = {
        id: "111",
        name: fileName,
        dateOfCreation: new Date(),
        content: `# ${fileName}`,
      };
      setNotes((prevValue) => [createdFile]);
      setMenuOpenArray((prevValue) => [
        {
          id: "111",
          menuOpen: false,
          dateOfCreation: createdFile.dateOfCreation,
        },
      ]);
      setCurrentFile((prevValue) => createdFile);
      setCurrentNoteId((prevValue) => id);
      return;
    }

    setNotes((prevValue) => {
      let temp = [...prevValue];
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].id === id) {
          temp.splice(i, 1);
        }
      }
      setCurrentFile((prevValue) => temp[0]);
      setCurrentNoteId((prevValue) => temp[0].id);
      return temp;
    });

    setMenuOpenArray((prevValue) => {
      let kemp = [...prevValue];
      for (let i = 0; i < kemp.length; i++) {
        if (kemp[i].id === id) {
          kemp.splice(i, 1);
        }
      }

      return kemp;
    });

    setCurrentFolder((prevValue) => null);
  }

  function renameFile(id) {
    let newName = prompt("New Name :");
    newName = newName?.trim();
    if (newName) {
      setNotes((prevValue) => {
        let temp = [...prevValue];
        temp.forEach((note) => {
          if (note.files) {
            note.files.forEach((file) => {
              if (file.id === id) {
                file.name = newName;
              }
            });
          } else {
            if (note.id === id) {
              note.name = newName;
            }
          }
        });
        return temp;
      });
    } else if (newName === "") {
      alert("File Name Cannot be Empty");
    }
  }

  function sortFiles() {
    if (!sorted) {
      setNotes((prevValue) => {
        let temp = [...prevValue];
        temp.sort((a, b) => {
          if (a.dateOfCreation > b.dateOfCreation) {
            return -1;
          }
          if (a.dateOfCreation < b.dateOfCreation) {
            return 1;
          }
          return 0;
        });
        return temp;
      });
      // setMenuOpenArray((prevValue) => {
      //   let temp = [...prevValue];
      //   temp.sort((a, b) => {
      //     if (a.dateOfCreation > b.dateOfCreation) {
      //       return -1;
      //     }
      //     if (a.dateOfCreation < b.dateOfCreation) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      //   return temp;
      // });
    } else {
      setNotes((prevValue) => {
        let temp = [...prevValue];
        temp.sort((a, b) => {
          if (a.dateOfCreation < b.dateOfCreation) {
            return -1;
          }
          if (a.dateOfCreation > b.dateOfCreation) {
            return 1;
          }
          return 0;
        });
        return temp;
      });
      // setMenuOpenArray((prevValue) => {
      //   let temp = [...prevValue];
      //   temp.sort((a, b) => {
      //     if (a.dateOfCreation < b.dateOfCreation) {
      //       return -1;
      //     }
      //     if (a.dateOfCreation > b.dateOfCreation) {
      //       return 1;
      //     }
      //     return 0;
      //   });
      //   return temp;
      // });
    }
    setMenuOpenArray((prevValue) => {
      let temp = [...prevValue];
      return temp.map((file) => ({ ...file, menuOpen: false }));
    });
    setSorted((preValue) => !preValue);
  }

  function toggleMenu(id) {
    setMenuOpenArray((prevValue) => {
      let temp = [...prevValue];
      return temp.map((file) => {
        if (file.id === id) {
          return { ...file, menuOpen: !file.menuOpen };
        }
        return { ...file, menuOpen: false };
      });
    });
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

  // return (
  //   <>
  //     <Modes changeMode={changeMode} />
  //     {currentMode === "Split" ? (
  //       <Split className="split" sizes={[50, 50]} gutterSize={2}>
  //         <div className="left-side">
  //           <Editior
  //             setText={setText}
  //             currentFile={currentFile}
  //             currentMode={currentMode}
  //           />
  //         </div>
  //         <div className="right-side">
  //           <Preview content={currentFile.content} />
  //         </div>
  //       </Split>
  //     ) : (
  //       <Split className="split" sizes={[25, 75]} gutterSize={2}>
  //         <div className="left-side">
  //           <SidePanel
  //             currentFile={currentFile}
  //             createFile={createFile}
  //             createFolder={createFolder}
  //             deleteFile={deleteFile}
  //             folderToggle={folderToggle}
  //             notes={notes}
  //             setCurrent={setCurrent}
  //           />
  //         </div>
  //         <div className="right-side">
  //           {currentMode === "Preview" ? (
  //             <Preview content={currentFile.content} />
  //           ) : (
  //             <Editior
  //               setText={setText}
  //               currentFile={currentFile}
  //               currentMode={currentMode}
  //             />
  //           )}
  //         </div>
  //       </Split>
  //     )}
  //   </>
  // );

  const sidePanelProps = {
    createFile,
    createFolder,
    deleteFile,
    folderToggle,
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
          <SplitScreen editiorRef={editiorRef} previewRef={previewRef} />
        ) : (
          <NormalScreen
            sidePanelProps={sidePanelProps}
            currentMode={currentMode}
            exportFiles={exportFiles}
            importFiles={importFiles}
            importFile={importFile}
          />
        )}
      </FAFContext.Provider>
    </>
  );

  // return (
  //   <>
  //     <Modes changeMode={changeMode} />
  //     {currentMode === "Split" ? (
  //       <Split className="split" sizes={[50, 50]} gutterSize={2}>
  //         <div className="left-side">
  //           <Editior
  //             setText={setText}
  //             currentFile={currentFile}
  //             currentMode={currentMode}
  //           />
  //         </div>
  //         <div className="right-side">
  //           <Preview content={currentFile.content} />
  //         </div>
  //       </Split>
  //     ) : (
  //       <Split className="split" sizes={[25, 75]} gutterSize={2}>
  //         <div className="left-side">
  //           <SidePanel
  //             currentFile={currentFile}
  //             createFile={createFile}
  //             createFolder={createFolder}
  //             deleteFile={deleteFile}
  //             folderToggle={folderToggle}
  //             notes={notes}
  //             setCurrent={setCurrent}
  //           />
  //         </div>
  //         <div className="right-side">
  //           {currentMode === "Preview" ? (
  //             <Preview content={currentFile.content} />
  //           ) : (
  //             <Editior
  //               setText={setText}
  //               currentFile={currentFile}
  //               currentMode={currentMode}
  //             />
  //           )}
  //         </div>
  //       </Split>
  //     )}
  //   </>
  // );
}

function SplitScreen({ editiorRef, previewRef }) {
  return (
    <Split className="split" sizes={[50, 50]} gutterSize={2}>
      <div className="left-side" id="left-side">
        <Editior editiorRef={editiorRef} previewRef={previewRef} />
      </div>
      <div className="right-side" id="right-side" ref={previewRef}>
        <Preview previewRef={previewRef} />
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
        {currentMode === "Preview" ? <Preview /> : <Editior />}
      </div>
    </Split>
  );
}

export default App;
export { FAFContext };
