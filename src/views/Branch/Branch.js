//* Library
import React, { useState, useEffect } from "react";
import Api from "src/Api/axiosConfig";

//* Components
import { DeleteBranch } from "./Modal/delete_Branch";

//* CORE UI + React Bootstrap
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CFormSwitch,
} from "@coreui/react";
import { Table, Button } from "react-bootstrap";

//* Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const Branch = () => {
  const [branch, setBranch] = useState([]);

  //* Call Api to binding data
  useEffect(() => {
    Api.get("/listRooms")
      .then((response) => response.data)
      .then((data) => {
        setBranch(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //* Function GET data Branchs
  const getDataBranch = () => {
    Api.get("/listRooms")
      .then((response) => response.data)
      .then((data) => {
        setBranch(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //TODO: Edit Branch
  //* Completed: Get info to Delete Branch
  const [showDlt, setShowDlt] = useState(false);
  const [idBranch, setIdBranch] = useState(0);
  const showDeleteBranch = (branchID) => {
    setShowDlt(true);
    setIdBranch(branchID);
  };

  //* Completed: Active Branch
  const activeBranch = (BRANCH, e) => {
    BRANCH.actived = e.target.checked;

    Api.put(`/listRooms/${BRANCH.id}`, BRANCH).catch((err) => {
      console.error(err);
    });

    getDataBranch();
  };

  //* Completed: Search Branch Name
  const [searchBranch, setSearchBranch] = useState("");
  const getInfoFullName = (e) => {
    setSearchBranch(() => e.target.value);

    if (e.target.value == "") {
      getDataBranch();
    } else {
      Api.get("/listRooms")
        .then((response) => response.data)
        .then((user) => {
          setBranch([
            ...branch.filter((item) => {
              if (
                item.nameBranchEN
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              ) {
                return item;
              }
            }),
          ]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List Branch</CCardHeader>
        <CCardBody>
          <CRow>
            <div className="control">
              <div className="select">
                <div className="btn">
                  <Button variant="info">
                    Add <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
              </div>

              <div className="input-group mb-3 search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Branch"
                  aria-label="Type String..."
                  aria-describedby="basic-addon1"
                  value={searchBranch}
                  onChange={getInfoFullName}
                />
              </div>
            </div>

            <div className="tableParent">
              <Table responsive="sm">
                <thead style={{ backgroundColor: "rgba(60, 75, 100,0.5)" }}>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Manager</th>
                    <th>Total room</th>
                    <th>Active</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {branch.map((branch, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{branch.nameBranchEN}</td>
                      <td>{branch.phone}</td>
                      <td>{branch.addressEN}</td>
                      <td>{branch.email}</td>
                      <td>{branch.manager}</td>
                      <td>{branch.roomTotal}</td>
                      <td>
                        <CFormSwitch
                          checked={branch.actived}
                          onChange={(e) => activeBranch(branch, e)}
                        />
                      </td>
                      <td className="tdAction">
                        <span>
                          <FontAwesomeIcon icon={faPen} className="icon pen" />
                        </span>
                        <span>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="icon trash"
                            onClick={() => showDeleteBranch(branch.id)}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </CRow>
        </CCardBody>
      </CCard>
      //* Modal Delete branch
      <DeleteBranch
        showDlt={showDlt}
        setShowDlt={setShowDlt}
        branch={branch}
        setBranch={setBranch}
        idBranch={idBranch}
        getDataBranch={getDataBranch}
      />
    </>
  );
};

export default Branch;
