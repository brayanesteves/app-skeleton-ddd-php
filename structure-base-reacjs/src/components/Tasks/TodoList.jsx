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
    const [completedTasks, setCompletedTasks] = useState();

    const handleFormSubmit = (task) => {
        console.log('Task to create', task);
        createTask(task).then(onRefresh());
        message.success('Task added!');
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
            setActiveTask(json.filter(task => task.completed === false));
            setCompletedTasks(json.filter(task => task.completed === true));
        }).then(console.log('Fetch completed'));
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        let data = await loadTasks;
        setTasks(data);
        setActiveTask(data.filter(task => task.completed === false));
        setCompletedTasks(data.filter(task => task.completed === true));
        setRefreshing(false);
        console.log('Refresh state', refreshing);
    }, [refreshing]);

    useEffect(() => {
        refresh();
    }, [onRefresh]);
    
};

export default TaskList;