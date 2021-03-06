import React, { PureComponent } from 'react';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Tabs, { Tab } from 'material-ui/Tabs';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import InfoOutlineIcon from 'material-ui-icons/InfoOutline';
import EventIcon from 'material-ui-icons/Event';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

import ResponsiveLayout from './ResponsiveLayout'
import MatchTable from './MatchTable'
import MatchList from './MatchList'
import TeamsList from './TeamsList'

import TBAPageContainer from '../containers/TBAPageContainer'

const styles = theme => ({
  hidden: {
    display: 'none',
  },
  scrollContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
  },
})

class EventPage extends PureComponent {
  reset = props => {
     // Set without overriding
    props.resetPage({
      tabIdx: 0,
    })
    // Fetch data
    this.refreshFunction()
  }

  constructor(props) {
    super(props)
    this.reset(props)
    props.setBottomNav('events')
  }

  refreshFunction = () => {
    this.props.fetchEventInfo(this.props.eventKey)
    this.props.fetchEventMatches(this.props.eventKey)
    this.props.fetchEventTeams(this.props.eventKey)
  }

  tabHandleChangeIndex = tabIdx => {
    this.props.setPageState({tabIdx, 'hash': tabIdx});
  }

  tabHandleChange = (event, tabIdx) => {
    this.props.setPageState({tabIdx, 'hash': tabIdx});
  }

  render() {
    console.log("Render Event Page")

    const { classes, event, matches, teams } = this.props

    var name = null
    var year = undefined
    if (event) {
      year = event.get('year')
      name = `${event.get('name')} ${year}`
    }

    return (
      <div>
        <Hidden smDown>
          <TBAPageContainer
            history={this.props.history}
            documentTitle={name ? name : ''}
            refreshFunction={this.refreshFunction}
            contentRef={el => this.contentRef = el}
          >
            <ResponsiveLayout>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <h1>{name}</h1>
                </Grid>
                <Grid item xs={12}>
                  <Paper>
                    <Tabs
                      value={this.props.tabIdx}
                      onChange={this.tabHandleChange}
                      fullWidth
                    >
                      <Tab label="Results" />
                      <Tab label="Teams" />
                    </Tabs>
                  </Paper>
                  <div className={classNames({[classes.hidden]: this.props.tabIdx !== 0})}>
                    <Grid container spacing={24}>
                      <Grid item xs={6}>
                        <h3>Qualification Results</h3>
                        <MatchTable matches={this.props.qualMatches} />
                      </Grid>
                      <Grid item xs={6}>
                        <h3>Playoff Results</h3>
                        <MatchTable matches={this.props.playoffMatches} />
                      </Grid>
                    </Grid>
                  </div>
                  {this.props.tabIdx === 1 &&
                  <div>
                    <TeamsList scrollElement={this.contentRef} teams={teams} year={year}/>
                  </div>}
                </Grid>
              </Grid>
            </ResponsiveLayout>
          </TBAPageContainer>
        </Hidden>
        <Hidden mdUp>
          <TBAPageContainer
            history={this.props.history}
            documentTitle={name ? name : ''}
            title={name}
            refreshFunction={this.refreshFunction}
            tabs={
              <Tabs
                value={this.props.tabIdx}
                onChange={this.tabHandleChange}
                indicatorColor="white"
                scrollable
                scrollButtons="auto"
              >
                <Tab label={"Info"} />
                <Tab label={"Matches"} />
                <Tab label={"Teams"} />
              </Tabs>
            }
          >
            <SwipeableViews
              containerStyle={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              index={this.props.tabIdx}
              onChangeIndex={this.tabHandleChangeIndex}
            >
              <div>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <InfoOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItem>
                </List>
                {event && event.getDateString() &&
                  <React.Fragment>
                    <Divider />
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <EventIcon />
                        </ListItemIcon>
                        <ListItemText primary={event.getDateString()} />
                      </ListItem>
                    </List>
                  </React.Fragment>
                }
              </div>
              {matches ? <MatchList scrollId='matches' matches={matches} /> : <div>NO MATCHES</div>}
              <div ref={el => this.contentRef = el} className={classes.scrollContainer}>
                <TeamsList scrollElement={this.contentRef} teams={teams} year={year}/>
              </div>
            </SwipeableViews>
          </TBAPageContainer>
        </Hidden>
      </div>
    )

  }
}

export default withStyles(styles)(EventPage);
