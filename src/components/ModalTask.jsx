import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import FormTask from './FormTask';

const ModalTask = ({isModalOpen, handleOk, onCancel}) => {

  return (
    <>

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={onCancel}>
        <FormTask/>
      </Modal>
    </>
  );
};
export default ModalTask;