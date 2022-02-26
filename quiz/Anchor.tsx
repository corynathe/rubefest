import React, { FC, useCallback } from 'react';
import { Text } from 'react-native';
import * as Linking from 'expo-linking';

export const Anchor: FC = ((props) => {
    const _handlePress = useCallback(() => {
        Linking.openURL(props.href);
    }, []);

    return (
        <Text {...props} onPress={_handlePress}>
            {props.children}
        </Text>
    );
});
