import {
  SET_LOADING_STATUS
} from 'src/consts'

export default {
  [SET_LOADING_STATUS] (state, { isLoading }) {
    state.isLoading = isLoading
  }
}
