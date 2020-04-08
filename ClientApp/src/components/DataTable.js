import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { TASK_SERVICE_URL } from '../constants';
import TaskFormModel from './TaskFormModal';
class DataTable extends Component {
    endTask = id => {
        let confirmClose = window.confirm("Are you sure you want to close the task");
        if (confirmClose) {
            fetch(`${TASK_SERVICE_URL}/EndTask?taskID=${id}`, {
                method: 'put'
                
            })
                .then(res => {
                    console.log("******************");
                    console.log(res.status);
                //console.log(res.json());
                    console.log("******************");
                    this.props.deleteItemFromState(id);
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        const items = this.props.items;
        return <Table striped>
            <thead className="thead-dark">
                <tr>
                    <th>Task ID</th>
                    <th>Task</th>
                    <th>Parent Task ID</th>
                    <th>Parent task</th>
                    <th>Priority</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {((!items) || (items.length <= 0)) ?
                    <tr><td colSpan="8" align="center"><b>No Tasks yet</b></td></tr>
                    : items.map(item => (
                        <tr key={item.taskId}>
                            <th scope="row">
                                {item.taskId}
                            </th>
                            <td>
                                {item.taskDescription}
                            </td>
                            <td>
                                {item.parentTaskId}
                            </td>
                            <td>
                                {item.parentDescription}
                            </td>
                            <td>
                                {item.priority}
                            </td>
                            <td>
                                {item.startDate}
                            </td>
                            <td>
                                {item.endDate}
                            </td>
                            <td align="center">
                                <div>
                                    
                                    <TaskFormModel isNew={false} tasks={item}
                                        updateTaskIntoState={this.props.updateState} />
                                         &nbsp;&nbsp;&nbsp;
                                    <Button color="danger" onClick={() => this.endTask(item.taskId)}>End Task</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>;
    }
}
export default DataTable