import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, Radius } from '../../design-system';
import { MCText } from '../ui/MCText';

export type StatusType = 'all_good' | 'action_pending' | 'attention_required' | 'no_treatments';

interface MCStatusCardProps {
  status: StatusType;
  title: string;
  subtitle?: string;
}

const statusConfig: Record<StatusType, { color: string; bg: string }> = {
  all_good: { color: Colors.serenityGreen, bg: '#F0FBF5' },
  action_pending: { color: Colors.mediclockBlue, bg: Colors.softBlueSurface },
  attention_required: { color: Colors.softWarning, bg: '#FFF8EC' },
  no_treatments: { color: Colors.calmGray, bg: Colors.softBlueSurface },
};

export const MCStatusCard: React.FC<MCStatusCardProps> = ({ status, title, subtitle }) => {
  const config = statusConfig[status];
  return (
    <View style={[styles.container, { backgroundColor: config.bg }]}> 
      <View style={[styles.indicator, { backgroundColor: config.color }]} />
      <View style={styles.content}>
        <MCText variant="h2" style={{ color: config.color }}>
          {title}
        </MCText>
        {subtitle ? (
          <MCText variant="small" color="secondary" style={styles.subtitle}>
            {subtitle}
          </MCText>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  } as ViewStyle,
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Spacing.sm,
  },
  content: {
    flex: 1,
  } as ViewStyle,
  subtitle: {
    marginTop: Spacing.xs,
  } as ViewStyle,
});
