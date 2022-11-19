import React, { useState,useEffect } from "react";
import { Form, Row, Col, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const TaskForm = ({ onFormSubmit, onSearchIn }) => {
    const [searchInput, setSearchInput] = useState('');
    const [form] = Form.useForm();
    const onFinish = () => {
        onFormSubmit({
                 name: form.getFieldValue('name'),
            completed: false
        });
        console.log(form.getFieldValue('name'));
        form.resetFields();
    };

    const onSearchsInput = (a) => {        
        onSearchIn(a)
    };

    useEffect(() => {
        onSearchsInput(searchInput);
        console.log(searchInput);
    }, [searchInput]);

    return(
        <Form form={form} layout={"horizontal"} className="todo-form">
            <Row gutter={20}>
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item name={'name'} rules={[{ required: true, message:'This field is required' }]}>
                        <Input.Search value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="What needs to be done?" onSearch={(value) => {
                            setSearchInput(value)
                        }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Button onClick={onFinish} type="primary" htmlType="submit" block>
                        <PlusCircleFilled />
                        Add Task
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default TaskForm;