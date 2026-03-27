import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const SPECIALTIES = [
  { label: 'Cardiologist', icon: '❤️', slug: 'cardiologist' },
  { label: 'Dermatologist', icon: '🔬', slug: 'dermatologist' },
  { label: 'Neurologist', icon: '🧠', slug: 'neurologist' },
  { label: 'Orthopedist', icon: '🦴', slug: 'orthopedist' },
  { label: 'Gynecologist', icon: '👶', slug: 'gynecologist' },
  { label: 'Ophthalmologist', icon: '👁️', slug: 'ophthalmologist' },
]

export default function HomeScreen() {
  const router = useRouter()

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Find a doctor{'\n'}in Bulgaria</Text>
        <Text style={styles.heroSub}>English-speaking doctors, in English.</Text>
        <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/find')}>
          <Text style={styles.searchPlaceholder}>🔍  Search by specialty or name…</Text>
        </TouchableOpacity>
      </View>

      {/* Specialties */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by specialty</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillRow}>
          {SPECIALTIES.map(s => (
            <TouchableOpacity
              key={s.slug}
              style={styles.pill}
              onPress={() => router.push({ pathname: '/find', params: { specialty: s.slug } })}
            >
              <Text style={styles.pillIcon}>{s.icon}</Text>
              <Text style={styles.pillLabel}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick access</Text>
        <View style={styles.quickGrid}>
          {[
            { label: 'AI Symptom Guide', icon: '🩺', color: '#EEF5FF' },
            { label: 'Find Pharmacy', icon: '💊', color: '#EEFAF5' },
            { label: 'Emergency', icon: '🚨', color: '#FFF5F5' },
            { label: 'Expat Guide', icon: '📖', color: '#FFFBEE' },
          ].map(item => (
            <TouchableOpacity key={item.label} style={[styles.quickCard, { backgroundColor: item.color }]}>
              <Text style={styles.quickIcon}>{item.icon}</Text>
              <Text style={styles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  hero: { backgroundColor: '#1A6BCC', padding: 24, paddingTop: 16, paddingBottom: 36 },
  heroTitle: { fontSize: 28, fontWeight: '700', color: '#FFFFFF', marginBottom: 6 },
  heroSub: { fontSize: 15, color: 'rgba(255,255,255,0.75)', marginBottom: 20 },
  searchBar: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14 },
  searchPlaceholder: { color: '#94A3B8', fontSize: 15 },
  section: { padding: 20 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 14 },
  pillRow: { gap: 10, paddingRight: 20 },
  pill: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, alignItems: 'center', width: 110, borderWidth: 1, borderColor: '#E2E8F0' },
  pillIcon: { fontSize: 24, marginBottom: 6 },
  pillLabel: { fontSize: 12, color: '#0F172A', fontWeight: '500', textAlign: 'center' },
  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickCard: { width: '47%', borderRadius: 14, padding: 16 },
  quickIcon: { fontSize: 28, marginBottom: 8 },
  quickLabel: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
})
