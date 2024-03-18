import React, { useState, useEffect } from 'react';
import { Avatar, Card, Badge, Flex, Typography, Spin, Popconfirm, message, Button  } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { todoApi } from '../Api/funciones';
import ModalTask from './ModalTask';
import moment from 'moment';

const { Meta } = Card;
const { Paragraph } = Typography;

const CardTask = () => {
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleOk = () => {
        setIsModalOpen(false); // Cerrar el modal
    };

    const handleCancel = () => {
        setIsModalOpen(false); // Cerrar el modal
    };

    const handleCardClick = (itemId) => {
        setSelectedItemId(itemId); // Guardar el ID seleccionado en el estado
        setIsModalOpen(true); // Abrir el modal
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
      };
    const handleCardClickDelete = (itemId) => {
        // Abre el Popconfirm al hacer clic en el botón Delete


   
    };

    const confirmDelete = (itemId) => {
        todoApi.deleteItem(itemId)
            .then(() => {
                message.success('Task deleted successfully');
                // Actualizar la lista de tareas después de eliminar
                setItems(items.filter(item => item.id !== itemId));
            })
            .catch(error => {
                console.error('Error deleting task:', error);
                message.error('Error deleting task');
            });
    };

    useEffect(() => {
        // Llamar a la función de la API para obtener los datos
        todoApi.getItems()
            .then(data => {
                setItems(data);
                setLoading(false); // Marcar que los datos han sido cargados
            })
            .catch(error => console.error('Error al obtener los datos:', error));
    }, [items]);

    return (
        <>
    {/* Modal para actualizar la tarea */}
    {isModalOpen && (
        <ModalTask
            title="Update the task"
            isModalOpen={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            itemId={selectedItemId}
        />
    )}
    {/* Spinner de carga */}
    {loading ? (
        <Spin size="large" />
    ) : (
        // Renderización de los elementos de la lista
        items.map(item => (
            <Flex wrap="wrap" gap="small" key={item.id}>
                {/* Etiqueta de estado de la tarea */}
                <Badge.Ribbon key={item.id} text={item.status} color={item.status === 'doing' ? 'red' : undefined}>
                    {/* Tarjeta de la tarea */}
                    <Card
                        actions={[
                            // Icono de editar
                            <div key={item.id} onClick={() => handleCardClick(item.id)}><EditOutlined key="edit" /></div>,
                            // Confirmación de eliminación
                            <Popconfirm
                                key={item.id} 
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => confirmDelete(item.id)} // Llama a confirmDelete si se confirma la eliminación
                                onCancel={cancel} // Llama a cancel si se cancela la eliminación
                                okText="Yes"
                                cancelText="No"
                            >
                                {/* Icono de eliminar */}
                                <div key={item.id} onClick={() => handleCardClickDelete(item.id)}><DeleteOutlined key="delete" /></div>
                            </Popconfirm>
                        ]}
                        style={{ width: 300, marginBottom: 16 }}
                    >
                        {/* Avatar de la tarea */}
                        <Meta
                            avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                            title={item.name}
                            description={`Due Date: ${item.dueDate.split('T')[0]}`}
                        />
                        {/* Descripción de la tarea */}
                        <Paragraph
                            key={item.id}
                            ellipsis={{
                                expandable: true,
                                onEllipsis: (ellipsis) => {
                                    console.log('Ellipsis changed:', ellipsis);
                                },
                            }}
                            title={`${item.description}--Tarea`}
                        >
                            {item.description}
                        </Paragraph>
                    </Card>
                </Badge.Ribbon>
            </Flex>
        ))
    )}
</>

    );
};

export default CardTask;
