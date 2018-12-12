import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import {
  setCurrentCategory,
  startGame
} from '../store/actions';

const Section = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #333;
  border: 2px solid #333;
  color: whitesmoke;
`;

const DropdownLabel = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const H2 = styled.h2`
  color: whitesmoke;
  font-size: 26px;
  margin: 15px 0;
  font-weight: bold;
`;

const H3 = styled.h3`
  color: whitesmoke;
  margin: 0;
`;

const Ul = styled.ul`
  margin: 3px 0;
`;

const Li = styled.li`
  margin: 0.3em 0;
  font-size: 15px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const GameStarter = (props) => (
  <Section>
    <Button
      onClick={() => props.startGame(props.currentCategory)}
    >
      Start
    </Button>
    <div>
      <DropdownLabel>
        <H2>Choose Category</H2>
      </DropdownLabel>
      <H3>{ props.currentCategory.name }</H3>
      <Ul>
        <Li onClick={() => props.setCurrentCategory({ name: 'Random', id: 9 })}>Random</Li>
        { props.categories.map(category => (
          <Li key={category.id} onClick={() => props.setCurrentCategory(category)}>{ category.name }</Li>
        )) }
      </Ul>
    </div>
  </Section>
);

const mapStateToProps = (state) => ({
  categories: state.app.categories,
  currentCategory: state.app.currentCategory
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentCategory: (category) => dispatch(setCurrentCategory(category)),
  startGame: (currentCategory) => dispatch(startGame(currentCategory))
});

export default connect(mapStateToProps, mapDispatchToProps)(GameStarter);
