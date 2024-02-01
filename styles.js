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
  --color-blue-50: #e7f4ff;
  --color-blue-100: #d4eaff;
  --color-blue-200: #b1d7ff;
  --color-blue-300: #83baff;
  --color-blue-400: #528fff;
  --color-blue-500: #2b62ff;
  --color-blue-600: #0732ff;
  --color-blue-700: #002aff;
  --color-blue-800: #0226d1;
  --color-blue-900: #0b2488;
  --color-blue-950: #08175e;
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
  
  --color-header: var(--color-grey-400);
  --color-header-title: var(--color-grey-0);
  
  --color-logo-main: var(--color-grey-1000);
  --color-logo-jewel: var(--color-orange-400);

  --color-navigation: var(--color-grey-400);
  --color-navigation-active: var(--color-grey-300);
  --color-navigation-hover: var(--color-grey-200);
  --color-navigation-item: var(--color-grey-0);
  --color-navigation-border: var(--color-grey-0);

  --color-back-button: var(--color-grey-300);
  --color-back-button-hover: var(--color-grey-50);

  --color-page-up-button: var(--color-grey-300);
  --color-page-up-button-hover: var(--color-grey-50);
  
  --color-delete-button: var(--color-red-700);
  --color-delete-button-hover: var(--color-red-800);
  --color-delete-button-text: var(--color-red-0);
  
  --color-add-button: var(--color-green-600);
  --color-add-button-hover: var(--color-green-700);
  --color-add-button-text: var(--color-green-0);

  --color-button: var(--color-orange-100);
  --color-button-text: var(--color-grey-1000);
  --color-button-border: var(--color-orange-300);
  --color-button-hover: var(--color-orange-200);

  --color-form-label: var(--color-grey-800);
  --color-form-input: var(--color-grey-50);

  --color-image-upload: var(--color-orange-50);
  --color-image-upload-border: var(--color-orange-300);
  --color-image-upload-dash-line: var(--color-grey-200);
  --color-image-upload-icon: var(--color-grey-300);
  --color-image-upload-headline: var(--color-grey-1000);
  --color-image-upload-text: var(--color-grey-300);
  --color-image-upload-hover: var(--color-orange-100);


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
}
`;
