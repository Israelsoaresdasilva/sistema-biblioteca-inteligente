import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Cores } from '../../constants/cores';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Cores.secundaria,
          borderTopColor: Cores.borda,
        },
        tabBarActiveTintColor: Cores.destaque,
        tabBarInactiveTintColor: Cores.textoSuave,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explorar"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => <Ionicons name="compass" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="buscar"
        options={{
          title: 'Buscar',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="estante"
        options={{
          title: 'Estante',
          tabBarIcon: ({ color, size }) => <Ionicons name="bookmarks" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
