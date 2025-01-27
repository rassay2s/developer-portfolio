class Question{
    _question;

    constructor(question){
        this._question = question;
    }

    getQuestion(){
        return this._question;
    }
}

class Answer{
    _answer;

    constructor(answer){
        this._answer = answer;
    }

    getAnswer(){
        return this._answer;
    }
}


class FAQCreator{

    _questions = [];
    _answers = [];

    add(question, answer){
        this._questions.push(question);
        this._answers.push(answer);
    }

    getQuestions(){
        return this._questions;
    }

    getAnswers(){
        return this._answers;
    }

    returnFAQs()
    {
        const FAQs = [];
        if(this.getQuestions().length === this.getAnswers().length){
            for (let i = 0; i < this.getQuestions().length; i++) {
                FAQs.push(
                    Object.assign(
                        {},
                        {question: this.getQuestions()[i].getQuestion()},
                        {answer: this.getAnswers()[i].getAnswer()}
                    )
                );
            }
        }
        return FAQs;
    }
}