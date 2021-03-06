import React, { PureComponent } from 'react'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

import Button from 'material-ui/Button'

import TBAPageContainer from '../containers/TBAPageContainer'
import ResponsiveLayout from './ResponsiveLayout'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
})

class Home extends PureComponent {
  constructor(props) {
    super(props)
    props.setBottomNav('home')
    props.resetPage()
  }

  render() {
    console.log("Render Home")

    const { classes } = this.props

    return (
      <TBAPageContainer
        history={this.props.history}
        documentTitle=''
      >
        <ResponsiveLayout>
          <p>The Blue Alliance is the best way to scout, watch, and relive the <em>FIRST</em> Robotics Competition.</p>
          <p>Welcome to a beta version of our new app!</p>

          <p>Handy links for testing:</p>
          <Button
            color='default'
            className={classes.button}
            raised
            component={Link}
            to='/team/254/2017'
          >
            254 in 2017
          </Button>
          <Button
            color='default'
            className={classes.button}
            raised
            component={Link}
            to='/event/2017casj'
          >
            2017casj
          </Button>
          <Button
            color='default'
            className={classes.button}
            raised
            component={Link}
            to='/match/2017casj_f1m2'
          >
            2017casj_f1m2
          </Button>
        </ResponsiveLayout>
      </TBAPageContainer>
    )
  }
}

export default withStyles(styles)(Home)
