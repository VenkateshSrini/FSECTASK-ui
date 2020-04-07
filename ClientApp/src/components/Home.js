import React, { Component } from 'react';
import { Col, Container, Row, Table, Button, Form, FormGroup, Input, Label } from 'reactstrap';

import DataTable from './DataTable'
import TaskFormModel from './TaskFormModal';
import { TASK_SERVICE_URL } from '../constants';
export class Home extends Component {
    static displayName = Home.name;
    state = {
        taskDescription: '',
        priorityFrom: 0,
        priorityTo: 0,
        parentTaskId: 0,
        startDate: '',
        endDate: '',
        items: []
       
    }
    componentDidMount() {
        this.getTasks();
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    getTasks = () => {

        fetch(`${TASK_SERVICE_URL}/GetAllTasks`)
            .then(res => {
                console.log("******************");
                console.log(res.status);
                //console.log(res.json());
                console.log("******************");
                return res.json();
            })
            .then(res => this.setState({ items: res }))
            .catch(err => console.log(err));
    }
    addTaskToState = tasks => {
        // this.setState(previous => ({
        //     items: [...previous, tasks]
        // }));
        this.getTasks();
    }
    updateState = (id) => {
        this.getTasks();
    }
    deleteItemFromState = id => {
        const updated = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updated })
    }
    searchAynyTask = e => {
        e.preventDefault();
        const searchParam = new URLSearchParams();
        if (this.state.taskDescription != '')
            searchParam.append('desc', this.state.taskDescription);
        if (this.state.priorityFrom > 0)
            searchParam.append('prtyFrm', this.state.priorityFrom);
        if (this.state.priorityTo > 0)
            searchParam.append('prtyTo', this.state.priorityTo);
        if (this.state.parentTaskId > 0)
            searchParam.append('pId', this.state.parentTaskId);
        if (this.state.startDate != '')
            searchParam.append('sDt', this.state.startDate)
        if (this.state.endDate != '')
            searchParam.append('eDt', this.state.endDate);

        fetch(`${TASK_SERVICE_URL}/GetTaskAnyCriteria?${searchParam.toString()}`)
            .then(response => {
                console.log("*****Get Any criteria*******");
                console.log(response.status);
                //console.log(res.json());
                console.log("******Get Any criteria******");
                return response.json();
            })
            .then(res => this.setState({ items: res }))
            .catch(err => console.log(err));
    }
    
    render() {
        return <Container style={{ paddingTop: "10px" }}>
           
            <Row>
                <Col>
                    <Form onSubmit={this.searchAynyTask}>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <Label for="taskDescription">Task :</Label>
                                    <Input type="text" name="taskDescription"  onChange={this.onChange} value={this.state.taskDescription}
                                     />
                                    
                                </Col>
                                <Col>
                                    <Label for="parentTaskId"> Parent Task :</Label>
                                    <Input type="text" name="parentTaskId" onChange={this.onChange} value={this.state.parentTaskId} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Label for="prioirtyFrom"> Priority From: </Label>
                                    <Input type="text" name="priorityFrom" onChange={this.onChange} value={this.state.priorityFrom} />
                                </Col>
                                <Col>
                                    <Label for="prioirtyTo"> Priority To: </Label>
                                    <Input type="text" name="priorityTo" onChange={this.onChange} value={this.state.priorityTo} />
                                </Col>
                                <Col>
                                    <Label for="startDate"> Date From: </Label>
                                    <Input type="text" name="startDate" onChange={this.onChange} value={this.state.startDate} />
                                </Col>
                                <Col>
                                    <Label for="endDate"> Date To: </Label>
                                    <Input type="text" name="endDate" onChange={this.onChange} value={this.state.endDate} />
                                </Col>
                            </Row>
                            
                        </FormGroup>
                        <Button style={{
                            position: 'relative', left: '48%', top: '35%', alignSelf: 'center'
                        }} >Search</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <hr style={{ boxLines: 'single', color:'black' }} />
            </Row>
            <Row />
            <Row>
                <Col>
                    <DataTable
                        items={this.state.items}
                        updateState={this.updateState}
                        deleteItemFromState={this.deleteItemFromState} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TaskFormModel isNew={true} 
                        addTaskToState={this.addTaskToState} />
                </Col>
            </Row>
        </Container>
    }
}
export default Home;
