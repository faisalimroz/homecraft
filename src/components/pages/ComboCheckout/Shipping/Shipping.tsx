import React, { useState, useEffect } from "react";
import {
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";

function Shipping({ user, shippingData, errors, onShippingDataChange }: any) {
  const [address, setAddress] = useState(shippingData.address || "");
  const [zipCode, setZipCode] = useState(shippingData.zipCode || "");
  const [countryId, setCountryId] = useState<number>(0);
  const [stateId, setStateId] = useState<number>(0);
  const [cityId, setCityId] = useState<number>(0);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [stateList, setStateList] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);

  useEffect(() => {
    GetCountries().then((result: any) => {
      setCountryList(result);
    });
    if (countryId) {
      GetState(countryId).then((result: any) => {
        setStateList(result);
        setStateId(0);
        setCityList([]);
      });
    }
  }, []);

  useEffect(() => {
    if (countryId) {
      GetState(countryId).then((result: any) => {
        setStateList(result);
        setStateId(0);
        setCityList([]);
      });
    }
  }, [countryId]);

  useEffect(() => {
    if (stateId) {
      GetCity(countryId, stateId).then((result: any) => {
        setCityList(result);
        setCityId(0);
      });
    }
  }, [stateId, countryId]);

  useEffect(() => {
    onShippingDataChange({
      address,
      zipCode,
      country: countryList.find((c) => c.id === countryId)?.name || "",
      state: stateList.find((s) => s.id === stateId)?.name || "",
      city: cityList.find((c) => c.id === cityId)?.name || "",
    });
  }, [address, zipCode, countryId, stateId, cityId]);
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-600 pb-4">Shipping</h2>
      <div className="md:pr-10">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 transition duration-200"
            value={`${user?.name} ` || ""}
            disabled
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 transition duration-200"
            value={user?.email || ""}
            disabled
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 transition duration-200"
            value={user?.phone || ""}
            disabled
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 transition duration-200"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Your Address"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700" htmlFor="country">
            Country
          </label>
          <select
            onChange={(e) => setCountryId(parseInt(e.target.value))}
            value={countryId}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
          >
            <option value={0}>Select Country</option>
            {countryList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
        </div>

        <div className="mt-3 md:flex md:space-x-4">
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700" htmlFor="state">
              State
            </label>
            <select
              onChange={(e) => setStateId(parseInt(e.target.value))}
              value={stateId}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
            >
              <option value={0}>Select State</option>
              {stateList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>

          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700" htmlFor="city">
              City
            </label>
            <select
              onChange={(e) => setCityId(parseInt(e.target.value))}
              value={cityId}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition duration-200"
            >
              <option value={0}>Select City</option>
              {cityList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div className="mt-4 md:mt-0 md:w-1/3">
            <label className="block text-sm font-medium text-gray-700" htmlFor="zip">
              Zip Code
            </label>
            <input
              id="zip"
              type="text"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-600 transition duration-200"
              value={zipCode || ""}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Your Zip Code"
            />
            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
