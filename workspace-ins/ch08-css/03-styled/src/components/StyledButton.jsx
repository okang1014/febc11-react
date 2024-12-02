import PropTypes from 'prop-types';
import styled from 'styled-components';

const BasicButtonStyle = styled.button`
  background-color: #4CAF50; /* Green background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 6px 18px; /* Padding */
  text-align: center; /* Center text */
  text-decoration: none; /* Remove underline */
  display: inline-block; /* Display as inline-block */
  font-size: 16px; /* Font size */
  margin: 4px 2px; /* Margin */
  cursor: pointer; /* Cursor pointer */
  border-radius: 6px; /* Border radius */
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};
export function Button({ children }) {
  return <BasicButtonStyle>{ children }</BasicButtonStyle>
}