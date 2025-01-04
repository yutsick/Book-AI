
import Image from 'next/image';
import BurgerMenu from '../Menu/Menu'


const Header = () => {

  return (
    <section className="w-full max-w-[1260px] mx-auto items-center px-2 md:px-4">
      <div className="flex justify-between items-center mt-5">
        <a href="/" className="brand-logo h-[40px] md:h-[67px] w-[97px] md:w-[312px] border-b ">
          <Image
            src="/images/main-logo.svg"
            width={161}
            height={55}
            alt="Book Tailor Logo"
            className='ml-4 md:ml-9'
          />
        </a>
        <div className=" h-[40px] md:h-[67px] w-[97px] md:w-[312px] border-b flex items-center justify-end" id='nav-button'>
          <BurgerMenu />
        </div>
      </div>
    </section>
  )
}


export default Header;