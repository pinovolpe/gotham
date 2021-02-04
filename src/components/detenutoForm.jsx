import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getDetenuto, saveDetenuto } from "../services/fakeDetenutiService";
import { getStatus } from "../services/fakeStatusService";

class DetenutoForm extends Form {
  state = {
    data: {
      nomeDetenuto: "",
      crimine: "",
      statoId: "",
      dataCarcerazione: "",
      dataScarcerazione: "",
    },
    status: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    nomeDetenuto: Joi.string().required().label("Nome detenuto"),
    crimine: Joi.string().required().label("Crimine commesso"),
    statoId: Joi.string().required().label("Status"),
    dataCarcerazione: Joi.string().required().label("Data di carcerazione"),
    dataScarcerazione: Joi.string().required().label("Data di scarcerazione"),
  };

  componentDidMount() {
    const status = getStatus();
    this.setState({ status });

    const DetenutoId = this.props.match.params.id;
    if (DetenutoId === "new") return;

    const detenuto = getDetenuto(DetenutoId);
    if (!detenuto) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(detenuto) });
  }

  mapToViewModel(detenuto) {
    return {
      _id: detenuto._id,
      nomeDetenuto: detenuto.nomeDetenuto,
      crimine: detenuto.crimine,
      statoId: detenuto.stato._id,
      dataCarcerazione: detenuto.dataCarcerazione,
      dataScarcerazione: detenuto.dataScarcerazione,
    };
  }

  doSubmit = () => {
    saveDetenuto(this.state.data);

    this.props.history.push("/detenuti");
  };

  render() {
    return (
      <div>
        <h1>Aggiungi o modifica detenuto</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("nomeDetenuto", "Nome detenuto")}
          {this.renderInput("crimine", "Crimine commesso")}
          {this.renderSelect("statoId", "Status", this.state.status)}
          {this.renderInput("dataCarcerazione", "Data di carcerazione")}
          {this.renderInput("dataScarcerazione", "Data di scarcerazione")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default DetenutoForm;
