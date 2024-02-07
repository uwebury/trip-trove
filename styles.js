import { createGlobalStyle } from "styled-components";
import { Outfit } from "next/font/google";

export const defaultFont = Outfit({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

export default createGlobalStyle`
:root {
      
  --color-blue-0: #fff;
  --color-blue-50: #f0f7ff;
  --color-blue-100: #e0effe;
  --color-blue-200: #eadffd;
  --color-blue-300: #7dc5fc;
  --color-blue-400: #3aa9f8;
  --color-blue-500: #0e8de9;
  --color-blue-600: #026fc7;
  --color-blue-700: #0358a1;
  --color-blue-800: #074b85;
  --color-blue-900: #0c3f6e;
  --color-blue-950: #082849;
  --color-blue-1000: #000;
  
  --color-orange-0: #fff;
  --color-orange-50: #fffbec;
  --color-orange-100: #fff6d3;
  --color-orange-200: #ffeaa5;
  --color-orange-300: #ffd96d;
  --color-orange-400: #ffbd32;
  --color-orange-500: #ffa60a;
  --color-orange-600: #ff8e00;
  --color-orange-700: #cc6802;
  --color-orange-800: #a1500b;
  --color-orange-900: #82430c;
  --color-orange-950: #462004;
  --color-orange-1000: #000;

  --color-red-0: #fff;
  --color-red-50: #fff0f0;
  --color-red-100: #ffdede;
  --color-red-200: #ffc2c2;
  --color-red-300: #ff9797;
  --color-red-400: #ff5b5b;
  --color-red-500: #ff2929;
  --color-red-600: #f90909;
  --color-red-700: #d30303;
  --color-red-800: #ad0707;
  --color-red-900: #8f0d0d;
  --color-red-950: #4e0101;
  --color-red-1000: #000;

  --color-green-0: #fff;
  --color-green-50: #e9ffe5;
  --color-green-100: #cdffc6;
  --color-green-200: #9dff93;
  --color-green-300: #5fff55;
  --color-green-400: #2af823;
  --color-green-500: #07d303;
  --color-green-600: #00b301;
  --color-green-700: #048706;
  --color-green-800: #0a6a0c;
  --color-green-900: #0d5a10;
  --color-green-950: #013205;
  --color-green-1000: #000;

  --color-grey-0: #fff;
  --color-grey-50: #f4f6f7;
  --color-grey-100: #e4e8e9;
  --color-grey-200: #cbd3d6;
  --color-grey-300: #a7b3b9;
  --color-grey-400: #7c8c94;
  --color-grey-500: #617179;
  --color-grey-600: #525e66;
  --color-grey-700: #475057;
  --color-grey-800: #3f464b;
  --color-grey-900: #383d41;
  --color-grey-950: #22262a;
  --color-grey-1000: #000;
  

  --color-header: var(--color-blue-600);
  --color-header-lightened: var(--color-blue-300);
  --color-header-title: var(--color-orange-0);
  
  --color-logo-main: var(--color-blue-800);
  --color-logo-jewel: var(--color-orange-400);

  --color-navigation: var(--color-blue-400);
  --color-navigation-active: var(--color-blue-600);
  --color-navigation-hover: var(--color-blue-700);
  --color-navigation-item: var(--color-blue-0);
  --color-navigation-border: var(--color-blue-0);

  --color-back-button: var(--color-blue-300);
  --color-back-button-hover: var(--color-blue-50);

  --color-page-up-button: var(--color-blue-300);
  --color-page-up-button-hover: var(--color-blue-50);
  
  --color-mini-button: var(--color-orange-200);
  --color-mini-button-hover: var(--color-orange-300);
  --color-mini-button-text: var(--color-grey-1000);
  
  --color-mini-button-delete: var(--color-red-700);
  --color-mini-button-delete-hover: var(--color-red-800);
  --color-mini-button-delete-text: var(--color-red-0);
  
  --color-mini-button-add: var(--color-green-600);
  --color-mini-button-add-hover: var(--color-green-700);
  --color-mini-button-add-text: var(--color-green-0);

  --color-button: var(--color-orange-100);
  --color-button-text: var(--color-grey-1000);
  --color-button-border: var(--color-orange-300);
  --color-button-hover: var(--color-orange-200);

  --color-form-label: var(--color-grey-800);
  --color-form-input: var(--color-grey-50);
  --color-form-item-label: var(--color-grey-200);

  --color-sort-selector: var(--color-orange-100);
  --color-sort-selector-text: var(--color-grey-1000);
  --color-sort-selector-border: var(--color-orange-300);
  --color-sort-selector-focus: var(--color-orange-500);

  --color-card: var(--color-orange-0);
  --color-card-border: var(--color-grey-200);
  --color-card-title: var(--color-grey-900);
  --color-card-date-label: var(--color-grey-300);
  --color-card-date: var(--color-orange-1000);
  --color-card-call-to-action: var(--color-orange-600);

  --font-size: 14px;
  }
  

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

 
@media (min-width: 600px) {
  :root {
    --font-size: 1rem;
  }
}

@media (min-width: 900px) {
  :root {
    --font-size: 1.1rem;
  }
}



  body {
    margin: 0 auto;
    padding: 0;
    min-height: 100vh;
    font-family: ${defaultFont.style.fontFamily};
    font-size: var(--font-size);
}

`;
