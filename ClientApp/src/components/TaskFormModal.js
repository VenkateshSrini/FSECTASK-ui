import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import TaskForm from './TaskUpsertForm';
class TaskFormModel extends Component {
    state = {
        modal: false
    }
    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }
    render() {
        const isNew = this.props.isNew;
        let title = 'Edit Task';
        let button = '';
        if (isNew) {
            title = 'Add Task';
            button = <Button
                color="success"
                onClick={this.toggle}
                style={{ minWidth: "200px" }}>Add Task</Button>;
        } else {
            button = <Button
                color="warning"
                onClick={this.toggle}>Edit Task</Button>;
        }
        return <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                <ModalBody>
                    <TaskForm
                        addTaskToState={this.props.addUserToState}
                        updateTaskIntoState={this.props.updateUserIntoState}
                        toggle={this.toggle}
                        tasks={this.props.tasks} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}
export default TaskFormModel;