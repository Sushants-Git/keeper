function GenerateFile({ dataPoint, setCurrent,currentFile }) {
  return (
    <p
      data-id={dataPoint.id}
      onClick={(event) => setCurrent(event.target.dataset.id)}
      className="fileWithoutFolder"
      style={currentFile.id === dataPoint.id ? { color: "#48baff" } : null}
    >
      {dataPoint.name}
    </p>
  );
}

export default GenerateFile;
