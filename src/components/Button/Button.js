import React from 'react'

function Button({text}) {
  return (
    <div className='mt-8 md:mt-12'>
      <a
        className='text-orange py-4 md:py-3 px-7 font-semibold text-[23px] leading-6  flex items-center gap-2 border-[1.5px] border-orange rounded-[3px] shadow-btnShadow w-fit mx-auto button-sec group'
        href='#'
      >
        {text}
        <span className='group-hover:translate-x-1 transition'>
          <svg width="37" height="22" viewBox="0 0 37 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.7493 11.9933C36.3112 11.4314 36.3112 10.5203 35.7493 9.95832L26.5916 0.800684C26.0297 0.238727 25.1186 0.238727 24.5566 0.800684C23.9946 1.36264 23.9946 2.27376 24.5566 2.83571L32.6967 10.9758L24.5566 19.1159C23.9946 19.6779 23.9946 20.589 24.5566 21.151C25.1186 21.7129 26.0297 21.7129 26.5916 21.151L35.7493 11.9933ZM0.719421 12.4148H34.7318V9.53685H0.719421V12.4148Z" fill="#EAAC00" />
          </svg>

        </span>
      </a>
    </div>
  )
}

export default Button
