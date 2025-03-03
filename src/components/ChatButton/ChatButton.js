import React from 'react';
import Image from 'next/image';

function ChatButton() {
  return (
    <div>
      <div className="bg-white flex items-center justify-center md:justify-start gap-1.5 cursor-pointer text-[#4A4949] font-semibold shadow-chatShadow rounded-full w-12 h-12 md:w-fit md:rounded-[3px] md:px-[10px] md:py-[6px]" id="chat" style={{ fontFamily: "var(--font-poppins)" }}>
        <span>
          <Image 
            src={'/images/icon-chat.svg'}
            width={38}
            height={32}
            alt='Chat Button'
             className="md:w-[38px] md:h-[32px] w-[22px] h-[24px]"
          />
        </span>
        <span className='hidden md:block'>Chat With Us</span>
      </div>
    </div>
  )
}

export default ChatButton
