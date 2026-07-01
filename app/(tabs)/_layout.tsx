import { Tabs } from 'expo-router';
import { ColorValue, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from '../../src/hooks/useTranslation';

type TabIconProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: ColorValue;
  focused: boolean;
};

function TabIcon({ name, color, focused }: TabIconProps) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <MaterialCommunityIcons name={name} size={22} color={color} />
    </View>
  );
}

export default function TabsLayout() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2F80ED',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: [
          styles.tabBar,
          { bottom: insets.bottom + 12 },
        ],
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: t('today.title'),
          tabBarIcon: ({ color, focused }) => <TabIcon name="home" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="treatments"
        options={{
          title: t('treatments.title'),
          tabBarIcon: ({ color, focused }) => <TabIcon name="pill" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: t('documents.title'),
          tabBarIcon: ({ color, focused }) => <TabIcon name="folder" color={color} focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="my-space"
        options={{
          title: t('mySpace.title'),
          tabBarIcon: ({ color, focused }) => <TabIcon name="account" color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    height: 64,
    borderRadius: 24,
    borderTopWidth: 0,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    paddingBottom: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  tabBarItem: {
    paddingVertical: 2,
  },
  tabBarLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
  },
  iconWrap: {
    width: 44,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: '#EAF2FF',
  },
});
