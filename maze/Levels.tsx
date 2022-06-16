import React, { FC, memo, useCallback, useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Share } from 'react-native'
import Checkbox from 'expo-checkbox';
import { STYLES, THEME1 } from "../styles";
import { LEVELS, COLS_MEDI } from './constants';
import { Page } from "../components/Page";
import hat from '../assets/images/hat.png';
import overall from '../assets/images/overall.png';

interface Props {
    maxLevel: number;
    onSelectLevel: (selected: number, difficult: boolean) => void;
    colNums: number[];
}

export const Levels: FC<Props> = memo(props => {
    const { maxLevel, onSelectLevel, colNums } = props;
    const [isDiffChecked, setDiffChecked] = useState(colNums.length === COLS_MEDI.length);

    const onLevelClick = useCallback((selected: number) => {
        if (selected <= maxLevel) onSelectLevel(selected, isDiffChecked);
    }, [maxLevel, onSelectLevel, isDiffChecked]);

    const onDiffClick = useCallback((checked: boolean) => {
        setDiffChecked(checked);
    }, []);

    return (
        <Page icon={overall} status={'House of Mirrors'}>
            <View>
                {LEVELS.map((title, index) => {
                    const styles = [STYLES.button, { marginTop: 10 }];
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
            <View style={[STYLES.rowLeft, { marginTop: 20 }]}>
                <Text style={[STYLES.buttonText, { paddingRight: 10 }]}>
                    Double time:
                </Text>
                <Checkbox
                    value={isDiffChecked}
                    onValueChange={onDiffClick}
                    color={isDiffChecked ? THEME1.green : undefined}
                />
            </View>
        </Page>
    )
});
