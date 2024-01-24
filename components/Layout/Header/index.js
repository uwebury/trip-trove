import styled from "styled-components";
import { useRouter } from "next/router";
import Logo from "@/components/Layout/Logo";

const HeaderContainer = styled.header`
  background-color: var(--color-header);
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 0px 20px;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 90px;
  z-index: 10;
`;

const HeaderTitle = styled.h1`
  color: var(--color-header-title);
`;

export default function Header() {
  const router = useRouter();

  let pageTitle = "TripTrove";

  if (router.pathname === "/") {
    pageTitle = "Trip Overview";
  } else if (router.pathname === "/create") {
    pageTitle = "Add Trip";
  } else if (router.pathname.includes("/edit")) {
    pageTitle = "Edit Trip";
  } else if (router.pathname.includes("/trips/")) {
    pageTitle = "Trip Details";
  }

  return (
    <>
      <HeaderContainer>
        <HeaderTitle>{pageTitle}</HeaderTitle>
        <Logo />
      </HeaderContainer>
    </>
  );
}
