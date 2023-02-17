//* Library
import React, { useState, useEffect } from "react";
import Api from "src/Api/axiosConfig";

//* Components
import { AddAndEditAbout } from "./Modal_About/Add&Edit_about";
import { DeleteAbout } from "./Modal_About/delete_about";

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

const AboutUs = () => {
  const [about, setAbout] = useState([]);

  //* Call Api to binding data
  useEffect(() => {
    Api.get("/aboutUs_Page")
      .then((response) => response.data)
      .then((data) => {
        setAbout(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //* Function GET data Users
  const getDataAbout = () => {
    Api.get("/aboutUs_Page")
      .then((response) => response.data)
      .then((data) => {
        setAbout(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Modal Add and Edit User
  const [addVisible, setAddVisible] = useState(false);

  //* Completed: Create Object empty to handle Add + Edit User
  const [objUser, setObjUser] = useState({
    id: 0,
    title: "",
    content: "",
    image: "",
    actived: true,
  });

  //* Completed: Get info to Edit User
  const [idAbout, setIdAbout] = useState(0);
  const getInfoEdit = (aboutUS) => {
    //* Open Modal
    setAddVisible(true);

    //* Get index item
    setIdAbout(aboutUS.id);

    //* Binding data of user to edit
    setObjUser({
      id: aboutUS.id,
      title: aboutUS.title,
      content: aboutUS.content,
      image: aboutUS.image,
      actived: aboutUS.actived,
    });
  };

  //* Completed: Get info to Delete User
  const [showDlt, setShowDlt] = useState(false);
  const getInfoDelete = (aboutID) => {
    setIdAbout(aboutID);
    setShowDlt(true);
  };

  //* Completed: Search User Name
  const [searchTitle, setSearchTitle] = useState("");
  const getInfoTitle = (e) => {
    setSearchTitle(() => e.target.value);

    if (e.target.value == "") {
      getDataAbout();
    } else {
      Api.get("/aboutUs_Page")
        .then((response) => response.data)
        .then((about) => {
          setAbout([
            ...about.filter((item) => {
              if (
                item.title.toLowerCase().includes(e.target.value.toLowerCase())
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

  //* Completed: Active User
  const activeAbout = (ABOUT, e) => {
    ABOUT.actived = e.target.checked;
    Api.put(`/aboutUs_Page/${ABOUT.id}`, ABOUT).catch((err) => {
      console.error(err);
    });

    getDataAbout();
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List album</CCardHeader>
        <CCardBody>
          <CRow>
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
                    placeholder="Content"
                    aria-label="Type String..."
                    aria-describedby="basic-addon1"
                    value={searchTitle}
                    onChange={getInfoTitle}
                  />
                </div>
              </div>

              <div className="tableParent">
                <Table responsive="sm">
                  <thead style={{ backgroundColor: "rgba(60, 75, 100,0.5)" }}>
                    <tr>
                      <th>No</th>
                      <th>Title</th>
                      <th>Content</th>
                      <th>Image</th>
                      <th>Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {about.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.title}</td>
                        <td>{item.content}</td>
                        <td id="td_image">
                          {item.image.slice(0, 5) === "About" ? (
                            <img
                              src={require(`../../assets/${item.image}`)}
                              alt={item.image}
                            ></img>
                          ) : (
                            item.image
                          )}
                        </td>
                        <td>
                          <CFormSwitch
                            checked={item.actived}
                            onChange={(e) => activeAbout(item, e)}
                          />
                        </td>
                        <td className="tdAction">
                          <span>
                            <FontAwesomeIcon
                              icon={faPen}
                              className="icon pen"
                              onClick={() => getInfoEdit(item)}
                            />
                          </span>
                          <span>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="icon trash"
                              onClick={() => getInfoDelete(item.id)}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CRow>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Completed: Modal Add + Edit*/}
      <AddAndEditAbout
        addVisible={addVisible}
        setAddVisible={setAddVisible}
        about={about}
        setAbout={setAbout}
        objUser={objUser}
        setObjUser={setObjUser}
        idAbout={idAbout}
        getDataAbout={getDataAbout}
      />

      {/* Completed: Modal Confirm Delete */}
      <DeleteAbout
        showDlt={showDlt}
        setShowDlt={setShowDlt}
        idAbout={idAbout}
        about={about}
        setAbout={setAbout}
        getDataAbout={getDataAbout}
      />
    </>
  );
};

export default AboutUs;
