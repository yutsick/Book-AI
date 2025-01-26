const ImageUploader = ({ onFileChange, preview }) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      onFileChange(selectedFile); 
    }
  };

  const handleDrop = (e) => {
    e.preventDefault(); 
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      onFileChange(droppedFile); 
    }
  };

  return (
    <label
      className="w-[215px] h-[250px] border-2 border-dashed border-[#898989] rounded-md flex flex-col justify-center items-center text-center bg-white cursor-pointer transition-[300]"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={` ${preview ? 'h-[220px]' : 'h-auto'} w-full flex justify-center items-center p-2`}>
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <img src="images/create-book/icon-camera.png" alt="icon camera" className="opacity-50" width="32px" />
        )}
      </div>
      <div className="text-[15px] text-black/50">
        {preview ? "Change image" : "Drop your image here or browse"}
      </div>
      <input type="file" className="sr-only" onChange={handleFileChange} />
    </label>
  );
};

export default ImageUploader;
