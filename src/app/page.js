import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import Feed from '@/components/Feed/Feed';
import Videos from '@/components/Videos/Videos';
import ChatButton from '@/components/ChatButton/ChatButton';  
import HowItWorks from '@/components/HowItWorks/HowItWorks'; 
import BookCovers from '@/components/BookCovers/BookCovers'; 
import HighLights from '@/components/HighLights/HighLights'; 
import FAQ from '@/components/FAQ/FAQ'; 
import Footer from '@/components/Footer/Footer'; 


export default function Home() {
  return (
    <>
    <main>
      <Header />
      <Hero />
      <Feed />
      <Videos />
      <HowItWorks />
      <BookCovers />
      <HighLights />
      <FAQ />
      <Footer />
    </main>
    <div className="fixed right-1 md:right-[14px] bottom-14 md:bottom-20 z-10">
          <ChatButton />
        </div>
    </>
  );
}