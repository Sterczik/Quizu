import axios from 'axios';
import constants from '../constants';

export function getCategories() {
  const getCategoriesInProcess = () => ({
    type: constants.GET_CATEGORIES_IN_PROGRESS
  });

  const getCategoriesSuccess = (categories) => ({
    type: constants.GET_CATEGORIES_SUCCESS,
    categories
  });

  const getCategoriesFailure = (error) => ({
    type: constants.GET_CATEGORIES_FAILURE,
    error
  });

  return (dispatch) => {
    dispatch(getCategoriesInProcess());

    return axios.get('https://opentdb.com/api_category.php')
      .then((res) => {
        const categories = res.data.trivia_categories;
        dispatch(getCategoriesSuccess(categories));
      })
      .catch((error) => {
        dispatch(getCategoriesFailure(error));
      });
  }
}

export function startGame(currentCategory) {
  const startGameInProcess = () => ({
    type: constants.START_GAME_IN_PROCESS
  });

  const startGameSuccess = (questions) => ({
    type: constants.START_GAME_SUCCESS,
    questions
  });

  const startGameFailure = (error) => ({
    type: constants.START_GAME_FAILURE,
    error
  });

  return (dispatch) => {
    dispatch(startGameInProcess());

    let api;
    if (currentCategory.name === 'Random') {
      api = 'https://opentdb.com/api.php?amount=10';
    } else {
      api = 'https://opentdb.com/api.php?amount=10&category=' + currentCategory.id;
    }

    return axios.get(api)
      .then((res) => {
        const rawQuestions = res.data.results;

        const questions = rawQuestions.map(el => {
          el.choices = el.incorrect_answers.reduce((acc, item) => {
            acc.push({
              text: item,
              answer: false,
              classes: {
                incorrect: false
              }
            });
            return acc;
          }, []);
          el.choices.push({
            text: el.correct_answer,
            answer: true,
            classes: {
              correct: false,
            }
          });
          let i = el.choices.length, temp, rand;
          while (0 !== i) {
            rand = Math.floor(Math.random() * i);
            i -= 1;
            temp = el.choices[i];
            el.choices[i] = el.choices[rand];
            el.choices[rand] = temp;
          }
          return el;
        });
        dispatch(startGameSuccess(questions));
      })
      .catch((error) => {
        dispatch(startGameFailure(error));
      });
  }
}

export function setCurrentCategory(category) {
  return {
    type: constants.SET_CURRENT_CATEGORY,
    category
  }
}

export function isGameOver() {
  return {
    type: constants.IS_GAME_OVER
  }
}

export function styleButtons() {
  return {
    type: constants.STYLE_BUTTONS
  }
}

export function incrementRound() {
  return {
    type: constants.INCREMENT_ROUND
  }
}

export function pauseGame(bool) {
  return {
    type: constants.PAUSE_GAME,
    bool
  }
}

export function score(bool) {
  return {
    type: constants.SCORE,
    bool,
    historyItem: bool ? {
      correct: true,
      incorrect: false
    } : {
      correct: false,
      incorrect: true
    }
  }
}

export function newGame() {
  return {
    type: constants.NEW_GAME
  }
}
