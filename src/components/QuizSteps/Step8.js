import React, { useEffect } from 'react'

function Step8({ setProgressStep }) {
  
      useEffect(() => {
        setProgressStep(6);
      }, [setProgressStep]);

  return (
    <div>
      <div className="text-[30px] font-bold text-center text-orange">
      Your Book
      </div>
    </div>
  )
}

export default Step8
