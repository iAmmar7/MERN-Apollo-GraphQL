import React from "react";
import TextField from "../Common/TextField";

const AddCar = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Add Car</h1>
          <p className="lead text-center">Let's add some info related to car</p>
          <small className="d-block pb-3">* = required fields</small>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Rider Name"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
              info="A name of your new rider"
            />
            <TextFieldGroup
              placeholder="* Contact"
              name="contact"
              type="number"
              value={this.state.contact.toString()}
              onChange={this.onChange}
              error={errors.contact}
              info="Phone number of new rider"
            />
            <TextFieldGroup
              placeholder="Charges Per Delivery"
              name="chargesperdelivery"
              type="number"
              value={this.state.chargesperdelivery.toString()}
              onChange={this.onChange}
              error={errors.chargesperdelivery}
              info="An amount that a rider will charge per delivery"
            />
            <TextFieldGroup
              name="hiredate"
              type="date"
              value={this.state.hiredate.toString()}
              onChange={this.onChange}
              error={errors.hiredate}
              info="When did you hire this rider?"
            />
            {button}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;
