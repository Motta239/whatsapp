import { Fragment, useEffect, useState } from 'react';
import { View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Link, Stack, useLocalSearchParams } from 'expo-router';

import tw from 'twrnc';
import { sendOTP, signInWithOTP } from '~/utils/supabase';
import { Text } from '~/components/Themed';

const CELL_COUNT = 6;

const Page = () => {
  const { phone, signin } = useLocalSearchParams<{
    phone: string;
    signin: string;
  }>();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState<boolean | null>(null);
  const [verifyColor, setVerifyColor] = useState<string>('gray');

  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      signInWithOTP(phone as string, code).then((result) => {
        if (result.error) {
          Alert.alert('Error', result.error.message);
        } else {
          console.warn('OTP verified successfully');
        }
      });
    }
  }, [code]);

  return (
    <>
      <Stack.Screen
        options={{
          title: phone,
          headerShown: true,
          headerLargeTitle: true,
          headerShadowVisible: false,
        }}
      />
      <ScrollView
        scrollEnabled={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={tw`flex-1 `}>
        <View style={tw`p-4`}>
          <Text style={tw`text-xl font-bold`}>6-digit code</Text>
          <Text style={tw`text-base`}>Code sent to {phone} unless you already have an account</Text>

          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={tw`my-5 gap-2 flex-row`}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Fragment key={index}>
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  style={tw`h-15 w-12 items-center justify-center ${
                    code.length == 6 ? `border-[0.3] border-${verifyColor}-600  ` : ''
                  } rounded-lg bg-gray-200 ${
                    isFocused ? `border-[0.3] pb-2 shadow-md border-${verifyColor}-600` : ''
                  }`}>
                  <Text style={tw`text-center text-4xl text-black `}>
                    {symbol || (isFocused ? '' : null)}
                  </Text>
                </View>
                {index === 2 && (
                  <View
                    key={`separator-${index}`}
                    style={tw`h-0.5 w-2.5 self-center bg-gray-500`}
                  />
                )}
              </Fragment>
            )}
          />

          <View style={tw`flex-row  justify-around`}>
            <Link href={'/(auth)/login'} asChild>
              <TouchableOpacity>
                <Text style={tw`text-blue-500 underline`}>Already have an account? Log in</Text>
              </TouchableOpacity>
            </Link>
            <TouchableOpacity onPress={() => sendOTP(phone as string)}>
              <Text style={tw`text-blue-500 underline`}>Resend Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Page;
