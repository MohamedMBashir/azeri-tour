'use client';

import { useState } from 'react';
import TourList from './components/TourList';
import PackageBuilder from './components/PackageBuilder';
import { Tour } from './lib/tourData';

export default function Home() {
  const [selectedTours, setSelectedTours] = useState<Tour[]>([]);

  const handleAddTour = (tour: Tour) => {
    setSelectedTours([...selectedTours, tour]);
  };

  const handleRemoveTour = (tourId: string) => {
    setSelectedTours(selectedTours.filter(tour => tour.id !== tourId));
  };

  return (
    <div className="container">
      <TourList onAddTour={handleAddTour} />
      <PackageBuilder
        selectedTours={selectedTours}
        onRemoveTour={handleRemoveTour}
      />
    </div>
  );
}
