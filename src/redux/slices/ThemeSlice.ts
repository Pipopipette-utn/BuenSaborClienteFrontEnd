import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '@mui/material/styles';
import { lightTheme } from '../../components/Themes/LightTheme';
import { darkTheme } from '../../components/Themes/DarkTheme';

interface ThemeState {
  currentTheme: Theme;
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  currentTheme: lightTheme,
  isDarkMode: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      toggleTheme: (state) => {
        const isDarkMode = !state.isDarkMode;
        return {
          ...state,
          isDarkMode,
          currentTheme: isDarkMode ? darkTheme : lightTheme,
        };
      },
    },
  });
  
  export const { toggleTheme } = themeSlice.actions;
  export default themeSlice.reducer;
  
