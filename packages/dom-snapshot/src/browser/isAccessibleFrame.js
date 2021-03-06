'use strict';

function isAccessibleFrame(frame) {
  try {
    const doc = frame.contentDocument;
    return Boolean(doc && doc.defaultView && doc.defaultView.frameElement);
  } catch (err) {
    // for CORS frames
  }
}

module.exports = isAccessibleFrame;
