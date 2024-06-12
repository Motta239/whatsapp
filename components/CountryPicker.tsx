import React, { useState } from 'react';
import { Button, RefreshControl, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

import { router } from 'expo-router';

import CountryPicker, {
  Country,
  DARK_THEME,
  DEFAULT_THEME,
} from 'react-native-country-picker-modal';
import { useColorScheme } from '~/hooks/useColorScheme';
import { Text, TextInput, View } from './Themed';

const CountryPickerComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const { colorScheme, background } = useColorScheme();

  const sendOTPCode = () => {
    if (!selectedCountry) {
      console.error('No country selected');
      return;
    }

    if (!phoneNumber || !/^\d+$/.test(phoneNumber)) {
      console.error('Invalid phone number');
      return;
    }

    const phoneNumberWithCountryCode =
      '+' + selectedCountry.callingCode.reduce((a, b) => a + b, '') + phoneNumber;

    // sendOTP(phoneNumberWithCountryCode);
    router.push({
      pathname: '/[phone]',
      params: { phone: phoneNumberWithCountryCode },
    } as any);
  };

  return (
    <View style={tw`flex-row items-center  justify-center rounded-2xl`}>
      <CountryPicker
        countryCode={selectedCountry ? selectedCountry.cca2 : 'US'}
        withFlag
        withCallingCode
        withFilter
        withCloseButton
        withAlphaFilter
        filterProps={{
          keyboardAppearance: colorScheme === 'dark' ? 'dark' : 'light',
          placeholder: selectedCountry ? selectedCountry.name.toString() : 'Select Country',
          placeholderTextColor: 'gray',
          autoFocus: true,
          allowFontScaling: false,
          autoCapitalize: 'characters',
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            height: 50,
            borderColor: 'gray',
            flex: 1,
            paddingHorizontal: 10,
            marginVertical: 10,
          },
          textAlign: 'left',
        }}
        flatListProps={
          {
            contentContainerStyle: {
              padding: 10,
              borderRadius: 10,
            },
          } as any
        }
        theme={colorScheme === 'dark' ? DARK_THEME : DEFAULT_THEME}
        containerButtonStyle={tw`p-3 items-center justify-center`}
        onSelect={setSelectedCountry}
        modalProps={{
          animationType: 'slide',
          presentationStyle: 'formSheet',
        }}
      />
      <TextInput
        style={tw`text-4 h-10 flex-1 bg-transparent px-2`}
        placeholder="Enter phone number"
        textAlign="left"
        allowFontScaling={false}
        keyboardType="numeric"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      {phoneNumber ? (
        <Animated.View style={tw`absolute right-4`} entering={ZoomIn} exiting={ZoomOut}>
          <TouchableOpacity style={tw``} onPress={sendOTPCode}>
            <View style={tw`rounded-full px-2 py-1 shadow-md`}>
              <Text style={tw`text-sm font-bold`}>Send</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default CountryPickerComponent;
