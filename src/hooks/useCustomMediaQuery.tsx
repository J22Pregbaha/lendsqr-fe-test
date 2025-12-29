import { useState, useEffect } from 'react';

export const useCustomMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isExtraLargeScreen, setIsExtraLargeScreen] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 549px)');
    const mediumQuery = window.matchMedia('(min-width: 550px) and (max-width: 1049px)');
    const largeQuery = window.matchMedia('(min-width: 1050px) and (max-width: 1535px)');
    const extraLargeQuery = window.matchMedia('(min-width: 2000px)');

    const updateMatches = () => {
      setIsMobile(mobileQuery.matches);
      setIsMediumScreen(mediumQuery.matches);
      setIsLargeScreen(largeQuery.matches);
      setIsExtraLargeScreen(extraLargeQuery.matches);
    };

    updateMatches();

    mobileQuery.addEventListener('change', updateMatches);
    mediumQuery.addEventListener('change', updateMatches);
    largeQuery.addEventListener('change', updateMatches);
    extraLargeQuery.addEventListener('change', updateMatches);

    return () => {
      mobileQuery.removeEventListener('change', updateMatches);
      mediumQuery.removeEventListener('change', updateMatches);
      largeQuery.removeEventListener('change', updateMatches);
      extraLargeQuery.removeEventListener('change', updateMatches);
    };
  }, []);

  return {
    isMobile,
    isMediumScreen,
    isLargeScreen,
    isExtraLargeScreen,
  };
};
