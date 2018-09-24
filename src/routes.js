import * as actions from './actions'
import asyncComponent from './components/AsyncComponent'
const HomePage = asyncComponent(() => import(/* webpackChunkName: "HomePage"*/ './pages/HomePage'), 'HomePage')
const EventListPage = asyncComponent(() => import(/* webpackChunkName: "EventListPage"*/ './pages/EventListPage'), 'EventListPage')
const EventPage = asyncComponent(() => import(/* webpackChunkName: "EventPage"*/ './pages/EventPage'), 'EventPage')
const MatchPage = asyncComponent(() => import(/* webpackChunkName: "MatchPage"*/ './pages/MatchPage'))
const AccountPage = asyncComponent(() => import(/* webpackChunkName: "AccountPage"*/ './pages/AccountPage'), 'AccountPage')
const SigninRequiredPage = asyncComponent(() => import(/* webpackChunkName: "SigninRequiredPage"*/ './pages/SigninRequiredPage'), 'SigninRequiredPage')
const TeamListPage = asyncComponent(() => import(/* webpackChunkName: "TeamListPage"*/ './pages/TeamListPage'), 'TeamListPage')
const TeamPage = asyncComponent(() => import(/* webpackChunkName: "TeamPage"*/ './pages/TeamPage'), 'TeamPage')
const NotFoundPage = asyncComponent(() => import(/* webpackChunkName: "NotFoundPage"*/ './pages/NotFoundPage'), 'NotFoundPage')

export default [
  {
    path: '/',
    component: HomePage,
    exact: true,
    ssrDataFetcher: ({ store, params }) => {
      let { year } = params
      if (year === undefined) {
        year = 2018  // TODO don't hardcode
      } else {
        year = parseInt(year, 10)
      }
      return Promise.all([
        store.dispatch(actions.fetchYearEvents(year)),
      ])
    },
  },
  {
    path: '/account',
    component: AccountPage,
    exact: true,
  },
  {
    path: '/events/:year?',
    component: EventListPage,
    exact: true,
    ssrDataFetcher: ({ store, params }) => {
      let { year } = params
      if (year === undefined) {
        year = 2018  // TODO don't hardcode
      } else {
        year = parseInt(year, 10)
      }
      return Promise.all([
        store.dispatch(actions.fetchYearEvents(year)),
      ])
    },
  },
  {
    path: '/event/:eventKey',
    component: EventPage,
    exact: true,
    ssrDataFetcher: ({ store, params }) => {
      return Promise.all([
        store.dispatch(actions.fetchEventInfo(params.eventKey)),
        store.dispatch(actions.fetchEventMatches(params.eventKey)),
        store.dispatch(actions.fetchEventAlliances(params.eventKey)),
        store.dispatch(actions.fetchEventRankings(params.eventKey)),
      ])
    },
  },
  {
    path: '/signin_required',
    component: SigninRequiredPage,
    exact: true,
  },
  {
    path: '/match/:matchKey',
    component: MatchPage,
    exact: true,
    ssrDataFetcher: ({ store, params }) => {
      return Promise.all([
        store.dispatch(actions.fetchEventInfo(params.matchKey.split('_')[0])),
        store.dispatch(actions.fetchMatchInfo(params.matchKey)),
      ])
    },
  },
  {
    path: '/teams',
    component: TeamListPage,
    exact: true,
  },
  {
    path: '/team/:teamNumber/:year?',
    component: TeamPage,
    exact: true,
    ssrDataFetcher: ({ store, params }) => {
      let { teamNumber, year } = params
      if (year === undefined) {
        year = 2018  // TODO don't hardcode
      } else {
        year = parseInt(year, 10)
      }
      return Promise.all([
        store.dispatch(actions.fetchTeamYears(teamNumber)),
        store.dispatch(actions.fetchTeamInfo(teamNumber)),
        store.dispatch(actions.fetchTeamYearAwards(teamNumber, year)),
        store.dispatch(actions.fetchTeamYearEvents(teamNumber, year)),
        store.dispatch(actions.fetchTeamYearMatches(teamNumber, year)),
        store.dispatch(actions.fetchTeamYearEventStatuses(teamNumber, year)),
        store.dispatch(actions.fetchTeamYearMedia(teamNumber, year)),
      ])
    },
  },
  {
    component: NotFoundPage,
    exact: true,
  },
]

export const preloadPages = () => {
  // Preload common pages
  HomePage.preload()
  EventListPage.preload()
  EventPage.preload()
  TeamListPage.preload()
  TeamPage.preload()
}
