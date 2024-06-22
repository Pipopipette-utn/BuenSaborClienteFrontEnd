import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '@mui/material/styles';
import { lightTheme } from '../../components/Themes/LightTheme';
import { darkTheme } from '../../components/Themes/DarkTheme';
import { loadState } from '../../utils/localStorage';

const savedTheme = loadState('theme') || { isDarkMode: false, currentTheme: lightTheme };

interface ThemeState {
  currentTheme: Theme;
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  currentTheme: savedTheme.isDarkMode ? darkTheme : lightTheme,
  isDarkMode: savedTheme.isDarkMode,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      toggleTheme: (state) => {
        const isDarkMode = !state.isDarkMode;
        const newTheme = isDarkMode ? darkTheme : lightTheme;
        // Uso de inner para que no explote por inmutabilidad
        const newState = {
          ...state,
          isDarkMode,
          currentTheme: newTheme,
        };

        localStorage.setItem('theme', JSON.stringify({ isDarkMode, currentTheme: newTheme }));

        return newState;
      },
     
    },
  });
  export const { toggleTheme } = themeSlice.actions;
  export default themeSlice.reducer;
  
