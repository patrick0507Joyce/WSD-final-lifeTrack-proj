import { required, numberBetween, isNumber, isDate } from "../deps.js"

const validationRulesForMorning = {
    date: [required,isDate],
    sleepDuration: [required, isNumber, numberBetween(0, 12)],
    sleepQuality: [required, isNumber, numberBetween(1, 5)],
    sleepMood: [required, isNumber, numberBetween(1, 5)],
};

const validationRulesForEvening = {
    date: [required,isDate],
    exerciseDuration: [required, isNumber, numberBetween(0, 12)],
    studyDuration: [required, isNumber, numberBetween(0, 12)],
    eatingQuality: [required, isNumber, numberBetween(1, 5)],
    generalMood: [required, isNumber, numberBetween(1, 5)],
};

export { validationRulesForMorning, validationRulesForEvening }