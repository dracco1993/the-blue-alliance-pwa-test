import React, { PureComponent } from 'react';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import { withStyles } from 'material-ui/styles';
import { ListItem, ListItemText } from 'material-ui/List';
import { CircularProgress } from 'material-ui/Progress';
import WindowScrollerList from './WindowScrollerList'

const styles = {
}

class TeamRow extends PureComponent {
  render() {
    const { team, year } = this.props
    const cityStateCountry = team.getCityStateCountry()
    let to = `/team/${team.get('team_number')}`
    if (year) {
      to += `/${year}`
    }
    return (
      <LinkContainer to={to}>
        <ListItem button divider disableRipple>
          <ListItemText primary={`${team.get('team_number')} | ${team.get('nickname')}`} secondary={cityStateCountry ? cityStateCountry : '--'} />
        </ListItem>
      </LinkContainer>
    )
  }
}

class TeamsList extends PureComponent {
  rowRenderer = ({index, isScrolling, isVisible, key, parent, style}) => {
    const team = this.filteredTeams.get(index)
    return (
      <div key={team.get('key')} style={style}>
        <TeamRow team={team} year={this.props.year} />
      </div>
    )
  }

  render() {
    console.log("Render TeamsList");
    if (this.props.filter) {
      const filterLowerCase = this.props.filter.toLowerCase()
      this.filteredTeams = this.props.teams.filter(team => (
        team.getTeamNumberString().includes(filterLowerCase) ||
        (team.getNicknameLower() && team.getNicknameLower().includes(filterLowerCase)) ||
        (team.getCityStateCountryLower() && team.getCityStateCountryLower().includes(filterLowerCase))
      ))
    } else {
      this.filteredTeams = this.props.teams
    }

    if (this.props.teams !== undefined) {
      return (
        <WindowScrollerList
          scrollElement={this.props.scrollElement}
          rowCount={this.filteredTeams.size}
          rowHeight={69}
          rowRenderer={this.rowRenderer}
        />
      )
    } else {
      return <CircularProgress color="secondary" size={100} />
    }
  }
}

export default withStyles(styles)(TeamsList);
