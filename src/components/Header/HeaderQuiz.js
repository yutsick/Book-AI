
import Image from 'next/image';

const HeaderQuiz = () => {

  return (
    <section className="w-full max-w-[768px] mx-auto items-center px-2 ">
      <div className="flex justify-between items-center mt-4">
        <a href="/" className="brand-logo h-[40px] md:h-[67px] w-[97px] md:w-[312px] md:ml-7 sm:ml-[10.5%] ml-[10%]">
          <Image
            src="/images/main-logo.svg"
            width={161}
            height={55}
            alt="Book Tailor Logo"
            className=''
          />
        </a>
        
      </div>
    </section>
  )
}


export default HeaderQuiz;