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
    alignSelf: 'flex-start',
    backgroundColor: '#F1F7FF',
    borderRadius: 20,
    padding: 10,
    marginBottom: 16,
  },
  logo: {
    width: 120,
    height: 35,
  },
});
