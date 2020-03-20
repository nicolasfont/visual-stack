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

/* s4:start */
const SuccessAlertWithIconCloseButton = createButton({
  buttonType: 'solid-primary',
  buttonMessage: 'Alert with Close Icon',
  type: 'success',
  closeType: 'icon',
  closeButtonText: null,
  children: 'You have successfully completed the form.',
});

const SuccessAlertWithButtonCloseButton = createButton({
  buttonType: 'solid-primary',
  buttonMessage: 'Alert with Close Button',
  type: 'success',
  closeType: 'button',
  closeButtonText: 'Dismiss',
  children: 'You have successfully completed the form.',
});

const alertHtml = (
  <div>
    <h3>Please review the form</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
);

const InfoAlertWithIconCloseButton = createButton({
  buttonType: 'outline-secondary',
  buttonMessage: 'Alert with Close Icon',
  type: 'info',
  closeType: 'icon',
  closeButtonText: null,
  children: alertHtml,
});

const InfoAlertWithButtonCloseButton = createButton({
  buttonType: 'outline-secondary',
  buttonMessage: 'Alert with Close Button',
  type: 'info',
  closeType: 'button',
  closeButtonText: 'Dismiss',
  children: 'Please review the form.',
});

const WarningAlertWithIconCloseButton = createButton({
  buttonType: 'danger',
  buttonMessage: 'Alert with Close Icon',
  type: 'warning',
  closeType: 'icon',
  closeButtonText: null,
  children: 'There are errors on the form.',
});

const WarningAlertWithButtonCloseButton = createButton({
  buttonType: 'danger',
  buttonMessage: 'Alert with Close Button',
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
    type="solid-primary"
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
              <h6>Success Buttons</h6>
              {/* s5:start */}
              <ConnectedSuccessAlertWithIconCloseButton />
              <ConnectedSuccessAlertWithButtonCloseButton />
              {/* s5:end */}

              <h6>Informative Buttons</h6>
              {/* s8:start */}
              <ConnectedInfoAlertWithIconCloseButton />
              <ConnectedInfoAlertWithButtonCloseButton />
              {/* s8:end */}

              <h6>Warning Buttons</h6>
              {/* s9:start */}
              <ConnectedWarningAlertWithIconCloseButton />
              <ConnectedWarningAlertWithButtonCloseButton />
              {/* s9:end */}

              <br />
              <br />

              <p>
                The alert can have one of three options passed through the type
                prop:
                <span className="docs">info</span>,{' '}
                <span className="docs">success</span>, and
                <span className="docs">warning</span>. It defaults to{' '}
                <span className="docs">info</span>.
              </p>

              <p>
                Additionally, it can have one of two options passed through the
                closeType prop:
                <span className="docs">icon</span> and{' '}
                <span className="docs">button</span>. The default behavior is to
                remain on the page. See below for how to automatically close
                Alerts after a period of time.
              </p>

              <p>
                First, import the actions, mountPoint, and Alert pieces, and
                render the mount point somewhere in the page:
              </p>

              <Snippet tag="s1" src={snippets} />

              {/* s7:start */}
              <AlertMountPoint />
              {/* s7:end */}
              <Snippet tag="s7" src={snippets} />
              <p>
                This function creates a button which, when clicked, will launch
                the alert. The button's
                <span className="docs">onClick</span> calls{' '}
                <span className="docs">openAlert</span>, which takes the Alert
                component and its props.
              </p>

              <Snippet tag="s2" src={snippets} />

              <p>This function connects the button to the redux actions.</p>

              <Snippet tag="s3" src={snippets} />

              <p>Now we can generate the buttons above:</p>
              <Snippet tag="s4" src={snippets} />

              <p>And render them:</p>
              <Snippet tag="s5" src={snippets} />
              <Snippet tag="s8" src={snippets} />
              <Snippet tag="s9" src={snippets} />
            </Body>
          </Panel>
          <Panel>
            <Header>Automatically Close Alerts</Header>
            <Body>
              <ConnectedSuccessAlertWithTimeoutCloseButton />
              <br />
              <br />
              <p>
                To create an Alert which closes automatically after some time,
                do not pass the Alert a<span className="docs">closeType</span>.
                Instead, set a timeout for the call to
                <span className="docs">closeAlert</span> when you open it:
              </p>

              <Snippet tag="s6" src={snippets} />
            </Body>
          </Panel>
        </div>
      );
    }}
  </Demo>
);
