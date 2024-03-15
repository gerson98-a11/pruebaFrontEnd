import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Col, Row, Button, Modal, Input, DatePicker, Space, Select, Form, Checkbox, Card } from 'antd'
import { todoApi, todoApiPost } from './funciones/funciones'
const { TextArea } = Input;
import moment from 'moment';
import './App.css'

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoItems, setTodoItems] = useState([]);
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onFinish = (values) => {
    console.log(values)
    // Llama a la función addItem con los datos necesarios
    todoApiPost.addItem(values.name, values.description, values.status)
      .then(response => {
        console.log('Ítem agregado con éxito:', response);
        // imprime un mensaje si se agregaron con exito 
      })
      .catch(error => {
        console.error('Error al agregar el ítem:', error);
        // error al agregar los datos 
      });
  };

  const onChange = (e, date, dateString) => {
    console.log(e, date, dateString);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //useEffect Para cargar los datos 
  useEffect(() => {
    getDatos();
  }, [])

  const getDatos = () => {
    todoApi.getItems()
      .then(data => {
        console.log('Items de la lista de tareas:', data);
        setTodoItems(data); // Opcional: actualizar el estado con los items
      })
      .catch(error => {
        console.error('Error al obtener los items:', error);
      });
  };


  return (
    <>
      <div className='Container'>
        <Button type="primary" onClick={showModal}>
          Crear tarea
        </Button>
        <Modal title="Crea una nueva tarea " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
            initialValues={{
              remember: true,
            }}
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
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="status"
              label="Status">
              <Select>
                <Select.Option value="Doing">Doing</Select.Option>
                <Select.Option value="done">Done</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Date Finish">
              <DatePicker
                format="YYYY-MM-DD"
              />
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
        </Modal>
        <Row>
          <Row>
            <Space direction="vertical" size={[8, 16]}>
              {todoItems.map(item => (
                  <Card
                    key={item.id}
                    title={item.name}
                    extra={<a href="#">More</a>}
                    style={{
                      width: 300,
                    }}
                  >
                    <p>{item.description}</p>
                    <p>{item.status}</p>
                    <p>{item.dueDate}</p>
                  </Card>
              ))}
            </Space>
          </Row>
        </Row>
      </div>

    </>
  )

}

export default App
