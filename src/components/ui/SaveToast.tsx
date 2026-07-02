import { StyleSheet, View } from 'react-native';
import { MCText } from './MCText';
import { Colors, Typography } from '../../theme';

type SaveToastProps = {
  visible: boolean;
  message: string;
};

export function SaveToast({ visible, message }: SaveToastProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.toast} pointerEvents="none">
      <MCText style={styles.text}>✓ {message}</MCText>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: Colors.text,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  text: {
    fontFamily: Typography.fonts.title,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
