import React from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export default class Form extends React.Component {
  state = {
    effectiveFrom: "",
    effectiveFromError: "",
    course: "",
    courseError: "",
    minimumCreditPoint: "",
    minimumCreditPointError: "",
    maximumCreditPoint: "",
    maximumCreditPointError: "",
    remarks: "",
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () => {
    let isError = false;
    const errors = {
      minimumCreditPointError: "",
      maximumCreditPointError: "",
    };

    if (this.state.effectiveFrom.length == 0) {
      isError = true;
      errors.effectiveFromError = "Field Cannot be Empty";
    }

    if (this.state.course.length == 0) {
      isError = true;
      errors.courseError = "Field Cannot be Empty";
    }

    if (this.state.minimumCreditPoint.length == 0) {
      isError = true;
      errors.minimumCreditPointError = "Field Cannot be Empty";
    }

    if (this.state.maximumCreditPoint.length == 0) {
      isError = true;
      errors.maximumCreditPointError = "Field cannot be empty";
    }

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      this.props.onSubmit(this.state);
      // clear form
      this.setState({
        effectiveFrom: "",
        effectiveFromError: "",
        course: "",
        courseError: "",
        minimumCreditPoint: "",
        minimumCreditPointError: "",
        maximumCreditPoint: "",
        maximumCreditPointError: "",
        remarks: "",
      });
    }
  };

  render() {
    return (
      <form>
        <TextField
          name="effectiveFrom"
          hintText="2020-21"
          floatingLabelText="Effective From"
          value={this.state.effectiveFrom}
          onChange={e => this.change(e)}
          errorText={this.state.effectiveFromError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="course"
          hintText="Bachelor of Engineering"
          floatingLabelText="Course"
          value={this.state.course}
          onChange={e => this.change(e)}
          errorText={this.state.courseError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="minimumCreditPoint"
          hintText=""
          floatingLabelText="Minimum Credit Point"
          value={this.state.minimumCreditPoint}
          onChange={e => this.change(e)}
          errorText={this.state.minimumCreditPointError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="maximumCreditPoint"
          hintText=""
          floatingLabelText="Maximum Credit Point"
          value={this.state.maximumCreditPoint}
          onChange={e => this.change(e)}
          errorText={this.state.maximumCreditPointError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="remarks"
          hintText=""
          floatingLabelText="Remarks"
          value={this.state.remarks}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <RaisedButton label="Submit" onClick={e => this.onSubmit(e)} primary />
      </form>
    );
  }
}
