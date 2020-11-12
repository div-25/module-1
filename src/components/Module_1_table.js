import React, { Component } from 'react';
import axios from 'axios';
import DynamicTable from './Table';

export default class Module_1_table extends React.Component {
    
    constructor(props) {
        super(props);
        this.updateTable = this.updateTable.bind(this);
        this.state = {
            keys: ["course_id", "course_name", "wef", "mincp", "maxcp", "remarks"]
        };
    }

    updateTable() {
        console.log("Calling updatTable form module_1_table", this.props.isLoading);
        this.props.onUpdateTable("Module-1-table update called");
    }
    
    componentDidMount() {
        console.log("props", this.props);
        this.updateTable();
    }

    render() {
        return (
            ((this.props.isLoading || this.props.data == undefined) || (this.props.data.length == 0)) ? <h3 className="mt-5">No Course Added..</h3> :
            <div className="component mt-5 col-md-offset-2">
                <DynamicTable data={this.props.data} keys={this.state.keys}/>
            </div>
        );
    }
}