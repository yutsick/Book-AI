
import Image from 'next/image';
import Link from "next/link";
const HeaderQuiz = () => {

  return (
    <section className="w-full max-w-[820px] mx-auto items-center px-5 md:px-14">
      <div className="flex justify-between items-center mt-4">
        <Link
          href="/"
          className="brand-logo h-[40px] md:h-[67px] w-[97px] md:w-[312px] border-b border-[#E5E7EB]"
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