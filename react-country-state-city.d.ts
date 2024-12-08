// src/types/react-country-state-city.d.ts

declare module 'react-country-state-city' {
    export interface Country {
      id: number;
      name: string;
      isoCode: string;
    }
  
    export interface State {
      id: number;
      name: string;
      countryId: number;
    }
  
    export interface City {
      id: number;
      name: string;
      stateId: number;
      countryId: number;
    }
  
    export interface Language {
      id: number;
      name: string;
      code: string;
    }
  
    export function GetCountries(): Promise<Country[]>;
    export function GetState(countryId: number): Promise<State[]>;
    export function GetCity(countryId: number, stateId: number): Promise<City[]>;
    export function GetLanguages(): Promise<Language[]>;
  
    export const CountrySelect: React.ComponentType<{
      onChange: (e: { id: number; name: string }) => void;
      placeHolder?: string;
    }>;
  
    export const StateSelect: React.ComponentType<{
      countryid: number;
      onChange: (e: { id: number; name: string }) => void;
      placeHolder?: string;
    }>;
  
    export const CitySelect: React.ComponentType<{
      countryid: number;
      stateid: number;
      onChange: (e: { id: number; name: string }) => void;
      placeHolder?: string;
    }>;
  
    export const LanguageSelect: React.ComponentType<{
      onChange: (e: { id: number; name: string }) => void;
      placeHolder?: string;
    }>;
  }
  