//* Library
import React, { useState, useEffect } from "react";
import Api from "src/Api/axiosConfig";

//* Components
import { AddAndEditBranch } from "./Modal/Add&Edit_Branch";
import { DeleteBranch } from "./Modal/delete_Branch";

//* Function feature
import { toNonAccentVietnamese } from "src/components/Others/others";

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

  //* Modal Add and Edit Branch
  const [addVisible, setAddVisible] = useState(false);
  const [indexBranch, setIndexBranch] = useState(0);

  //* Completed: Create Object empty to handle Add + Edit Branch
  const [objUser, setObjUser] = useState({
    id: 0,
    nameBranchEN: "",
    nameBranchVN: "",
    phone: "",
    addressVN: "",
    addressEN: "",
    email: "",
    roomTotal: 0,
    manager: "",
    actived: true,
    dateCreated: "",
    dateUpdated: "",
    numberOfMember: [],
    roomType: [],
  });

  //* Completed: Get info to Edit Branch
  const getInfoEdit = (branch, index) => {
    //* Open Modal
    setAddVisible(true);

    //* Set index of Branch
    setIndexBranch(index);

    //* Binding data of Branch to edit
    setObjUser({
      id: branch.id,
      nameBranchEN: branch.nameBranchEN,
      nameBranchVN: branch.nameBranchVN,
      phone: branch.phone,
      addressVN: branch.addressVN,
      addressEN: branch.addressEN,
      email: branch.email,
      roomTotal: branch.roomTotal,
      manager: branch.manager,
      actived: branch.actived,
      dateCreated: branch.dateCreated,
      dateUpdated: branch.dateUpdated,
      numberOfMember: branch.numberOfMember,
      roomType: branch.roomType,
    });
  };

  //* Completed: Get info to Delete Branch
  const [showDlt, setShowDlt] = useState(false);
  const [idBranch, setIdBranch] = useState(0);

  //* Get data to delete Branch
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
        .then(() => {
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
                  <Button variant="info" onClick={() => setAddVisible(true)}>
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
                        <span onClick={() => getInfoEdit(branch, index)}>
                          <FontAwesomeIcon icon={faPen} className="icon pen" />
                        </span>
                        <span onClick={() => showDeleteBranch(branch.id)}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="icon trash"
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

      {/* Completed: Modal Add & Edit branch */}
      <AddAndEditBranch
        addVisible={addVisible}
        setAddVisible={setAddVisible}
        branch={branch}
        setBranch={setBranch}
        objUser={objUser}
        setObjUser={setObjUser}
        idBranch={idBranch}
        getDataBranch={getDataBranch}
        toNonAccentVietnamese={toNonAccentVietnamese}
        indexBranch={indexBranch}
      />

      {/* Completed: Modal Delete branch */}
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
