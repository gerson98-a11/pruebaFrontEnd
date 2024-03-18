import React, { useState, Flex  } from 'react';
import { Button, Modal } from 'antd';
import FormTask from './FormTask';

const ModalTask = ({isModalOpen, handleOk, onCancel,  itemId, title,  }) => {
  const handleCloseModal = () => {
    onCancel(); // Llamar a la función para cerrar el modal
  };

  return (
    <>

      <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={onCancel} footer= {false}>
        <FormTask itemId={itemId} handleCloseModal={handleCloseModal}  />
      </Modal>
    </>
  );
};
export default ModalTask;