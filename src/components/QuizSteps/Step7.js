import React, { useEffect, useState } from 'react'

function Step7({ setProgressStep }) {

    useEffect(() => {
      setProgressStep(5);
    }, [setProgressStep]);
  return (
    <div>
      Cover Choosing
    </div>
  )
}

export default Step7
