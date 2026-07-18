export class Question {
    constructor(question) {
        this.question = question;
    }

    getQuestion() {
        return this.question;
    }
}

export class Answer {
    constructor(answer) {
        this.answer = answer;
    }

    getAnswer() {
        return this.answer;
    }
}

export class FAQCreator {
    constructor() {
        this.questions = [];
        this.answers = [];
    }

    add(question, answer) {
        this.questions.push(question);
        this.answers.push(answer);
    }

    getQuestions() {
        return this.questions;
    }

    getAnswers() {
        return this.answers;
    }

    returnFAQs() {
        if (this.questions.length !== this.answers.length) {
            return [];
        }

        return this.questions.map((question, index) => ({
            question: question.getQuestion(),
            answer: this.answers[index].getAnswer(),
        }));
    }
}
