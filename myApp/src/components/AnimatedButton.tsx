import React from 'react';
import { Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { MotiView, MotiText } from 'moti';

interface AnimatedButtonProps {
    onPress: () => void;
    label: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    loading?: boolean;
    activeOpacity?: number;
    scaleTo?: number;
}

export const AnimatedButton = ({
    onPress,
    label,
    style,
    textStyle,
    disabled = false,
    loading = false,
    activeOpacity = 0.85,
    scaleTo = 0.96,
}: AnimatedButtonProps) => {
    return (
        <Pressable 
            onPress={onPress} 
            disabled={disabled || loading}
            style={({ pressed }) => [
                style,
                disabled && { opacity: 0.5 }
            ]}
        >
            {({ pressed }) => (
                <MotiView
                    from={{ scale: 1, opacity: 1 }}
                    animate={{
                        scale: pressed ? scaleTo : 1,
                        opacity: pressed ? activeOpacity : 1,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 10,
                        stiffness: 200,
                    }}
                    style={[
                        StyleSheet.absoluteFill,
                        { borderRadius: style?.borderRadius || 0 }
                    ]}
                >
                    <MotiText 
                        style={textStyle}
                        animate={{
                            opacity: loading ? 0 : 1
                        }}
                    >
                        {label}
                    </MotiText>
                </MotiView>
            )}
        </Pressable>
    );
};
