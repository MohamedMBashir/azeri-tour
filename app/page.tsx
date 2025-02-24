'use client';

import { useState, useEffect } from 'react';
import TourList from './components/TourList';
import PackageBuilder from './components/PackageBuilder';
import { Tour } from './lib/tourData';

export default function Home() {
  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAddTour = (tour: Tour) => {
    setSelectedTours([...selectedTours, tour]);
    // Close sidebar on mobile after adding a tour
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleRemoveTour = (tourId: string) => {
    setSelectedTours(selectedTours.filter(tour => tour.id !== tourId));
  };

  return (
    <div className="container">
      <TourList
        onAddTour={handleAddTour}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <PackageBuilder
        selectedTours={selectedTours}
        onRemoveTour={handleRemoveTour}
      />
    </div>
  );
}
