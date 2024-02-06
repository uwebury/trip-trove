import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Navigation from "@/components/Layout/Navigation";
import PageUpButton from "@/components/Button/PageUpButton";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  gap: 0.2rem;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  margin: 90px auto;
  padding: 0px 15px;
`;

export default function Layout({ children }) {
  const [showPageUpButton, setShowPageUpButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setShowPageUpButton(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <LayoutContainer>
        <Header />
        <Main>{children}</Main>
        <Navigation />
        {/* Render PageUpButton only if showPageUpButton is true */}
        {showPageUpButton && <PageUpButton href="#top" />}
      </LayoutContainer>
    </>
  );
}
