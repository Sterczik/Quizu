import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Div = styled.div`
  padding: 0.25em 0;
`;

const H2 = styled.h2`
  color: whitesmoke;
  font-weight: bold;
`;

const Score = (props) => (
  <Div>
    <H2>Score: {props.scores.player.total}/10</H2>
  </Div>
);

const mapStateToProps = (state) => ({
  scores: state.app.scores,
});

export default connect(mapStateToProps)(Score);
