import React, { useState, useMemo, useCallback, FC, memo, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';

import { STYLES, THEME1 } from "../styles";
import { LEVELS, ROWS, COLS, COLORS } from './constants';
import { Page } from '../components/Page';
import { GetStarted } from '../components/GetStarted';
import { Finished } from './Finished';
import overall from '../assets/images/overall.png';
import hat from '../assets/images/hat.png';

export const Maze: FC<NativeStackScreenProps> = memo(props => {
    const { navigation } = props;
    const [getStarted, setGetStarted] = useState<boolean>(true);
    const [finished, setFinished] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(0);
    const [userMoves, setUserMoves] = useState<number>(0);
    const [squares, setSquares] = useState();
    const [overallRow, setOverallRow] = useState<number>(0);
    const [overallCol, setOverallCol] = useState<number>(0);
    const [hatRow, setHatRow] = useState<number>(ROWS.length - 1);
    const [hatCol, setHatCol] = useState<number>(COLS.length - 1);
    const prevOverallRow = usePrevious(overallRow)
    const prevOverallCol = usePrevious(overallCol)

    const atStart = overallRow === 0 && overallCol === 0;
    const _canGoRight = canGoRight(squares, overallRow, overallCol);
    const _canGoLeft = canGoLeft(squares, overallRow, overallCol);
    const _canGoDown = canGoDown(squares, overallRow, overallCol);
    const _canGoUp = canGoUp(squares, overallRow, overallCol);

    const reset = useCallback(() => {
        setGetStarted(true);
        restart(false, false);
    }, []);

    const nextLevel = useCallback(() => {
        setLevel((level + 1) % LEVELS.length);
    }, [level]);

    const restart = useCallback((shouldGenerate = true, levelUp = true) => {
        setFinished(false);
        setUserMoves(0);
        setSquares(undefined);
        setOverallRow(0);
        setOverallCol(0);
        if (levelUp) nextLevel();
        if (shouldGenerate) generateMaze();
    }, [nextLevel]);

    const generateMaze = () => {
        let count = 1;
        let generatedSquares = getMazeSquares();
        while (!validMazeSquares(generatedSquares)) {
            generatedSquares = getMazeSquares();
            count++;

            // give up after attempting for awhile
            if (count > 1000) break;
        }

        console.log('Generate attempts: ' + count);
        setSquares(generatedSquares);
    }

    useEffect(() => {
        generateMaze();
    }, []);

    const goHome = useCallback(() => {
        setTimeout(() => {
            reset();
            navigation.navigate('Home');
        }, 500);
    }, []);

    const onMove = useCallback((rowChange, colChange, auto = false) => {
        if (rowChange !== 0) setOverallRow(overallRow + rowChange);
        if (colChange !== 0) setOverallCol(overallCol + colChange);
        if (!auto) setUserMoves(userMoves + 1);
    }, [overallRow, overallCol, userMoves]);

    useEffect(() => {
        if (overallRow === hatRow && overallCol == hatCol) {
            setFinished(true);
        } else if (!atStart && (_canGoUp + _canGoRight + _canGoDown + _canGoLeft) === 2) {
            // only one move to make so take it
            setTimeout(() => {
                if (_canGoUp && !(prevOverallRow === (overallRow - 1) && prevOverallCol === overallCol)) {
                    onMove(-1,0, true);
                } else if (_canGoDown && !(prevOverallRow === (overallRow + 1) && prevOverallCol === overallCol)) {
                    onMove(1,0, true);
                } else if (_canGoRight && !(prevOverallRow === overallRow && prevOverallCol === (overallCol + 1))) {
                    onMove(0,1, true);
                } else if (_canGoLeft && !(prevOverallRow === overallRow && prevOverallCol === (overallCol - 1))) {
                    onMove(0,-1, true);
                }
            }, 200);
        }
    }, [overallRow, overallCol, hatRow, hatCol]);

    const startMaze = useCallback(() => {
        setGetStarted(false);
    }, []);

    const flingGesture = Gesture.Fling()
        .direction(Directions.RIGHT | Directions.UP)
        .onEnd((e) => {
            const x = e.translationX;
            const y = e.translationY;
            if (Math.abs(x) > Math.abs(y) && x > 0) {
                if (_canGoRight) onMove(0,1);
            } else if (Math.abs(x) > Math.abs(y) && x < 0) {
                if (_canGoLeft) onMove(0,-1);
            } else if (y > 0) {
                if (_canGoDown) onMove(1,0);
            } else {
                if (_canGoUp) onMove(-1,0);
            }
        });

    if (!squares) return null;

    if (getStarted) {
        return (
            <GetStarted
                next={startMaze}
                icon={overall}
                title={'Cletus\' House of Mirrors'}
                description={'Oh Cletus, not again! Can you help him find his hat?'}
                buttonText={'Get Started'}
            />
        )
    }

    if (finished) {
        return <Finished level={level} goHome={goHome} restart={restart} />;
    }

    return (
        <Page hideHeaderFooter>
            <View style={[STYLES.row, { paddingBottom: 10 }]}>
                <Text style={[STYLES.infoText3]}>
                    {LEVELS[level]}
                </Text>
            </View>
            <View style={[STYLES.row, { paddingBottom: 10 }]}>
                <Text style={STYLES.infoText}>Use</Text>
                <MaterialCommunityIcons name="gesture-swipe" size={25} color={THEME1.green} />
                <Text style={STYLES.infoText}>or click the </Text>
                <FontAwesome5 name='arrow-left' size={20} color={THEME1.green} />
                <FontAwesome5 name='arrow-right' size={20} color={THEME1.green} />
                <Text style={STYLES.infoText}>to move Cletus.</Text>
            </View>
            <GestureDetector gesture={flingGesture}>
                <View style={[STYLES.maze]}>
                {squares.map((rowSquares, r) => {
                    return (
                        <View key={r} style={[STYLES.row]}>
                            <View style={[STYLES.rowMaze]}>
                                {rowSquares.map((colSquares, c) => {
                                    const styles = [...colSquares];
                                    const isOverall = r === overallRow && c === overallCol;
                                    const isHat = r === hatRow && c === hatCol;
                                    const isRightOfOverall = r === overallRow && c === (overallCol + 1);
                                    const isLeftOfOverall = r === overallRow && c === (overallCol - 1);
                                    const isBelowOverall = r === (overallRow + 1) && c === overallCol;
                                    const isAboveOverall = r === (overallRow - 1) && c === overallCol;

                                    // color wonder
                                    if (level === 1) {
                                        styles.push({ borderColor: COLORS[randomInt(COLORS.length - 1)] });
                                    }
                                    // vanishing walls
                                    else if (level === 2) {
                                        if (userMoves === 0) {
                                            // no-op
                                        } else if (userMoves < 10 ) {
                                            styles.push({ borderColor: THEME1.orange + (100 - (userMoves * 10)) });
                                        } else {
                                            styles.push({ borderColor: THEME1.orange + '00' });
                                        }
                                    }
                                    // losing focus
                                    else if (level === 3) {
                                        if (userMoves > 0 && (Math.abs(overallRow - r) > 1 || Math.abs(overallCol - c) > 1)) {
                                            styles.push({ borderColor: THEME1.orange + '00' });
                                        }
                                    }

                                    return (
                                        <View key={c} style={styles}>
                                            {isOverall && (
                                                <Image source={overall} style={{ width: 34, height: 34 }} />
                                            )}
                                            {isHat && (
                                                isRightOfOverall ? (
                                                    <TouchableOpacity onPress={() => onMove(0,1)}>
                                                        <Image source={hat} style={{ width: 35, height: 35 }} />
                                                    </TouchableOpacity>
                                                ) : isBelowOverall ? (
                                                    <TouchableOpacity onPress={() => onMove(1,0)}>
                                                        <Image source={hat} style={{ width: 35, height: 35 }} />
                                                    </TouchableOpacity>
                                                ) : <Image source={hat} style={{ width: 35, height: 35 }} />
                                            )}
                                            {_canGoRight && !isHat && isRightOfOverall && (
                                                <TouchableOpacity onPress={() => onMove(0,1)}>
                                                    <FontAwesome5 name='arrow-right' size={25} color={THEME1.blue} style={STYLES.mazeArrow} />
                                                </TouchableOpacity>
                                            )}
                                            {_canGoLeft && isLeftOfOverall && (
                                                <TouchableOpacity onPress={() => onMove(0,-1)}>
                                                    <FontAwesome5 name='arrow-left' size={25} color={THEME1.blue} style={STYLES.mazeArrow} />
                                                </TouchableOpacity>
                                            )}
                                            {_canGoDown && !isHat && isBelowOverall && (
                                                <TouchableOpacity onPress={() => onMove(1,0)}>
                                                    <FontAwesome5 name='arrow-down' size={25} color={THEME1.blue} style={STYLES.mazeArrow} />
                                                </TouchableOpacity>
                                            )}
                                            {_canGoUp && isAboveOverall && (
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
            </GestureDetector>
            <View style={[STYLES.row]}>
                <TouchableOpacity style={STYLES.button} onPress={goHome}>
                    <Text style={STYLES.buttonText}>
                        Home
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={STYLES.button} onPress={() => restart(true, false)}>
                    <Text style={STYLES.buttonText}>
                        Reset
                    </Text>
                </TouchableOpacity>
            </View>
        </Page>
    )
});

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

function usePrevious(value: number) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    },[value]);
    return ref.current;
}

function randomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
}
