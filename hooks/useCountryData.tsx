import { useState, useEffect, useCallback } from "react";
import { Country, getAllCountries } from "react-native-country-picker-modal";

export const useCountryData = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const allCountries = await getAllCountries();
        setCountries(allCountries);
        setFilteredCountries(allCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = useCallback(
    (text: string) => {
      setSearch(text);
      if (text.length === 0) {
        setFilteredCountries(countries);
        return;
      }
      const result = countries.filter((country) => {
        const countryName =
          typeof country.name === "string" ? country.name : country.name.common;
        const countryCode = country.callingCode || "";
        return (
          countryName.toLowerCase().startsWith(text.toLowerCase()) ||
          countryCode.some((code) => code.startsWith(text))
        );
      });
      setFilteredCountries(result);
    },
    [countries]
  );

  return {
    countries,
    filteredCountries,
    search,
    setSearch,
    handleSearch,
    loading,
  };
};
