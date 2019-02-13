import styled from 'styled-components/macro';

export const DropdownCurrency = styled.div`
  height: 75px;
  min-height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #eeeeee;
  box-sizing: border-box;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`;