import React, { FC, memo, useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native'
import { STYLES, WIDTH } from "./styles";
import { PERFORMERS, FINAL_PERF_SIZE } from "./constants";
import { Answer } from "./model";
import { Page } from "./Page";
import { Anchor } from "./Anchor";

interface Props {
    answers: Answer[];
    reset: () => void;
}

export const Finished: FC<Props> = memo(props => {
    const { reset, answers } = props;
    const [showQuizInfo, setShowQuizInfo] = useState<boolean>();
    const [shareError, setShareError] = useState<string>();

    const points = answers.reduce((val, next) => {
        return val + next.points;
    }, 0);
    const performers = PERFORMERS.filter((perf) => perf.points >= points);
    const performer = performers[0];

    const onClick = useCallback(() => {
        setTimeout(() => {
            reset();
        }, 500);
    }, []);

    const onShare = useCallback(async () => {
        try {
            const result = await Share.share({
                message: 'RubeFest Circus - I am a ' + performer.name + '!',
                url: 'https://corynathe.github.io/rubefest/',
            });
        } catch (error) {
            setShareError('Sorry! Sharing not supported on this device.');
        }
    }, [performer]);

    const onQuizInfo = useCallback(() => {
        setShowQuizInfo(true);
    }, []);

    const closeQuizInfo = useCallback(() => {
        setShowQuizInfo(false);
    }, []);

    return (
        <Page>
            {showQuizInfo ? (
                <>
                    <Text style={[STYLES.title, { fontSize: 30 }]}>Meet the performers!</Text>
                    <View style={[STYLES.rowCenter]}>
                        <ShowPerformer name={PERFORMERS[0].name} image={PERFORMERS[0].image} />
                        <ShowPerformer name={PERFORMERS[1].name} image={PERFORMERS[1].image} />
                        <ShowPerformer name={PERFORMERS[2].name} image={PERFORMERS[2].image} />
                    </View>
                    <View style={[STYLES.rowCenter]}>
                        <ShowPerformer name={PERFORMERS[3].name} image={PERFORMERS[3].image} />
                        <ShowPerformer name={PERFORMERS[4].name} image={PERFORMERS[4].image} />
                        <ShowPerformer name={PERFORMERS[5].name} image={PERFORMERS[5].image} />
                    </View>
                    <View style={[STYLES.rowCenter]}>
                        <ShowPerformer name={PERFORMERS[6].name} image={PERFORMERS[6].image} />
                        <ShowPerformer name={PERFORMERS[7].name} image={PERFORMERS[7].image} />
                        <ShowPerformer name={PERFORMERS[8].name} image={PERFORMERS[8].image} />
                    </View>
                    <TouchableOpacity style={STYLES.button} onPress={closeQuizInfo}>
                        <Text style={STYLES.buttonText}>
                            Close Quiz Info
                        </Text>
                    </TouchableOpacity>
                    <View style={{ paddingTop: 10 }}>
                        <Text style={{ fontSize: 10 }}>
                            Circus icons created by{' '}
                            <Anchor href="https://www.flaticon.com/free-icons/circus">
                                Freepik - Flaticon
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
                        You are a ...
                    </Text>
                    <Image source={performer.image} style={{ width: FINAL_PERF_SIZE, height: FINAL_PERF_SIZE }} />
                    <Text style={STYLES.subtitle}>
                        {performer.name}
                    </Text>
                    <View style={[STYLES.row]}>
                        <TouchableOpacity style={STYLES.button} onPress={onClick}>
                            <Text style={STYLES.buttonText}>
                                Restart
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[STYLES.button, STYLES.buttonBlue]} onPress={onShare}>
                            <Text style={[STYLES.buttonText, STYLES.buttonTextBlue]}>
                                Share
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={STYLES.button} onPress={onQuizInfo}>
                            <Text style={STYLES.buttonText}>
                                Quiz Info
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

interface PerfProps {
    name: string;
    image: any
}

const ShowPerformer: FC<PerfProps> = memo(props => {
    return (
        <View style={{ justifyContent: 'space-around', alignItems: 'center', width: 120, padding: 10 }}>
            <Image source={props.image} style={{ width: 50, height: 50 }} />
            <Text style={[STYLES.infoText]}>{props.name}</Text>
        </View>
    );
});
