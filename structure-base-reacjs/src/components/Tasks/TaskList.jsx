import React, { useEffect, useState, useCallback } from "react";
import { Tabs, Layout, Row, Col, Input, message } from 'antd';
import './assets/css/TaskList.css';
import TaskTab from "./TaskTab";
import TaskForm from "./TaskForm";
import { loadTasks, getTask, createTask, updateTask, deleteTask } from '../../services/taskService';

const { TabPane } = Tabs;
const { Content } = Layout;

const TaskList = () => {
    const [refreshing, setRefreshing]         = useState(false);
    const [tasks, setTasks]                   = useState([]);
    const [activeTasks, setActiveTask]        = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);

    const handleFormSubmit = (task) => {
        console.log('Task to create', task);
        createTask(task).then(onRefresh());
        message.success('Task added!');
    };

    const onSearch = (task) => {

    };

    const handleRemoveTask = (task) => {
        deleteTask(task.id).then(onRefresh());
        message.warn('Task removed');
    };

    const handleToggleTaskStatus = (task) => {
        task.completed = !task.completed;
        updateTask(task).then(onRefresh());
        message.info('Task status removed');
    };

    const refresh = () => {
        loadTasks().then(json => {
            setTasks(json);
            setActiveTask(json.filter(task => task.completed === 0 || task.completed === false));
            setCompletedTasks(json.filter(task => task.completed === 1 || task.completed === true));
        }).then(console.log('Fetch completed'));
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let data = await loadTasks();
        setTasks(data);
        setActiveTask(data.filter(task => task.completed === 0 || task.completed === false));
        setCompletedTasks(data.filter(task => task.completed === 1 || task.completed === true));
        setRefreshing(false);
        console.log('Refresh state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh]);

    return (
        <Layout className="layout">
            <Content state={{padding:'0 50px'}}>
                <div className="taskList">
                    <Row>
                        <Col span={14} offset={5}>
                            <h1>Halcon Bits - Tasks</h1>
                            <TaskForm onFormSubmit={handleFormSubmit} onSearchs={onSearch} />
                            <br />
                            <Tabs defaultActiveKey="all">
                                <TabPane tab="All" key="all">
                                    <TaskTab tasks={tasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} />
                                </TabPane>
                                <TabPane tab="Active" key="active">
                                    <TaskTab tasks={activeTasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} />
                                </TabPane>
                                <TabPane tab="Complete" key="complete">
                                    <TaskTab tasks={completedTasks} onTaskToggle={handleToggleTaskStatus} onTaskRemoval={handleRemoveTask} />
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
    
};

export default TaskList;