import { createSelector } from 'reselect'
import { Map } from 'immutable';

// Pages
const getCurrentPageKey = (state, props) => {
  return state.getIn(['page', 'currentKey'])
}

const getStateHistory = (state, props) => {
  return state.getIn(['page', 'stateHistory'])
}

const getScrollHistory = (state, props) => {
  return state.getIn(['page', 'scrollHistory'])
}

export const getCurrentPageState = createSelector(
  [getCurrentPageKey, getStateHistory],
  (pageKey, stateHistory) => {
    const pageState = stateHistory.get(pageKey)
    return pageState === undefined ? Map() : pageState
  }
)

export const getCurrentScrollStates = createSelector(
  [getCurrentPageKey, getScrollHistory],
  (pageKey, scrollHistory) => {
    const scrollStates = scrollHistory.get(pageKey)
    return scrollStates === undefined ? Map() : scrollStates
  }
)

export const getYear = (state, props) => {
  if (props.year) {
    return props.year
  }
  const year = parseInt(props.match.params.year, 10)
  return year ? year : 2018
}

// Modals
const getCurrentModalKey = (state, props) => {
  return state.getIn(['page', 'currentModalKey'])
}

const getStateHistoryModal = (state, props) => {
  return state.getIn(['page', 'stateHistoryModal'])
}

export const getCurrentModalState = createSelector(
  [getCurrentModalKey, getStateHistoryModal],
  (modalKey, stateHistory) => {
    const modalState = stateHistory.get(modalKey)
    return modalState === undefined ? Map() : modalState
  }
)
