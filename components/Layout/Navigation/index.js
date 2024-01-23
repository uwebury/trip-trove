import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const NaviContainer = styled.nav`
  background-color: var(--color-navigation);
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 90;
  z-index: 1;
`;

const NaviList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NaviItem = styled.li`
  padding: 15px;
  width: 100%;
  align-items: center;
  text-align: center;
  border-left: 2px solid var(--color-navigation-border);
  &:first-child {
    border-left: 0px;
  }
  &:hover {
    background-color: var(--color-navigation-hover);
  }

  ${({ $active }) =>
    $active && "background-color: var(--color-navigation-active);"}
`;

const StyledSvg = styled.svg`
  display: block;
  margin: auto;
  width: 48px;
  height: 48px;
`;

const StyledPath = styled.path`
  fill: var(--color-navigation-item);
  }    
`;

export default function Navigation() {
  const router = useRouter();
  return (
    <NaviContainer>
      <NaviList>
        <NaviItem $active={router.pathname === "/"}>
          <Link href="/">
            <StyledSvg
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              clipRule="evenodd"
              viewBox="0 0 60 60"
            >
              <StyledPath
                fillRule="nonzero"
                d="M19.647 36.486V31.31h20.706v5.176H19.647Zm0 7.765v-5.176h20.706v5.176H19.647Zm0 7.765v-5.177h20.706v5.177H19.647ZM30 8.016 55.882 31.31h-7.764v20.706h-5.177V28.722H17.059v23.294h-5.177V31.31H4.118L30 8.016Zm0 6.988-9.576 8.541h19.152L30 15.004Zm-9.576 8.541h19.152-19.152Z"
              />
            </StyledSvg>
          </Link>
        </NaviItem>

        <NaviItem $active={router.pathname === "/create"}>
          <Link href="/create">
            <StyledSvg
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              clipRule="evenodd"
              viewBox="0 0 60 60"
            >
              <StyledPath
                fillRule="nonzero"
                d="M27.6 42.016h4.8v-9.6H42v-4.8h-9.6v-9.6h-4.8v9.6H18v4.8h9.6v9.6Zm2.4 12c-3.32 0-6.44-.63-9.36-1.89-2.92-1.26-5.46-2.97-7.62-5.13-2.16-2.16-3.87-4.7-5.13-7.62-1.26-2.92-1.89-6.04-1.89-9.36 0-3.32.63-6.44 1.89-9.36 1.26-2.92 2.97-5.46 5.13-7.62 2.16-2.16 4.7-3.87 7.62-5.13 2.92-1.26 6.04-1.89 9.36-1.89 3.32 0 6.44.63 9.36 1.89 2.92 1.26 5.46 2.97 7.62 5.13 2.16 2.16 3.87 4.7 5.13 7.62 1.26 2.92 1.89 6.04 1.89 9.36 0 3.32-.63 6.44-1.89 9.36-1.26 2.92-2.97 5.46-5.13 7.62-2.16 2.16-4.7 3.87-7.62 5.13-2.92 1.26-6.04 1.89-9.36 1.89Zm0-4.8c5.36 0 9.9-1.86 13.62-5.58 3.72-3.72 5.58-8.26 5.58-13.62 0-5.36-1.86-9.9-5.58-13.62-3.72-3.72-8.26-5.58-13.62-5.58-5.36 0-9.9 1.86-13.62 5.58-3.72 3.72-5.58 8.26-5.58 13.62 0 5.36 1.86 9.9 5.58 13.62 3.72 3.72 8.26 5.58 13.62 5.58Z"
              />
            </StyledSvg>
          </Link>
        </NaviItem>
      </NaviList>
    </NaviContainer>
  );
}
