import * as React from 'react';
import {Body, Panel, Header} from "@cjdev/visual-stack/lib/components/Panel";
import {Button} from "@cjdev/visual-stack/lib/components/Button";
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import "./collapsiblepanel.css";
import {FieldContent, Input, Label, ChoiceInput, Field, Form} from "@cjdev/visual-stack/lib/components/Form";
import {Demo, Snippet} from "../../../components/Demo";

class CollapsiblePanel extends React.Component {
  constructor(props) {
    super(props);

    const collapsed = props.initiallyCollapsed === undefined ? true : props.initiallyCollapsed;
    this.state = {collapsed};

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
  }

  toggleCollapsed() {
    this.setState({collapsed: !this.state.collapsed});
  }

  render() {
    return (
      <div className="vs-collapsible-panel">
        <div className="vs-collapsible-panel-header">
          <Button type="icon" onClick={this.toggleCollapsed}>
            {this.state.collapsed
              ? <ChevronRightIcon/>
              : <ChevronDownIcon/>}
          </Button>

          <span className="vs-collapsible-panel-header-title" onClick={this.toggleCollapsed}>
            {this.props.title}
          </span>
        </div>
        <div className="vs-collapsible-panel-item">
          {
            !this.state.collapsed &&
            this.props.children
          }
        </div>
      </div>
    );
  }
}

export default () => {
  return (
    <Demo srcFile="/samples/src/containers/Components/Docs/collapsiblepanel.js">
      {snippets => (
        <Panel>
          <Header>Collapsible Panels</Header>
          <Body paddingSize="none">
          {/* s1:start */}
          <CollapsiblePanel title={<h3 className="inline-remove-margin">Collapsible Panel 1</h3>}
                            initiallyCollapsed={false}>
            <Field label="# of vacation days" help="Enter vacation rules">
              <FieldContent>
                <ChoiceInput name="vacationDays" label="Unlimited" value="unlimited"/>
                <div>
                  <ChoiceInput name="vacationDays" label="Limit to" value="limitTo"
                               className="inline-other-text-box-style"/>
                  <Input name="days" className="make-text-box-smaller-style"/>
                  <Label>days</Label>
                </div>
              </FieldContent>
            </Field>
            <Field name="vacationtypes" label="Vacation Type" help="Choose all applicable"
                   optional={true} optionalLabel="Optional">
              <FieldContent>
                <ChoiceInput name="vacationtypes.cruise" type="checkbox" label="Cruise" value="cruise"/>
                <ChoiceInput name="vacationtypes.hiking" type="checkbox" label="Hiking" value="hiking"/>
              </FieldContent>
            </Field>
            <Snippet tag="s1" src={snippets}/>
          </CollapsiblePanel>
          {/* s1:end */}

          {/* s2:start */}
          <CollapsiblePanel title="Collapsible Panel 2">
            <div className="summary-content">
              <Label>Default commissioning</Label>
              <Label fontWeight="normal">3%</Label>
            </div>
            <div className="summary-content">
              <Label>Situation 1</Label>
              <Label fontWeight="normal">4%</Label>
            </div>
            <div className="summary-content">
              <Label>Situation 2</Label>
              <Label fontWeight="normal">5%</Label>
            </div>
            <Snippet tag="s2" src={snippets}/>
          </CollapsiblePanel>
          {/* s2:end */}
          </Body>
        </Panel>
      )}
    </Demo>
  );
};
