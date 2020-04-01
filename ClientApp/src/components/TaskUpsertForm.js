import React, { Component } from 'react'
import { Button, Form, FromGroup, Input, Label } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { TASK_SERVICE_URL } from '../constants';
class TaskUpsertForm extends Component {
    state = {
        taskId: 0,
        taskDescription: '',
        priority: 0,
        parentTaskId: 0,
        startDate: '',
        endDate: ''

    }
    componentDidMount() {
        if (this.props.tasks) {
            const { taskId, taskDescription, priority, parentTaskId, startDate, endDate } = this.props.tasks;
            this.setState({ taskId, taskDescription, priority, parentTaskId, startDate, endDate});
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${TASK_SERVICE_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: this.state.taskId,
                taskDescription: this.state.taskDescription,
                priority: this.state.priority,
                parentTaskId: this.state.parentTaskId,
                startDate: this.state.startDate,
                endDate: this.state.endDate

            })
        })
            .then(res => res.json())
            .then(tasks => {
                this.props.addTaskToState(tasks);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${TASK_SERVICE_URL}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: this.state.taskId,
                taskDescription: this.state.taskDescription,
                priority: this.state.priority,
                parentTaskId: this.state.parentTaskId,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateTaskIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    sliderChange = e => {
        // console.log("changeValue triggered");
        this.setState({ priority: e.target.value });
    };
    render() {
        return <Form onSubmit={this.props.tasks ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="name">Task Details:</Label>
                <Input type="text" name="TaskDet" onChange={this.onChange} value={this.state.taskDescription === '' ? '' : this.state.taskDescription} />
            </FormGroup>
            <FormGroup>
                <Label for="document">Priority:</Label>
                
                <ReactBootstrapSlider
                    value={this.state.priority}
                    change={this.sliderChange}
                    slideStop={this.sliderChange}
                    step={1}
                    max={30}
                    min={0}
                    orientation="horizontal"
                    reversed={true}
                     />
            </FormGroup>
            <FormGroup>
                <Label for="email">Parent Tak:</Label>
                <Input type="email" name="parentTask" onChange={this.onChange} value={this.state.parentTaskId === 0 ? 0 : this.state.parentTaskId} />
            </FormGroup>
            <FormGroup>
                <Label for="phone">Start Date:</Label>
                <Input type="text" name="startDate" onChange={this.onChange} value={this.state.startDate === null ? '' : this.state.startDate}
                 />

            </FormGroup>
            <FormGroup>
                <Label for="phone">End Date:</Label>
                <Input type="text" name="endDate" onChange={this.onChange} value={this.state.endDate === null ? '' : this.state.endDate}
                />

            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
    
}
export default TaskUpsertForm;