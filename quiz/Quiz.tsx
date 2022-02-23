import React, { useState, useMemo, useCallback, FC, memo } from 'react';

import { QuestionDisplay } from "./Question";
import { QUESTIONS } from "./constants";
import { Answer } from "./model";
import { GetStarted } from "./GetStarted";
import { Finished } from "./Finished";

export const Quiz: FC = memo(() => {
    const [getStarted, setGetStarted] = useState<boolean>(true);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const questionIndex = useMemo(() => answers.length, [answers]);
    const currentQuestion = useMemo(() => QUESTIONS[questionIndex], [questionIndex]);

    const restartQuiz = useCallback(() => {
        setGetStarted(true);
        setAnswers([]);
    }, []);

    const startQuiz = useCallback(() => {
        setGetStarted(false);
    }, []);

    const onNext = useCallback((answer: Answer) => {
        const newAnswers = [...answers];
        newAnswers.push(answer);
        setAnswers(newAnswers);
    }, [answers]);

    if (questionIndex >= QUESTIONS.length) {
        return <Finished answers={answers} reset={restartQuiz} />
    }

    if (getStarted) {
        return <GetStarted next={startQuiz}/>
    }

    return (
        <QuestionDisplay
            key={questionIndex}
            status={`Question ${answers.length + 1} of ${QUESTIONS.length}`}
            question={currentQuestion}
            next={onNext}
        />
    );
});
