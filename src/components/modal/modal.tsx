import { FC, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal: FC = ({ children }) => {
  const el = useMemo(() => document.createElement('div'), []);
  useEffect(() => {
    modalRoot?.appendChild(el);
    return () => {
      modalRoot?.removeChild(el);
    };
  }, [el]);
  return ReactDOM.createPortal(children, el);
};

export default Modal;
