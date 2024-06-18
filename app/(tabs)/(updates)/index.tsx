import React from 'react';
import { ThemeToggle } from '~/components/ThemeToggle';
import { ScrollView, Text, View } from '~/components/Themed';
import { useColorScheme } from '~/hooks/useColorScheme';
import tw from 'twrnc';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native';

const statuses = [
  {
    id: 1,
    name: 'My status',
    description: 'Add to my status',
    image: 'https://picsum.photos/200/400',
    isOwnStatus: true,
  },
];

const channels = [
  {
    id: 1,
    name: 'חדשות 13',
    description: 'משחק רהי ל',
    time: '10:26',
    image: 'https://picsum.photos/200/300',
    badgeCount: 13,
  },
  {
    id: 2,
    name: 'FC Barcelona',
    description: "Our João's in Portugal's victory against Ireland (3-0)",
    time: '1:21',
    image: 'https://picsum.photos/300/300',
    badgeCount: 12,
  },
  {
    id: 3,
    name: 'Real Madrid C.F.',
    description:
      'Comunicado Oficial: Mundial de Clubes Comunicado Oficial: Mundial de ClubesComunicado Oficial: Mundial de ClubesComunicado Oficial: Mundial de ClubesComunicado Oficial: MundComunicado Oficial: Mundial de ClubesComunicado Oficial: Mundial de ClubesComunicado Oficial: Mundial de ClubesComunicado Oficial: Mundial de ClubesComunicado Oficial: Mundial de Clubesial de ClubesComunicado Oficial: Mundial de ClubesComunicado Oficial: Mundial de Clubes',
    time: 'Monday',
    image: 'https://picsum.photos/300/300',
    badgeCount: 89,
  },
  {
    id: 4,
    name: 'Man City',
    description: 'One year ago today, THIS happened!',
    time: 'Monday',
    image: 'https://picsum.photos/300/300',
    badgeCount: 8,
  },
  {
    id: 5,
    name: 'CNN',
    description: 'Breaking news from around the world',
    time: '12:00',
    image: 'https://picsum.photos/200/200',
    badgeCount: 5,
  },
  {
    id: 6,
    name: 'BBC News',
    description: 'Latest updates and reports',
    time: '14:30',
    image: 'https://picsum.photos/200/200',
    badgeCount: 7,
  },
  {
    id: 7,
    name: 'Sky Sports',
    description: 'Live sports coverage and updates',
    time: '16:45',
    image: 'https://picsum.photos/200/200',
    badgeCount: 3,
  },
  {
    id: 8,
    name: 'Al Jazeera',
    description: 'News from the Middle East and beyond',
    time: '18:00',
    image: 'https://picsum.photos/200/200',
    badgeCount: 9,
  },
  {
    id: 9,
    name: 'Fox News',
    description: 'Top stories and breaking news',
    time: '20:15',
    image: 'https://picsum.photos/200/200',
    badgeCount: 4,
  },
  {
    id: 10,
    name: 'NBC News',
    description: 'Comprehensive news coverage',
    time: '22:30',
    image: 'https://picsum.photos/200/200',
    badgeCount: 6,
  },
  {
    id: 11,
    name: 'CBS News',
    description: 'In-depth news and analysis',
    time: '23:45',
    image: 'https://picsum.photos/200/200',
    badgeCount: 2,
  },
  {
    id: 12,
    name: 'ABC News',
    description: 'Latest headlines and top stories',
    time: '00:15',
    image: 'https://picsum.photos/200/200',
    badgeCount: 1,
  },
  {
    id: 13,
    name: 'Bloomberg',
    description: 'Business and financial news',
    time: '01:30',
    image: 'https://picsum.photos/200/200',
    badgeCount: 10,
  },
  {
    id: 14,
    name: 'Reuters',
    description: 'Global news and market data',
    time: '02:45',
    image: 'https://picsum.photos/200/200',
    badgeCount: 11,
  },
  {
    id: 15,
    name: 'The Guardian',
    description: 'Independent journalism and news',
    time: '04:00',
    image: 'https://picsum.photos/200/200',
    badgeCount: 8,
  },
  {
    id: 16,
    name: 'The New York Times',
    description: 'Breaking news and top stories',
    time: '05:15',
    image: 'https://picsum.photos/200/200',
    badgeCount: 12,
  },
  {
    id: 17,
    name: 'The Washington Post',
    description: 'News and analysis from Washington',
    time: '06:30',
    image: 'https://picsum.photos/200/200',
    badgeCount: 14,
  },
  {
    id: 18,
    name: 'ESPN',
    description: 'Sports news and live updates',
    time: '07:45',
    image: 'https://picsum.photos/200/200',
    badgeCount: 15,
  },
  {
    id: 19,
    name: 'TechCrunch',
    description: 'Latest technology news and updates',
    time: '09:00',
    image: 'https://picsum.photos/200/200',
    badgeCount: 13,
  },
  {
    id: 20,
    name: 'Wired',
    description: 'In-depth tech news and analysis',
    time: '10:15',
    image: 'https://picsum.photos/200/200',
    badgeCount: 16,
  },
  {
    id: 21,
    name: 'National Geographic',
    description: 'Exploring the world and beyond',
    time: '11:30',
    image: 'https://picsum.photos/200/200',
    badgeCount: 17,
  },
  {
    id: 22,
    name: 'Discovery Channel',
    description: 'Science, nature, and adventure',
    time: '12:45',
    image: 'https://picsum.photos/200/200',
    badgeCount: 18,
  },
  {
    id: 23,
    name: 'History Channel',
    description: 'Historical documentaries and series',
    time: '14:00',
    image: 'https://picsum.photos/200/200',
    badgeCount: 19,
  },
  {
    id: 24,
    name: 'Animal Planet',
    description: 'Wildlife and nature documentaries',
    time: '15:15',
    image: 'https://picsum.photos/200/200',
    badgeCount: 20,
  },
];

export default function Updates() {
  const { isDarkColorScheme, toggleColorScheme, textColor, background } = useColorScheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          title: 'Updates',
          headerTitleStyle: {
            fontWeight: '500',
            fontSize: 16,
            color: textColor,
          },
          headerStyle: {
            backgroundColor: background,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name="ellipsis-horizontal-circle" size={24} color={textColor} />
            </TouchableOpacity>
          ),
          headerRight: () => <ThemeToggle />,
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <View style={tw`mb-4 flex-row items-center justify-between `}>
            <Text style={tw`text-lg font-bold`}>Status</Text>
            <View style={tw`flex-row items-center gap-2 `}>
              <TouchableOpacity
                style={tw`h-8 w-8 items-center justify-center rounded-full bg-gray-300 bg-opacity-20 `}
                onPress={() => {}}>
                <Ionicons name="camera" size={23} color={textColor} />
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`h-8 w-8 items-center justify-center rounded-full bg-gray-300 bg-opacity-20 `}
                onPress={() => {}}>
                <Ionicons name="pencil" size={20} color={textColor} />
              </TouchableOpacity>
            </View>
          </View>
          {statuses.map((status) => (
            <View key={status.id} style={tw`mb-4 flex-row items-center gap-3 `}>
              <View style={tw`relative p-1 `}>
                <Image source={{ uri: status.image }} style={tw`h-12 w-12 rounded-full `} />
                {status.isOwnStatus && (
                  <View style={tw`absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500 `} />
                )}
                <View
                  style={tw`absolute bottom-0 right-0 h-5 w-5 items-center justify-center rounded-full`}>
                  <Ionicons name="add-circle" size={20} color="green" />
                </View>
              </View>
              <View>
                <Text style={tw`font-bold`}>{status.name}</Text>
                <Text style={tw`font-semibold`}>{status.description}</Text>
              </View>
            </View>
          ))}
          <View style={tw`mb-4 flex-row items-center justify-between `}>
            <Text style={tw`text-lg font-bold`}>Channels</Text>
            <Ionicons name="add-circle-outline" size={24} color="white" />
          </View>

          <FlatList
            contentContainerStyle={tw`gap-4`}
            data={channels}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={tw` bg-gray-200  `} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.id}
                style={tw`h-15 flex-row items-center gap-2 `}>
                <View style={tw`  `}>
                  <Image source={{ uri: item.image }} style={tw`h-15 w-15 rounded-full `} />
                </View>
                <View style={tw`flex-1 justify-center `}>
                  <Text style={tw`font-bold`}>{item.name}</Text>
                  <View style={tw`h-10`}>
                    <Text style={tw``}>
                      {item.name === 'חדשות 13'
                        ? item.description.slice(0, 10) + '...'
                        : item.description}
                    </Text>
                  </View>
                </View>
                <View style={tw`h-15 items-end justify-between  pb-1`}>
                  <Text style={tw`text-green-600 `}>{item.time}</Text>
                  <View
                    style={tw`flex h-6 w-6 items-center justify-center rounded-full bg-green-600`}>
                    <Text style={tw`text-xs text-white`}>{item.badgeCount}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
}
