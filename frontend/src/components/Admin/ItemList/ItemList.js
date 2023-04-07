import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../AdminHeader/AdminHeader";
import AdminSidebar from "../AdminSidebar/AdminSidebar";

const ItemList = () => {
  const [items, setItems] = useState([]);
  // const [amount, setAmount] = useState([]);
  // const [todayAmount, setTodayAmount] = useState([]);
  // const [today, setToday] = useState([]);
  const [query, setQuery] = useState("");
  const email = sessionStorage.getItem("email");

  useEffect(() => {
    if (email !== "admin@gmail.com") {
      sessionStorage.clear();
      localStorage.clear();
      window.location.assign("/");
    }
  }, [email]);
  useEffect(() => {
    fetch("http://localhost:4200/items")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setItems(data);
        // setAllItem(data);
        // localStorage.setItem('item', JSON.stringify(data));
      });
  }, []);
  // console.log(product)

  const handleDelete = (data) => {
    console.log(data);
    let text = "Are you sure?";
    if (window.confirm(text) === true) {
      fetch(`http://localhost:4200/deleteItem/${data}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          window.alert("Deleted");
          window.location.reload();
        });
    }
  };
  const search = (rows) => {
    if (rows) {
      const columns = rows[0] && Object?.keys(rows[0]);
      return rows?.filter((row) =>
        columns?.some(
          (column) =>
            row[column]
              ?.toString()
              .toLowerCase()
              .indexOf(query?.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <div>
      <AdminHeader />
      <div className="row">
        <div className="col-md-2">
          <AdminSidebar />
        </div>
        <div
          style={{
            backgroundColor: "#FCF4E0",
            height: "100%",
            minHeight: "800px",
          }}
          className="col-md-10 pt-4 d-flex justify-content-center"
        >
          <div className="">
            <div>
              <div className="text-center pb-3 text-danger">
                <h2>
                  <u>Item List</u>
                </h2>
              </div>
              <div className="container  form-inline  d-flex justify-content-center mt-3">
                <label
                  style={{ color: "#E5194B" }}
                  className="font-weight-bold ml-1"
                  htmlFor="filter"
                >
                  Search
                </label>
                <input
                  style={{ borderRadius: "10px" }}
                  className="form-control ml-2 p-1"
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                  }}
                />
              </div>
              {search(items)?.map((item) => (
                <div
                  onClick={() => {
                  }}
                  style={{ backgroundColor: "white", width: "550px" }}
                  className="col-12  mx-4 my-4 pb-3 p-3"
                >
                  <div className="d-flex justify-content-center">
                    <img
                      style={{ width: "150px" }}
                      src={`http://localhost:4200/item/${item.image}`}
                      alt=""
                    />
                  </div>
                  <div>
                    {" "}
                    <div>
                      <h3 className="text-center text-warning my-3">
                        {item.title}
                      </h3>
                      <p
                        style={{ color: "gray", fontWeight: "bold" }}
                        className="text-danger"
                      >
                        Category:{" "}
                        <span className="text-dark">{item.category}</span>
                      </p>
                      <p
                        style={{ color: "gray", fontWeight: "bold" }}
                        className="text-danger"
                      >
                        Short Description:{" "}
                        <span className="text-dark">
                          {item.shortDescription}
                        </span>
                      </p>
                      <p
                        style={{ color: "gray", fontWeight: "bold" }}
                        className="text-danger"
                      >
                        Description:{" "}
                        <span className="text-dark">{item.description}</span>
                      </p>
                      <hr />
                      <h4 className="text-center mt-3">
                        <span style={{ color: "#E5194B" }}>Price:</span>{" "}
                        <span className="text-danger font-weight-bold">
                          {item.price}/-
                        </span>
                      </h4>
                      <div className="row text-center mt-3 p-3">
                        <div className="col-6">
                          <Link
                            to={`/admin/updateItem/${item._id}`}
                            class="btn btn-warning font-weight-bold"
                          >
                            Update Item
                          </Link>
                        </div>
                        <div className="col-6">
                          <button
                            onClick={() => handleDelete(item._id)}
                            class="btn btn-danger font-weight-bold"
                          >
                            Delete Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemList;
