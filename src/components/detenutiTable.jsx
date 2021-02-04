import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class DetenutiTable extends Component {
  columns = [
    {
      path: "nomeDetenuto",
      label: "Nome",
      content: (detenuto) => (
        <Link to={`/detenuti/${detenuto._id}`}>{detenuto.nomeDetenuto}</Link>
      ),
    },
    { path: "crimine", label: "Crimine" },
    { path: "stato.name", label: "Status" },
    { path: "dataCarcerazione", label: "Carcerazione" },
    { path: "dataScarcerazione", label: "Scarcerazione" },
    {
      key: "like",
      content: (detenuto) => (
        <Like
          liked={detenuto.liked}
          onClick={() => this.props.onLike(detenuto)}
        />
      ),
    },
    {
      key: "delete",
      content: (detenuto) => (
        <button
          onClick={() => this.props.onDelete(detenuto)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { detenuti, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={detenuti}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default DetenutiTable;
