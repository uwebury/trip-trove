import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    margin-top: 0;
  }

  .dates {
    font-size: 0.9em;
    color: #666;
  }

  .image-container {
    margin-top: 8px;
  }
`;

export default Card;
