import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { withStyles } from 'material-ui/styles'
import { Map, Set } from 'immutable'

import Button from 'material-ui/Button'
import Checkbox from 'material-ui/Checkbox'
import Dialog, { DialogTitle, DialogActions } from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import List, { ListItem, ListItemText } from 'material-ui/List'

const styles = {
  listWrapper: {
    maxHeight: '100%',
    overflow: 'auto',
  },
}

// Fake district for filtering regionals
const regional = Map({
  key: 'regional',
})

class EventFilterDialog extends PureComponent {
  handleClose = () => {
    this.props.setPageState({ filterDialogOpen: false })
  }

  handleClear = () => {
    this.props.setPageState({
      filterDialogOpen: false,
      districtFilters: Set(),
    })
  }

  handleToggle = (district) => () => {
    let filters = this.props.districtFilters

    if (filters.has(district.get('key'))) {
      filters = filters.delete(district.get('key'))
    } else {
      filters = filters.add(district.get('key'))
    }

    this.props.setPageState({
      districtFilters: filters,
    })
  }

  render() {
    return (
      <Dialog onClose={this.handleClose} open={this.props.isOpen}>
        <DialogTitle>Filter Events</DialogTitle>
        <Divider />
        <div className={this.props.classes.listWrapper}>
          <List>
            <ListItem key={'regional'} button onClick={this.handleToggle(regional)}>
              <Checkbox
                checked={this.props.districtFilters.has(regional.get('key'))}
              />
              <ListItemText primary='Regionals' />
            </ListItem>
            {this.props.districts.map(district =>{
              return (
                <ListItem key={district.get('key')} button onClick={this.handleToggle(district)}>
                  <Checkbox
                    checked={this.props.districtFilters.has(district.get('key'))}
                  />
                  <ListItemText primary={`${district.get('display_name')} District`} />
                </ListItem>
              )
            })}
          </List>
        </div>
        <Divider />
        <DialogActions>
          <Button onClick={this.handleClear} color='primary'>
            Clear filters
          </Button>
          <Button onClick={this.handleClose} color='primary' autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

EventFilterDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  year: PropTypes.number.isRequired,
  districts: ImmutablePropTypes.list.isRequired,
}

export default withStyles(styles)(EventFilterDialog)
