import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import BootstrapSlider from 'bootstrap-slider/dist/css/bootstrap-slider.min.css';
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
            .then(response => {
                console.log("*****Get Any criteria*******");
                console.log(response.status);
                //console.log(res.json());
                console.log("******Get Any criteria******");
                return response.json();
            })
            .then(tasks => {
                this.props.toggle();
                this.props.addTaskToState(tasks);
              
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
            .then(response => {
                console.log("*****Get Any criteria*******");
                console.log(response.status);
                console.log(response.json());
                console.log("******Get Any criteria******");
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
                <Label for="taskDescription">Task Details:</Label>
                <Input type="text" name="taskDescription" onChange={this.onChange} value={this.state.taskDescription === '' ? '' : this.state.taskDescription} />
            </FormGroup>
            <FormGroup>
                <Label for="Priority">Priority:</Label>
                
                <ReactBootstrapSlider
                    value={this.state.priority}
                    change={this.sliderChange}
                    slideStop={this.sliderChange}
                    step={1}
                    max={30}
                    min={0}
                    orientation="horizontal"
                    reversed={false}
                     />
            </FormGroup>
            <FormGroup>
                <Label for="parentTaskId">Parent Tak:</Label>
                <Input type="text" name="parentTaskId" onChange={this.onChange} value={this.state.parentTaskId === 0 ? 0 : this.state.parentTaskId} />
            </FormGroup>
            <FormGroup>
                <Label for="startDate">Start Date:</Label>
                <Input type="text" name="startDate" onChange={this.onChange} value={this.state.startDate === null ? '' : this.state.startDate}
                 />

            </FormGroup>
            <FormGroup>
                <Label for="endDate">End Date:</Label>
                <Input type="text" name="endDate" onChange={this.onChange} value={this.state.endDate === null ? '' : this.state.endDate}
                />

            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
    
}
export default TaskUpsertForm;