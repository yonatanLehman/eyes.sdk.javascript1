'use strict'

const {PositionMemento, Location} = require('@applitools/eyes-sdk-core')

/**
 * Encapsulates state for {@link ScrollPositionProvider} instances.
 *
 * @ignore
 */
class ScrollPositionMemento extends PositionMemento {
  /**
   * @param {Location} position - The current location to be saved.
   */
  constructor(position) {
    super()

    this._position = new Location(position)
  }

  /**
   * @return {number}
   */
  getX() {
    return this._position.getX()
  }

  /**
   * @return {number}
   */
  getY() {
    return this._position.getY()
  }
}

exports.ScrollPositionMemento = ScrollPositionMemento
