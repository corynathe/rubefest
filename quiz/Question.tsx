import React, { FC, memo, useMemo, useState, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native'
import { Question, Answer } from "./model";
import { ACTION_TIMER } from "./constants";
import { STYLES } from "../styles";
import { Page } from "../components/Page";

interface Props {
    status: string;
    question: Question;
    next: (selectedAnswer: Answer) => void;
    navigation: any;
}

export const QuestionDisplay: FC<Props> = memo(props => {
    const { question, next, status, navigation } = props;
    const [selectedAnswer, setSelectedAnswer] = useState<Answer>();
    const answers = useMemo(() => [...question.answers].sort(() => 0.5 - Math.random()), [question]);

    const onAnswerClick = useCallback((answer: Answer) => {
        if (selectedAnswer) return;
        setSelectedAnswer(answer);

        setTimeout(() => {
            next(answer);
        }, ACTION_TIMER);
    }, [selectedAnswer]);

    return (
        <Page status={status} navigation={navigation}>
            <View>
                <Text style={STYLES.question}>
                    {question.text}
                </Text>
                {answers.map((answer) => {
                    return (
                        <TouchableOpacity
                            key={answer.points}
                            onPress={() => onAnswerClick(answer)}
                            style={[
                                STYLES.answerBox,
                                answer === selectedAnswer ? STYLES.answerSelected : undefined,
                            ]}
                        >
                            <Text style={[
                                STYLES.answerText,
                                answer === selectedAnswer ? STYLES.answerSelectedText : undefined,
                            ]}>
                                {answer.text}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </Page>
    )
});
