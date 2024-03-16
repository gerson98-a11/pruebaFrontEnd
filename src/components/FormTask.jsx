import React from "react";
import { Button, Checkbox, Form, Input, Radio, DatePicker } from "antd";
import dayjs from 'dayjs'
import moment from "moment/moment";
const { TextArea } = Input;
const onFinish = (values) => {
    values["dueDate"] = moment(values.dueDate).format("YYYY-MM-DD")
    console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const FormTask = () => (
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
                    message: "Please input your name!",
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
        label="DatePicker"
        name="dueDate"
        >
          <DatePicker format="YYYY-MM-DD"/>

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
export default FormTask;
