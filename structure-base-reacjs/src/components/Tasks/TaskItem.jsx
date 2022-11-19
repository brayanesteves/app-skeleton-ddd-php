import React, { useState } from "react";
import { Tooltip, Tag, List, Button, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const Task = ({ task, onTaskRemoval, onTaskToggle }) => {
    return (
        <List.Item actions={[
            <Tooltip title={task.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} onChange={() => onTaskToggle(task)} defaultChecked={task.completed} />
            </Tooltip>,
            <Popconfirm title={'Are you sure you want to delete?'} onConfirm={() => {
                onTaskRemoval(task);
            }}>
                <Button className="remove-task-button" type="primary" danger>
                    X
                </Button>
            </Popconfirm>
        ]}
        className="list-item"
        key={task.id}
        >
            <div className="task-item">
                <Tag color={todo.completed ? 'cyan' : 'red'} className="todo-tag">
                    {task.name}
                </Tag>
            </div>
        </List.Item>
    );
};

export default Task;