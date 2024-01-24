import styled from "styled-components";

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
  background-color: var(--color-text-button);
  border: 2px solid var(--color-text-button-border);
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
    background-color: var(--color-text-button-hover);
  }
`;
