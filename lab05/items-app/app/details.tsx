// app/details.tsx   (or app/details/[id].tsx)
import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useItemContext, type Item } from '../context/ItemContext';

const defaultItem: Item = { id: '0', title: 'Unknown', price: 0 };

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { items, deleteItem } = useItemContext();

  const selected = items.find(i => i.id === String(id)) || defaultItem;

  return (
    <View style={{ flex: 1, gap: 16, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: '600' }}>{selected.title}</Text>
      <Text style={{ fontSize: 18 }}>${selected.price}</Text>

      <Pressable
        onPress={() => {
          deleteItem(selected.id);
          Alert.alert('Deleted', `${selected.title} removed.`);
          router.back();
        }}
        style={{ backgroundColor: '#e11d48', padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          Delete Item
        </Text>
      </Pressable>
    </View>
  );
}
