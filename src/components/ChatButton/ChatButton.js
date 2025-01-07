import React from 'react';
import Image from 'next/image';

function ChatButton() {
  return (
    <div>
      <div className="bg-white flex items-center gap-1.5 cursor-pointer text-[#4A4949] font-semibold shadow-chatShadow w-fit rounded-[3px] px-[10px] py-[6px]" id="chat" style={{ fontFamily: "var(--font-poppins)" }}>
        <span>
          <Image 
            src={'/images/icon-chat.svg'}
            width={38}
            height={32}
            alt='Chat Button'
          />
        </span>
        <span>Chat With Us</span>
      </div>
    </div>
  )
}

export default ChatButton
