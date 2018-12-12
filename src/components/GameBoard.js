import React from 'react';
import { connect } from 'react-redux';

import Questions from './Questions';
import ScoreDots from './ScoreDots';
import Score from './Score';

const GameBoard = (props) => (
  <React.Fragment>
    { !props.isGameOver ? (
      <Score />
    ) : null }
    <Questions />
    <ScoreDots />
  </React.Fragment>
)

const mapStateToProps = (state) => ({
  isGameOver: state.app.isGameOver
});

export default connect(mapStateToProps)(GameBoard);
