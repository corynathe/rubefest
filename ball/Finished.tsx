import React, { FC, memo, useCallback, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native'
import { STYLES } from "../styles";
import { Page } from "../components/Page";
import { Anchor } from "../components/Anchor";
import { ANSWERS, INFO } from "./constants";
import ball from '../assets/images/crystal-ball.png';
import overall from '../assets/images/overall.png';

interface Props {
    reset: () => void;
    navigation: any;
}

export const Finished: FC<Props> = memo(props => {
    const { reset, navigation } = props;
    const [showInfo, setShowInfo] = useState<boolean>();
    const [shareError, setShareError] = useState<string>();
    const [answer, setAnswer] = useState<string>();

    const onClick = useCallback(() => {
        setTimeout(() => {
            reset();
            navigation.navigate('Home');
        }, 500);
    }, []);

    useEffect(() => {
        setAnswer([...ANSWERS].sort(() => 0.5 - Math.random())[0]);
    }, []);

    const onShare = useCallback(async () => {
        try {
            const result = await Share.share({
                message: 'Cletus\' Crystall Ball - Cletus says, "' + answer + '"',
                url: 'https://corynathe.github.io/rubefest/',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            if (error?.message.toLowerCase().indexOf('cancel') === -1) {
                setShareError(error?.message || 'Sorry! Sharing not supported on this device.');
            }
        }
    }, [answer]);

    const onInfo = useCallback(() => {
        setShowInfo(true);
    }, []);

    const closeInfo = useCallback(() => {
        setShowInfo(false);
    }, []);

    return (
        <Page icon={ball}>
            {showInfo ? (
                <>
                    <Text style={[STYLES.title, { fontSize: 30 }]}>Facts about Cletus:</Text>
                    {INFO.map((info, index) => {
                        return (
                            <View key={index} style={[STYLES.rowCenter, { paddingBottom: 20 }]}>
                                <Text style={[STYLES.infoText]}>{info}</Text>
                            </View>
                        )
                    })}
                    <TouchableOpacity style={STYLES.button} onPress={closeInfo}>
                        <Text style={STYLES.buttonText}>
                            Close Info
                        </Text>
                    </TouchableOpacity>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 10 }}>
                            Crystall ball icons created by{' '}
                            <Anchor href="https://www.flaticon.com/free-icons/crystal-ball">
                                iconixar - Flaticon
                            </Anchor>
                        </Text>
                        <Text style={{ fontSize: 10 }}>
                            Fonts and color palette by{' '}
                            <Anchor href="https://slidesgo.com/theme/circus-background">
                                slidesgo
                            </Anchor>
                        </Text>
                    </View>
                </>
            ) : (
                <>
                    <Text style={STYLES.title}>
                        Cletus says,
                    </Text>
                    <Text style={STYLES.subtitle}>
                        "{answer}"
                    </Text>
                    <View style={[STYLES.row]}>
                        <TouchableOpacity style={STYLES.button} onPress={onClick}>
                            <Text style={STYLES.buttonText}>
                                Home
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[STYLES.button, STYLES.buttonBlue]} onPress={onShare}>
                            <Text style={[STYLES.buttonText, STYLES.buttonTextBlue]}>
                                Share
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={STYLES.button} onPress={onInfo}>
                            <Text style={STYLES.buttonText}>
                                Game Info
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {shareError && (
                        <Text style={[STYLES.error]}>{shareError}</Text>
                    )}
                </>
            )}
        </Page>
    )
});
