import { ScrollView, ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Mirrors the floating tab bar geometry defined in app/(tabs)/_layout.tsx.
const TAB_BAR_HEIGHT = 64;
const TAB_BAR_BOTTOM_OFFSET = 12;
const TAB_BAR_CONTENT_CLEARANCE = 24;

export function useTabBarContentPadding() {
  const insets = useSafeAreaInsets();
  return insets.bottom + TAB_BAR_BOTTOM_OFFSET + TAB_BAR_HEIGHT + TAB_BAR_CONTENT_CLEARANCE;
}

export function TabScreenScrollView({ contentContainerStyle, ...rest }: ScrollViewProps) {
  const paddingBottom = useTabBarContentPadding();

  return (
    <ScrollView
      {...rest}
      contentContainerStyle={[contentContainerStyle, { paddingBottom }]}
    />
  );
}
