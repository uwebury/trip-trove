import styled from "styled-components";
import { defaultFont } from "@/styles.js";

export const TripForm = styled.form`
  margin: 2rem auto;
  display: grid;
  gap: 0.3rem;
  padding: 1rem 1.6rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Label = styled.label`
  margin-top: 0.4rem;
  font-weight: bold;
  font-size: 0.9rem;
  color: var(--color-form-label);
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-family: ${defaultFont.style.fontFamily};
  font-size: inherit;
  background-color: var(--color-form-input);
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 0.1rem;
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
  grid-template-columns: 8fr 2fr 1fr 1fr;
  gap: 6px;
  align-items: center;
  margin: 0;
  padding: 0;
  margin-top: 6px;
  width: 100%;
`;

export const InputItem = styled(Input)`
  width: 100%;
  margin: 0;
`;

export const InputQuantity = styled(Input)`
  width: 100%;
  margin: 0;
`;

export const StyledMiniButton = styled.div`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  justify-self: center;
  width: 1.8rem;
  height: 1.8rem;
  padding: 0.5rem;
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
  border-radius: 10px;
  font-family: ${defaultFont.style.fontFamily};
  font-size: ${({ fontSize }) => fontSize || "1rem"};
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;

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
