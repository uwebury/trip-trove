import styled from "styled-components";
import Link from "next/link";

const getPositionStyles = (position) => {
  switch (position) {
    case "center":
      return `
        left: 50%;
        transform: translateX(-50%);
        justify-content: center;
        margin: 3rem 0;
      `;
    case "right":
      return `
        right: 0;
        justify-content: flex-end;
        margin: 3rem 3rem;
      `;
    default:
      return `
        left: 0;
        justify-content: flex-start;
        margin: 3rem 3rem;
      `;
  }
};

const NavigationLinkContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 0px;
  height: auto;
  z-index: 1;
  ${(props) => getPositionStyles(props.position)}
`;

const StyledNavigationLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  padding: 0.5rem;
  background-color: #d9d9d9;
  border: 2px solid #848484;
  border-radius: 50%;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  &:hover,
  &:active,
  &:visited {
    color: inherit;
  }
`;

export default function NavigationButton({ href, letter, position }) {
  return (
    <>
      <NavigationLinkContainer position={position}>
        <StyledNavigationLink href={href}>{letter}</StyledNavigationLink>
      </NavigationLinkContainer>
    </>
  );
}
