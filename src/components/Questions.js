import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  pauseGame,
  incrementRound,
  styleButtons,
  isGameOver,
  score
} from '../store/actions';
import { translation } from '../helpers/translationMixin';

const Div = styled.div`
  background-color: whitesmoke;
  border-radius: 25px;
  margin-bottom: 2em;
  padding: 1em 1em 2.5em;
  min-width: 320px;
`;

const Li = styled.li`
  margin: 5px 0;
`;

const H3 = styled.h3`
  color: #333;
  font-size: 23px;
  margin: 10px 0;
`;

class Questions extends React.Component {
  constructor(props) {
    super(props);

    this.advance = this.advance.bind(this);
    this.answer = this.answer.bind(this);
  }

  advance() {
    if (this.props.round <= 8) {
      this.props.pauseGame(false);
      this.props.incrementRound();
    }
  }

  answer(choice) {
    this.props.pauseGame(true);
    this.props.styleButtons();

    if (choice.answer) {
      this.props.score(true);
    } else {
      this.props.score(false);
    }
    this.props.isGameOver();
  }

  render() {
    const choices = this.props.questions[this.props.round].choices;
    return (
      <Div>
        <H3>{ this.props.questions[this.props.round].category }</H3>
        <h2>{ translation.methods.decode(this.props.questions[this.props.round].question) }</h2>
        <ul>
          { choices.map((choice, i) => (
            <Li key={i}>
              <button
                onClick={() => this.answer(choice)}
                disabled={this.props.isPaused}
                className={`${choice.classes.correct ? 'correct' : undefined} ${choice.classes.incorrect ? 'incorrect': undefined}`}
              >
                { translation.methods.decode(choice.text) }
              </button>
            </Li>
          )) }
        </ul>
        { this.props.isPaused ? (
          <button onClick={this.advance}>Next</button>
        ) : null }
      </Div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.app.questions,
  isPaused: state.app.isPaused,
  round: state.app.round
});

const mapDispatchToProps = (dispatch) => ({
  pauseGame: (bool) => dispatch(pauseGame(bool)),
  incrementRound: () => dispatch(incrementRound()),
  styleButtons: () => dispatch(styleButtons()),
  isGameOver: () => dispatch(isGameOver()),
  score: (isCorrect) => dispatch(score(isCorrect))
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
