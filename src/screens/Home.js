import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CallToActionSection from '../components/home/CallToActionSection';
import ContactInfo from '../components/home/ContactInfo';
import ShopSection from '../components/home/ShopSection';
import { useParams } from 'react-router';

const HomeScreen = () => {
  const { keyword, pagenumber } = useParams();

  window.scrollTo(0, 0);

  console.log('HomeScreen. keyword: ', keyword, 'pageNumber: ', pagenumber);
  return (
    <div>
      <Header />
      <ShopSection keyword={keyword} pageNumber={pagenumber} />
      <CallToActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
