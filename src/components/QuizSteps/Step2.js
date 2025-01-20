import React, { useEffect, useContext, useState } from "react";
import RadioButtonList from "@/components/FormsElements/RadioButtonList";
import config from "../../../config";
import CreateGenreContext from "@/contexts/CreateGenreContext";


const StepTwo = ({ setProgressStep, setIsButtonDisabled }) => {
  
 
  const { genresUrl } = config;
  const [genresData, setGenresData] = useState(null);

  const { selectedGenre } = useContext(CreateGenreContext); 

  useEffect(() => {
    fetch(genresUrl)
      .then((response) => response.json())
      .then((data) => {
        setGenresData(data);
      })
      .catch((error) => {
        console.error("Error fetching genres data:", error);
      });
  }, [genresUrl]);

  useEffect(() => {
    setProgressStep(2);
  }, [setProgressStep]);

  useEffect(() => {
    setIsButtonDisabled(!selectedGenre);
    return () => {
      setIsButtonDisabled(false);
    };
  }, [setIsButtonDisabled, selectedGenre]);

  return (
    genresData && (
      <div className="">
        <div className="w-full mt-2">
          <div className="md:mx-6">
            <div className="field-title">Choose a Genre</div>
            <div className="field-desc">
              Select a genre to guide the tone and direction of your book. This choice will shape the story’s vibe and writing style, ensuring it’s perfectly tailored to your vision
            </div>
            <div className="my-8">
              <RadioButtonList
                setIsButtonDisabled={setIsButtonDisabled}
                options={genresData}
                selectedValue={selectedGenre} 
                // onChange={setSelectedGenre} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default StepTwo;
