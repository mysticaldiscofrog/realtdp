// src/store/citiesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { citiesData } from '../data/cities';
import { WritableDraft } from 'immer';

export interface City {
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  metrics: {
    air_quality: number;
    population_density: number;
    environmental_policies: number;
    gdp_per_capita: number;
    healthcare_quality: number;
    education_quality: number;
    crime_rate: number;
  };
}

interface CitiesState {
  cities: City[];
  selectedCity: City | null;
}

const initialState: CitiesState = {
  cities: citiesData,
  selectedCity: null,
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setSelectedCity: (state: { selectedCity: WritableDraft<City> | null; cities: any[]; }, action: PayloadAction<string>) => {
      state.selectedCity = state.cities.find(city => city.city === action.payload) || null;
    },
  },
});

export const { setSelectedCity } = citiesSlice.actions;
export default citiesSlice.reducer;

