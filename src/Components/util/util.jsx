import { v4 as uuidv4 } from "uuid";

function exportFiles({ notes }) {
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

function importFiles({
  importFile,
  setNotes,
  setMenuOpenArray,
  setCurrentFile,
  setCurrentNoteId,
}) {
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
        setCurrentNoteId((prevValue) => jsonData[0].id);
      } catch (error) {
        alert(`Error parsing JSON:\n ${error.message}`);
      }
    };

    reader.readAsText(selectedFile);
  }
}

function createFile({
  setNotes,
  setMenuOpenArray,
  setCurrentFile,
  setCurrentNoteId,
}) {
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
    setCurrentNoteId(id);
  } else if (fileName === "") {
    alert("File Name Cannot be Empty");
  }
}

function setText(id, value, { setNotes, setCurrentNoteId }) {
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

function test({ notes, currentFile, currentNoteId }) {
  notes.map((note, index) =>
    console.log(`Notes[${index}].name: ${note.name}\nid: ${note.id}\n`)
  );

  console.log(
    `currentFile.name: ${currentFile.name}\ncurrentNoteId: ${currentNoteId}\nDateofCreation: ${currentFile.dateOfCreation}\nmenuOpen: ${currentFile.menuOpen}`
  );
}

function changeMode(id, { setCurrentMode }) {
  setCurrentMode((prevValue) => id);
}

function deleteFile(
  id,
  {
    notes,
    setNotes,
    setMenuOpenArray,
    setCurrentFile,
    setCurrentNoteId,
  }
) {
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
}

function renameFile(id, { setNotes }) {
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

function sortFiles({ setNotes, setMenuOpenArray, sorted, setSorted }) {
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
  }
  setMenuOpenArray((prevValue) => {
    let temp = [...prevValue];
    return temp.map((file) => ({ ...file, menuOpen: false }));
  });
  setSorted((preValue) => !preValue);
}

function toggleMenu(id, { setMenuOpenArray }) {
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

function createMenuOpenArray(notes) {
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
}

let util = {
  exportFiles: exportFiles,
  importFiles: importFiles,
  createFile: createFile,
  setText: setText,
  test: test,
  changeMode: changeMode,
  deleteFile: deleteFile,
  renameFile: renameFile,
  sortFiles: sortFiles,
  toggleMenu: toggleMenu,
  createMenuOpenArray: createMenuOpenArray
};

export default util;
