import {
  EmbedReferences,
  IFrameProps,
  ImageProps,
  RichTextContent,
  VideoProps,
  ClassProps,
  LinkProps,
} from '@graphcms/rich-text-types';

export interface DefaultElementProps {
  children: string;
}

export interface ClassRendererProps
  extends DefaultElementProps,
    Partial<ClassProps> {}

export interface LinkRendererProps
  extends DefaultElementProps,
    Partial<LinkProps> {}

type DefaultNodeRenderer = (props: DefaultElementProps) => string;
type LinkNodeRenderer = (props: LinkRendererProps) => string;
type ClassNodeRenderer = (props: ClassRendererProps) => string;
type ImageNodeRenderer = (props: Partial<ImageProps>) => string;
type VideoNodeRenderer = (props: Partial<VideoProps>) => string;
type IFrameNodeRenderer = (props: Partial<IFrameProps>) => string;
type EmbedNodeRenderer = (props: any) => string;

export type NodeRendererType = {
  a?: LinkNodeRenderer;
  class?: ClassNodeRenderer;
  img?: ImageNodeRenderer;
  video?: VideoNodeRenderer;
  iframe?: IFrameNodeRenderer;
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
  table_header_cell?: DefaultNodeRenderer;
  blockquote?: DefaultNodeRenderer;
  bold?: DefaultNodeRenderer;
  italic?: DefaultNodeRenderer;
  underline?: DefaultNodeRenderer;
  code?: DefaultNodeRenderer;
  code_block?: DefaultNodeRenderer;
  Asset?: {
    application?: EmbedNodeRenderer;
    audio?: EmbedNodeRenderer;
    font?: EmbedNodeRenderer;
    image?: EmbedNodeRenderer;
    model?: EmbedNodeRenderer;
    text?: EmbedNodeRenderer;
    video?: EmbedNodeRenderer;
    [key: string]: EmbedNodeRenderer | undefined;
  };
  embed?: {
    [key: string]: EmbedNodeRenderer | undefined;
  };
  link?: {
    [key: string]: EmbedNodeRenderer | undefined;
  };
};

export type RichTextProps = {
  content: RichTextContent;
  references?: EmbedReferences;
  renderers?: NodeRendererType;
};
