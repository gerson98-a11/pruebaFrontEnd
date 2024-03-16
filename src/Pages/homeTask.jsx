import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ModalTask from '../components/ModalTask';
const HomeTask = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={()=>showModal()}>Open Modal</Button>
            <ModalTask  isModalOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
        </>
    );
}

export default HomeTask;
