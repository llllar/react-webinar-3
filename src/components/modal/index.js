import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import PropTypes from 'prop-types';

const Modal = ({ isOpen = false, onClose = () => {}, children, title = '' }) => {
  if (!isOpen) return null;
  const cn = bem('Modal');

  return (
    <div className={cn('overlay')}>
      <div className={cn('content')}>
        <Head title={title}>
          <button className={cn('close-button')} onClick={onClose}>
            Закрыть
          </button>
        </Head>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
};

export default Modal;
