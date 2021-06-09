import { ReactNode } from 'react';

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
    | 'embed';
  [key: string]: unknown;
}

export type ImageMimeTypes =
  | 'image/webp'
  | 'image/jpeg'
  | 'image/bmp'
  | 'image/gif'
  | 'image/png';

export interface Text {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

export interface ClassProps {
  className: string;
}

export interface ClassElement extends Element, ClassProps {
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

export interface LinkElement extends Element, LinkProps {
  type: 'link';
}

export interface ImageProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
  handle?: string;
  mimeType?: ImageMimeTypes;
  altText?: string;
}

export interface ImageElement extends Element, ImageProps {
  type: 'image';
}

export interface VideoProps {
  src: string;
  title?: string;
  width?: number;
  height?: number;
  handle?: string;
}

export interface VideoElement extends Element, VideoProps {
  type: 'video';
}

export interface IFrameProps {
  url: string;
  width?: number;
  height?: number;
}

export interface IFrameElement extends Element, IFrameProps {
  type: 'iframe';
}

export interface EmbedProps {
  nodeId: string;
  nodeType: string;
}

export interface EmbedElement extends Element, EmbedProps {
  type: 'embed';
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

export type Reference = {
  id: string;
  [key: string]: unknown;
};

export type RichTextContent =
  | Array<ElementNode>
  | { children: Array<ElementNode> };

export type EmbedReferences = Map<string, Reference>;

export type RichTextProps = {
  content: RichTextContent;
  references?: EmbedReferences | Array<Reference>;
  renderers?: NodeRendererType;
};

export interface DefaultElementProps {
  children: ReactNode;
}

export interface ClassRendererProps
  extends DefaultElementProps,
    Partial<ClassProps> {}

export interface LinkRendererProps
  extends DefaultElementProps,
    Partial<LinkProps> {}

type DefaultNodeRenderer = (props: DefaultElementProps) => JSX.Element;
type LinkNodeRenderer = (props: LinkRendererProps) => JSX.Element;
type ClassNodeRenderer = (props: ClassRendererProps) => JSX.Element;
type ImageNodeRenderer = (props: Partial<ImageProps>) => JSX.Element;
type VideoNodeRenderer = (props: Partial<VideoProps>) => JSX.Element;
type IFrameNodeRenderer = (props: Partial<IFrameProps>) => JSX.Element;
type EmbedNodeRenderer = (
  props: Partial<Reference> | { type: string; url: string }
) => JSX.Element;

export interface NodeRendererType {
  a?: LinkNodeRenderer;
  class?: ClassNodeRenderer;
  img?: ImageNodeRenderer;
  video?: VideoNodeRenderer;
  iframe?: IFrameNodeRenderer;
  embed?: EmbedNodeRenderer;
  h1?: DefaultNodeRenderer;
  h2?: DefaultNodeRenderer;
  h3?: DefaultNodeRenderer;
  h4?: DefaultNodeRenderer;
  h5?: DefaultNodeRenderer;
  h6?: DefaultNodeRenderer;
  p?: DefaultNodeRenderer;
  ul?: DefaultNodeRenderer;
  ol?: DefaultNodeRenderer;
  li?: DefaultNodeRenderer;
  list_item_child?: DefaultNodeRenderer;
  table?: DefaultNodeRenderer;
  table_head?: DefaultNodeRenderer;
  table_body?: DefaultNodeRenderer;
  table_row?: DefaultNodeRenderer;
  table_cell?: DefaultNodeRenderer;
  blockquote?: DefaultNodeRenderer;
  bold?: DefaultNodeRenderer;
  italic?: DefaultNodeRenderer;
  underline?: DefaultNodeRenderer;
  code?: DefaultNodeRenderer;
}

export interface RemoveEmptyElementType {
  h1?: Boolean;
  h2?: Boolean;
  h3?: Boolean;
  h4?: Boolean;
  h5?: Boolean;
  h6?: Boolean;
}

export * from './util/isElement';
export * from './util/isText';
export * from './util/isEmbed';
