import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExchangeWidget from '../ExchangeWidget/ExchangeWidget';
import styled from 'styled-components';
import ErrorToast from '../../components/ErrorToast';

const AppContainer = styled.div`
  display: flex;  
  height: 100%;
  min-height: 100%;  
  margin: 0 auto;
  text-align: center;
`;

class App extends Component {
  render() {
    return (
      <AppContainer>
        <ErrorToast errorMessage={this.props.error} />
        <ExchangeWidget/>
      </AppContainer>
    );
  }
}

export default connect(({ network: { error } }) => ({ error }))(App);
