import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormTask from './FormTask';

const ModalTask = ({isModalOpen, handleOk, onCancel,  itemId, title}) => {

  return (
    <>

      <Modal title={title} open={isModalOpen} onOk={handleOk} onCancel={onCancel}>
        <FormTask itemId={itemId}/>
      </Modal>
    </>
  );
};
export default ModalTask;