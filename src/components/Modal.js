import React, { PropTypes } from 'react';
import { Button } from 'vs/components/Button';

/* export const ModalMountPoint =({ component, opts }) =>
  <div id="modal-mount-point">
    <div Component isShown={ props } />
  </div>; */

export const Modal =({ isShown, title, removeApp, cancel }) =>
  <ModalContainer id="ConfirmationModal" isShown={ isShown } >
    <Dialog >
      <Content>
        <Header title={ title }></Header>
          <Body></Body>
          <Footer removeApp={ removeApp } cancel={ () => cancel() }></Footer>
      </Content>
    </Dialog>
   </ModalContainer>;

export const ModalContainer = ({ isShown, children }) =>
   <div className="modal" style={ { display: isShown?'block':'none' } }>
     {children}
   </div>;
Modal.propTypes ={
  isShown: PropTypes.bool,
};

export const Header = ({ title, children }) =>
  <div className="modal-header">
    {title && <legend>{title}</legend>}
    {children}
  </div>;
Header.propTypes = {
  title: PropTypes.string,
};

export const Dialog = ({ children }) =>
  <div className="modal-dialog">
    {children}
  </div>;

export const Content  = ({ children }) =>
  <div className="modal-content">
    {children}
  </div>;

export const Body = ({ children }) =>
  <div className="modal-body">
    {children}
  </div>;

export const Footer = ({ children, removeApp, cancel }) =>
  <div className="modal-footer">
    {children}
    <Button type="info" onClick={() => cancel()}>Cancel</Button>
    <Button type="danger" onClick={() => removeApp()}>Delete Application</Button>
  </div>;


export const Title = ({ children }) =>
  <div className="modal-title">
    {children}
  </div>;
