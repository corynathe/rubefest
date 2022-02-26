import React, { useState, useMemo, useCallback, FC, memo } from 'react';

import { QuestionDisplay } from "./Question";
import { QUESTIONS, TOTAL_QUESTIONS } from "./constants";
import { Answer, Question } from "./model";
import { GetStarted } from "./GetStarted";
import { Finished } from "./Finished";

export const Quiz: FC = memo(() => {
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
        return <GetStarted next={startQuiz}/>
    }

    if (questionIndex >= quizQuestions.length) {
        return <Finished answers={answers} reset={restartQuiz} />
    }

    return (
        <QuestionDisplay
            key={questionIndex}
            status={`Question ${answers.length + 1} of ${quizQuestions.length}`}
            question={currentQuestion}
            next={onNext}
        />
    );
});
