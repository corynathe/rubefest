import React, { FC, memo } from 'react';
import { View, Image } from 'react-native'
import { STYLES } from "./styles";
import { Rye_400Regular, useFonts } from "@expo-google-fonts/rye";
import { Livvic_400Regular } from "@expo-google-fonts/livvic";
import circus from '../assets/images/circus.png';

export const Page: FC = memo(props => {
    const { children } = props;
    const [fontsLoaded] = useFonts({ Rye_400Regular, Livvic_400Regular });

    if (!fontsLoaded) return null;

    return (
        <View style={STYLES.container}>
            <View style={[STYLES.row, STYLES.header]}>
                <Image source={circus} style={{ width: 50, height: 50 }} />
                <Image source={circus} style={{ width: 50, height: 50 }} />
                <Image source={circus} style={{ width: 50, height: 50 }} />
            </View>
            {children}
            <View style={[STYLES.row, STYLES.footer]}>
                <Image source={circus} style={{ width: 50, height: 50 }} />
                <Image source={circus} style={{ width: 50, height: 50 }} />
                <Image source={circus} style={{ width: 50, height: 50 }} />
            </View>
        </View>
    )
});
