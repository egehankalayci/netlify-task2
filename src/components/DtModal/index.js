import React, { useEffect } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import './dtmodal.scss';

const DtModal = props => {
  const { isOpen, onRequestClose, contentLabel, children } = props;

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Modal
      isOpen={ isOpen }
      onRequestClose={ onRequestClose }
      contentLabel={ contentLabel }
    >
      <div>
        { children }
      </div>
    </Modal>
  );
};

DtModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

export default DtModal;