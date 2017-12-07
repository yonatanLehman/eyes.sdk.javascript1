'use strict';

const {ArgumentGuard, PositionProvider, RectangleSize, Location} = require('eyes.sdk');

const ElementPositionMemento = require('./ElementPositionMemento');
const EyesWebElement = require('./../wrappers/EyesWebElement');

class ElementPositionProvider extends PositionProvider {

  /**
   * @param {Logger} logger A Logger instance.
   * @param {EyesWebDriver} driver
   * @param {EyesWebElement} element
   */
  constructor(logger, driver, element) {
    super();
    ArgumentGuard.notNull(logger, "logger");
    ArgumentGuard.notNull(element, "element");

    this._logger = logger;
    this._element = (element instanceof EyesWebElement) ? element : new EyesWebElement(logger, driver, element);

    this._logger.verbose("creating ElementPositionProvider");
  }

  /**
   * @override
   * @inheritDoc
   */
  async getCurrentPosition() {
    this._logger.verbose("getCurrentScrollPosition()");
    const scrollLeft = await this._element.getScrollLeft();
    const scrollTop = await this._element.getScrollTop();
    const location = new Location(scrollLeft, scrollTop);
    this._logger.verbose(`Current position: ${location}`);
    return location;
  }

  /**
   * @override
   * @inheritDoc
   */
  async setPosition(location) {
    this._logger.verbose(`Scrolling element to: ${location}`);
    await this._element.scrollTo(location);
    this._logger.verbose("Done scrolling element!");
  }

  /**
   * @override
   * @inheritDoc
   */
  async getEntireSize() {
    this._logger.verbose("ElementPositionProvider - getEntireSize()");
    const scrollWidth = await this._element.getScrollWidth();
    const scrollHeight = await this._element.getScrollHeight();
    const size = new RectangleSize(scrollWidth, scrollHeight);
    this._logger.verbose(`ElementPositionProvider - Entire size: ${size}`);
    return size;
  }

  /**
   * @override
   * @return {Promise.<ElementPositionMemento>}
   */
  async getState() {
    const position = await this.getCurrentPosition();
    return new ElementPositionMemento(position);
  }

  // noinspection JSCheckFunctionSignatures
  /**
   * @override
   * @param {ElementPositionMemento} state The initial state of position
   * @return {Promise}
   */
  async restoreState(state) {
    await this.setPosition(new Location(state.getX(), state.getY()));
    this._logger.verbose("Position restored.");
  }
}

module.exports = ElementPositionProvider;