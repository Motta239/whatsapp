import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Dropdown, IDropdownRef } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from 'twrnc';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import { useColorScheme } from '~/hooks/useColorScheme';
import { useCountryData } from '~/hooks/useCountryData';

const RenderEmpty = () => (
  <View style={tw`items-center p-4`}>
    <Text>List Empty!</Text>
  </View>
);

const RenderFooter = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  return (
    <View style={tw`items-center p-4`}>
      <ActivityIndicator color="gray" size="large" />
    </View>
  );
};

const DropdownComponent = ({
  selectedCountry,
  setSelectedCountry,
}: {
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
}) => {
  const { filteredCountries, search, setSearch, handleSearch, loading } = useCountryData();
  const { modalsColor, textColor, keyboardAppearance } = useColorScheme();
  const [value, setValue] = useState<Country | null>(null);
  const ref = useRef<IDropdownRef>(null);

  const handleCountryPress = (country: Country) => {
    setValue(country);
    setSelectedCountry(country);
    ref.current?.close();
  };

  const renderCountry = ({ item }: { item: Country }) => {
    return (
      <TouchableOpacity
        style={tw`min-h-10  flex-row items-center border-b p-2 px-4 border-[${modalsColor}]`}
        onPress={() => handleCountryPress(item)}>
        <Image
          source={{
            uri: `https://flagcdn.com/w320/${item.cca2.toLowerCase()}.png`,
          }}
          style={tw`mr-2 h-4 w-6`}
        />
        <Text style={tw`text-[${textColor}]`}>{item.name.toString()}</Text>
        <Text style={tw`text-[${textColor}] ml-auto`}>+{item.callingCode}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <Dropdown
      ref={ref}
      style={tw` items-center justify-center rounded-full px-4 py-2`}
      containerStyle={tw` rounded `}
      backgroundColor="rgba(0,0,0,0.4)"
      data={filteredCountries}
      value={value}
      inverted={true}
      labelField="region"
      valueField="cca2"
      activeColor="#C3C4C6"
      placeholder="Select a country"
      search
      placeholderStyle={tw`text-[${textColor}]`}
      maxHeight={300}
      inputSearchStyle={tw`rounded-xl border-[${modalsColor}]`}
      searchPlaceholder="Search..."
      onChange={(item) => {
        setValue(item as Country);
      }}
      onChangeText={(text) => handleSearch(text)}
      flatListProps={{
        ListEmptyComponent: <RenderEmpty />,
        ListFooterComponent: <RenderFooter isLoading={loading} />,
        refreshControl: <RefreshControl refreshing={loading} />,
        onEndReachedThreshold: 1.3,
        onEndReached: () => {},
      }}
      renderItem={(item) => renderCountry({ item })}
      renderLeftIcon={() =>
        value ? (
          <View style={tw`min-w-20 flex-row items-center`}>
            <CountryPicker withFlagButton countryCode={value.cca2} />
            <Text style={tw`w-13 text-center font-semibold text-gray-700 `}>
              +{value.callingCode}
            </Text>
          </View>
        ) : (
          <AntDesign style={tw`mr-3`} name="flag" size={20} color={textColor} />
        )
      }
    />
  );
};

export default DropdownComponent;
