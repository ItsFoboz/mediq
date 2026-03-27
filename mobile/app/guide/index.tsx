import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const GUIDE_ARTICLES = [
  { slug: 'healthcare-system', title: 'How the Bulgarian healthcare system works', category: 'System', readTime: 8 },
  { slug: 'nhif-explained', title: 'NHIF explained for expats', category: 'Insurance', readTime: 6 },
  { slug: 'finding-english-doctor', title: 'How to find an English-speaking doctor', category: 'Finding Care', readTime: 5 },
  { slug: 'emergency-guide', title: 'Emergency numbers and what to do', category: 'Emergency', readTime: 3 },
  { slug: 'private-vs-nhif', title: 'Private vs NHIF: which to choose?', category: 'Insurance', readTime: 7 },
  { slug: 'pharmacies-guide', title: 'Finding a pharmacy in Bulgaria', category: 'Medications', readTime: 4 },
]

const CATEGORY_COLOR: Record<string, string> = {
  System: '#EEF5FF',
  Insurance: '#EEFAF5',
  'Finding Care': '#F5F3FF',
  Emergency: '#FFF5F5',
  Medications: '#FFFBEE',
  Dental: '#F0FDF4',
}

const CATEGORY_TEXT: Record<string, string> = {
  System: '#1A6BCC',
  Insurance: '#0D9E6E',
  'Finding Care': '#7C3AED',
  Emergency: '#DC2626',
  Medications: '#D97706',
  Dental: '#16A34A',
}

export default function GuideScreen() {
  return (
    <FlatList
      data={GUIDE_ARTICLES}
      keyExtractor={item => item.slug}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Expat Healthcare Guide</Text>
          <Text style={styles.headerSub}>Healthcare in Bulgaria, explained in English.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          <View style={[styles.category, { backgroundColor: CATEGORY_COLOR[item.category] ?? '#F7F9FC' }]}>
            <Text style={[styles.categoryText, { color: CATEGORY_TEXT[item.category] ?? '#64748B' }]}>{item.category}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.readTime}>{item.readTime} min read</Text>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: { padding: 16, gap: 12, backgroundColor: '#F7F9FC' },
  header: { marginBottom: 8 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  headerSub: { fontSize: 14, color: '#64748B', marginBottom: 8 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  category: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, marginBottom: 8 },
  categoryText: { fontSize: 11, fontWeight: '600' },
  title: { fontSize: 15, fontWeight: '600', color: '#0F172A', marginBottom: 6, lineHeight: 22 },
  readTime: { fontSize: 12, color: '#94A3B8' },
})
