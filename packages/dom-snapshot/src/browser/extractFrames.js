'use strict';
const flat = require('./flat');
const isInlineFrame = require('./isInlineFrame');
const isAccessibleFrame = require('./isAccessibleFrame');

function extractFrames(documents = [document]) {
  const iframes = flat(
    documents.map(d =>
      Array.from(d.querySelectorAll('iframe[src]:not([src=""]),iframe[srcdoc]:not([srcdoc=""])')),
    ),
  );

  return iframes.filter(f => isAccessibleFrame(f) && !isInlineFrame(f)).map(f => f.contentDocument);
}

module.exports = extractFrames;
