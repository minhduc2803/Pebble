import api from "app/api/api";
import { FETCH_VIDEOS_ACTION } from "app/redux/actions/type";
import { alertError } from "app/utils/alert";

export const fetchVideos = () => async (dispatch, getState) => {
  try {
    const data = await api.get('http://localhost:3000/videos');
    dispatch({ type: FETCH_VIDEOS_ACTION, payload: data.data });
  } catch (errorWithoutType) {
    alertError('Failed to fetch videos');
  }
}
