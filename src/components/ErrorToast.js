import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components/macro';

const slideIn = keyframes`
    100% { transform: translateY(0%); }
`;

const Toast = styled.div`
  background: #F2E5E5;
  color: #ff0000;
  padding: 10px;
  width: 100%;
  position: absolute;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-100%);
  animation: ${slideIn} 0.5s forwards;
`;

export default class ErrorToast extends React.Component {
  static propTypes = {
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    errorMessage: null,
  };

  render() {
    const { errorMessage } = this.props;
    return (errorMessage && (
      <Toast>
        Error: { errorMessage }
      </Toast>
    )) || null;
  }
}