import React, { useState, useMemo, useCallback, FC, memo, useRef, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Progress from 'react-native-progress';

import { STYLES, WIDTH, THEME1 } from "../styles";
import { Page } from '../components/Page';
import { GetStarted } from '../components/GetStarted';
import { Finished } from './Finished';
import { ACTIONS } from './constants';
import ball from '../assets/images/crystal-ball.png';
import animista from '../assets/animista.css';

const ACTIONS_NEEDED = 1;

export const CrystalBall: FC<NativeStackScreenProps> = memo(props => {
    const { navigation } = props;
    const [getStarted, setGetStarted] = useState<boolean>(true);
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);
    const [actionCount, setActionCount] = useState<number>(0);
    const ballEl = useRef<HTMLDivElement>(null);

    const reset = useCallback(() => {
        setGetStarted(true);
        setActionCount(0);
        setInProgress(false);
        setFinished(false);
    }, []);

    const goHome = useCallback(() => {
        setTimeout(() => {
            reset();
            navigation.navigate('Home');
        }, 500);
    }, []);

    useEffect(() => {
        if (actionCount < ACTIONS_NEEDED) {
            setInProgress(false);
        } else if (actionCount === ACTIONS_NEEDED) {
            setTimeout(() => setFinished(true), 500);
        }
    }, [actionCount, ACTIONS]);

    const onAction = useCallback((index: number) => {
        if (inProgress) return;

        setInProgress(true);
        ballEl.current.classList.add(ACTIONS[index].cls);
        setTimeout(() => {
            ballEl.current.classList.remove(ACTIONS[index].cls);
            setActionCount(actionCount + 1);
        }, 3000);
    }, [actionCount, inProgress]);

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

    if (finished) {
        return <Finished reset={reset} navigation={navigation} />;
    }

    return (
        <Page status={'Cletus\' Crystal Ball'} icon={ball} goHome={goHome} navigation={navigation}>
            <View>
                <Text style={[STYLES.question]}>
                    Ask the crystal ball a question and select a button to reveal Cletus' answer.
                </Text>
            </View>
            <View stlye={[STYLES.row, animista.loadAnimista]}>
                <Image source={ball} ref={ballEl} style={{ width: 250, height: 250 }} />
            </View>
            {ACTIONS_NEEDED > 1 && (
                <View style={[STYLES.row]}>
                    {(inProgress || actionCount > 0) && (
                        <Progress.Bar
                            progress={actionCount / ACTIONS_NEEDED}
                            color={THEME1.blue}
                            width={WIDTH}
                            height={25}
                        />
                    )}
                </View>
            )}
            <View style={[STYLES.row]}>
                {ACTIONS.map((action, index) => {
                    return (
                        <TouchableOpacity
                            key={ACTIONS[index].title}
                            style={[STYLES.button, inProgress ? STYLES.buttonDisabled : null]}
                            onPress={() => onAction(index)}
                        >
                            <Text style={STYLES.buttonText}>
                                {ACTIONS[index].title}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </Page>
    )
});
