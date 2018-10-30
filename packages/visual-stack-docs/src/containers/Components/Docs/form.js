/* eslint */
import React from 'react';
import { Panel, Body, Header } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
/* s3:start */
import { Form, FormGroup, Label, Input, Legend } from '@cjdev/visual-stack/lib/components/Form';
/* s3:end */

export default () =>
    <Demo srcFile="/samples/src/containers/Components/Docs/form.js">
    { snippets => {
      return (
        <div>
        
          <Panel>
            <Header>
              Compliance - New Issue Form
            </Header>
            <Body>
              <form>
              	<h1>New Issue</h1>
              	<div className="container">
              		<div className="row">
                		<div className="col-sm-3">
		                  <Label required={true}>PID</Label>
		                  <select>
		                  	<option>Choose PID</option>
		                  </select>
                		</div>
                		<div className="col-sm-3">
		                  <Label required={true}>Card Name</Label>
		                  <select>
		                  	<option>Choose Card</option>
		                  </select>
                		</div>
              		</div>
              		<div className="row">
                		<div className="col-sm-3">
		                  <Label required={true}>Error/Defect Detection</Label>
		                  <input type="date" />
                		</div>
                		<div className="col-sm-3">
		                  <Label required={true}>Link Cut Date/Time (if applicable)</Label>
		                  <input type="date" />
                		</div>
                		<div className="col-sm-3">
		                  <Label required={true}>Desolution Date/Time</Label>
		                  <input type="date" />
                		</div>
              		</div>
              		<div className="row">
                		<div className="col-sm-6">
	                		<Label required={true}>Description</Label>
	                		<textarea>Enter description</textarea>
                		</div>
	              	</div>
              		<div className="row">
                		<div className="col-sm-6">
	                		<Label required={true}>Description</Label>
	                		<input type="text" value="Location of error (URL, app name, etc.)" />
                		</div>
	              	</div>
              		<div className="row">
                		<div className="col-sm-6">
	                		<Label required={true}>Error/Defect Detection</Label>
	                		<textarea>Notes - Root Cause</textarea>
                		</div>
	            		</div>
              		<div className="row">
                		<div className="col-sm-12">
                			<button className="vs-btn-d vs-solid-primary-btn">Save</button>
                			<button className="vs-btn-d vs-text-btn">Cancel</button>
                		</div>
              		</div>
              	</div>
              </form>
            </Body>
          </Panel>

          <Panel>
            <Header>
              Default Buttons
            </Header>
            <Body>
              { /* s2:start */ }
              <Form vertical={false}>
                <FormGroup vertical={false}>
                  <Label required={true}>Some Label</Label>
                  <Input/>
                </FormGroup>
              </Form>
              { /* s2:end */ }
              <Snippet tag="s2" src={snippets} />
            </Body>
          </Panel>

          <Panel>
            <Header>
              Large Buttons
            </Header>
            <Body>
              { /* s1:start */ }
              <Form vertical={false}>
                <FormGroup vertical={false}>
                  <Label required={true}>Some Label</Label>
                  <Input/>
                  <Legend>Something</Legend>
                </FormGroup>
              </Form>
              { /* s1:end */ }
              <Snippet tag="s1" src={snippets} />
            </Body>
          </Panel>

        </div>
      );
    }}
  </Demo>;

