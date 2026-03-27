import { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'

const MOCK_APPOINTMENTS = [
  { id: 'a1', doctor: 'Dr. Georgi Petrov', specialty: 'Cardiologist', date: '15 Feb 2025', time: '10:00', clinic: 'Vita Hospital', status: 'confirmed' },
  { id: 'a2', doctor: 'Dr. Milena Vassileva', specialty: 'Dermatologist', date: '28 Jan 2025', time: '14:30', clinic: 'Robert Koch Clinic', status: 'completed' },
]

const STATUS_COLOR: Record<string, string> = {
  confirmed: '#0D9E6E',
  completed: '#1A6BCC',
  cancelled: '#94A3B8',
  pending: '#F59E0B',
}

export default function AppointmentsScreen() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {(['upcoming', 'past'] as const).map(t => (
          <TouchableOpacity key={t} onPress={() => setTab(t)} style={[styles.tab, tab === t && styles.tabActive]}>
            <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={MOCK_APPOINTMENTS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.doctorName}>{item.doctor}</Text>
                <Text style={styles.specialty}>{item.specialty}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: `${STATUS_COLOR[item.status]}20` }]}>
                <Text style={[styles.badgeText, { color: STATUS_COLOR[item.status] }]}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.meta}>{item.date} · {item.time}</Text>
            <Text style={styles.meta}>{item.clinic}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No appointments.</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  tabs: { flexDirection: 'row', padding: 16, gap: 8 },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0' },
  tabActive: { backgroundColor: '#1A6BCC', borderColor: '#1A6BCC' },
  tabText: { fontSize: 13, fontWeight: '500', color: '#64748B', textTransform: 'capitalize' },
  tabTextActive: { color: '#FFFFFF' },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  doctorName: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  specialty: { fontSize: 13, color: '#64748B', marginTop: 2 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  badgeText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  meta: { fontSize: 13, color: '#64748B', marginTop: 2 },
  empty: { textAlign: 'center', color: '#94A3B8', marginTop: 60, fontSize: 15 },
})
