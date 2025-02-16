import Link from "next/link";

const NavButton = ({ href, text }) => {
  return (
    <Link
      href={href}
      className="md:min-w-full max-w-[330px] mx-auto  h-[60px] flex justify-center items-center text-gray-300  border border-gray-300 rounded-md hover:bg-[#ECEBE9] transition"
    >
      {text}
    </Link>
  );
};

export default NavButton;
