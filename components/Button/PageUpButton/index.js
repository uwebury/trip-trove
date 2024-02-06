import styled from "styled-components";
import Link from "next/link";

const PageUpButtonContainer = styled.div`
  display: flex;
  position: fixed;
  bottom: 54px;
  right: 0;
  justify-content: flex-end;
  margin: 15px 10px;
  z-index: 2;
  transition: opacity 0.6s ease;

  @media (min-width: 600px) {
    bottom: 72px;
    margin: 10px 10px;


`;

const PageUpButtonLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: color 0.6s ease, background-color 0.6s ease, transform 0.6s ease;
  &:hover {
    background-color: var(--color-page-up-button-hover);
    transform: scale(1.1);
  }
`;

const PageUpButtonSvg = styled.svg`
  margin: auto;
  width: 48px;
  height: 48px;
  transition: fill 0.6s ease;
`;

const PageUpButtonPath = styled.path`
  fill: var(--color-page-up-button);
  }    
`;

export default function PageUpButton({ href }) {
  return (
    <PageUpButtonContainer>
      <PageUpButtonLink href={href}>
        <PageUpButtonSvg
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          clipRule="evenodd"
          viewBox="0 0 60 60"
        >
          <PageUpButtonPath
            fillRule="nonzero"
            d="m22.695 41.38 7.38-7.38 7.38 7.38 3.42-3.36-10.8-10.8-10.8 10.8 3.42 3.36Zm0-10.025 7.38-7.38 7.38 7.38 3.42-3.36-10.8-10.8-10.8 10.8 3.42 3.36ZM30 54.016c-3.32 0-6.44-.63-9.36-1.89-2.92-1.26-5.46-2.97-7.62-5.13-2.16-2.16-3.87-4.7-5.13-7.62-1.26-2.92-1.89-6.04-1.89-9.36 0-3.32.63-6.44 1.89-9.36 1.26-2.92 2.97-5.46 5.13-7.62 2.16-2.16 4.7-3.87 7.62-5.13 2.92-1.26 6.04-1.89 9.36-1.89 3.32 0 6.44.63 9.36 1.89 2.92 1.26 5.46 2.97 7.62 5.13 2.16 2.16 3.87 4.7 5.13 7.62 1.26 2.92 1.89 6.04 1.89 9.36 0 3.32-.63 6.44-1.89 9.36-1.26 2.92-2.97 5.46-5.13 7.62-2.16 2.16-4.7 3.87-7.62 5.13-2.92 1.26-6.04 1.89-9.36 1.89Zm0-4.8c5.36 0 9.9-1.86 13.62-5.58 3.72-3.72 5.58-8.26 5.58-13.62 0-5.36-1.86-9.9-5.58-13.62-3.72-3.72-8.26-5.58-13.62-5.58-5.36 0-9.9 1.86-13.62 5.58-3.72 3.72-5.58 8.26-5.58 13.62 0 5.36 1.86 9.9 5.58 13.62 3.72 3.72 8.26 5.58 13.62 5.58Z"
          />
        </PageUpButtonSvg>
      </PageUpButtonLink>
    </PageUpButtonContainer>
  );
}
