import React, { FC, memo, useCallback } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { STYLES } from "../styles";
import { Page } from "../components/Page";

interface Props {
    icon: any;
    title: string;
    description: string;
    buttonText: string;
    next: () => void;
}

export const GetStarted: FC<Props> = memo(props => {
    const { next, icon, title, description, buttonText } = props;

    const onClick = useCallback(() => {
        setTimeout(() => {
            next();
        }, 500);
    }, []);

    return (
        <Page hideHeaderFooter>
            <Text style={STYLES.title}>
                {title}
            </Text>
            <View style={[STYLES.row, { paddingBottom: 40 }]}>
                <Image source={icon} style={{ width: 50, height: 50 }} />
                <Image source={icon} style={{ width: 50, height: 50 }} />
                <Image source={icon} style={{ width: 50, height: 50 }} />
            </View>
            <Text style={STYLES.subtitle}>
                {description}
            </Text>
            <TouchableOpacity style={STYLES.button} onPress={onClick}>
                <Text style={STYLES.buttonText}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </Page>
    )
});
