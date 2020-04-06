import React, { Component } from 'react';
import { Col, Container, Row, Table, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import DataTable from './DataTable'
import TaskFormModel from './TaskFormModal';
import { TASK_SERVICE_URL } from '../constants';
export class Home extends Component {
  static displayName = Home.name;
    state = {
        items: []
    }
    componentDidMount() {
        this.getTasks();
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
        this.setState(previous => ({
            items: [...previous, tasks]
        }));
    }
    updateState = (id) => {
        this.getTasks();
    }
    deleteItemFromState = id => {
        const updated = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updated })
    }
  render () {
      return <Container style={{ paddingTop: "100px" }}>
          <Row>
              <Col>
                  <h3>Task manager application</h3>
              </Col>
          </Row>
          <Row>
              <Col>
                   <Table>
                  </Table>
              </Col>
          </Row>
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
                  <TaskFormModel isNew={true} tasks={true}
                      addTaskToState={this.props.updateState} />
              </Col>
          </Row>
      </Container>
  }
}
export default Home;
