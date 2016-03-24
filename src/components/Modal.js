import React, { PropTypes } from 'react';


export const Modal = ({ isShown, children }) =>
   <div className="modal" style={{display:isShown?'block':'none'}}>
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

export const FFooter = ({ children }) =>
  <div className="modal-footer">
    {children}
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-primary">Save changes</button>
  </div>;

export const Title = ({ children }) =>
  <div className="modal-title">
    {children}
  </div>;

// <!-- Modal -->
// <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
//   <div class="modal-dialog" role="document">
//     <div class="modal-content">
//
//       <div class="modal-body">
//         ...
//       </div>
//       <div class="modal-footer">
//         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
//         <button type="button" class="btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
