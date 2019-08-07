import React from 'react';
import { Body, Header, Panel } from '@cjdev/visual-stack/lib/components/Panel';
import { Demo, Snippet } from '../../../components/Demo';
import { Button } from '@cjdev/visual-stack/lib/components/Button';
/* s1:start */
import { openAlert, closeAlert } from '@cjdev/visual-stack-redux';
import { Alert } from '@cjdev/visual-stack/lib/components/Alert';
import { AlertMountPoint } from '@cjdev/visual-stack-redux/lib/components/Alert';
import { connect } from 'react-redux';
/* s1:end */

/* s2:start*/
const createButton = ({
  buttonType,
  buttonMessage,
  type,
  closeType,
  closeButtonText,
  children,
}) => {
  return ({ openAlert, closeAlert }) => (
    <Button
      type={buttonType}
      onClick={() =>
        openAlert(Alert, {
          type,
          closeType,
          onClose: closeAlert,
          closeButtonText,
          children,
        })
      }
    >
      {buttonMessage}
    </Button>
  );
};
/* s2:end */

/* s3:start */
const connectButton = button =>
  connect(
    null,
    { openAlert, closeAlert }
  )(button);
/* s3:end */

/*s4:start*/
const SuccessAlertWithIconCloseButton = createButton({
  buttonType: 'success',
  buttonMessage: 'Success Alert with Icon Close',
  type: 'success',
  closeType: 'icon',
  closeButtonText: null,
  children: 'You have successfully completed the form.',
});

const SuccessAlertWithButtonCloseButton = createButton({
  buttonType: 'success',
  buttonMessage: 'Success Alert with Button Close',
  type: 'success',
  closeType: 'button',
  closeButtonText: 'Dismiss',
  children: 'You have successfully completed the form.',
});

const InfoAlertWithIconCloseButton = createButton({
  buttonType: 'info',
  buttonMessage: 'Info Alert with Icon Close',
  type: 'info',
  closeType: 'icon',
  closeButtonText: null,
  children: 'Please review the form.',
});

const InfoAlertWithButtonCloseButton = createButton({
  buttonType: 'info',
  buttonMessage: 'Info Alert with Button Close',
  type: 'info',
  closeType: 'button',
  closeButtonText: 'Dismiss',
  children: 'Please review the form.',
});

const WarningAlertWithIconCloseButton = createButton({
  buttonType: 'danger',
  buttonMessage: 'Warning Alert with Icon Close',
  type: 'warning',
  closeType: 'icon',
  closeButtonText: null,
  children: 'There are errors on the form.',
});

const WarningAlertWithButtonCloseButton = createButton({
  buttonType: 'danger',
  buttonMessage: 'Warning Alert with Button Close',
  type: 'warning',
  closeType: 'button',
  closeButtonText: 'Dismiss',
  children: 'There are errors on the form.',
});

const ConnectedSuccessAlertWithIconCloseButton = connectButton(
  SuccessAlertWithIconCloseButton
);
const ConnectedSuccessAlertWithButtonCloseButton = connectButton(
  SuccessAlertWithButtonCloseButton
);
const ConnectedInfoAlertWithIconCloseButton = connectButton(
  InfoAlertWithIconCloseButton
);
const ConnectedInfoAlertWithButtonCloseButton = connectButton(
  InfoAlertWithButtonCloseButton
);
const ConnectedWarningAlertWithIconCloseButton = connectButton(
  WarningAlertWithIconCloseButton
);
const ConnectedWarningAlertWithButtonCloseButton = connectButton(
  WarningAlertWithButtonCloseButton
);
/* s4:end */

/* s6:start */
const SuccessAlertWithTimeoutCloseButton = ({ openAlert, closeAlert }) => (
  <Button
    type="success"
    onClick={() => {
      openAlert(Alert, {
        type: 'success',
        children: 'You have successfully completed the form.',
      });
      setTimeout(closeAlert, 5000);
    }}
  >
    Success Alert with Timeout Close
  </Button>
);

const ConnectedSuccessAlertWithTimeoutCloseButton = connectButton(
  SuccessAlertWithTimeoutCloseButton
);
/* s6:end */

export default () => (
  <Demo srcFile="/samples/src/containers/Components/Docs/alert.js">
    {snippets => {
      return (
        <div>
          <Panel>
            <Header>
              <b>New</b> Platform Alerts
            </Header>
            <Body>
              {/* s7:start */}
              <AlertMountPoint />
              {/* s7:end */}
              {/* s5:start */}
              <ConnectedSuccessAlertWithIconCloseButton />
              <ConnectedSuccessAlertWithButtonCloseButton />
              <br />
              <ConnectedInfoAlertWithIconCloseButton />
              <ConnectedInfoAlertWithButtonCloseButton />
              <br />
              <ConnectedWarningAlertWithIconCloseButton />
              <ConnectedWarningAlertWithButtonCloseButton />
              {/* s5:end */}
              <br />
              <br />
              The alert can have one of three options passed through the type
              prop:
              <span className="docs">info</span>,{' '}
              <span className="docs">sucess</span>, and
              <span className="docs">warning</span>. It defaults to{' '}
              <span className="docs">info</span>.<br />
              Additionally, it can have one of two options passed through the
              closeType prop:
              <span className="docs">icon</span> and{' '}
              <span className="docs">button</span>. The default behavior is to
              remain on the page. See below for how to automatically close
              Alerts after a period of time.
              <br />
              <br />
              First, import the actions, mountPoint, and Alert pieces, and
              render the mount point somewhere in the page:
              <Snippet tag="s1" src={snippets} />
              <Snippet tag="s7" src={snippets} />
              This function creates a button which, when clicked, will launch
              the alert. The button's
              <span className="docs">onClick</span> calls{' '}
              <span className="docs">openAlert</span>, which takes the Alert
              component and its props.
              <Snippet tag="s2" src={snippets} />
              This function connects the button to the redux actions.
              <Snippet tag="s3" src={snippets} />
              Now we can generate the buttons above:
              <Snippet tag="s4" src={snippets} />
              And render them:
              <Snippet tag="s5" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>Automatically Close Alerts</Header>
            <Body>
              <ConnectedSuccessAlertWithTimeoutCloseButton />
              <br />
              <br />
              To create an Alert which closes automatically after some time, do
              not pass the Alert a<span className="docs">closeType</span>.
              Instead, set a timeout for the call to
              <span className="docs">closeAlert</span> when you open it:
              <Snippet tag="s6" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
