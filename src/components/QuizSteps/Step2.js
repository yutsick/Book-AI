import React, { useState, useEffect } from 'react';
import RadioButtonList from "@/components/FormsElements/RadioButtonList";

const StepTwo = ({ setProgressStep }) => {

  useEffect(() => {
    setProgressStep(2);
  }, [setProgressStep]);

  const [selectedGenre, setSelectedGenre] = useState("");

  const genreOptions = [
    { "id": "1", "name": "Adventure", "description": "For thrilling tales of daring exploits and epic journeys", "icon": "images/create-book/icon-genre1.svg" },
    { "id": "2", "name": "Romance", "description": "Love stories filled with emotion, connection, and heart", "icon": "images/create-book/icon-genre2.svg" },
    { "id": "3", "name": "Mystery/Crime", "description": "Whodunits, suspenseful plots, and gripping investigations", "icon": "images/create-book/icon-genre3.svg" },
    { "id": "4", "name": "Sci-Fi ", "description": "Futuristic adventures, space exploration, and imaginative tech", "icon": "images/create-book/icon-genre4.svg" },
    { "id": "5", "name": "Fantasy", "description": "Magical worlds, heroic quests, and mythical creatures", "icon": "images/create-book/icon-genre5.svg" },
    { "id": "6", "name": "Historical Fiction", "description": "Stories set in a rich historical backdrop", "icon": "images/create-book/icon-genre6.svg" },
    { "id": "7", "name": "Memoir", "description": "Personal stories capturing life’s highs, lows, and lessons", "icon": "images/create-book/icon-genre7.svg" },
    { "id": "8", "name": "Travel", "description": "Tales of exploration and wanderlust-filled journeys", "icon": "images/create-book/icon-genre8.svg" },
    { "id": "9", "name": "Comedy", "description": "Lighthearted, funny stories to bring smiles and laughter", "icon": "images/create-book/icon-genre9.svg" },
    { "id": "10", "name": "Drama", "description": "Emotionally rich narratives with complex characters", "icon": "images/create-book/icon-genre10.svg" },
    { "id": "11", "name": "Horror", "description": "Spine-chilling tales of fear, suspense, and the unknown", "icon": "images/create-book/icon-genre11.svg" },
    { "id": "12", "name": "Inspirational", "description": "Uplifting stories or lessons to inspire and motivate", "icon": "images/create-book/icon-genre12.svg" }
  ]


  return (
    <div className=''>
      <div className="w-full mt-2">
        <div className=" md:mx-6">
          <div className="field-title">Choose a Genre</div>
          <div className="field-desc">Select a genre to guide the tone and direction of your book. This choice will shape the story’s vibe and writing style, ensuring it’s perfectly tailored to your vision</div>
          <div className="my-8">
            <RadioButtonList

              options={genreOptions}
              selectedValue={selectedGenre}
              onChange={setSelectedGenre}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepTwo
