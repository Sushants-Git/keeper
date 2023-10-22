function Editior({ setText, currentFile, currentMode }) {
  return (
    <section className="editiorWrapper">
      <textarea
        name="editior"
        className= {currentMode === "Split" ? "split-editior" : "editior"}
        rows={4}
        cols={21}
        value={currentFile.content}
        autoFocus
        onChange={(event) => setText(currentFile.id, event.target.value)}
      />
    </section>
  );
}

export default Editior;
