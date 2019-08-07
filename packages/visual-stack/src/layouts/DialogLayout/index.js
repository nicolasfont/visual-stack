import React from 'react';
import { Button } from '../../components/Button';
import CloseIcon from 'mdi-react/CloseIcon';
import cn from 'classnames';

import './index.css';
import Spinner from '../../components/Spinner';

function getSubmitButtonText(submitButtonText, showSubmitButtonSpinner) {
  if (showSubmitButtonSpinner) {
    return (
      <React.Fragment>
        <Spinner size="button" /> {submitButtonText}
      </React.Fragment>
    );
  }
  return submitButtonText;
}

export const DialogLayout = ({
  className,
  title,
  cancelButtonText,
  submitButtonText,
  disableSubmit,
  showSubmitButtonSpinner,
  contentSize,
  logo,
  onCancel,
  onSubmit,
  children,
}) => (
  <div className={cn(`vs-dialog-layout`, className)}>
    <div className="vs-dialog-layout-header vs-dialog-layout-page-title">
      <div className="vs-dialog-layout-logo-title-container">
        <div className="vs-dialog-layout-logo-container">
          <span className="vs-cj-logo">{logo}</span>
        </div>

        <h1 className="vs-dialog-layout-title">{title}</h1>
      </div>

      <div className="vs-dialog-layout-button-bar">
        {cancelButtonText && (
          <Button id="vs-dialog-layout-cancel" type="text" onClick={onCancel}>
            {cancelButtonText}
          </Button>
        )}

        {submitButtonText && (
          <Button
            id="vs-dialog-layout-submit"
            type="solid-primary"
            disabled={disableSubmit === true}
            onClick={onSubmit}
          >
            {getSubmitButtonText(submitButtonText, showSubmitButtonSpinner)}
          </Button>
        )}
        {!submitButtonText && !cancelButtonText && (
          <CloseIcon
            className="vs-dialog-layout-icon-close"
            onClick={onCancel}
          />
        )}
      </div>
    </div>
    <div
      className={cn(
        'vs-dialog-layout-content',
        `vs-dialog-layout-content-${contentSize ? contentSize : 'normal'}`
      )}
    >
      {children}
    </div>
  </div>
);

export default DialogLayout;
