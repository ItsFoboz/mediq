import { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import DoctorCard from '@/components/DoctorCard'
import { doctors } from '../../../packages/shared/../../../web/src/data/doctors'

export default function FindScreen() {
  const { specialty: initialSpecialty } = useLocalSearchParams<{ specialty?: string }>()
  const [query, setQuery] = useState('')
  const [specialty, setSpecialty] = useState(initialSpecialty ?? '')

  const filtered = doctors.filter(d => {
    const matchQuery = !query || d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.specialty.name_en.toLowerCase().includes(query.toLowerCase())
    const matchSpecialty = !specialty || d.specialty.slug === specialty
    return matchQuery && matchSpecialty
  })

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search doctors, specialties…"
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DoctorCard doctor={item} />}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No doctors found.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  searchBar: { padding: 16, paddingBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: '#0F172A',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  list: { padding: 16, gap: 12 },
  empty: { paddingTop: 60, alignItems: 'center' },
  emptyText: { color: '#94A3B8', fontSize: 15 },
})
