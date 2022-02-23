
export interface Answer {
    text: string,
    points: number,
}

export interface Question {
    text: string;
    answers: Answer[],
}