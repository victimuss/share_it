import React from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { tabBarStyles } from '../styles/TabStyles';
import { MainScreen } from './auth/main/MainScreen';
import { ProfileScreen } from './auth/main/ProfileScreen';
import { BookIcon, HomeIcon, SearchIcon, UserIcon } from '../SVG/TabSVG';
import { COLORS } from '../styles/root';
import { SearchScreen } from './auth/main/SearchScreen';
import { NewLessonScreen } from './auth/main/NewLesson/NewLessonScreen';
import MyLessonsScreen from './auth/main/MyLessonsScreen';

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
                component={NewLessonScreen}
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
                                <Text style={tabBarStyles.fabIcon}>+</Text>
                            </Pressable>
                        </View>
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('NewLessonScreen');
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