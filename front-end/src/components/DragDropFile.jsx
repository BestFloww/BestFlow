import React from 'react';

function DragDropFile() {
    const [dragActive, setDragActive] = React.useState(false);
    const inputRef = React.useRef(null);
    
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        // handleFiles(e.dataTransfer.files);
      }
    };
    
    const handleChange = function(e) {
      e.preventDefault();
      if (e.target.files && e.target.files[0]) {
        // handleFiles(e.target.files);
      }
    };
    
    const onButtonClick = () => {
      inputRef.current.click();
    };
    
    return (
      <form
      className="justify-center flex m-3 p-1 flex-col border-dashed border-4 border-indigo-400"
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
      >
        <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? "drag-active" : "" }
        >
          <div>
            <p>Drag and drop file or upload below.</p>
          </div> 
        </label>

        <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        name="transcript"
        multiple={false}
        onChange={handleChange} />

        { dragActive && <div id="drag-file-element"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}></div> }
      </form>
    );
  };

  export default DragDropFile;