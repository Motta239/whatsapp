import React from 'react';
import { Text, View } from '~/components/Themed';
import { FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Colors from '~/lib/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '~/hooks/useColorScheme';

export const Settings = ({
  settings,
}: {
  settings: Array<{
    title: string;
    data: Array<{
      id: string;
      name: string;
      icon: string;
      backgroundColor: string;
    }>;
    sectionBackground: string;
  }>;
}) => (
  <>
    {settings.map((section) => (
      <View key={section.title} style={tw`m-3 rounded-xl `}>
        <FlatList
          scrollEnabled={false}
          data={section.data}
          ItemSeparatorComponent={() => (
            <View style={tw`h-[0.5px] bg-[${Colors.gray}] opacity-30`} />
          )}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    ))}
  </>
);

export const renderItem = ({ item }: { item: any }) => {
  const { textColor } = useColorScheme();

  return (
    <TouchableOpacity style={tw`flex-row items-center justify-between  p-3`}>
      <View style={tw`flex-row items-center bg-transparent`}>
        <Ionicons name={item.icon} size={24} color={textColor} style={tw`mr-3`} />
        <Text style={[tw`text-base text-[${textColor}]`]}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
