import React, { useState } from 'react';
import { Button, Row, Col, Space, Flex  } from 'antd';
import ModalTask from '../components/ModalTask';
import CardTask from '../components/CardTask';

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
        <div className="content">
            <Col>
                <Row>
                    <Button onClick={showModal}>Crea una nueva tarea</Button>
                </Row>
                <br />
                <Row gutter={16}>
                    <Col>
                        <Flex wrap="wrap" gap="small">
                            <CardTask />
                        </Flex>
                    </Col>
                </Row>
            </Col>
            <ModalTask isModalOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} title="Enter a new task" />
        </div>
    );
}

export default HomeTask;
