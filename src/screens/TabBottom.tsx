import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Твои импорты (убедись, что пути правильные)
import { tabBarStyles } from '../styles/TabStyles';
import { MainScreen } from './auth/main/MainScreen';
import { ProfileScreen } from './auth/main/ProfileScreen';
import { BookIcon, HomeIcon, SearchIcon, UserIcon } from '../SVG/TabSVG';
import { COLORS } from '../styles/root'; // Нам нужны цвета для SVG!

const SearchScreen = () => <View />;
const MyLessonsScreen = () => <View />;

export type BottomTabParamList = {
    Home: undefined;
    Search: undefined;
    Create: undefined;
    MyLessons: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function TabNavigator(): React.JSX.Element {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: tabBarStyles.container,
                tabBarShowLabel: false,
                headerShown: false
            }}
        >
            <Tab.Screen
                name='Home'
                component={MainScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={tabBarStyles.tab}>
                            <View style={focused ? tabBarStyles.iconWrapperActive : tabBarStyles.iconWrapper}>
                                <HomeIcon
                                    size={24}
                                    color={focused ? COLORS.primary : COLORS.textSecondary}
                                />
                            </View>
                            <Text numberOfLines={1}
                            style={focused ? tabBarStyles.tabLabelActive : tabBarStyles.tabLabel}>
                                Главная
                            </Text>
                            <View style={focused ? tabBarStyles.activeDot : tabBarStyles.activeDotPlaceholder} />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name='Search'
                component={SearchScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={tabBarStyles.tab}>
                            <View style={focused ? tabBarStyles.iconWrapperActive : tabBarStyles.iconWrapper}>
                                <SearchIcon
                                    size={24}
                                    color={focused ? COLORS.primary : COLORS.textSecondary}
                                />
                            </View>
                            <Text numberOfLines={1}
                            style={focused ? tabBarStyles.tabLabelActive : tabBarStyles.tabLabel}>
                                Поиск
                            </Text>
                            <View style={focused ? tabBarStyles.activeDot : tabBarStyles.activeDotPlaceholder} />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name="Create"
                component={View}
                options={{
                    tabBarButton: ({ style, ...restProps }: any) => (
                        <View style={tabBarStyles.fabWrapper}>
                            <Pressable
                                {...restProps}
                                style={({ pressed }) => [
                                    tabBarStyles.fabButton,
                                    pressed && tabBarStyles.fabButtonPressed
                                ]}
                            >
                                {/* Заменили текстовый "+" на красивую SVG иконку (если есть PlusIcon) */}
                                <Text style={tabBarStyles.fabIcon}>+</Text>
                            </Pressable>
                        </View>
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        console.log('Открываем меню создания урока!');
                    },
                })}
            />

            <Tab.Screen
                name='MyLessons'
                component={MyLessonsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={tabBarStyles.tab}>
                            <View style={focused ? tabBarStyles.iconWrapperActive : tabBarStyles.iconWrapper}>
                                <BookIcon
                                    size={24}
                                    color={focused ? COLORS.primary : COLORS.textSecondary}
                                />
                            </View>
                            <Text style={focused ? tabBarStyles.tabLabelActive : tabBarStyles.tabLabel}>
                                Уроки
                            </Text>
                            <View style={focused ? tabBarStyles.activeDot : tabBarStyles.activeDotPlaceholder} />
                        </View>
                    ),
                }}
            />

            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={tabBarStyles.tab}>
                            <View style={focused ? tabBarStyles.iconWrapperActive : tabBarStyles.iconWrapper}>
                                <UserIcon
                                    size={24}
                                    color={focused ? COLORS.primary : COLORS.textSecondary}
                                />
                            </View>
                            <Text numberOfLines={1}
                            style={focused ? tabBarStyles.tabLabelActive : tabBarStyles.tabLabel}>
                                Профиль
                            </Text>
                            <View style={focused ? tabBarStyles.activeDot : tabBarStyles.activeDotPlaceholder} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}