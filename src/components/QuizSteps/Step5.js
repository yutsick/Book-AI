import React, { useEffect, useState, useContext } from "react";
import CreateGenreContext from "@/contexts/CreateGenreContext";
import RadioButtonList from "@/components/FormsElements/RadioButtonList";


function Step5({setProgressStep, setIsButtonDisabled}) {

  const { selectedTopic, setSelectedTopic, setSelectedSubTopic } = useContext(CreateGenreContext); 
  useEffect(() => {
      setProgressStep(4); 
    }, [setProgressStep]);

     useEffect(() => {
        setIsButtonDisabled(!selectedTopic);
        return () => {
          setIsButtonDisabled(false);
        };
      }, [setIsButtonDisabled, selectedTopic]);

   
    
    const topicOptions = [
      { "id": "1", "name": "Surfing Through Life's Waves", "description": "A Fitness Trainer's Guide To Riding The Ups And Downs"},
      { "id": "2", "name": "Football Fever Dreams", "description": "Rantings Of A Trainer Obsessed With Goals And Snack Foods"},
      { "id": "3", "name": "Game Over: My Family Edition", "description": "Leveling Up With Peter, Jessica, And The Ultimate Boss: Maria"},
      { "id": "4", "name": "Boston and the Art of Surfing", "description": "Why I Pick Waves Over Traffic Any Day"  },
    ]
    const handleTopicChange = (value, description) => {
      setSelectedTopic(value);
      setSelectedSubTopic(description); 
    };

  return (
    <div>
      <div className="w-full mt-2 md:px-6">
        <div className="field-title">Choose a title and tagline that speaks to you</div>
        
        <div className="my-8">
          <RadioButtonList
            iconRight="images/create-book/icon-regenerate.svg"
            options={topicOptions}
            selectedValue={selectedTopic}
            onChange={(value) => handleTopicChange(value, topicOptions.find(opt => opt.name === value)?.description)}
            setIsButtonDisabled={setIsButtonDisabled}
            type = 'topic'
          />
        </div>
      </div>
    </div>
  )
}

export default Step5
