import React, { FC, memo } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Rye_400Regular, useFonts } from "@expo-google-fonts/rye";
import { Livvic_400Regular } from "@expo-google-fonts/livvic";

import { STYLES } from "../styles";
import circus from '../assets/images/circus.png';

interface Props {
    hideHeaderFooter?: boolean;
    status?: string;
    navigation?: any;
}

export const Page: FC<Props> = memo(props => {
    const { children, status, hideHeaderFooter, navigation } = props;
    const [fontsLoaded] = useFonts({ Rye_400Regular, Livvic_400Regular });
    const insets = useSafeAreaInsets();

    if (!fontsLoaded) return null;

    return (
        <View style={[STYLES.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            {!hideHeaderFooter && (
                <View style={[STYLES.row]}>
                    <Image source={circus} style={{ width: 50, height: 50 }} />
                    {status !== undefined && navigation && (
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                            <Text style={STYLES.headerTitle}>RubeFest</Text>
                        </TouchableOpacity>
                    )}
                    {status !== undefined && !navigation && (
                        <Text style={STYLES.headerTitle}>RubeFest</Text>
                    )}
                    {status === undefined && <Image source={circus} style={{ width: 50, height: 50 }} />}
                    <Image source={circus} style={{ width: 50, height: 50 }} />
                </View>
            )}
            <View style={STYLES.main}>
                {children}
            </View>
            {!hideHeaderFooter && (
                <View style={[STYLES.row]}>
                    <Image source={circus} style={{ width: 50, height: 50 }} />
                    {status !== undefined && <Text style={STYLES.footerTitle}>{status}</Text>}
                    {status === undefined && <Image source={circus} style={{ width: 50, height: 50 }} />}
                    <Image source={circus} style={{ width: 50, height: 50 }} />
                </View>
            )}
        </View>
    )
});
