import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import type { Doctor } from '@mediq/shared'
import { formatPrice } from '@mediq/shared'

interface Props {
  doctor: Doctor
  onPress?: () => void
}

export default function DoctorCard({ doctor, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.row}>
        <Image source={{ uri: doctor.photo_url }} style={styles.photo} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty.name_en}</Text>
          <Text style={styles.specialtyBg}>{doctor.specialty.name_bg}</Text>

          <View style={styles.badges}>
            {doctor.speaks_english && (
              <View style={styles.badgeGreen}>
                <Text style={styles.badgeGreenText}>🇬🇧 English</Text>
              </View>
            )}
            {doctor.accepts_nhif && (
              <View style={styles.badgeBlue}>
                <Text style={styles.badgeBlueText}>NHIF</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{doctor.rating_average.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({doctor.rating_count})</Text>
          <Text style={styles.dot}>·</Text>
          <Text style={styles.city}>{doctor.city}</Text>
        </View>
        <Text style={styles.price}>{formatPrice(doctor.price_consultation_bgn)}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  photo: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#EEF5FF' },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  specialty: { fontSize: 13, color: '#1A6BCC', fontWeight: '500' },
  specialtyBg: { fontSize: 12, color: '#94A3B8', marginBottom: 8 },
  badges: { flexDirection: 'row', gap: 6, flexWrap: 'wrap' },
  badgeGreen: { backgroundColor: '#EEFAF5', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  badgeGreenText: { fontSize: 11, color: '#0D9E6E', fontWeight: '600' },
  badgeBlue: { backgroundColor: '#EEF5FF', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 },
  badgeBlueText: { fontSize: 11, color: '#1A6BCC', fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  star: { color: '#F59E0B', fontSize: 13 },
  rating: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
  ratingCount: { fontSize: 12, color: '#94A3B8' },
  dot: { color: '#CBD5E1', fontSize: 12 },
  city: { fontSize: 12, color: '#64748B' },
  price: { fontSize: 13, fontWeight: '600', color: '#0F172A' },
})
