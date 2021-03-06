import React, { FC, memo } from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { STYLES } from "./styles";
import { Page } from './components/Page';
import ball from './assets/images/crystal-ball.png';
import circus from './assets/images/circus.png';
import overall from './assets/images/overall.png';
import icon from './assets/icon.png';

export const Home: FC<NativeStackScreenProps> = memo(props => {
    const { navigation } = props;
    const size = 85;

    return (
        <Page hideHeaderFooter>
            <View style={[STYLES.row]}>
                <Image source={icon} style={{ width: 200, height: 200 }} />
            </View>
            <View>
                <TouchableOpacity style={[STYLES.row, STYLES.card, STYLES.card_orange]} onPress={() => navigation.navigate('Quiz')}>
                    <Image source={circus} style={{ width: size, height: size }} />
                    <Text style={STYLES.cardText}>RubeFest Circus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLES.row, STYLES.card, STYLES.card_blue]} onPress={() => navigation.navigate('Ball')}>
                    <Text style={STYLES.cardText}>Cletus' Crystal Ball</Text>
                    <Image source={ball} style={{ width: size, height: size }} />
                </TouchableOpacity>
                <TouchableOpacity style={[STYLES.row, STYLES.card, STYLES.card_yellow]} onPress={() => navigation.navigate('Maze')}>
                    <Image source={overall} style={{ width: size, height: size }} />
                    <Text style={STYLES.cardText}>Cletus' House of Mirrors</Text>
                </TouchableOpacity>
            </View>
        </Page>
    )
});
