import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import Like from "./common/like";

class GuardieTable extends Component {
  columns = [
    {
      path: "nomeGuardia",
      label: "Nome",
      content: (guardia) => (
        <Link to={`/guardie/${guardia._id}`}>{guardia.nomeGuardia}</Link>
      ),
    },
    { path: "sesso.name", label: "Sesso" },
    {
      key: "like",
      content: (guardia) => (
        <Like
          liked={guardia.liked}
          onClick={() => this.props.onLike(guardia)}
        />
      ),
    },
    {
      key: "delete",
      content: (guardia) => (
        <button
          onClick={() => this.props.onDelete(guardia)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { guardie, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={guardie}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default GuardieTable;
