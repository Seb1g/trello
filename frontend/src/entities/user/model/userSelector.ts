import {useAppDispatch, useAppSelector} from "../../../app/store.ts";

export const UserSelector = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth);
  return {dispatch, user}
}