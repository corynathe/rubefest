import React, { useState, useMemo, useCallback, FC, memo } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { QuestionDisplay } from "./Question";
import { QUESTIONS, TOTAL_QUESTIONS } from "./constants";
import { Answer, Question } from "./model";
import { GetStarted } from "../components/GetStarted";
import { Finished } from "./Finished";
import circus from '../assets/images/circus.png';

export const Quiz: FC<NativeStackScreenProps> = memo(props => {
    const { navigation } = props;
    const [getStarted, setGetStarted] = useState<boolean>(true);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const questionIndex = useMemo(() => answers.length, [answers]);
    const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
    const currentQuestion = useMemo(() => quizQuestions[questionIndex], [quizQuestions, questionIndex]);

    const restartQuiz = useCallback(() => {
        setGetStarted(true);
        setAnswers([]);
    }, []);

    const startQuiz = useCallback(() => {
        setQuizQuestions([...QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, TOTAL_QUESTIONS));
        setGetStarted(false);
    }, []);

    const onNext = useCallback((answer: Answer) => {
        const newAnswers = [...answers];
        newAnswers.push(answer);
        setAnswers(newAnswers);
    }, [answers]);

    if (getStarted) {
        return (
            <GetStarted
                next={startQuiz}
                icon={circus}
                title={'RubeFest Circus'}
                description={'Find out which performer you would be!'}
                buttonText={'Get Started'}
            />
        );
    }

    if (questionIndex >= quizQuestions.length) {
        return <Finished answers={answers} reset={restartQuiz} navigation={navigation} />
    }

    return (
        <QuestionDisplay
            key={questionIndex}
            status={`Question ${answers.length + 1} of ${quizQuestions.length}`}
            question={currentQuestion}
            next={onNext}
            navigation={navigation}
        />
    );
});
