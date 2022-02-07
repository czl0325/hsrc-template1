const state = {
  cachedViews: []
}

const mutations = {
  ADD_CACHED_VIEW (state: { cachedViews: string[] }, name: string) {
    if (state.cachedViews.includes(name)) {
      return
    }
    if (name === 'Login') {
      return
    }
    state.cachedViews.push(name)
  },
  DEL_CACHED_VIEW (state: {cachedViews: string[]}, name: string) {
    const index = state.cachedViews.indexOf(name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  DEL_CACHED_VIEWS (state: {cachedViews: string[]}, names: string[]) {
    state.cachedViews.filter((cache) => {
      return names.indexOf(cache) === -1
    })
  },
  DEL_ALL_CACHED_VIEW (state: {cachedViews: string[]}) {
    state.cachedViews = []
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
