import React from 'react'
import classes from './Preloader.module.css'

import preloaderIcon from '../../assets/images/preloader.gif'

import PropTypes from 'prop-types'

export const Preloader = ({ visible, children }) => {
  return (
    visible
      ? <div className={classes.Preloader}>
        <img src={preloaderIcon} alt="Preloader icon"/>
      </div>
      : children
  )
}

Preloader.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.any
}
