import React, { useEffect, useState } from "react";

import RadioButtonList from "@/components/FormsElements/RadioButtonList";


function Step5({setProgressStep}) {
  useEffect(() => {
      setProgressStep(4); 
    }, [setProgressStep]);
    const [selectedTopic, setSelectedTopic] = useState("");
    
    const topicOptions = [
      { "id": "1", "name": "The Great Cheese Heist", "description": "A thrilling tale of mice, mischief, and an unforgettable mission"},
      { "id": "2", "name": "Lost in the Sauce", "description": "How one chef turned a culinary disaster into a five-star success"},
      { "id": "3", "name": "Dancing Through the Storm", "description": "A story of resilience, rhythm, and finding hope in the darkest of times"},
      { "id": "4", "name": "Dancing Through the Storm", "description": "A story of resilience, rhythm, and finding hope in the darkest of times"  },
    ]
    
  return (
    <div>
      <div className="w-full mt-2 md:px-6">
        <div className="field-title">Choose a title and tagline that speaks to you</div>
        
        <div className="my-8">
          <RadioButtonList
            iconPosition="right"
            options={topicOptions}
            selectedValue={selectedTopic}
            onChange={setSelectedTopic}
          />
        </div>
      </div>
    </div>
  )
}

export default Step5
