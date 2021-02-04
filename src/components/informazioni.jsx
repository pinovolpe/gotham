import React, { Component } from "react";

class AccordionApp extends React.Component {
  render() {
    const title = "";
    const hiddenTexts = [
      {
        label: "Informazioni",
        value:
          "Sei appena stato nominato direttore presso il carcere di Gotham City. Questo programma gestisce i dati anagrafici delle guardie, quelli dei detenuti e i fascicoli personali dei detenuti, con la data di carcerazione, quella di scarcerazione e il crimine commesso. Hai la possibilià di assumere nuove guardie, schedare nuovi carcerati, visualizzare l'elenco per ciascuna categoria ed effettuare ricerche per nome. Puoi inoltre consultare l'andamento del carcere visualizzando il numero totale di guardie e detenuti, il numero di detenuti evasi e il numero di detenuti deceduti all’interno della struttura. Buon divertimento!",
      },
    ];
    return (
      <div>
        <Header title={title} />
        <Accordion hiddenTexts={hiddenTexts} />
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

class Accordion extends React.Component {
  render() {
    return (
      <div className="accordion">
        {this.props.hiddenTexts.map((hiddenText) => (
          <AccordionItem key={hiddenText.label} hiddenText={hiddenText} />
        ))}
      </div>
    );
  }
}

class AccordionItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
    this.state = {
      visibility: false,
    };
  }

  handleToggleVisibility() {
    this.setState((prevState) => {
      return {
        visibility: !prevState.visibility,
      };
    });
  }
  render() {
    const activeStatus = this.state.visibility ? "active" : "";

    return (
      <div>
        <button
          className="accordion__button"
          onClick={this.handleToggleVisibility}
        >
          {this.props.hiddenText.label}
          <span
            className={this.state.visibility ? "fa fa-minus" : "fa fa-plus"}
          ></span>
        </button>
        <p className={`accordion__content ${activeStatus}`}>
          {this.props.hiddenText.value}
        </p>
      </div>
    );
  }
}

export default AccordionApp;
