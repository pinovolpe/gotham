import React, { Component } from "react";
import { Link } from "react-router-dom";
import GuardieTable from "./guardieTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getGuardie, deleteGuardia } from "../services/fakeGuardieService";
import { getGender } from "../services/fakeGenderService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Guardie extends Component {
  state = {
    guardie: [],
    sesso: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGender: null,
    sortColumn: { path: "nomeGuardia", order: "asc" },
  };

  componentDidMount() {
    const sesso = [{ _id: "", name: "Tutti" }, ...getGender()];

    this.setState({ guardie: getGuardie(), sesso });
  }

  handleDelete = (guardia) => {
    const guardie = this.state.guardie.filter((m) => m._id !== guardia._id);
    this.setState({ guardie });

    deleteGuardia(guardia._id);
  };

  handleLike = (guardia) => {
    const guardie = [...this.state.guardie];
    const index = guardie.indexOf(guardia);
    guardie[index] = { ...guardie[index] };
    guardie[index].liked = !guardie[index].liked;
    this.setState({ guardie });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenderSelect = (sesso) => {
    this.setState({ selectedGender: sesso, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGender: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGender,
      searchQuery,
      guardie: allGuardie,
    } = this.state;

    let filtered = allGuardie;
    if (searchQuery)
      filtered = allGuardie.filter((m) =>
        m.nomeGuardia.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGender && selectedGender._id)
      filtered = allGuardie.filter((m) => m.sesso._id === selectedGender._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const guardie = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: guardie };
  };

  render() {
    const { length: count } = this.state.guardie;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0)
      return <p>Attualmente non ci sono guardie in Arkham Asylum.</p>;

    const { totalCount, data: guardie } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.sesso}
            selectedItem={this.state.selectedGender}
            onItemSelect={this.handleGenderSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/guardie/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Aggiungi guardia
          </Link>
          <p>Attualmente ci sono {totalCount} guardie in Arkham Asylum.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <GuardieTable
            guardie={guardie}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Guardie;
