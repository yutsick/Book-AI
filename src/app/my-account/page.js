import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import OrderDetails from '@/components/MyAccount/OrderDetails/OrderDetails';
import HeroMyAccount from '@/components/Hero/HeroMyAccount';
import OrdersSummary from '@/components/MyAccount/OrderSummary/OrderSummary';


export default function MyAccount() {
  return (
    <>
      <main>
        <Header />
        <HeroMyAccount />
        <div className="max-w-[867px] mx-auto bg-[#fff] pt-10 pb-28 flex flex-col gap-14">
          <OrdersSummary />
          <div className="px-4 md:px-0">

          <OrderDetails />
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}