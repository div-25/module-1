import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';

class DeleteCourse extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="mt-5">
                <DeleteCourseModal onUpdateTable={this.props.onUpdateTable.bind(this)}/>
            </div>
        );
    }
}

class DeleteCourseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            ButtonLabel: "Delete Course",
            className: "DeleteCourseModal"
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({modal: this.state.modal == true ? false : true});
    }
    handleSubmit() {
        this.props.onUpdateTable();
        this.setState({modal: false});
    }
    render() {
        return(
            <div>
                <Button color="primary" onClick={this.toggle}>{this.state.ButtonLabel}</Button>
                <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.state.className}>
                    <ModalHeader toggle={this.toggle}>Delete course</ModalHeader>
                    <ModalBody>
                        <RenderForm onUpdateTable={this.handleSubmit.bind(this)}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

class RenderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course_id: null,
        };  

        this.onChangeCourseId = this.onChangeCourseId.bind(this);

        this.deleteCourse = this.deleteCourse.bind(this);
        this.updateTable = this.updateTable.bind(this);
    }

    onChangeCourseId(e) {
        this.setState({
            course_id: e.target.value
        });
    }

    updateTable() {
        this.props.onUpdateTable("Updating table after editing course");
    }

    deleteCourse = async() => {
        axios({
            method: 'delete',
            url: 'http://localhost:5000/api/course/' + this.state.course_id,
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            console.log('Success (Delete Course): ', response);
            this.updateTable();
        }, (error) => {
            console.log('Error (Delete Course): ', error);
        });
    }
    
    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="course-id">Course ID</Label>
                        <Input 
                            type="text" name="course-id" id="course-id" required 
                            value={this.state.course_id} onChange={this.onChangeCourseId} />
                    </FormGroup>
                    <Button color="primary" onClick={this.deleteCourse}>Submit</Button>
                </Form>
            </div>
        );
    }
}
export default DeleteCourse;