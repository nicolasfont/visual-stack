import React, { PropTypes } from 'react';

/* export const ModalMountPoint =({ component, opts }) =>
  <div id="modal-mount-point">
    <div Component isShown={ props } />
  </div>; */

export const ModalRaw = ({isShown}) =>
  <Modal id="ConfirmationModal" isShown2={ isShown } >
    <Dialog>
      <Content>
        <Header title="Confirm Application Delete">
          </Header>
          <Body>

          </Body>
          <Footer></Footer>
      </Content>
    </Dialog>
   </Modal>;


export const Modal = ({ isShown2, children }) =>
   <div className="modal" style={{display:isShown2?'block':'none'}}>
     {children}
   </div>;
 Modal.propTypes = {
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

export const Footer = ({ children }) =>
  <div className="modal-footer">
    {children}
    <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
    <button type="button" className="btn btn-primary">Delete Application</button>
  </div>;


export const Title = ({ children }) =>
  <div className="modal-title">
    {children}
  </div>;
