'use client';

import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Tour } from '../lib/tourData';
import { generatePDF } from '../lib/pdfGenerator';

interface PackageBuilderProps {
  selectedTours: Tour[];
  onRemoveTour: (tourId: string) => void;
}

export default function PackageBuilder({ selectedTours, onRemoveTour }: PackageBuilderProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [notes, setNotes] = useState('');
  const [agencyLogo, setAgencyLogo] = useState<string | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdultsChange = (change: number) => {
    const newValue = adults + change;
    if (newValue >= 1 && newValue <= 20) {
      setAdults(newValue);
    }
  };

  const handleChildrenChange = (change: number) => {
    const newValue = children + change;
    if (newValue >= 0 && newValue <= 10) {
      setChildren(newValue);
      if (change > 0) {
        setChildrenAges([...childrenAges, 0]);
      } else {
        setChildrenAges(childrenAges.slice(0, -1));
      }
    }
  };

  const handleChildAgeChange = (index: number, age: string) => {
    const newAge = parseInt(age);
    if (!isNaN(newAge) && newAge >= 0 && newAge <= 17) {
      const newAges = [...childrenAges];
      newAges[index] = newAge;
      setChildrenAges(newAges);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAgencyLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setAgencyLogo(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGeneratePDF = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    const doc = await generatePDF({
      startDate,
      endDate,
      adults,
      children,
      childrenAges,
      selectedTours,
      notes,
      agencyLogo
    });

    doc.save('travel-itinerary.pdf');
  };

  return (
    <div className="package-builder">
      <div className="agency-logo-section">
        <div className="logo-preview-container">
          {agencyLogo && (
            <img src={agencyLogo} alt="Agency logo" id="logoPreview" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button
          className="upload-logo-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          {agencyLogo ? 'Change Logo' : 'Upload Logo'}
        </button>
        {agencyLogo && (
          <button className="remove-logo-btn" onClick={handleRemoveLogo}>
            Remove Logo
          </button>
        )}
      </div>

      <div className="dates-section">
        <div className="dates-inputs">
          <div className="date-row">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              minDate={new Date()}
              placeholderText="Select start date"
            />
          </div>
          <div className="date-row">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              minDate={startDate || new Date()}
              placeholderText="Select end date"
            />
          </div>
        </div>
        {startDate && endDate && (
          <div className="duration-display">
            Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
          </div>
        )}
      </div>

      <div className="travelers-input">
        <div className="travelers-count">
          <div className="traveler-field">
            <label>Adults:</label>
            <div className="number-input">
              <button onClick={() => handleAdultsChange(-1)}>-</button>
              <input type="text" value={adults} readOnly />
              <button onClick={() => handleAdultsChange(1)}>+</button>
            </div>
          </div>
          <div className="traveler-field">
            <label>Children:</label>
            <div className="number-input">
              <button onClick={() => handleChildrenChange(-1)}>-</button>
              <input type="text" value={children} readOnly />
              <button onClick={() => handleChildrenChange(1)}>+</button>
            </div>
          </div>
        </div>
        {children > 0 && (
          <div className="child-ages">
            {childrenAges.map((age, index) => (
              <div key={index} className="child-age-field">
                <label>Child {index + 1} age:</label>
                <input
                  type="number"
                  min="0"
                  max="17"
                  value={age}
                  onChange={(e) => handleChildAgeChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="tour-cards">
        {selectedTours.map((tour, index) => (
          <div key={`${tour.id}-${index}`} className="tour-card">
            <div className="card-header">
              <h3>{tour.name}</h3>
              <button
                className="remove-btn"
                onClick={() => onRemoveTour(tour.id)}
                title="Remove from itinerary"
              >
                ×
              </button>
            </div>
            <div className="card-content">
              <div className="tour-itinerary">
                <p>{tour.description}</p>
                <p>Duration: {tour.duration}</p>
                <p>Price: ${tour.price} per person</p>
              </div>
              <div className="card-image">
                <img src={tour.imageUrl} alt={tour.name} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <textarea
        className="notes-area"
        placeholder="Add any additional notes or special requests..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="button-container">
        <button className="generate-pdf-btn" onClick={handleGeneratePDF}>
          Generate PDF
        </button>
      </div>
    </div>
  );
} 