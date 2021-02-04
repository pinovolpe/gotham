import React, { Component } from "react";
import { Link } from "react-router-dom";
import DetenutiTable from "./detenutiTable";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getDetenuti, deleteDetenuto } from "../services/fakeDetenutiService";
import { getStatus } from "../services/fakeStatusService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./searchBox";

class Detenuti extends Component {
  state = {
    detenuti: [],
    status: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedStatus: null,
    sortColumn: { path: "nomeDetenuto", order: "asc" },
  };

  componentDidMount() {
    const status = [{ _id: "", name: "Tutti" }, ...getStatus()];

    this.setState({ detenuti: getDetenuti(), status });
  }

  handleDelete = (detenuto) => {
    const detenuti = this.state.detenuti.filter((m) => m._id !== detenuto._id);
    this.setState({ detenuti });

    deleteDetenuto(detenuto._id);
  };

  handleLike = (detenuto) => {
    const detenuti = [...this.state.detenuti];
    const index = detenuti.indexOf(detenuto);
    detenuti[index] = { ...detenuti[index] };
    detenuti[index].liked = !detenuti[index].liked;
    this.setState({ detenuti });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleStatoSelect = (stato) => {
    this.setState({ selectedStatus: stato, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedStatus: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedStatus,
      searchQuery,
      detenuti: allDetenuti,
    } = this.state;

    let filtered = allDetenuti;
    if (searchQuery)
      filtered = allDetenuti.filter((m) =>
        m.nomeDetenuto.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedStatus && selectedStatus._id)
      filtered = allDetenuti.filter((m) => m.stato._id === selectedStatus._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const detenuti = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: detenuti };
  };

  render() {
    const { length: count } = this.state.detenuti;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0)
      return <p>Attualmente non ci sono detenuti in Arkham Asylum.</p>;

    const { totalCount, data: detenuti } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.status}
            selectedItem={this.state.selectedStatus}
            onItemSelect={this.handleStatoSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/detenuti/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            Aggiungi detenuto
          </Link>
          <p>Attualmente ci sono {totalCount} detenuti in Arkham Asylum.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <DetenutiTable
            detenuti={detenuti}
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

export default Detenuti;
