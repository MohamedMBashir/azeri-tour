'use client';

import { Tour } from '../lib/tourData';
import { tours } from '../lib/tourData';

interface TourListProps {
  onAddTour: (tour: Tour) => void;
}

export default function TourList({ onAddTour }: TourListProps) {
  // Group tours by city
  const toursByCity = tours.reduce((acc, tour) => {
    if (!acc[tour.city]) {
      acc[tour.city] = [];
    }
    acc[tour.city].push(tour);
    return acc;
  }, {} as { [key: string]: Tour[] });

  return (
    <div className="tour-list">
      <h2>Available Tours</h2>
      {Object.entries(toursByCity).map(([city, cityTours]) => (
        <div key={city}>
          <h3 className="city-header">{city}</h3>
          {cityTours.map((tour) => (
            <div key={tour.id} className="tour-item">
              <span>{tour.name}</span>
              <button
                className="add-tour-btn"
                onClick={() => onAddTour(tour)}
                title="Add to itinerary"
              >
                +
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 