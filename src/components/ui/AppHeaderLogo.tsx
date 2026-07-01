import { Image, StyleSheet, View } from 'react-native';
import { Images } from '../../constants/images';

export function AppHeaderLogo() {
  return (
    <View style={styles.frame}>
      <Image source={Images.headerWordmark} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 35,
  },
});
