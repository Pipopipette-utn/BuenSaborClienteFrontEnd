import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriaState {
  selectedCategoriaId: number | null;
}

const initialState: CategoriaState = {
  selectedCategoriaId: null,
};

const categoriaSlice = createSlice({
  name: 'categoria',
  initialState,
  reducers: {
    selectCategoria(state, action: PayloadAction<number>) {
      state.selectedCategoriaId = action.payload;
    },
    clearSelectedCategoria(state) {
      state.selectedCategoriaId = null;
    },
  },
});

export const { selectCategoria, clearSelectedCategoria } = categoriaSlice.actions;

export default categoriaSlice.reducer;
