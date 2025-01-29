import React, { useEffect, useContext } from 'react'

function Step9({ setProgressStep }) {
    useEffect(() => {
      setProgressStep(7);
    }, [setProgressStep]);

  return (
    <div>
       <div className="text-[30px] font-bold text-center text-orange">
        Checkout
      </div>
    </div>
  )
}

export default Step9
