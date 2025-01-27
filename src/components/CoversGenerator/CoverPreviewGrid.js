import React from "react";

const CoverPreviewGrid = ({ templates, onSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {templates.map((template) => (
        <div
          key={template.id}
          className="cursor-pointer hover:scale-105 transition transform"
          onClick={() => onSelect(template.id)}
        >
          <img
            src={template.preview}
            alt={`Cover Preview ${template.id}`}
            className="w-full h-auto rounded shadow-md"
          />
        </div>
      ))}
    </div>
  );
};

export default CoverPreviewGrid;
