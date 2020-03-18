import React from 'react';
import './button.css';
import { Body, Header, Panel } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
import { Button } from '@cjdev/visual-stack/lib/components/Button';
import {
  AccountIcon,
  CodeIcon,
} from '@cjdev/visual-stack/lib/components/Icons';
import ChevronDown from 'mdi-react/ChevronDownIcon';
import CalendarRange from 'mdi-react/CalendarRangeIcon';
import FileImport from 'mdi-react/FileImportIcon';
import FilterVariant from 'mdi-react/FilterVariantIcon';
import Download from 'mdi-react/DownloadIcon';
import Plus from 'mdi-react/PlusIcon';
import Minus from 'mdi-react/MinusIcon';

export const ChevronDownIcon = ChevronDown;
export const CalendarRangeIcon = CalendarRange;
export const FileImportIcon = FileImport;
export const DownloadIcon = Download;
export const FilterVariantIcon = FilterVariant;

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/button.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Body>
              <h2>Buttons</h2>
              <p>
                Please refer to the UX guidelines documented in the{' '}
                <a
                  href="https://cj.invisionapp.com/dsm/cjaffiliate/visual-stack"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CJ Design System Manager
                </a>{' '}
                for proper usage and placement of buttons (currently in
                development).
              </p>
              {/* s3:start */}
              <Button type="solid-primary">Primary Solid</Button>
              <Button type="solid-primary-raised">
                <Plus /> Primary Solid Raised
              </Button>
              <Button type="outline-secondary">Secondary Outline</Button>
              <Button type="outline-secondary-raised">
                <Plus /> Secondary Raised
              </Button>
              <Button type="rounded-solid">
                <Plus />
              </Button>
              <Button type="rounded-outline">
                <Minus />
              </Button>
              <Button type="icon">
                <AccountIcon />
              </Button>
              <Button type="text">Text Button</Button>
              <Button type="text-link">Text Link</Button>
              <Button type="solid-secondary">Solid Secondary</Button>
              {/* s3:end */}
              <Snippet tag="s3" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Body>
              <h4>Transitional MemberWeb/Platform Pill Buttons</h4>
              <p>
                The pill buttons will be used in memberweb to introduce more
                features in the new platform. The pill shape and solid color of
                the button will help call out a call to actions of highest
                priority, such as the onboarding checklist guide or to finish
                setting up an account.
              </p>
              {/* s6:start */}
              <Button type="solid-primary-pill">Primary</Button>
              <Button type="solid-primary-pill">
                <Plus /> Primary with Icon
              </Button>
              <Button type="solid-secondary-pill">Secondary</Button>
              <Button type="solid-secondary-pill">
                <Plus /> Secondary with Icon
              </Button>
              <Button type="solid-outline-raised-pill">
                Raised Secondary Outline
              </Button>
              <Button type="solid-outline-raised-pill">
                <Plus /> Raised Secondary Outline with Icon
              </Button>
              {/* s6:end */}
              <Snippet tag="s6" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>
              <b>New</b> Inline Buttons with Icons (in progress)
            </Header>
            <Body>
              {/* s5:start */}
              <Button type="inline-outline-secondary">
                Dropdown
                <ChevronDownIcon className="vs-inline-button-chevron" />
              </Button>
              <Button type="inline-outline-secondary">
                <CalendarRangeIcon className="vs-inline-button-icon" />
                Date Range
                <ChevronDownIcon className="vs-inline-button-chevron" />
              </Button>
              <Button type="inline-outline-secondary">
                <FileImportIcon className="vs-inline-button-icon" />
                Import CSV
              </Button>
              <Button type="inline-outline-secondary">
                <DownloadIcon className="vs-inline-button-icon" />
                Download
              </Button>
              <Button type="inline-outline-secondary">
                <FilterVariantIcon className="vs-inline-button-icon" />
                Filters
              </Button>
              <h6>Icon Only</h6>
              <Button type="inline-outline-secondary">
                <FilterVariantIcon className="vs-inline-button-icon-only" />
              </Button>
              <Button type="inline-outline-secondary">
                <DownloadIcon className="vs-inline-button-icon-only" />
              </Button>
              {/* s5:end */}
              <Snippet tag="s5" src={snippets} />
              <h6>When to use</h6>
              <p>
                Use when you have to place a button inline with selects inheader
                toolbars and table toolars.
              </p>
              <h6>When NOT to use</h6>
              <p>
                Do not use as primary or secondary action buttons at the page
                level.
              </p>
            </Body>
          </Panel>

          <Panel>
            <Body>
              <h5>Disabled States</h5>
              <p>
                Disable buttons by adding the disabled attribute or the
                className="disabled"
              </p>
              {/* s4:start */}
              <Button type="solid-primary" disabled>
                Disabled
              </Button>
              <Button type="outline-secondary" disabled>
                Disabled
              </Button>
              <Button type="icon" disabled>
                <AccountIcon />
              </Button>
              <Button type="text" disabled>
                Text Button
              </Button>
              <Button type="text-link" disabled>
                Text Link
              </Button>
              {/* s4:end */}
              <Snippet tag="s4" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>Button Sizing</Header>
            <Body>
              {/* s1:start */}
              <Button type="solid-primary" small={true}>
                Small
              </Button>
              <Button type="solid-primary">Default</Button>
              <Button type="solid-primary" large={true}>
                Large
              </Button>
              {/* s1:end */}
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>Deprecated Buttons</Header>
            <Body>
              <p>
                Please check to make sure these buttons are not being used in
                your application. Please contact the UX team if you have any
                questions.
              </p>
              {/* s2:start */}
              <Button type="primary">Primary</Button>
              <Button type="success">Success</Button>
              <Button type="info">Info</Button>
              <Button type="default">Default</Button>
              <Button type="warning">Warning</Button>
              <Button type="danger">Danger</Button>
              <Button type="outline-primary">Outline Primary</Button>
              <Button type="text">
                <CodeIcon /> Icon and Text
              </Button>
              {/* s2:end */}
              <Snippet tag="s2" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
