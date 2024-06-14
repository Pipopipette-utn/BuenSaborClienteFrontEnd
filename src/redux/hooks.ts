import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './Store'
// las importaciones tienen que ser desde el store
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
