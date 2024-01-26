import { createGlobalStyle } from "styled-components";
import { Outfit } from "next/font/google";

export const defaultFont = Outfit({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export default createGlobalStyle`
:root {
      
  --color-primary-0: #fff;
  --color-primary-50: #e7f4ff;
  --color-primary-100: #d4eaff;
  --color-primary-200: #b1d7ff;
  --color-primary-300: #83baff;
  --color-primary-400: #528fff;
  --color-primary-500: #2b62ff;
  --color-primary-600: #0732ff;
  --color-primary-700: #002aff;
  --color-primary-800: #0226d1;
  --color-primary-900: #0b2488;
  --color-primary-950: #08175e;
  --color-primary-1000: #000;
  
  --color-secondary-0: #fff;
  --color-secondary-50: #fffbec;
  --color-secondary-100: #fff6d3;
  --color-secondary-200: #ffeaa5;
  --color-secondary-300: #ffd96d;
  --color-secondary-400: #ffbd32;
  --color-secondary-500: #ffa60a;
  --color-secondary-600: #ff8e00;
  --color-secondary-700: #cc6802;
  --color-secondary-800: #a1500b;
  --color-secondary-900: #82430c;
  --color-secondary-950: #462004;
  --color-secondary-1000: #000;

  --color-tertiary-0: #fff;
  --color-tertiary-50: #f4f6f7;
  --color-tertiary-100: #e4e8e9;
  --color-tertiary-200: #cbd3d6;
  --color-tertiary-300: #a7b3b9;
  --color-tertiary-400: #7c8c94;
  --color-tertiary-500: #617179;
  --color-tertiary-600: #525e66;
  --color-tertiary-700: #475057;
  --color-tertiary-800: #3f464b;
  --color-tertiary-900: #383d41;
  --color-tertiary-950: #22262a;
  --color-tertiary-1000: #000;
  
  --color-header: var(--color-tertiary-400);
  --color-header-title: var(--color-secondary-0);
  
  --color-logo-main: #000;
  --color-logo-jewel: var(--color-secondary-400);

  --color-navigation: var(--color-tertiary-400);
  --color-navigation-active: var(--color-tertiary-300);
  --color-navigation-hover: var(--color-tertiary-200);
  --color-navigation-item: var(--color-secondary-0);
  --color-navigation-border: var(--color-secondary-0);

  --color-back-button: var(--color-tertiary-300);
  --color-back-button-hover: var(--color-tertiary-50);

  --color-page-up-button: var(--color-tertiary-300);
  --color-page-up-button-hover: var(--color-tertiary-50);

  --color-button: var(--color-secondary-100);
  --color-button-text: var(--color-tertiary-1000);
  --color-button-border: var(--color-secondary-300);
  --color-button-hover: var(--color-secondary-200);

  --color-form-label: var(--color-tertiary-800);
  --color-form-input: var(--color-tertiary-50);

  }
  
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
 
  body {
    margin: 0 auto;
    padding: 0;
    min-height: 100vh;
    font-family: ${defaultFont.style.fontFamily};
}`;
