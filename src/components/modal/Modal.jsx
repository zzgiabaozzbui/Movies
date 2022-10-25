import React, {useState,useEffect,useRef} from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

const Modal = props => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);
  
  return (
    <div id={props.id} className={`modal ${active? 'active' : ''}`}>
      {props.children}
      
    </div>
  )
}

Modal.propTypes = {
    active: PropTypes.bool,
    is: PropTypes.string
}

export const ModalContent = props =>{
  const contentRef = useRef(null);

  const closeModal = () =>{
    console.log("close")
    contentRef.current.parentNode.classList.remove('active');
    if(props.onClose) props.onClose();
  } 
  return(
    <div ref = {contentRef} className = "modal__content">
      <div className="modal__content__close" >
        <i className="bx bx-x" onClick={closeModal}></i>
      </div>
      {props.children}
      
    </div>
  )
}

export default Modal;