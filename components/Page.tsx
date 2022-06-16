import React, { FC, memo, useCallback } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Rye_400Regular, useFonts } from "@expo-google-fonts/rye";
import { Livvic_400Regular } from "@expo-google-fonts/livvic";

import { STYLES } from "../styles";
import rubefestIcon from '../assets/icon.png';

interface Props {
    hideHeaderFooter?: boolean;
    hideFooter?: boolean;
    status?: string;
    icon?: any;
    goHome?: () => void;
    navigation?: any;
}

export const Page: FC<Props> = memo(props => {
    const { children, status, hideHeaderFooter, hideFooter, navigation, goHome, icon } = props;
    const [fontsLoaded] = useFonts({ Rye_400Regular, Livvic_400Regular });
    const insets = useSafeAreaInsets();
    const _icon = icon ?? rubefestIcon;
    const _hideHeaderFooter = hideHeaderFooter || window.innerHeight < 640;

    const navigate = useCallback(() => {
        if (goHome) goHome();
        else navigation.navigate('Home');
    }, [goHome, navigation]);

    if (!fontsLoaded) return null;

    return (
        <View style={[STYLES.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            {!_hideHeaderFooter && (
                <View style={[STYLES.row, { padding: 10 }]}>
                    <Image source={_icon} style={{ width: 50, height: 50 }} />
                    {status !== undefined && navigation && (
                        <TouchableOpacity onPress={navigate}>
                            <Text style={STYLES.headerTitle}>RubeFest</Text>
                        </TouchableOpacity>
                    )}
                    {status !== undefined && !navigation && (
                        <Text style={[STYLES.headerTitle]}>
                            RubeFest
                        </Text>
                    )}
                    {status === undefined && <Image source={_icon} style={{ width: 50, height: 50 }} />}
                    <Image source={_icon} style={{ width: 50, height: 50 }} />
                </View>
            )}
            <View style={STYLES.main}>
                {children}
            </View>
            {!_hideHeaderFooter && !hideFooter && (
                <View style={[STYLES.row, { padding: 10 }]}>
                    <Image source={_icon} style={{ width: 50, height: 50 }} />
                    {status !== undefined && <Text style={STYLES.footerTitle}>{status}</Text>}
                    {status === undefined && <Image source={_icon} style={{ width: 50, height: 50 }} />}
                    <Image source={_icon} style={{ width: 50, height: 50 }} />
                </View>
            )}
        </View>
    )
});
