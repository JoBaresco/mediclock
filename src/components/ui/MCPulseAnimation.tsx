import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { Animations } from '../../design-system';

interface MCPulseAnimationProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const MCPulseAnimation: React.FC<MCPulseAnimationProps> = ({ children, style }) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: Animations.serenityPulse.scale,
          duration: Animations.serenityPulse.duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: Animations.serenityPulse.duration / 2,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();
    return () => pulse.stop();
  }, [scale]);

  return (
    <Animated.View style={[style, { transform: [{ scale }] }]}> {children} </Animated.View>
  );
};
