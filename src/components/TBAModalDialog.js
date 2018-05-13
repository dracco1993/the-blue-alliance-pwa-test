import React from 'react'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import Dialog, { withMobileDialog } from 'material-ui/Dialog'
import Slide from 'material-ui/transitions/Slide'

import MatchDialogContainer from '../containers/MatchDialogContainer'
import TeamAtEventDialogContainer from '../containers/TeamAtEventDialogContainer'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const ModalRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      let props = Object.assign(routeProps, rest)
      return React.createElement(component, props)
    }}/>
  )
}

const styles = theme => ({
  fullScreenRoot: {
    top: 32,
    bottom: 0,
    height: 'auto',
  },
  paperFullScreen: {
    borderTopLeftRadius: theme.spacing.unit * 2,
    borderTopRightRadius: theme.spacing.unit * 2,
  },
})

class TBAModalDialog extends React.Component {
  render() {
    const { classes, isModal, open, fullScreen, handleClose } = this.props
    return (
      <Dialog
        open={open}
        onBackdropClick={handleClose}
        maxWidth='md'
        fullWidth
        fullScreen={fullScreen}
        TransitionComponent={Transition}
        classes={{
          root: fullScreen ? classes.fullScreenRoot : null,
          paperFullScreen: classes.paperFullScreen,
        }}
      >
        {isModal &&
          <React.Fragment>
            <ModalRoute path='/match/:matchKey' component={MatchDialogContainer} handleClose={handleClose} />
            <ModalRoute path='/team/:teamNumber/:year?' component={TeamAtEventDialogContainer} handleClose={handleClose} />
          </React.Fragment>
        }
      </Dialog>
    )
  }
}

TBAModalDialog.propTypes = {
  isModal: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default withMobileDialog()(withStyles(styles)(TBAModalDialog))
