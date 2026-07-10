import { HeroSection } from '../components/HeroSection/HeroSection';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { FeaturedSection } from '../components/FeaturedSection/FeaturedSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SearchBar />
      <FeaturedSection />
    </>
  );
};
