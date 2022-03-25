import {
  ClassRendererProps,
  DefaultElementProps,
  EmbedReferences,
  IFrameProps,
  ImageProps,
  LinkRendererProps,
  RichTextContent,
  VideoProps,
} from '@graphcms/rich-text-types';

type DefaultNodeRenderer = (props: DefaultElementProps) => JSX.Element;
type LinkNodeRenderer = (props: LinkRendererProps) => JSX.Element;
type ClassNodeRenderer = (props: ClassRendererProps) => JSX.Element;
type ImageNodeRenderer = (props: Partial<ImageProps>) => JSX.Element;
type VideoNodeRenderer = (props: Partial<VideoProps>) => JSX.Element;
type IFrameNodeRenderer = (props: Partial<IFrameProps>) => JSX.Element;
type EmbedNodeRenderer = (props: any) => JSX.Element;

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
};

export type RichTextProps = {
  content: RichTextContent;
  references?: EmbedReferences;
  renderers?: NodeRendererType;
};
