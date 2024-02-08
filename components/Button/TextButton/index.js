import styled from "styled-components";
import { defaultFont } from "@/styles.js";

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${({ $justifyContent }) => $justifyContent || "center"};
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 0.6rem;

  @media (min-width: 600px) {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const StyledTextButton = styled.button`
  font-family: ${defaultFont.style.fontFamily};
  background-color: var(--color-button);
  border: 2px solid var(--color-button-border);
  min-width: 100px;
  padding: 0.3rem;
  border-radius: 18px;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--color-button-text);
  transition: color 0.3s ease, transform 0.3s ease;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  @media (min-width: 600px) {
    min-width: 140px;
    padding: 0.5rem;
    border-radius: 20px;
    font-size: 1rem;
  }

  &:hover {
    color: inherit;
    cursor: pointer;
    transform: scale(1.03);
    background-color: var(--color-button-hover);
  }

  &:active,
  :visited {
    color: inherit;
  }
`;

export const StyledTextButtonMediumSize = styled(StyledTextButton)`
  min-width: 60px;

  font-size: 0.8rem;

  @media (min-width: 600px) {
    min-width: 80px;
    padding: 0.5rem;
    font-size: 0.9rem;
  }
`;
