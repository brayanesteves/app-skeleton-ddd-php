import React, { useEffect } from "react";
import { Tabs, Layout, Row, Col, List } from 'antd';
import Task from "./TaskItem";

const TaskTab = ({ tasks, onTaskRemoval, onTaskToggle }) => {
    return (
        <>
            <List locale={ { emptyText:"There's nothing to do:(" } } dataSource={tasks} renderItem={(task) => {
                <Task task={task} onTaskToggle={onTaskToggle} onTaskRemoval={onTaskRemoval}  />
            }} pagination={{
                position:'bottom',
                pageSize:10,
            }} />
        </>
    );
};

export default TaskTab;