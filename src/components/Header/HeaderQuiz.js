
import Image from 'next/image';
import Link from "next/link";
const HeaderQuiz = () => {

  return (
    <section className="w-full max-w-[910px] mx-auto items-center px-2 md:px-0">
      <div className="flex justify-between items-center mt-5">
        <Link
          href="/"
          className="brand-logo h-[40px] md:h-[67px] w-[97px] md:w-[312px] border-b border-[#E5E7EB] md:-ml-2 "
        >
          <Image
            src="/images/main-logo.svg"
            width={161}
            height={55}
            alt="Book Tailor Logo"
      
          />
        </Link>

      </div>
    </section>
  )
}


export default HeaderQuiz;