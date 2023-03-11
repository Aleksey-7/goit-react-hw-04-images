import styled from '@emotion/styled';

export const LoadMore = styled.button`
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #313131;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 2px 2px 6px 2px rgba(254, 60, 1, 0.9);
  &:hover {
    background-color: rgba(254, 60, 1, 0.9);
    box-shadow: 2px 2px 6px 2px rgba(253, 253, 253, 0.9);
  }
`;
