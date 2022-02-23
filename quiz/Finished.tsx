import React, { FC, memo, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { STYLES, WIDTH } from "./styles";
import { PERFORMERS } from "./constants";
import { Answer } from "./model";
import { Page } from "./Page";

interface Props {
    answers: Answer[];
    reset: () => void;
}

export const Finished: FC<Props> = memo(props => {
    const { reset, answers } = props;

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

    return (
        <Page>
            <Text style={STYLES.title}>
                You are a ...
            </Text>
            <Image source={performer.image} style={{ width: 200, height: 200 }} />
            <Text style={STYLES.subtitle}>
                {performer.name}
            </Text>
            <TouchableOpacity style={STYLES.button} onPress={onClick}>
                <Text style={STYLES.buttonText}>
                    Restart
                </Text>
            </TouchableOpacity>

            {/*TODO why isn't this working on phone*/}
            {/*<View style={STYLES.footer2}>*/}
            {/*    <a href="https://www.flaticon.com/free-icons/circus" title="circus icons">*/}
            {/*        <Text>*/}
            {/*            Circus icons created by Freepik - Flaticon*/}
            {/*        </Text>*/}
            {/*    </a>*/}
            {/*</View>*/}
        </Page>
    )
});
