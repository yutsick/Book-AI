import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AboutUs from '@/components/AboutUs/AboutUs';
import Story from '@/components/Story/Story';
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo';
import Choose from '@/components/Choose/Choose';
import Vision from '@/components/Vision/Vision';
import JoinUs from '@/components/JoinUs/JoinUs';

export default function About() {
  return (
    <>
      <main>
        <Header />
        <AboutUs />
        <Story />
        <WhatWeDo />
        <Choose />
        <Vision />
        <JoinUs />
        <Footer />
      </main>
    </>
  );
}