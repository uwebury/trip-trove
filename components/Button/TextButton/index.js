import styled from "styled-components";
import { defaultFont } from "@/styles.js";

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: ${({ $justifyContent }) => $justifyContent || "center"};
  gap: 1rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

export const StyledTextButton = styled.button`
  min-width: 140px;
  padding: 0.5rem;
  background-color: var(--color-button);
  border: 2px solid var(--color-button-border);
  border-radius: 20px;
  font-family: ${defaultFont.style.fontFamily};
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-button-text);
  transition: color 0.3s ease, transform 0.3s ease;

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
