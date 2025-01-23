import React, { useState } from 'react';


const ImageUploader = ({ onFileChange }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
      onFileChange(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setPreview(URL.createObjectURL(droppedFile));
      setError(null);
      onFileChange(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    
    if (e.currentTarget === document.querySelector('#photo') && !e.target.classList.contains("dragging")) {
      e.target.classList.add("dragging");
    }
  };

  const handleDragLeave = (e) => {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      e.target.classList.remove('dragging');
    }
  };
  
  const handleDragEnd = (e) => {
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      e.target.classList.remove('dragging');
    }
  };

  return (
    <label id="photo"
      className="w-[215px] h-[250px] border-2 p-4 border-dashed border-[#898989] rounded-md flex flex-col justify-center items-center text-center bg-white cursor-pointer transition-[300]"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
    >
      <div className="text-lg mb-2">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <img src="images/create-book/icon-camera.png" alt="icon camera" className="" width="32px"/>
        )}
      </div>
      <div className="text-sm text-gray-600">
        {preview ? 'Change image' : 'Drop your image here or browse'}
      </div>
     
        <input
          type="file"
          className="sr-only"
          onChange={handleFileChange}
        />
     
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </label>
  );
};

export default ImageUploader;
