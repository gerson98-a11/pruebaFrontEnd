import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, DatePicker, Skeleton } from "antd";
import { todoApiPost, todoApi } from "../Api/funciones";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from "moment";
import dayjs from 'dayjs';
dayjs.extend(customParseFormat);
const { TextArea } = Input;

const FormTask = ({ itemId }) => {
    const [dueDate, setDueDate] = useState(null);
    const [initialFormValues, setInitialFormValues] = useState({});
    const [loading, setLoading] = useState(false);
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
                        dueDate: data.dueDate ? moment(data.dueDate) : null, // Si hay una fecha, formatearla con moment.js
                    });
                    setLoading(false); // Marcar que los datos han sido cargados
                })
                .catch(error => {
                    // Manejar errores si ocurrieron al obtener los datos del elemento
                    console.error('Error al obtener los datos del elemento:', error);
                    setLoading(false); // Marcar que los datos han sido cargados (incluso si hubo un error)
                });
        }
    }, [itemId]); // Ejecutar el useEffect solo cuando itemId cambie

    if (loading) {
        // Mientras se cargan los datos, puedes mostrar un indicador de carga o un mensaje
        return <Skeleton active />;
    }



    console.log('bro', initialFormValues)
    const onFinish = (values) => {
        if (itemId) { // Si hay un ID, ejecuta la actualización
            todoApi.updateItem(itemId, values.name, values.description, values.status, values.dueDate.format("YYYY-MM-DD"))
                .then(data => {
                    console.log('Ítem actualizado exitosamente:', data);
                })
                .catch(error => {
                    console.error('Error al actualizar el ítem:', error);
                });
        } else { // Si no hay un ID, ejecuta la creación de un nuevo ítem
            todoApiPost.addItem(values.name, values.description, values.status, values.dueDate.format("YYYY-MM-DD"))
                .then(data => {
                    console.log('Ítem agregado exitosamente:', data);
                })
                .catch(error => {
                    console.error('Error al agregar el ítem:', error);
                });
        }
    };


    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
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
                 <DatePicker value={dueDate ? dayjs(dueDate, "YYYY-MM-DD") : ""} format="YYYY-MM-DD" />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormTask;
