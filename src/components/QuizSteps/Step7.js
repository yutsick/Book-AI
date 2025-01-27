import React, { useEffect, useState } from 'react';
// import CoverSelector from '../CoversGenerator/CoverSelector';
import CoverSlider from '../CoverSlider/CoverSlider';

function Step7({ setProgressStep }) {

    useEffect(() => {
      setProgressStep(5);
    }, [setProgressStep]);
  return (
    <div className="w-full mt-2 md:px-6 ">
      {/* <CoverSelector /> */}
      <CoverSlider />
    </div>
  )
}

export default Step7
