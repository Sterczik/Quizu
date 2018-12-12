import initialState from '../initialState';
import constants from '../constants';

export default (state = initialState, action) => {
  switch (action.type) {

    // Get categories
    case constants.GET_CATEGORIES_IN_PROGRESS:
      return {
        ...state,
        currentView: 'loader'
      };
    case constants.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.categories,
        currentView: 'gameStarter'
      };
    case constants.GET_CATEGORIES_FAILURE:
      return {
        ...state,
        currentView: 'gameStarter'
      };

    // Start game
    case constants.START_GAME_IN_PROCESS:
      return {
        ...state,
        currentView: 'loader'
      };
    case constants.START_GAME_SUCCESS:
      return {
        ...state,
        questions: action.questions,
        currentView: 'gameBoard'
      };
    case constants.START_GAME_FAILURE:
      return {
        ...state,
        quesions: [],
        currentView: 'gameStarter'
      };

    // Set current category
    case constants.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.category
      };

    // Game over checker
    case constants.IS_GAME_OVER:
      return {
        ...state,
        isGameOver: state.round === 9 ? true : false
      }

    // Style question buttons
    case constants.STYLE_BUTTONS:
      return {
        ...state,
        questions: state.questions.map((question, i) => {
          if (i === state.round) {
            return {
              ...question,
              choices: question.choices.map((choice) => {
                if (choice.answer) {
                  choice.classes = { correct: true }
                } else {
                  choice.classes = { incorrect: true }
                }
                return choice;
              })
            }
          }
          return question;
        })
      }

    // Increment round
    case constants.INCREMENT_ROUND:
      return {
        ...state,
        round: state.round + 1,
      }

    // Pause game
    case constants.PAUSE_GAME:
      return {
        ...state,
        isPaused: action.bool
      }

    // Score
    case constants.SCORE:
      return {
        ...state,
        scores: {
          player: {
            history: [
              ...state.scores.player.history,
              action.historyItem
            ],
            total: action.bool ? state.scores.player.total + 1 : state.scores.player.total
          }
        }
      }

    // New game
    case constants.NEW_GAME:
      return {
        ...state,
        currentCategory: {
          name: 'Random',
          id: 9,
        },
        currentView: 'gameStarter',
        questions: [],
        isGameOver: false,
        isPaused: false,
        round: 0,
        scores: {
          player: {
            history: [],
            total: 0,
          }
        }
      }

    default:
      return state;
  }
};
