import React from 'react'
import Image from 'next/image';

function WidgetItem({widgets}) {

  return (
   
      widgets.map((widget, index) => (

        <div className="flex flex-col" key={index}>
          <Image
            src={widget.imageUrl}
            alt={widget.title}
            width={165}
            height={165}
            className="rounded-[8px]"
          />
          <h3 className="text-gray font-semibold text-[19px] md:text-[21px] leading-[21px] text-center">{widget.title}</h3>
          <div className="text-gray/80 text-[15px] md:text-[16px] text-center">{widget.description}</div>
        </div>
      ))
    
  )
}

export default WidgetItem
