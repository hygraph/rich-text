/*
  CKEditor's Word normalizer functions
  Tried importing @ckeditor/ckeditor5-paste-from-office, but it depends on a lot of ckeditor packages we don't need, so decided on just copying these three functions that we need
*/

// https://github.com/ckeditor/ckeditor5/blob/bce8267e16fccb25448b4c68acc3bf54336aa087/packages/ckeditor5-paste-from-office/src/filters/space.js#L57
function normalizeSafariSpaceSpans(htmlString: string) {
  return htmlString.replace(
    /<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g,
    (_, spaces) => {
      return spaces.length === 1
        ? ' '
        : Array(spaces.length + 1)
            .join('\u00A0 ')
            .substring(0, spaces.length + 1);
    }
  );
}

// https://github.com/ckeditor/ckeditor5/blob/bce8267e16fccb25448b4c68acc3bf54336aa087/packages/ckeditor5-paste-from-office/src/filters/space.js#L19
function normalizeSpacing(htmlString: string) {
  // Run normalizeSafariSpaceSpans() two times to cover nested spans.
  return (
    normalizeSafariSpaceSpans(normalizeSafariSpaceSpans(htmlString))
      // Remove all \r\n from "spacerun spans" so the last replace line doesn't strip all whitespaces.
      .replace(
        /(<span\s+style=['"]mso-spacerun:yes['"]>[^\S\r\n]*?)[\r\n]+([^\S\r\n]*<\/span>)/g,
        '$1$2'
      )
      .replace(/<span\s+style=['"]mso-spacerun:yes['"]><\/span>/g, '')
      .replace(/ <\//g, '\u00A0</')
      .replace(/ <o:p><\/o:p>/g, '\u00A0<o:p></o:p>')
      // Remove <o:p> block filler from empty paragraph. Safari uses \u00A0 instead of &nbsp;.
      .replace(/<o:p>(&nbsp;|\u00A0)<\/o:p>/g, '')
      // Remove all whitespaces when they contain any \r or \n.
      .replace(/>([^\S\r\n]*[\r\n]\s*)</g, '><')
  );
}

// https://github.com/ckeditor/ckeditor5/blob/bce8267e16fccb25448b4c68acc3bf54336aa087/packages/ckeditor5-paste-from-office/src/filters/parse.js#L102
function cleanContentAfterBody(htmlString: string) {
  const bodyCloseTag = '</body>';
  const htmlCloseTag = '</html>';

  const bodyCloseIndex = htmlString.indexOf(bodyCloseTag);

  if (bodyCloseIndex < 0) {
    return htmlString;
  }

  const htmlCloseIndex = htmlString.indexOf(
    htmlCloseTag,
    bodyCloseIndex + bodyCloseTag.length
  );

  return (
    htmlString.substring(0, bodyCloseIndex + bodyCloseTag.length) +
    (htmlCloseIndex >= 0 ? htmlString.substring(htmlCloseIndex) : '')
  );
}

export function normalizeHtml(html: string) {
  return cleanContentAfterBody(normalizeSpacing(html));
}
