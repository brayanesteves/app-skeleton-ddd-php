import React, { useEffect } from "react";
import { Tabs, Layout, Row, Col, List, Table, Tooltip,
    Switch, Button, Popconfirm, } from 'antd';
import Task from "./TaskItem";
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const TaskTab = ({ tasks, onTaskToggle, onTaskRemoval, onSearchs }) => {
    return (
        <>
            {/*<List locale={ { emptyText:"There's nothing to do:(" } } dataSource={tasks} renderItem={(task) => 
                (<Task task={task} onTaskToggle={onTaskToggle} onTaskRemoval={onTaskRemoval}  />)
            } pagination={{
                position:'bottom',
                pageSize:10,
            }} />*/}

        <Table columns={[
                    {
                        title: "Id",
                        dataIndex: "id"
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        filteredValue:[onSearchs],
                        onFilter:(value, record) => {
                            return record.name.includes(value)
                        }
                    },
                    {
                        title: "Complete",
                        dataIndex: "completed",
                        render: (_, record) => (
                        <Tooltip title={tasks.completed ? 'Mark as uncompleted' : 'Mark as completed'}>
                            <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} onChange={() => onTaskToggle(record)} defaultChecked={record.completed} />
                        </Tooltip>),
                    },
                    {
                        title: "Action",
                        dataIndex: "action",
                        render: (_, record) => (
                            <Popconfirm title={'Are you sure you want to delete?'} onConfirm={() => {
                                onTaskRemoval(record);
                            }}>
                                <Button className="remove-task-button" type="primary" danger>
                                    X
                                </Button>
                            </Popconfirm>),
                    }
                ]}
                dataSource={tasks}
                >

        </Table>
        </>
    );
};

export default TaskTab;