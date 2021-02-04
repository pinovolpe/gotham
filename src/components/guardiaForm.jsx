import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGuardia, saveGuardia } from "../services/fakeGuardieService";
import { getGender } from "../services/fakeGenderService";

class GuardiaForm extends Form {
  state = {
    data: {
      nomeGuardia: "",
      sessoId: "",
    },
    sesso: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    nomeGuardia: Joi.string().required().label("Nome guardia"),
    sessoId: Joi.string().required().label("Sesso"),
  };

  componentDidMount() {
    const sesso = getGender();
    this.setState({ sesso });

    const GuardiaId = this.props.match.params.id;
    if (GuardiaId === "new") return;

    const guardia = getGuardia(GuardiaId);
    if (!guardia) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(guardia) });
  }

  mapToViewModel(guardia) {
    return {
      _id: guardia._id,
      nomeGuardia: guardia.nomeGuardia,
      sessoId: guardia.sesso._id,
    };
  }

  doSubmit = () => {
    saveGuardia(this.state.data);

    this.props.history.push("/guardie");
  };

  render() {
    return (
      <div>
        <h1>Aggiungi o modifica guardia</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("nomeGuardia", "Nome guardia")}
          {this.renderSelect("sessoId", "Sesso", this.state.sesso)}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default GuardiaForm;
