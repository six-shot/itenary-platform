import React, { createContext, useContext, useState } from 'react';
import { data as initialData } from '../data';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [isFlightModalOpen, setIsFlightModalOpen] = useState(false);
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  const addFlight = (newFlight) => {
    setData(prev => ({
      ...prev,
      flights: [...prev.flights, newFlight]
    }));
  };

  const addHotel = (newHotel) => {
    setData(prev => ({
      ...prev,
      hotels: [...prev.hotels, newHotel]
    }));
  };

  const addActivity = (newActivity) => {
    setData(prev => ({
      ...prev,
      activities: [...prev.activities, newActivity]
    }));
  };

  return (
    <DataContext.Provider 
      value={{
        data,
        addFlight,
        addHotel,
        addActivity,
        isFlightModalOpen,
        setIsFlightModalOpen,
        isHotelModalOpen,
        setIsHotelModalOpen,
        isActivityModalOpen,
        setIsActivityModalOpen
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);