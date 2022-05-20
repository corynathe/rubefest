import React, { FC, memo, useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native'
import { STYLES } from "../styles";
import { LEVELS } from './constants';
import { Page } from "../components/Page";
import hat from '../assets/images/hat.png';
import overall from '../assets/images/overall.png';

interface Props {
    maxLevel: number;
    onSelectLevel: (selected: number) => void;
}

export const Levels: FC<Props> = memo(props => {
    const { maxLevel, onSelectLevel } = props;

    const onLevelClick = useCallback((selected: number) => {
        if (selected <= maxLevel) onSelectLevel(selected);
    }, [maxLevel, onSelectLevel]);

    return (
        <Page icon={overall} status={'House of Mirrors'}>
            <View>
                {LEVELS.map((title, index) => {
                    const styles = [STYLES.button];
                    if (index > maxLevel) {
                        styles.push(STYLES.buttonDisabled);
                    }

                    return (
                        <TouchableOpacity key={index} style={styles} onPress={() => onLevelClick(index)}>
                            <Text style={STYLES.buttonText}>
                                {title}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </Page>
    )
});
