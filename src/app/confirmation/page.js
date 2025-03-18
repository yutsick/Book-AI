import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import OrderComplete from '@/components/OrderComplete/OrderComplete';
import WhatHappens from '@/components/WhatHappens/WhatHappens';
import OrderStatusInfo from '@/components/OrderStatusInfo/OrderStatusInfo';
import NeedHelp from '@/components/NeedHelp/NeedHelp';


export default function Confirmation() {
  return (
    <>
      <main>
        <Header />
        <OrderComplete />
        <WhatHappens />
        {/* <OrderStatusInfo />  */}
        <NeedHelp />
        <Footer />
      </main>
    </>
  );
}