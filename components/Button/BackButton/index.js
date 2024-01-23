import styled from "styled-components";
import Link from "next/link";

const BackButtonContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  margin: 10px auto;
  z-index: 2;
`;

const BackButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border-radius: 50%;
  transition:
    color 0.6s ease,
    transform 0.6s ease;
  &:hover {
    background-color: var(--color-back-button-hover);
    transform: scale(1.1);
  }
`;

const BackButtonSvg = styled.svg`
  margin: auto;
  width: 56px;
  height: 56px;
`;

const BackButtonPath = styled.path`
  fill: var(--color-back-button);
  }    
`;

export default function BackButton({ href }) {
  return (
    <BackButtonContainer>
      <BackButtonLink href={href}>
        <BackButtonSvg
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          clipRule="evenodd"
          viewBox="0 0 60 60"
        >
          <BackButtonPath
            fillRule="nonzero"
            d="M20.412 32.416h24v-4.8h-24v4.8Zm9.336 4.98-7.38-7.38 7.38-7.38-3.36-3.42-10.8 10.8 10.8 10.8 3.36-3.42ZM30 54.016c-3.32 0-6.44-.63-9.36-1.89-2.92-1.26-5.46-2.97-7.62-5.13-2.16-2.16-3.87-4.7-5.13-7.62-1.26-2.92-1.89-6.04-1.89-9.36 0-3.32.63-6.44 1.89-9.36 1.26-2.92 2.97-5.46 5.13-7.62 2.16-2.16 4.7-3.87 7.62-5.13 2.92-1.26 6.04-1.89 9.36-1.89 3.32 0 6.44.63 9.36 1.89 2.92 1.26 5.46 2.97 7.62 5.13 2.16 2.16 3.87 4.7 5.13 7.62 1.26 2.92 1.89 6.04 1.89 9.36 0 3.32-.63 6.44-1.89 9.36-1.26 2.92-2.97 5.46-5.13 7.62-2.16 2.16-4.7 3.87-7.62 5.13-2.92 1.26-6.04 1.89-9.36 1.89Zm0-4.8c5.36 0 9.9-1.86 13.62-5.58 3.72-3.72 5.58-8.26 5.58-13.62 0-5.36-1.86-9.9-5.58-13.62-3.72-3.72-8.26-5.58-13.62-5.58-5.36 0-9.9 1.86-13.62 5.58-3.72 3.72-5.58 8.26-5.58 13.62 0 5.36 1.86 9.9 5.58 13.62 3.72 3.72 8.26 5.58 13.62 5.58Z"
          />
        </BackButtonSvg>
      </BackButtonLink>
    </BackButtonContainer>
  );
}
