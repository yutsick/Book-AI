import React from 'react';
import WidgetItem from './WidgetItem';

function Widgets({widgets}) {
  return (
    <div>
       <div className="flex justify-center items-center  px-3 md:px-20 gap-6 md:gap-8 mt-[30px] md:mt-[38px]">
            <WidgetItem widgets = {widgets}/>
          </div>
    </div>
  )
}

export default Widgets
