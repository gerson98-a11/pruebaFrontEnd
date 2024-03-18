import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, DatePicker, Skeleton, Alert, Flex, notification, Space } from "antd";
import { todoApi } from "../Api/funciones";
import dayjs from 'dayjs';
import ModalTask from "./ModalTask";
const { TextArea } = Input;


const FormTask = ({ itemId, handleCloseModal }) => {
    const [form] = Form.useForm();
    const [initialFormValues, setInitialFormValues] = useState({}); // Estado para manejar los valores iniciales del formulario
    const [loading, setLoading] = useState(false); // Estado para manejar el loading hasta que acrguen los datos 
    const [error, setError] = useState(null); // Estado para manejar el mensaje de error
    const [api, contextHolder] = notification.useNotification();




    useEffect(() => {
        if (!itemId) {
            form.resetFields(); // Esto limpiará todos los campos del formulario
        }
    }, [itemId]);

    useEffect(() => {
        if (itemId) {
            setLoading(true); // Marcar que se están cargando los datos
            // Obtener los datos del elemento por su ID
            todoApi.getItemById(itemId)
                .then(data => {
                    // Actualizar los valores iniciales del formulario con los datos del elemento
                    setInitialFormValues({
                        name: data.name,
                        description: data.description,
                        status: data.status,
                        dueDate: data.dueDate ? dayjs(data.dueDate, "YYYY-MM-DD") : null,
                    });
                    setLoading(false); // Marcar que los datos han sido cargados
                })
                .catch(error => {
                    // Manejar e    rrores si ocurrieron al obtener los datos del elemento
                    console.error('Error al obtener los datos del elemento:', error);
                    setLoading(false); // Marcar que los datos han sido cargados (incluso si hubo un error)
                });
        }
    }, [itemId]); // Ejecutar el useEffect solo cuando itemId cambie

    if (loading) {
        // Mientras se cargan los datos, puedes mostrar un indicador de carga o un mensaje
        return <Skeleton active />;
    }



    // Esta función se llama cuando se envía el formulario
    const onFinish = (values) => {
        // Si hay un ID, significa que se está actualizando un elemento existente
        if (itemId) {
            // Ejecutar la función de actualización del API con los valores del formulario
            todoApi.updateItem(itemId, values.name, values.description, values.status, values.dueDate.format("YYYY-MM-DD"))
                .then(data => {
                    notification.success({
                        message: 'Success',
                        description: 'Item updated successfully',
                    });
                    handleCloseModal()
                    form.resetFields();
                    // Si la actualización es exitosa, imprimir un mensaje en la consola
                    console.log('Task actualizado exitosamente:', data);
                })
                .catch(error => {
                    // Si ocurre un error durante la actualización, imprimir un mensaje de error en la consola
                    console.error('Error al actualizar el ítem:', error);
                });
        } else {
            // Si no hay un ID, significa que se está creando un nuevo elemento
            // Ejecutar la función de agregar ítem del API con los valores del formulario
            todoApi.postItem(values.name, values.description, values.status, values.dueDate.format("YYYY-MM-DD"))
                .then(data => {
                    handleCloseModal()
                    form.resetFields();
                    notification.success({
                        message: 'Success',
                        description: 'Task entered successfull',
                    }); 
                    // Si la creación es exitosa, imprimir un mensaje en la consola
                    console.log('Ítem agregado exitosamente:', data);
                })
                .catch(error => {
                    // Si ocurre un error durante la creación, imprimir un mensaje de error en la consola
                    console.error('Error al agregar el ítem:', error);
                });
        }
    };


    // Esta función se llama cuando el envío del formulario falla
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        setError('Something went wrong. Please check the form.'); // Establecer el mensaje de error en el estado
    };

    return (
        <div>
            {contextHolder}
            {error && <Alert message={error} type="error" />} {/* Mostrar Alert si hay un error */}
            <br />
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                form={form}
                initialValues={initialFormValues} // Asignar los valores iniciales del formulario
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your name!",
                        },
                    ]}
                >
                    <Input /></Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Please input your description!",
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message: "Please input the status!",
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value="done"> Done </Radio>
                        <Radio value="doing"> Doing </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    label="due date"
                    name="dueDate"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Date!",
                        },
                    ]}
                >
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button htmlType="submit" type="primary" >{itemId ? 'Update Task' : 'Save Task'}</Button>
                </Form.Item>
            </Form>

        </div >
    );
};

export default FormTask;
