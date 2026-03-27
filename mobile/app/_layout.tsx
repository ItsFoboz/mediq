import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'

type IoniconsName = React.ComponentProps<typeof Ionicons>['name']

const TABS: Array<{
  name: string
  title: string
  icon: IoniconsName
  iconActive: IoniconsName
}> = [
  { name: 'index', title: 'Home', icon: 'home-outline', iconActive: 'home' },
  { name: 'find/index', title: 'Find', icon: 'search-outline', iconActive: 'search' },
  { name: 'appointments/index', title: 'Appointments', icon: 'calendar-outline', iconActive: 'calendar' },
  { name: 'guide/index', title: 'Guide', icon: 'book-outline', iconActive: 'book' },
  { name: 'profile/index', title: 'Profile', icon: 'person-outline', iconActive: 'person' },
]

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#1A6BCC',
          tabBarInactiveTintColor: '#94A3B8',
          tabBarStyle: {
            borderTopColor: '#E2E8F0',
            backgroundColor: '#FFFFFF',
            paddingBottom: 8,
            height: 72,
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
          headerStyle: { backgroundColor: '#FFFFFF', shadowColor: 'transparent', elevation: 0 },
          headerTitleStyle: { fontSize: 17, fontWeight: '600', color: '#0F172A' },
        }}
      >
        {TABS.map(tab => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.title,
              tabBarIcon: ({ focused, color, size }) => (
                <Ionicons name={focused ? tab.iconActive : tab.icon} size={size} color={color} />
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  )
}
