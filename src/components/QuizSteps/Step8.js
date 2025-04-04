import React, { useEffect, useContext } from 'react';
import CreateBookContext from '@/contexts/CreateBookContext';
import GenreContext from '@/contexts/CreateGenreContext';
import BookPreview from '@/components/BookPreview/BookPreview';
import TableOfContents from '@/components/TableOfContents/TableOfContents';


function Step8({ setProgressStep, goToNextStep, isButtonDisabled, setIsButtonDisabled, setLoader }) {
  const {
    selectedTemplate,
    authorName,
    tableOfContents,
    loading,
    errorToc,
  } = useContext(CreateBookContext);


  const { selectedTopic, selectedSubTopic } = useContext(GenreContext);


  useEffect(() => {
    setProgressStep(6);
  }, [setProgressStep]);

  useEffect(() => {
    setIsButtonDisabled(loading || tableOfContents.length === 0);
    setLoader(loading);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [loading, tableOfContents.length, setIsButtonDisabled, setLoader]);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[30px] font-bold text-center text-orange">
        Your Book
      </div>

      <BookPreview 
        selectedTemplate={selectedTemplate}
        selectedTopic={selectedTopic}
        selectedSubTopic={selectedSubTopic}
        authorName={authorName}
        goToNextStep={goToNextStep}
        disabled={isButtonDisabled}
      />

      <div className="flex w-full justify-center items-center">
        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div>
          </div>
        )}
        {errorToc && <p style={{ color: "red" }}>{errorToc}</p>}
        {!loading && !errorToc && tableOfContents.length > 0 && (
          <TableOfContents contents={tableOfContents} />
        )}
      </div>
    </div>
  );
}

export default Step8;
