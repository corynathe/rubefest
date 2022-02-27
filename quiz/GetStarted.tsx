import React, { FC, memo, useCallback } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { STYLES } from "./styles";
import { Page } from "./Page";
import circus from '../assets/images/circus.png';

interface Props {
    next: () => void;
}

export const GetStarted: FC<Props> = memo(props => {
    const { next } = props;

    const onClick = useCallback(() => {
        setTimeout(() => {
            next();
        }, 500);
    }, []);

    return (
        <Page hideHeaderFooter>
            <Text style={STYLES.title}>
                RubeFest Circus
            </Text>
            <View style={[STYLES.row, { paddingBottom: 40 }]}>
                <Image source={circus} style={{ width: 50, height: 50 }} />
                <Image source={circus} style={{ width: 50, height: 50 }} />
                <Image source={circus} style={{ width: 50, height: 50 }} />
            </View>
            <Text style={STYLES.subtitle}>
                Which Performer Are You?
            </Text>
            <TouchableOpacity style={STYLES.button} onPress={onClick}>
                <Text style={STYLES.buttonText}>
                    Click to Find Out
                </Text>
            </TouchableOpacity>
        </Page>
    )
});
