import { Tabs } from 'expo-router';
import { useTranslation } from '../../src/hooks/useTranslation';

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2F80ED',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tabs.Screen name="today" options={{ title: t('today.title') }} />
      <Tabs.Screen name="treatments" options={{ title: t('treatments.title') }} />
      <Tabs.Screen name="documents" options={{ title: t('documents.title') }} />
      <Tabs.Screen name="my-space" options={{ title: t('mySpace.title') }} />
    </Tabs>
  );
}
