import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const MENU_ITEMS = [
  { icon: 'calendar-outline' as const, label: 'My appointments', badge: null },
  { icon: 'heart-outline' as const, label: 'Favourites', badge: 'Plus' },
  { icon: 'time-outline' as const, label: 'Waiting list', badge: 'Plus' },
  { icon: 'notifications-outline' as const, label: 'Notifications', badge: null },
  { icon: 'shield-outline' as const, label: 'Privacy & data', badge: null },
  { icon: 'help-circle-outline' as const, label: 'FAQ', badge: null },
  { icon: 'mail-outline' as const, label: 'Contact support', badge: null },
]

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* User card */}
      <View style={styles.userCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={32} color="#1A6BCC" />
        </View>
        <View>
          <Text style={styles.name}>Guest user</Text>
          <TouchableOpacity>
            <Text style={styles.signIn}>Sign in or create account →</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Plus banner */}
      <View style={styles.plusBanner}>
        <Ionicons name="flash" size={18} color="#1A6BCC" />
        <View style={styles.plusText}>
          <Text style={styles.plusTitle}>Upgrade to MEDIQ Plus</Text>
          <Text style={styles.plusSub}>Unlimited symptom checks, favourites & more</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#1A6BCC" />
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {MENU_ITEMS.map(item => (
          <TouchableOpacity key={item.label} style={styles.menuItem}>
            <Ionicons name={item.icon} size={20} color="#64748B" style={styles.menuIcon} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            {item.badge && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={16} color="#CBD5E1" style={styles.menuChevron} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.version}>MEDIQ v1.0.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  userCard: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#EEF5FF', alignItems: 'center', justifyContent: 'center' },
  name: { fontSize: 17, fontWeight: '600', color: '#0F172A', marginBottom: 2 },
  signIn: { fontSize: 13, color: '#1A6BCC' },
  plusBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, margin: 16, padding: 16, backgroundColor: '#EEF5FF', borderRadius: 14 },
  plusText: { flex: 1 },
  plusTitle: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  plusSub: { fontSize: 12, color: '#64748B' },
  menu: { backgroundColor: '#FFFFFF', marginHorizontal: 16, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  menuIcon: { marginRight: 12 },
  menuLabel: { flex: 1, fontSize: 15, color: '#0F172A' },
  badge: { backgroundColor: '#EEF5FF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginRight: 8 },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#1A6BCC' },
  menuChevron: {},
  version: { textAlign: 'center', color: '#CBD5E1', fontSize: 12, marginVertical: 24 },
})
