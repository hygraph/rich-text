import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import { content, references } from './content';

const App = () => {
  React.useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div>
      <RichText
        content={content}
        references={references}
        renderers={{
          h1: ({ children }) => <h1 className={`wfafsa`}>{children}</h1>,
          blockquote: ({ children }) => (
            <blockquote
              style={{
                paddingLeft: '16px',
                borderLeft: '4px solid blue',
                fontSize: '26px',
              }}
            >
              {children}
            </blockquote>
          ),
          a: ({ children, href, openInNewTab }) => (
            <a
              href={href}
              target={openInNewTab ? '_blank' : '_self'}
              style={{ color: 'green' }}
            >
              {children}
            </a>
          ),
          h2: ({ children }) => (
            <h2 style={{ color: 'darkcyan' }}>{children}</h2>
          ),
          bold: ({ children }) => <strong>{children}</strong>,
          // code_block: ({ children }) => {
          //   return (
          //     <pre
          //       style={{
          //         backgroundColor: 'darkcyan',
          //         padding: '12px',
          //         borderRadius: '4px',
          //       }}
          //     >
          //       {children}
          //     </pre>
          //   );
          // },
          code_block: ({ children }) => {
            return (
              <pre className="line-numbers language-none">
                <code>{children}</code>
              </pre>
            );
          },
          Asset: {
            application: () => (
              <div>
                <p>Asset</p>
              </div>
            ),
            text: () => (
              <div>
                <p>text plain</p>
              </div>
            ),
          },
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
