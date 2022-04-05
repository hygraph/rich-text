import { ElementNode, Text } from '../';
import { isElement } from './isElement';
import { isText } from './isText';

export function isEmpty({
  children,
}: {
  children: (ElementNode | Text)[];
}): boolean {
  // Checks if the children array has more than one element.
  // It may have a link inside, that's why we need to check this condition.
  if (children.length > 1) {
    const hasText = children.filter(function f(child): boolean | number {
      if (isText(child) && child.text !== '') {
        return true;
      }

      if (isElement(child)) {
        return (child.children = child.children.filter(f)).length;
      }

      return false;
    });

    return hasText.length > 0 ? false : true;
  } else if (children[0].text === '') return true;

  return false;
}
