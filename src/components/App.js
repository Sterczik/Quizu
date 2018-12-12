import '../assets/css/App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Normalize } from 'styled-normalize';

import GameStarter from './GameStarter';
import Loader from './Loader';
import GameBoard from './GameBoard';
import GameOverModal from './GameOverModal';
import {
  getCategories
} from '../store/actions';

const components = {
  'gameStarter': GameStarter,
  'loader': Loader,
  'gameBoard': GameBoard,
  'gameOverModal': GameOverModal
}

const FadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Body = styled.div`
  background-color: #55c167;
  background-image: linear-gradient(to top, #55c167 0%, #3ab74f 100%);
  background-repeat: no-repeat;
  color: whitesmoke;
  display: flex;
  font-family: 'Quicksand', sans-serif;
  height: 100vh;
  justify-content: center;
  text-align: center;
`;

const Header = styled.header`
  color: whitesmoke;
  padding: 25px 0;
`;

const Container = styled.div`
  width: 100%;
`;

const Main = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  animation: ${FadeIn} 1.5s ease;
`;

const H1 = styled.h1`
  margin: 0;
`;

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    const ActualComponent = components[this.props.currentView];
    return (
      <Body>
        <Normalize />
        <Container>
          { this.props.isGameOver ? (
            <GameOverModal />
          ) : null }
          <Main>
            <Header>
              <H1>Quizu</H1>
            </Header>
            <ActualComponent />
          </Main>
        </Container>
      </Body>
    );
  }
}

const mapStateToProps = (state) => ({
  currentView: state.app.currentView,
  isGameOver: state.app.isGameOver
});

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
