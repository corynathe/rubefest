import React, { FC, memo, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native'
import { STYLES } from "./styles";
import { Page } from "./Page";

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
        <Page>
            <Text style={STYLES.title}>
                RubeFest
            </Text>
            <Text style={STYLES.subtitle}>
                Which Circus Performer Are You?
            </Text>
            <TouchableOpacity style={STYLES.button} onPress={onClick}>
                <Text style={STYLES.buttonText}>
                    Click to Find Out
                </Text>
            </TouchableOpacity>
        </Page>
    )
});
