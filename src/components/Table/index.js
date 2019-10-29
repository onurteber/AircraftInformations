import React from "react";
import { connect } from "react-redux";
import "./index.css";
import { fetchItems } from "../../store/actions/aircraftActions";
import { Link } from "react-router-dom";
import sort from "../assets/sort.png";

class Table extends React.Component {
  searchTable = () => {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("informationTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td");
      for (j = 1; j < td.length; j++) {
        if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
          found = true;
        }
      }
      if (found) {
        tr[i].style.display = "";
        found = false;
      } else {
        tr[i].style.display = "none";
      }
    }
  };

  sortTable = n => {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("informationTable");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        var cmpX = isNaN(parseInt(x.innerHTML))
          ? x.innerHTML.toLowerCase()
          : parseInt(x.innerHTML);
        var cmpY = isNaN(parseInt(y.innerHTML))
          ? y.innerHTML.toLowerCase()
          : parseInt(y.innerHTML);
        cmpX = cmpX === "-" ? 0 : cmpX;
        cmpY = cmpY === "-" ? 0 : cmpY;
        if (dir === "asc") {
          if (cmpX > cmpY) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (cmpX < cmpY) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  };

  componentWillMount() {
    this.props.fetchItems();
  }

  render() {
    let { states } = this.props.posts;
    let menus;
    if (states) {
      menus = states.map((item, key) => (
        <tr>
          <td>{item[0]}</td>
          <td>{item[1]}</td>
          <td>{item[2]}</td>
          <td>{item[3]}</td>
          <td>{item[4]}</td>
          <td>{item[5]}</td>
          <td>{item[6]}</td>
          <td>{item[7]}</td>
          <td>{item[8]}</td>
          <td>{item[9]}</td>
          <td>{item[10]}</td>
          <td>{item[11]}</td>
          <td>{item[12]}</td>
          <td>{item[13]}</td>
          <td>{item[14]}</td>
          <td>{item[15]}</td>
          <td>{item[16]}</td>
        </tr>
      ));
    }
    const th = [
      ["icao24", 0],
      ["callsign", 1],
      ["origin_country", 2],
      ["time_position", 3],
      ["last_contact", 4],
      ["longitude", 5],
      ["latitude", 6],
      ["baro_altitude", 7],
      ["on_ground", 8],
      ["velocity", 9],
      ["true_track", 10],
      ["vertical_rate", 11],
      ["sensors", 12],
      ["geo_altitude", 13],
      ["squawk", 14],
      ["spi", 15],
      ["position_source", 16]
    ];
    let theadMenu;

    theadMenu = th.map(elem => (
      <th
        style={{ cursor: "pointer" }}
        onClick={() => {
          this.sortTable(elem[1]);
        }}
      >
        {elem[0]}
        <img height="9px" src={sort} />
      </th>
    ));

    return (
      <div style={{ padding: "1px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "75%", marginLeft: "20%" }}>
            <h2 style={{ textAlign: "center" }}>Sivil Uçak Bilgileri</h2>
          </div>
          <div
            style={{
              width: "25%",
              textAlign: "right",
              marginTop: "20px",
              marginRight: "7px"
            }}
          >
            <Link style={{ float: "right", textDecoration: "none" }} to="/map">
              <button
                style={{
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                  textDecoration: "none",
                  outline: "none"
                }}
                onClick={this.goToMapPage}
              >
                Harita Görünümüne Geç
              </button>
            </Link>
          </div>
        </div>
        <input
          type="text"
          onKeyUp={this.searchTable}
          id="searchInput"
          placeholder="Ara.."
          title="Ara..."
        ></input>
        <table id="informationTable">
          <thead>
            <tr>{theadMenu}</tr>
          </thead>
          <tbody>{menus}</tbody>
        </table>
        {this.props.posts.time === undefined
          ? "Yükleniyor..."
          : "TIME: " + this.props.posts.time}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  posts: state.posts.items
});

export default connect(
  mapStateToProps,
  { fetchItems }
)(Table);
