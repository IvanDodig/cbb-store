import { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
   const [isDark, setIsDark] = useState(true);

   const darkTheme = {
      bgPrimary: "black",
      bgSecondary: "#343a40",
      bgTernary: "#d3d3d3",
      fontPrimary: "white",
      fontSecondary: "white",
      fontTernary: "#343a40",
   };

   const lightTheme = {
      bgPrimary: "#343a40",
      bgSecondary: "#f8f9fa",
      bgTernary: "white",
      fontPrimary: "white",
      fontSecondary: "#343a40",
      fontTernary: "#343a40",
   };

   const changeTheme = () => {
      setIsDark(!isDark);
   };
   return (
      <ThemeContext.Provider
         value={{ isDark, changeTheme, darkTheme, lightTheme }}
      >
         {props.children}
      </ThemeContext.Provider>
   );
};

export default ThemeContextProvider;
