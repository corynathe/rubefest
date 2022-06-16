import React, { FC, memo, useCallback, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native'
import { STYLES, THEME1, HOME_URL } from "../styles";
import { Page } from "../components/Page";
import { Anchor } from "../components/Anchor";
import { ANSWERS, INFO } from "./constants";
import ball from '../assets/images/crystal-ball.png';

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
                message: 'Cletus\' Crystal Ball - Cletus says, "' + answer + '"',
                url: HOME_URL,
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
            // if (error?.message.toLowerCase().indexOf('cancel') === -1) {
            //     setShareError(error?.message || 'Sorry! Sharing not supported on this device.');
            // }
            if (error?.message.toLowerCase().indexOf('not supported') > -1) {
                setShareError(error?.message);
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
        <Page status={'Cletus\' Crystal Ball'} icon={ball}>
            {showInfo ? (
                <>
                    <Text style={[STYLES.title, { fontSize: 30, fontFamily: 'Livvic_400Regular', color: THEME1.orange, paddingBottom: 20 }]}>
                        Facts about Cletus:
                    </Text>
                    {INFO.map((info, index) => {
                        return (
                            <View key={index} style={[STYLES.rowCenter, { paddingBottom: 15 }]}>
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
                            Crystal ball icons created by{' '}
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
