import React, { useState, useMemo, useCallback, FC, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { STYLES } from "../styles";
import { Page } from '../components/Page';
import { GetStarted } from '../components/GetStarted';
import card from '../assets/images/tarot-card.png';

export const TarotCards: FC<NativeStackScreenProps> = memo(props => {
    const { navigation } = props;
    const [getStarted, setGetStarted] = useState<boolean>(true);

    const onClick = useCallback(() => {
        setTimeout(() => {
            navigation.navigate('Home');
        }, 500);
    }, []);

    const startTarot = useCallback(() => {
        setGetStarted(false);
    }, []);

    if (getStarted) {
        return (
            <GetStarted
                next={startTarot}
                icon={card}
                title={'Cletus\' Tarot Reading'}
                description={'The future lies in Cletus\' hands!'}
                buttonText={'Get Started'}
            />
        )
    }

    return (
        <Page hideHeaderFooter navigation={navigation}>
            <View>
                <Text>
                    Cletus' Tarot Reading, coming soon...
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
