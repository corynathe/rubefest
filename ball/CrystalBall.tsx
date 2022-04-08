import React, { useState, useMemo, useCallback, FC, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { STYLES } from "../styles";
import { Page } from '../components/Page';
import { GetStarted } from '../components/GetStarted';
import ball from '../assets/images/crystal-ball.png';

export const CrystalBall: FC<NativeStackScreenProps> = memo(props => {
    const { navigation } = props;
    const [getStarted, setGetStarted] = useState<boolean>(true);

    const onClick = useCallback(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 500);
    }, []);

    const startCrystalBall = useCallback(() => {
        setGetStarted(false);
    }, []);

    if (getStarted) {
        return (
            <GetStarted
                next={startCrystalBall}
                icon={ball}
                title={'Cletus\' Crystal Ball'}
                description={'Ask anything. Cletus has the answers!'}
                buttonText={'Get Started'}
            />
        )
    }

    return (
        <Page hideHeaderFooter navigation={navigation}>
            <View>
                <Text>
                    Cletus' Crystal Ball, coming soon...
                </Text>
            </View>
            <View>
                <TouchableOpacity style={STYLES.button} onPress={onClick}>
                    <Text style={STYLES.buttonText}>
                        Home
                    </Text>
                </TouchableOpacity>
            </View>
        </Page>
    )
});
