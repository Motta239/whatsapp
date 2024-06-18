import { Ionicons } from '@expo/vector-icons';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, FlatList, ScrollView, ImageSourcePropType } from 'react-native';
import tw from 'twrnc';
import { Text, View } from '~/components/Themed';
import Colors from '~/lib/Colors';
import { sections } from '~/lib/settings';
import { Contact } from '~/lib/types';
import { useColorScheme } from '~/hooks/useColorScheme';
import { getUserInfo, updateMessageById, updateProfileImage } from '~/utils/supabase';
import ImagePicker from 'react-native-image-crop-picker';

const ContactInfo = () => {
  const { contactInfo } = useLocalSearchParams();
  const { background, textColor, sectionBackground } = useColorScheme();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const contact = await getUserInfo(contactInfo as string);
      setContact(contact as Contact);
    };

    fetchContactInfo();
  }, [contactInfo]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={tw`flex-row items-center justify-between  p-3`}>
      <View style={tw`flex-row items-center bg-transparent`}>
        <Ionicons name={item.icon} size={24} color={textColor} style={tw`mr-3`} />
        <Text style={[tw`text-base`, { color: item.color ? item.color : textColor }]}>
          {item.title}
        </Text>
      </View>
      {item.value && <Text style={[tw`text-base`, { color: textColor }]}>{item.value}</Text>}
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Contact Info',
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={30}
              color={textColor}
              onPress={() => router.back()}
            />
          ),
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: background,
          },
          headerTitleStyle: {
            color: textColor,
          },
          headerRight: () => (
            <TouchableOpacity style={tw`flex-row items-center rounded-xl`} onPress={() => {}}>
              <Text style={[tw`mr-2`, { color: textColor }]}>Edit</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <View style={tw`bg-[${background}] `}>
        <ScrollView
          style={tw`bg-[${background}] `}
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={tw`pb-20`}>
          <View style={tw`mb-5 items-center`}>
            <TouchableOpacity
              onPress={() => {
                ImagePicker.openPicker({
                  width: 300,
                  height: 300,
                  cropping: true,
                }).then((image) => {
                  if (image) {
                    updateProfileImage(contactInfo as string, image.path);
                  }
                });
              }}>
              <Image
                source={{ uri: contact?.avatar as string }}
                style={tw`w-25 h-25 mb-5 rounded-full`}
              />
            </TouchableOpacity>
            <Text style={[tw`mb-2 text-2xl font-bold`, { color: textColor }]}>{contact?.name}</Text>
            <Text style={[tw`text-lg`, { color: textColor }]}>{contact?.phone}</Text>
            <Text style={[tw`text-sm`, { color: textColor }]}>{contact?.date}</Text>
          </View>

          {sections.map((section) => (
            <View key={section.title} style={tw`m-5 bg-[${sectionBackground}] rounded-xl `}>
              <FlatList
                scrollEnabled={false}
                data={section.data}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => (
                  <View style={tw`h-[0.5px] bg-[${Colors.gray}] opacity-30`} />
                )}
                renderItem={renderItem}
              />
            </View>
          ))}

          <View style={tw`mt-5 items-center justify-center`}>
            <Text style={[tw`text-center text-base`, { color: textColor }]}>
              No groups in common
            </Text>
            <TouchableOpacity
              style={tw`mt-3 flex-row items-center justify-center bg-[${sectionBackground}] rounded-xl p-3`}
              onPress={() => {}}>
              <Ionicons name="add-circle-outline" size={24} color={textColor} style={tw`mr-2`} />
              <Text style={[tw`text-base`, { color: textColor }]}>
                Create group with {contact?.name}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default ContactInfo;
