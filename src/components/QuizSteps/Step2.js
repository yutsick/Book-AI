import React, { useEffect, useContext, useState } from "react";
import RadioButtonList from "@/components/FormsElements/RadioButtonList";
import config from "../../../config";
import CreateGenreContext from "@/contexts/CreateGenreContext";


const StepTwo = ({ setProgressStep}) => {
  
 
  const { genresUrl } = config;
  const [genresData, setGenresData] = useState(null);

  const { selectedGenre, setSelectedGenre } = useContext(CreateGenreContext); 

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

  // useEffect(() => {
  //   setIsButtonDisabled(!selectedGenre);
  //   return () => {
  //     setIsButtonDisabled(false);
  //   };
  // }, [setIsButtonDisabled, selectedGenre]);

  return (
    genresData && (
      <div className="">
        <div className="w-full mt-2">
          <div className="md:mx-6">
            <div className="field-title">Choose a Genre</div>
            <div className="field-desc">
            Your book will be funny and satirical, but the genre you choose will shape its direction and atmosphere, creating the perfect stage for humor to shine
            </div>
            <div className="mb-8 mt-[25px]">
              <RadioButtonList
                // setIsButtonDisabled={setIsButtonDisabled}
                options={genresData}
                selectedValue={selectedGenre} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default StepTwo;
