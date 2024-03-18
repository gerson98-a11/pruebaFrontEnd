import React, { useState } from 'react';
import { Button, Row, Col, Space, Flex } from 'antd';
import ModalTask from '../components/ModalTask';
import CardTask from '../components/CardTask';

const HomeTask = () => {
    // Estado para controlar la apertura y cierre del modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    // Función para manejar la acción OK del modal
    const handleOk = () => {
        setIsModalOpen(false);
    };

    // Función para manejar la acción Cancel del modal
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="content">
            {/* Botón para abrir el modal */}
            <Col>
                <Row>
                    <Button onClick={showModal}>Create a new task</Button>
                </Row>
                <br />
                <Row gutter={16}>
                    <Col>
                        {/* Renderización de los componentes CardTask */}
                        <Flex wrap="wrap" gap="small">
                            <CardTask />
                        </Flex>
                    </Col>
                </Row>
            </Col>
            {/* Modal para ingresar una nueva tarea */}
            <ModalTask isModalOpen={isModalOpen} onOk={handleOk} onCancel={handleCancel} title="Enter a new task" />
        </div>
    );
}

export default HomeTask;
