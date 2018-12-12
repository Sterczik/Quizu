import React from 'react';
import styled, {keyframes} from 'styled-components';
import { connect } from 'react-redux';

import {
  newGame
} from '../store/actions';

const DivModal = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, .5);
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  animation: ${FadeIn} .75s ease forwards;
`;

const Container = styled.div`
  background-color: whitesmoke;
  border-radius: 25px;
  color: #4FC3F7;
  margin-top: 4em;
  padding: 2em 2.5%;
  animation: ${SlideIn} .75s ease forwards;
`;

const SlideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-400px);
  }
  25% {
    transform: translateY(100px);
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translateY(0);
  }
`;

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Button = styled.button`
  background-color: #333;
  border: 2px solid #333;
  color: whitesmoke;
  width: 90%;
  margin-top: 2em;
`;

const H1 = styled.h1`
  color: #333;
`;

const H2 = styled.h2`
  color: #333;
`;
class GameOverModal extends React.Component {
  render() {
    return (
      <DivModal>
        <Container>
          <div>
            <H1>Game Over!</H1>
            <H2>Score: { this.props.scores.player.total }/10</H2>
            <Button onClick={() => this.props.newGame()}>New Game</Button>
          </div>
        </Container>
      </DivModal>
    );
  }
}

const mapStateToProps = (state) => ({
  scores: state.app.scores,
});

const mapDispatchToProps = (dispatch) => ({
  newGame: () => dispatch(newGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameOverModal);
