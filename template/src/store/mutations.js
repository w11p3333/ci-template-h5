import {
  SET_LOADING_STATUS,
  SET_DIRECTION
} from 'src/consts'

export default {
  [SET_LOADING_STATUS] (state, isLoading) {
    state.isLoading = isLoading
  },
  [SET_DIRECTION] (state, direction) {
    state.direction = direction
  }
}
