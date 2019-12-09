/* eslint-disable no-console */
import React from 'react';
import { Demo, Snippet } from '../../../components/Demo';
import { Body, Header, Panel } from '@cjdev/visual-stack/lib/components/Panel';

/* s6:start */
import Select from '@cjdev/visual-stack/lib/components/Select';
import CreatableSelect from '@cjdev/visual-stack/lib/components/CreatableSelect';
import AsyncSelect from '@cjdev/visual-stack/lib/components/AsyncSelect';
/* s6:end */

const PanelComponent = ({ header, children }) => (
  <Panel>
    {header ? <Header>{header}</Header> : null}
    <Body>{children}</Body>
  </Panel>
);

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/select.js">
    {snippets => {
      /* s8:start */
      const remoteSourceOptions = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'raspberry', label: 'Raspberry' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];
      /* s8:end */
      /* s9:start */
      const fakeFetch = inputValue =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve(
              remoteSourceOptions.filter(i =>
                i.label.toLowerCase().includes(inputValue.toLowerCase())
              )
            );
          }, 500);
        });
      /* s9:end */
      return (
        <div>
          <PanelComponent header="Component Imports">
            <Snippet tag="s6" src={snippets} />
          </PanelComponent>

          <PanelComponent header="Dropdown powered by React Select">
            A full list supported props can be found at:{' '}
            <a href="https://react-select.com/home">react-select.com</a>
            {/* s1:start */}
            <Select
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
            />
            {/* s1:end */}
            <Snippet tag="s1" src={snippets} />
          </PanelComponent>
          <PanelComponent header="Select with error">
            {/* s2:start */}
            <Select
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
              error="something truthy here"
            />
            {/* s2:end */}
            <Snippet tag="s2" src={snippets} />
          </PanelComponent>
          <PanelComponent header="Disabled select">
            {/* s3:start */}
            <Select
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
              disabled={true}
            />
            {/* s3:end */}
            <Snippet tag="s3" src={snippets} />
          </PanelComponent>
          <PanelComponent header="Creatable Select powered by React Select">
            {/* s4:start */}
            <CreatableSelect
              isMulti
              components={{ DropdownIndicator: null }}
              placeholder={'Enter items...'}
              onChange={(value, actionMeta) => console.log(value, actionMeta)}
            />
            {/* s4:end */}
            <Snippet tag="s4" src={snippets} />
          </PanelComponent>
          <PanelComponent header="Multi Select powered by React Select">
            {/* s5:start */}
            <Select
              isMulti
              options={[
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
              ]}
              components={{ DropdownIndicator: null }}
              placeholder={'Enter items...'}
              onChange={(value, actionMeta) => console.log(value, actionMeta)}
            />
            {/* s5:end */}
            <Snippet tag="s5" src={snippets} />
          </PanelComponent>
          <PanelComponent header="Async Select powered by React Select">
            You may want to use an Async Select Component to load options from a
            remote source (e.g. fetching as a user types)
            <br />A full list supported props can be found at:{' '}
            <a href="https://react-select.com/async">react-select.com/async</a>
            {/* s7:start */}
            <AsyncSelect
              components={{ DropdownIndicator: null }}
              placeholder={'Enter items...'}
              onChange={(value, actionMeta) => console.log(value, actionMeta)}
              isMulti
              cacheOptions={false}
              isClearable={true}
              loadOptions={fakeFetch}
              noOptionsMessage={() => {
                return 'Type to search';
              }}
            />
            {/* s7:end */}
            <Snippet tag="s8" src={snippets} />
            <Snippet tag="s9" src={snippets} />
            <Snippet tag="s7" src={snippets} />
          </PanelComponent>
        </div>
      );
    }}
  </Demo>
);
