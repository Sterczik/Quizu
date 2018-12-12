import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const DropletContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2em;
`;

const DropletOuter = styled.div`
  display: flex;
  justify-content: center;
`;

const ScoreDots = (props) => {

  const renderDots = () => {
    const dots = [];
    for(let i = 0; i < 10; i++) {
      dots.push(
        <i key={i}
          className={`droplet ${props.scores.player.history[i] && props.scores.player.history[i].correct ? 'correctDot': ''} ${props.scores.player.history[i] && props.scores.player.history[i].incorrect ? 'incorrectDot' : ''}`}
        ></i>
      )
    }
    return dots;
  }

  return (
    <DropletOuter>
      <DropletContainer>
        { renderDots() }
      </DropletContainer>
    </DropletOuter>
  );
}

const mapStateToProps = (state) => ({
  round: state.app.round,
  scores: state.app.scores,
  quantity: 10,
});

export default connect(mapStateToProps)(ScoreDots);
