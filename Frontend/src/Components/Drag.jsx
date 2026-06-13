import { useState } from "react";

function Drag({ file, onFileDrop, onClick }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile && onFileDrop) {
      onFileDrop(droppedFile);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`border-dashed border-4 flex items-center justify-center rounded-2xl h-50 w-70 cursor-pointer
      ${isDragging ? "border-cyan-400" : "border-white/10"}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h1 className="text-xl font-bold text-white text-center px-4">
        {file ? file.name : "Drag and Drop"}
      </h1>
    </div>
  );
}

export default Drag;