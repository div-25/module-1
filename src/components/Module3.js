import React, { Component } from "react";

import axios from 'axios';

import Main from './MainComponent';
import Module_1_table from './Module_1_table';
import AddCourse from './AddCourse';
import EditCourse from './EditCourse';
import DeleteCourse from './DeleteCourse';

class Module3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: []
        }

        this.updateTable = this.updateTable.bind(this);
    }

    updateTable() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/course'
        }).then((response) => {
            console.log('Success: ', response);
            this.setState({
                data: response.data.course,
                isLoading: false
            })
            console.log(this.state.data);
        }, (error) => {
            console.log('Error: ', error);
        });

        console.log('Courses: ', this.state.data);
    }

    componentDidMount() {
        console.log("Module 1 mounted", this.state.data);
        this.updateTable("Module 1 did mount");
    }

    render() {
    return (
      <div className="App">
        {/* <Main /> */}
        <div className="title mt-5">
          <h5><u>Credit Points Master</u></h5>
        </div>
        <AddCourse onUpdateTable={() => this.updateTable()}/>
        <EditCourse onUpdateTable={() => this.updateTable()}/>
        <DeleteCourse onUpdateTable={() => this.updateTable()}/>
        <Module_1_table data={this.state.data} onUpdateTable={() => this.updateTable()} isLoading={this.state.isLoading}/>
      </div>
    );
  }
}

export default Module3;