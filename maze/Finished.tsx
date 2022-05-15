import React, { FC, memo, useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native'
import { STYLES } from "../styles";
import { Page } from "../components/Page";
import { Anchor } from "../components/Anchor";
import hat from '../assets/images/hat.png';
import overall from '../assets/images/overall.png';
import thumb from '../assets/images/thumbs-up.png';
import drink from '../assets/images/drink.png';
import animista from '../assets/animista.css';

interface Props {
    goHome: () => void;
    restart: () => void;
}

export const Finished: FC<Props> = memo(props => {
    const { goHome, restart } = props;
    const hatEl = useRef<HTMLDivElement>(null);
    const hatAction = 'shake-vertical';
    const leftThumbEl = useRef<HTMLDivElement>(null);
    const leftThumbAction = 'shake-lr';
    const rightThumbEl = useRef<HTMLDivElement>(null);
    const rightThumbAction = 'shake-lr';
    const overallEl = useRef<HTMLDivElement>(null);
    const overallAction = 'shake-lr';

    const doActions = () => {
        if (hatEl.current?.classList.contains(hatAction))
            return;

        hatEl.current?.classList.add(hatAction);
        leftThumbEl.current?.classList.add(leftThumbAction);
        rightThumbEl.current?.classList.add(rightThumbAction);
        overallEl.current?.classList.add(overallAction);
        setTimeout(() => {
            hatEl.current?.classList.remove(hatAction);
            leftThumbEl.current?.classList.remove(leftThumbAction);
            rightThumbEl.current?.classList.remove(rightThumbAction);
            overallEl.current?.classList.remove(overallAction);
        }, 3000);
    }

    useEffect(() => {
        // need to wait a bit for the initial render
        setTimeout(doActions, 500);
    }, []);

    return (
        <Page icon={overall}>
            <View style={[animista.loadAnimista]}>
                <View style={[STYLES.row]}>
                    <Image source={hat} ref={hatEl} style={{ width: 135, height: 135 }} />
                </View>
                <View style={[STYLES.row]}>
                    <Image source={drink} ref={leftThumbEl} style={{ width: 80, height: 80, marginTop: 20 }} />
                    <Image source={overall} ref={overallEl} style={{ width: 120, height: 250 }} />
                    <Image source={thumb} ref={rightThumbEl} style={{ width: 60, height: 60, marginTop: 25 }} />
                </View>
            </View>
            <View style={[STYLES.row]}>
                <TouchableOpacity style={STYLES.button} onPress={goHome}>
                    <Text style={STYLES.buttonText}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[STYLES.button, STYLES.buttonBlue]} onPress={doActions}>
                    <Text style={[STYLES.buttonText, STYLES.buttonTextBlue]}>
                        Dance
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={STYLES.button} onPress={restart}>
                    <Text style={STYLES.buttonText}>
                        Reset
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 10 }}>
                <Text style={{ fontSize: 10 }}>
                    Hat and overall icons created by{' '}
                    <Anchor href="https://www.flaticon.com/free-icons/overalls">
                        Good Ware - Flaticon
                    </Anchor>
                </Text>
                <Text style={{ fontSize: 10 }}>
                    Fonts and color palette by{' '}
                    <Anchor href="https://slidesgo.com/theme/circus-background">
                        slidesgo
                    </Anchor>
                </Text>
            </View>
        </Page>
    )
});
