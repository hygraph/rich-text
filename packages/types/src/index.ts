export interface Element {
  children: Array<ElementNode | Text>;
  type:
    | 'bulleted-list'
    | 'numbered-list'
    | 'list-item'
    | 'list-item-child'
    | 'table'
    | 'table_head'
    | 'table_body'
    | 'table_row'
    | 'table_cell'
    | 'table_header_cell'
    | 'block-quote'
    | 'paragraph'
    | 'heading-one'
    | 'heading-two'
    | 'heading-three'
    | 'heading-four'
    | 'heading-five'
    | 'heading-six'
    | 'class'
    | 'link'
    | 'image'
    | 'video'
    | 'iframe'
    | 'embed'
    | 'code-block';
  [key: string]: unknown;
}

export type ImageMimeTypes =
  | 'image/webp'
  | 'image/jpeg'
  | 'image/bmp'
  | 'image/gif'
  | 'image/png';

export type VideoMimeTypes =
  | 'video/quicktime'
  | 'video/mp4'
  | 'video/ogg'
  | 'video/webm'
  | 'video/x-msvideo';

export type AssetMimeTypes = ImageMimeTypes | VideoMimeTypes | string;

export interface Text extends Mark {
  text: string;
}

export type Mark = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

export interface ClassProps {
  className: string;
}

export interface ClassElement extends ClassProps, Element {
  type: 'class';
}

export interface LinkProps {
  href: string;
  className?: string;
  rel?: string;
  id?: string;
  title?: string;
  openInNewTab?: boolean;
}

export interface LinkElement extends LinkProps, Element {
  type: 'link';
}

export interface ImageProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
  handle?: string;
  mimeType?: AssetMimeTypes;
  altText?: string;
}

export interface ImageElement extends ImageProps, Element {
  type: 'image';
}

export interface VideoProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
  handle?: string;
}

export interface VideoElement extends VideoProps, Element {
  type: 'video';
}

export interface IFrameProps {
  url: string;
  width?: number;
  height?: number;
}

export interface IFrameElement extends IFrameProps, Element {
  type: 'iframe';
}

export type EmbedProps<T = any> = T & {
  nodeId: string;
  nodeType: string;
  isInline?: boolean;
};

export type LinkEmbedProps<T = any> = T & {
  nodeId: string;
  nodeType: string;
  children: any;
};

export interface EmbedElement extends EmbedProps, Element {
  type: 'embed' | 'link';
}

export type ElementNode =
  | Element
  | ClassElement
  | LinkElement
  | ImageElement
  | IFrameElement
  | VideoElement
  | EmbedElement;

export type Node = ElementNode | Text;

export type RichTextContent =
  | Array<ElementNode>
  | { children: Array<ElementNode> };

export type AssetReference = {
  id: string;
  mimeType: AssetMimeTypes;
  [key: string]: any;
};

export type Reference = {
  id: string;
  [key: string]: any;
};

export type EmbedReferences = Array<Reference | AssetReference>;

export enum EmptyElementsToRemove {
  'heading-one',
  'heading-two',
  'heading-three',
  'heading-four',
  'heading-five',
  'heading-six',
  'table_head',
}

export const elementTypeKeys: { [key: string]: string } = {
  'heading-one': 'h1',
  'heading-two': 'h2',
  'heading-three': 'h3',
  'heading-four': 'h4',
  'heading-five': 'h5',
  'heading-six': 'h6',
  class: 'class',
  link: 'a',
  image: 'img',
  iframe: 'iframe',
  video: 'video',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  'list-item': 'li',
  'list-item-child': 'list_item_child',
  table: 'table',
  table_head: 'table_head',
  table_body: 'table_body',
  table_row: 'table_row',
  table_cell: 'table_cell',
  table_header_cell: 'table_header_cell',
  'block-quote': 'blockquote',
  paragraph: 'p',
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  code: 'code',
  'code-block': 'code_block',
};

export * from './util/isElement';
export * from './util/isText';
export * from './util/isEmpty';
