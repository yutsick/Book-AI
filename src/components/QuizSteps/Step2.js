import React, { useEffect, useContext, useState } from "react";
import RadioButtonList from "@/components/FormsElements/GenresList";
import config from "../../../config";
import CreateGenreContext from "@/contexts/CreateGenreContext";


function StepTwo ({ setProgressStep}) {
  
 
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

  return (
    genresData && (
      <div className="">
        <div className="w-full mt-4">
          <div className="md:mx-6">
            <div className="field-title">Pick a vibe (optional)</div>
            <div className="field-desc">
            Your book will be <span className="font-semibold">funny and satirical</span> — the genre shapes its style and atmosphere
            </div>
            <div className="mb-8 ">
              <RadioButtonList
                
                options={genresData}
                selectedValue={selectedGenre || null} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default StepTwo;
