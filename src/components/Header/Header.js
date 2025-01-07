
import Image from 'next/image';
import BurgerMenu from '../Menu/Menu'


const Header = () => {

  return (
    <section className="w-full max-w-[1260px] mx-auto items-center px-2 md:px-[67px]">
      <div className="flex justify-between items-center mt-5">
        <a href="/" className="brand-logo h-[40px] md:h-[67px] w-[97px] md:w-[312px] border-b border-[#E5E7EB]">
          <Image
            src="/images/main-logo.svg"
            width={161}
            height={55}
            alt="Book Tailor Logo"
            className='ml-4 md:ml-9'
          />
        </a>
        <div className=" h-[40px] md:h-[67px] w-[97px] md:w-[312px] border-b border-[#E5E7EB] flex items-center justify-end" id='nav-button'>
          <BurgerMenu />
        </div>
      </div>
    </section>
  )
}


export default Header;