import React, { useEffect, useState, useContext } from "react";
import CreateGenreContext from "@/contexts/CreateGenreContext";
import RadioButtonList from "@/components/FormsElements/RadioButtonList";

import { useBookAPI } from "@/hooks/useBookAPI";


function Step5({ setProgressStep, setIsButtonDisabled }) {

  const { selectedTopic, setSelectedTopic, setSelectedSubTopic } = useContext(CreateGenreContext);
  const { books, loading, error } = useBookAPI();
  const [topicOptions, setTopicOptions] = useState([]);



  useEffect(() => {
    setProgressStep(4);
  }, [setProgressStep]);

  useEffect(() => {
    setIsButtonDisabled(!selectedTopic);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, selectedTopic]);

  useEffect(() => {
    if (Array.isArray(books) && books.length > 0) {
      console.log("📚 Books from API:", books);
      
      setTopicOptions(
        books.map((book, index) => ({
          id: String(index + 1),
          name: book.title,
          description: book.subtitle
        }))
      );
    }
  }, [books]);
  // const topicOptions = [
  //   { "id": "1", "name": "I Almost Missed a Taylor Swift Concert", "description": "The Untold Truth About Taking Time Off Work"},
  //   { "id": "2", "name": "A small savings jar", "description": "My path to the world of big dreams has never been easier or felt farther away"},
  //   { "id": "3", "name": "In My Next Life, I'd Like to Be a Shih Tzu", "description": "An Unforgettable Diary About Dogs, Humans, and the Lessons, They Teach Us"},
  //   { "id": "4", "name": "It took us 4 years, 3 months & 8 days to finally meet for coffee", "description": "Close friends don’t always need to meet in person"  },
  // ]
  const handleTopicChange = (value, description) => {
    setSelectedTopic(value);
    setSelectedSubTopic(description);
  };

  return (
    <div>
      <div className="w-full mt-4 md:mt-2 md:px-6">
        <div className="field-title">Choose a title and tagline that speaks to you</div>
        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-600 border-opacity-50"></div>
          </div>
        )}


        {error && <p style={{ color: "red" }}>{error}</p>}
        {topicOptions.length > 0 && !loading && (
          <div className="my-8">
            <RadioButtonList
              iconRight="images/create-book/icon-regenerate.svg"
              options={topicOptions}
              selectedValue={selectedTopic}
              onChange={(value) => handleTopicChange(value, topicOptions.find(opt => opt.name === value)?.description)}
              setIsButtonDisabled={setIsButtonDisabled}
              type='topic'
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Step5
