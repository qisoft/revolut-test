import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { IoIosRepeat } from 'react-icons/io';
import {COLORS} from '../constants';

const Button = styled.button`
  border: 1px solid ${COLORS.backgroundDark};
  background: ${COLORS.backgroundLight};
  height: 40px;
  width: 40px;
  border-radius: 20px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

export default class SwapButton extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { onClick } = this.props;
    return (
      <Button onClick={onClick}>
        <IoIosRepeat/>
      </Button>
    );
  }
}