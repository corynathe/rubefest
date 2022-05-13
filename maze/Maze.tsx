import React, { useState, useMemo, useCallback, FC, memo, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';

import { STYLES, THEME1 } from "../styles";
import { Page } from '../components/Page';
import { GetStarted } from '../components/GetStarted';
import overall from '../assets/images/overall.png';
import hat from '../assets/images/hat.png';

export const Maze: FC<NativeStackScreenProps> = memo(props => {
    const { navigation } = props;
    const [getStarted, setGetStarted] = useState<boolean>(true);
    const [squares, setSquares] = useState();
    const [overallRow, setOverallRow] = useState<number>(0);
    const [overallCol, setOverallCol] = useState<number>(0);
    const [hatRow, setHatRow] = useState<number>(ROWS.length - 1);
    const [hatCol, setHatCol] = useState<number>(COLS.length - 1);

    const _canGoRight = canGoRight(squares, overallRow, overallCol);
    const _canGoLeft = canGoLeft(squares, overallRow, overallCol);
    const _canGoDown = canGoDown(squares, overallRow, overallCol);
    const _canGoUp = canGoUp(squares, overallRow, overallCol);

    const reset = useCallback(() => {
        setGetStarted(true);
        setSquares(undefined);
        setOverallRow(0);
        setOverallCol(0);
    }, []);

    useEffect(() => {
        let count = 0;
        let generatedSquares = getMazeSquares();
        console.log(count++);
        while (!validMazeSquares(generatedSquares)) {
            generatedSquares = getMazeSquares();
            console.log(count++);
        }
        setSquares(generatedSquares);
    }, []);

    const goHome = useCallback(() => {
        setTimeout(() => {
            reset();
            navigation.navigate('Home');
        }, 500);
    }, []);

    const onMove = useCallback((rowChange, colChange) => {
        if (rowChange !== 0) setOverallRow(overallRow + rowChange);
        if (colChange !== 0) setOverallCol(overallCol + colChange);
    }, [overallRow, overallCol]);

    const startMaze = useCallback(() => {
        setGetStarted(false);
    }, []);

    if (getStarted) {
        return (
            <GetStarted
                next={startMaze}
                icon={overall}
                title={'Cletus\' House of Mirrors'}
                description={'Cletus lost his hat! Can you help him find it back?'}
                buttonText={'Get Started'}
            />
        )
    }

    if (!squares) return null;

    return (
        <Page icon={overall} status="House of Mirrors" navigation={navigation}>
            <View style={[STYLES.maze]}>
                {squares.map((rowSquares, r) => {
                    return (
                        <View key={r} style={[STYLES.row]}>
                            <View style={[STYLES.rowMaze]}>
                                {rowSquares.map((colSquares, c) => {
                                    const styles = [...colSquares];

                                    return (
                                        <View key={c} style={styles}>
                                            {r === overallRow && c === overallCol && (
                                                <Image source={overall} style={{ width: 36, height: 36, marginTop: 2, marginLeft: 2 }} />
                                            )}
                                            {r === hatRow && c === hatCol && (
                                                <Image source={hat} style={{ width: 40, height: 40 }} />
                                            )}
                                            {_canGoRight && r === overallRow && c === (overallCol + 1) && (
                                                <TouchableOpacity onPress={() => onMove(0,1)}>
                                                    <FontAwesome5 name='arrow-right' size={25} color={THEME1.blue} style={STYLES.mazeArrow} />
                                                </TouchableOpacity>
                                            )}
                                            {_canGoLeft && r === overallRow && c === (overallCol - 1) && (
                                                <TouchableOpacity onPress={() => onMove(0,-1)}>
                                                    <FontAwesome5 name='arrow-left' size={25} color={THEME1.blue} style={STYLES.mazeArrow} />
                                                </TouchableOpacity>
                                            )}
                                            {_canGoDown && r === (overallRow + 1) && c === overallCol && (
                                                <TouchableOpacity onPress={() => onMove(1,0)}>
                                                    <FontAwesome5 name='arrow-down' size={25} color={THEME1.blue} style={STYLES.mazeArrow} />
                                                </TouchableOpacity>
                                            )}
                                            {_canGoUp && r === (overallRow - 1) && c === overallCol && (
                                                <TouchableOpacity onPress={() => onMove(-1,0)}>
                                                    <FontAwesome5 name='arrow-up' size={25} color={THEME1.blue} style={STYLES.mazeArrow} />
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    )
                })}
            </View>
            <View>
                <TouchableOpacity style={STYLES.button} onPress={goHome}>
                    <Text style={STYLES.buttonText}>
                        Home
                    </Text>
                </TouchableOpacity>
            </View>
        </Page>
    )
});

const ROWS = [0,1,2,3,4,5,6,7,8,9,10,11];
// const ROWS = [0,1,2,3,4,5,6,7];
const COLS = [0,1,2,3,4,5,6,7];

const getMazeSquares = () => {
    const rowSquares = [];

    ROWS.forEach(r => {
        const colSquares = [];

        COLS.forEach(c => {
            const styles = [STYLES.square];

            // left
            if (c === 0) {
                styles.push(STYLES.squareLeft);
            }

            // top
            if (r === 0) {
                styles.push(STYLES.squareTop);
            }

            // right
            if (c === COLS.length - 1) {
                styles.push(STYLES.squareRight);
            } else {
                if (Math.random() > 0.5) styles.push(STYLES.squareRight);
            }

            // bottom
            if (r === ROWS.length - 1) {
                styles.push(STYLES.squareBottom);
            } else {
                if (Math.random() > 0.5) styles.push(STYLES.squareBottom);
            }

            colSquares.push(styles);
        });

        rowSquares.push(colSquares);
    });

    return rowSquares;
}

const validMazeSquares = (squares: []): boolean => {
    const delim = '|';
    const accessedSquares = [];
    const potentialSquares = [[0,0].join(delim)]

    while (potentialSquares.length > 0) {
        const indices = potentialSquares.shift().split(delim);
        const row = parseInt(indices[0]);
        const col = parseInt(indices[1]);
        accessedSquares.push(indices.join(delim));

        if (canGoRight(squares, row, col)) {
            const potential1 = [row, col + 1].join(delim);
            if (accessedSquares.indexOf(potential1) === -1) {
                potentialSquares.push(potential1);
            }
        }
        if (canGoLeft(squares, row, col)) {
            const potential2 = [row, col - 1].join(delim);
            if (accessedSquares.indexOf(potential2) === -1) {
                potentialSquares.push(potential2);
            }
        }
        if (canGoUp(squares, row, col)) {
            const potential3 = [row - 1, col].join(delim);
            if (accessedSquares.indexOf(potential3) === -1) {
                potentialSquares.push(potential3);
            }
        }
        if (canGoDown(squares, row, col)) {
            const potential4 = [row + 1, col].join(delim);
            if (accessedSquares.indexOf(potential4) === -1) {
                potentialSquares.push(potential4);
            }
        }
    }

    return accessedSquares.indexOf([ROWS.length - 1, COLS.length - 1].join(delim)) > -1;
}

const canGoRight = (squares: [], row: number, col: number): boolean => {
    return squares?.[row][col].indexOf(STYLES.squareRight) == -1
        && squares?.[row][col + 1].indexOf(STYLES.squareLeft) == -1;
}
const canGoLeft = (squares: [], row: number, col: number): boolean => {
    return squares?.[row][col].indexOf(STYLES.squareLeft) == -1
    && squares?.[row][col - 1].indexOf(STYLES.squareRight) == -1;
}
const canGoDown = (squares: [], row: number, col: number): boolean => {
    return squares?.[row][col].indexOf(STYLES.squareBottom) == -1
    && squares?.[row + 1][col].indexOf(STYLES.squareTop) == -1;
}
const canGoUp = (squares: [], row: number, col: number): boolean => {
    return squares?.[row][col].indexOf(STYLES.squareTop) == -1
    && squares?.[row - 1][col].indexOf(STYLES.squareBottom) == -1;
}
