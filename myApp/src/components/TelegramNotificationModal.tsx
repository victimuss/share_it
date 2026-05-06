import React, { useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  Linking,
  Animated,
  Easing,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '@/src/styles/root';
import { tgModalStyles as s } from '@/src/styles/TelegramModalStyles';
import { useAuth } from '../context/AuthContext';
import { LinkTelegram } from '../api/main_page/main_page';

const PRIVACY_POLICY_URL = 'https://victimuss.github.io/spark_edu/privacy.html';
const TelegramPlaneIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 240 240" fill="none">
    <Defs>
      <LinearGradient id="tg" x1="120" y1="0" x2="120" y2="240" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#fff" stopOpacity="1" />
        <Stop offset="1" stopColor="#dff0ff" stopOpacity="1" />
      </LinearGradient>
    </Defs>
    <Path
      d="M6 116.7 56.4 97.1l157.2-60.5c7-2.7 13 4.2 10 11L169 198c-2 4.8-7.3 7.2-12.2 5.6l-44.8-14.3-24 22.1c-5.2 4.8-13.6 1-13.6-6v-33l-68.4-55.7z"
      fill="url(#tg)"
    />
    <Path
      d="M74.4 172.4l4.4-41.8 96.6-87.2c2-1.8-.4-4.4-2.6-3L57.4 131.6"
      fill="#c8daea"
    />
  </Svg>
);

const BellIconLarge = () => (
  <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
      fill={COLORS.primary}
    />
  </Svg>
);

// ─── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    emoji: '📚',
    title: 'Новые уроки',
    subtitle: 'По вашим интересам и тегам',
  },
  {
    emoji: '✅',
    title: 'Статус модерации',
    subtitle: 'Одобрен, отклонён или на проверке',
  },
  {
    emoji: '🔥',
    title: 'Топ недели',
    subtitle: 'Самые популярные уроки платформы',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  visible: boolean;
  onActivate: () => void;
  onSkip: () => void;
}

export const TelegramNotificationModal: React.FC<Props> = ({
  visible,
  onActivate,
  onSkip,
}) => {
  const slideAnim = useRef(new Animated.Value(400)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        damping: 18,
        stiffness: 120,
        useNativeDriver: true,
      }).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.08,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 900,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      slideAnim.setValue(400);
    }
  }, [visible]);

  const dismiss = (cb: () => void) => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 210,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(cb);
  };

  const handleActivate = async () => {
    dismiss(onActivate);
    let res = await LinkTelegram();
    if (res) Linking.openURL(res.tg_url);
  };

  const handleSkip = () => dismiss(onSkip);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleSkip}
    >
      <Pressable style={s.overlay} onPress={handleSkip}>
        <Pressable onPress={() => { }} style={{ width: '100%' }}>
          <Animated.View style={[s.sheet, { transform: [{ translateY: slideAnim }] }]}>

            {/* Drag handle */}
            <View style={s.dragHandle} />

            {/* Hero */}
            <View style={s.heroRow}>
              <Animated.View style={[s.iconCircle, { transform: [{ scale: pulseAnim }] }]}>
                <BellIconLarge />
              </Animated.View>
              <View style={s.heroText}>
                <Text style={s.eyebrow}>Spark Edu · Уведомления</Text>
                <Text style={s.title}>Подключите{'\n'}Telegram-бота</Text>
              </View>
            </View>

            {/* Description */}
            <Text style={s.description}>
              Будьте в курсе событий платформы, не открывая приложение — уведомления придут прямо в Telegram.
            </Text>

            {/* Features */}
            <View style={s.features}>
              {FEATURES.map((f) => (
                <View key={f.title} style={s.featureRow}>
                  <View style={s.featureEmojiBadge}>
                    <Text style={s.featureEmoji}>{f.emoji}</Text>
                  </View>
                  <View style={s.featureTextBlock}>
                    <Text style={s.featureTitle}>{f.title}</Text>
                    <Text style={s.featureSubtitle}>{f.subtitle}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Privacy policy */}
            <View style={s.policyRow}>
              <Text style={s.policyText}>Активируя бота, вы соглашаетесь с </Text>
              <Pressable onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}>
                <Text style={s.policyLink}>политикой конфиденциальности</Text>
              </Pressable>
            </View>

            {/* CTA */}
            <Pressable
              style={({ pressed }) => [s.tgBtn, pressed && s.tgBtnPressed]}
              onPress={handleActivate}
            >
              <View style={s.tgIconWrapper}>
                <TelegramPlaneIcon />
              </View>
              <Text style={s.tgBtnText}>Открыть Telegram-бота</Text>
            </Pressable>

            {/* Skip */}
            <Pressable style={s.skipBtn} onPress={handleSkip}>
              <Text style={s.skipText}>Не сейчас</Text>
            </Pressable>

          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
