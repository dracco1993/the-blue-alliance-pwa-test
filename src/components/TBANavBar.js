import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import SearchIcon from 'material-ui-icons/Search';
import FilterListIcon from 'material-ui-icons/FilterList';
import RefreshIcon from 'material-ui-icons/Refresh';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  appBarTitle: {
    flex: 1,
  },
})

class TBAToolbar extends PureComponent {
  render() {
    return (
      <Toolbar>
        <IconButton color="contrast" aria-label="Menu" onClick={this.props.toggleMobileDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography type="title" color="inherit" className={this.props.classes.appBarTitle}>
          {this.props.title ? this.props.title : 'The Blue Alliance'}
        </Typography>
        {this.props.filterFunction && <IconButton color="contrast" onClick={this.props.filterFunction}>
          <FilterListIcon />
        </IconButton>}
        {!this.props.isLoading && this.props.refreshFunction &&
          <IconButton color="contrast" onClick={this.props.refreshFunction}>
            <RefreshIcon />
          </IconButton>
        }
        {this.props.isLoading &&  <IconButton color="contrast" disabled>
          <CircularProgress color="accent" size={20} />
        </IconButton>}
        <IconButton color="contrast">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    )
  }
}

class TBANavBar extends PureComponent {
  render() {
    console.log("Render TBANavBar")
    const {tabs, ...otherProps} = this.props
    return (
      <AppBar>
        <TBAToolbar {...otherProps} />
        {tabs}
      </AppBar>
    );
  }
}

TBANavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TBANavBar);