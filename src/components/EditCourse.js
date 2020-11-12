import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';

class EditCourse extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="mt-5">
                <EditCourseModal onUpdateTable={this.props.onUpdateTable.bind(this)}/>
            </div>
        );
    }
}

class EditCourseModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            ButtonLabel: "Edit Course",
            className: "EditCourseModal"
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
                    <ModalHeader toggle={this.toggle}>Edit course</ModalHeader>
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
            course_name: "",
            wef: "",
            mincp: null,
            maxcp: null,
            remarks: "",
        };  

        this.onChangeCourseId = this.onChangeCourseId.bind(this);
        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeWef = this.onChangeWef.bind(this);
        this.onChangeMinCp = this.onChangeMinCp.bind(this);
        this.onChangeMaxCp = this.onChangeMaxCp.bind(this);
        this.onChangeRemarks = this.onChangeRemarks.bind(this);

        this.saveCourse = this.saveCourse.bind(this);
        this.updateTable = this.updateTable.bind(this);
    }

    onChangeCourseId(e) {
        this.setState({
            course_id: e.target.value
        });
    }

    onChangeCourseName(e) {
        this.setState({
            course_name: e.target.value
        });
    }

    onChangeWef(e) {
        this.setState({
            wef: e.target.value
        });
    }

    onChangeMinCp(e) {
        this.setState({
            mincp: e.target.value
        });
    }

    onChangeMaxCp(e) {
        this.setState({
            maxcp: e.target.value
        });
    }

    onChangeRemarks(e) {
        this.setState({
            remarks: e.target.value
        });
    }

    updateTable() {
        this.props.onUpdateTable("Updating table after editing course");
    }

    saveCourse = async() => {
        const newCourse = {
            course_id: this.state.course_id,
            course_name: this.state.course_name,
            wef: this.state.wef,
            mincp: this.state.mincp,
            maxcp: this.state.maxcp,
            remarks: this.state.remarks
        };

        axios({
            method: 'patch',
            url: 'http://localhost:5000/api/course/' + this.state.course_id,
            headers: {'Content-Type': 'application/json'},
            data: newCourse
        }).then((response) => {
            console.log('Success (Edit Course): ', response);
            this.updateTable();
        }, (error) => {
            console.log('Error (Edit Course): ', error);
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
                    <FormGroup>
                        <Label for="course-name">Course Name</Label>
                        <Input type="text" name="course-name" id="course-name" required
                            value={this.state.course_name} onChange={this.onChangeCourseName} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="wef">Effective From</Label>
                        <Input type="text" name="wef" id="wef" required
                            value={this.state.wef} onChange={this.onChangeWef} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="mincp">Min Credit Points</Label>
                        <Input type="text" name="mincp" id="mincp" required
                            value={this.state.mincp} onChange={this.onChangeMinCp} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="maxcp">Max Credit Points</Label>
                        <Input type="text" name="maxcp" id="maxcp" required
                            value={this.state.maxcp} onChange={this.onChangeMaxCp} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="remarks">Remarks</Label>
                        <Input type="text" name="remarks" id="remarks" 
                            value={this.state.remarks} onChange={this.onChangeRemarks} />
                    </FormGroup>
                    <Button color="primary" onClick={this.saveCourse}>Submit</Button>
                </Form>
            </div>
        );
    }
}
export default EditCourse;