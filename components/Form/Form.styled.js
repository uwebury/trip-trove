import styled from "styled-components";
import { defaultFont } from "@/styles.js";

export const TripForm = styled.form`
  display: grid;
  width: 300px;
  margin: 0.6rem auto;
  gap: 0.1rem;
  padding: 0.8rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (min-width: 600px) {
    margin: 2rem auto;
    width: 500px;
    gap: 0.3rem;
    padding: 1rem 1.6rem;
  }
`;

export const StyledLabel = styled.label`
  margin-top: 0.4rem;
  margin-bottom: 0.1rem;
  font-weight: bold;
  font-size: 0.8rem;
  color: var(--color-form-label);

  @media (min-width: 600px) {
    font-size: 0.9rem;
  }
`;

export const StyledInput = styled.input`
  font-family: ${defaultFont.style.fontFamily};
  font-size: inherit;
  background-color: var(--color-form-input);
  border: 1px solid #ddd;
  padding: 0.3rem;
  border-radius: 8px;
  margin-bottom: 0.1rem;

  @media (min-width: 600px) {
    padding: 0.5rem;
  }
`;

export const DateContainer = styled.fieldset`
  margin: 0;
  padding: 0;
  border-color: transparent;

  display: grid;
  grid-template-columns: 48% 48%;
  grid-template-rows: auto auto;
  gap: inherit;
  grid-auto-flow: column;
  justify-content: space-between;
`;

export const PackListContainer = styled.fieldset`
  margin-top: 0.4rem;
  padding: 0;
  border: none;
  max-width: auto;
`;

export const PackList = styled.ul`
  margin: auto;
  padding: 0;
`;

export const InputContainer = styled.li`
  display: grid;
  grid-template-columns: 8fr 2fr 1fr;
  gap: 6px;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-top: 6px;
  width: 100%;
`;

export const InputItem = styled(StyledInput)`
  width: 100%;
  margin: 0;
`;

export const InputQuantity = styled(StyledInput)`
  width: 100%;
  margin: 0;
`;

export const TemplateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledSelect = styled.select`
  font-family: ${defaultFont.style.fontFamily};
  font-size: inherit;
  background-color: var(--color-form-input);
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 0.3rem;

  @media (min-width: 600px) {
    padding: 0.5rem;
  }
`;

export const MiniButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.4rem;
  margin-bottom: 0.2rem;
`;

export const MiniButtonLabel = styled(StyledLabel)`
  justify-self: center;
  font-size: 0.7rem;
  color: var(--color-form-item-label);
  padding: 0;
  margin: 0;

  @media (min-width: 600px) {
    font-size: 0.8rem;
  }
`;

export const StyledMiniButton = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.2rem;
  background-color: ${(props) => {
    switch (props.action) {
      case "add":
        return "var(--color-mini-button-add)";
      case "delete":
        return "var(--color-mini-button-delete)";
      default:
        return "var(--color-mini-button)";
    }
  }};
  color: ${(props) => {
    switch (props.action) {
      case "add":
        return "var(--color-mini-button-add-text)";
      case "delete":
        return "var(--color-mini-button-delete-text)";
      default:
        return "var(--color-mini-button-text)";
    }
  }};
  border: 0px;
  border-radius: 8px;
  font-family: ${defaultFont.style.fontFamily};
  font-size: ${({ fontSize }) => fontSize || "1rem"};
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;

  @media (min-width: 600px) {
    width: 1.8rem;
    height: 1.8rem;
    padding: 0.5rem;
    border-radius: 10px;
  }

  &:active,
  :visited {
    color: inherit;
  }

  &:hover {
    background-color: ${(props) => {
      switch (props.action) {
        case "add":
          return "var(--color-mini-button-add-hover)";
        case "delete":
          return "var(--color-mini-button-delete-hover)";
        default:
          return "var(--color-mini-button-hover)";
      }
    }};
    cursor: pointer;
    transform: scale(1.03);
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  font-family: ${defaultFont.style.fontFamily};
  font-size: inherit;
  background-color: var(--color-form-input);
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.1rem;
`;
