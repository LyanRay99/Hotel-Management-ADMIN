//* Library
import React, { useEffect, useState } from "react";
import Api from "src/Api/axiosConfig";

//* Components
import { AddAndEditBanner } from "./Modal/Add&Edit_Banner";
import { DeleteBanner } from "./Modal/delete_Banner";

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

const Banner = () => {
  const [slider, setSlider] = useState([]);

  useEffect(() => {
    Api.get("/listSlider")
      .then((response) => response.data)
      .then((data) => {
        setSlider(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const getDataSlider = () => {
    Api.get("/listSlider")
      .then((response) => response.data)
      .then((data) => {
        setSlider(data);
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
    name: "",
    image: "",
    content: "",
    actived: true,
    dateCreated: "",
    dateUpdated: "",
  });

  //* Completed: Get info to Edit User
  const getInfoEdit = (banner) => {
    //* Open Modal
    setAddVisible(true);

    //* Get index item
    setidBanner(banner.id);

    //* Binding data of user to edit
    setObjUser({
      id: banner.id,
      name: banner.name,
      image: banner.image,
      content: banner.content,
      actived: banner.actived,
      dateCreated: banner.dateCreated,
      dateUpdated: banner.dateUpdated,
    });
  };

  //* Completed: Get info to Delete User
  const [showDlt, setShowDlt] = useState(false);
  const [idBanner, setidBanner] = useState(0);

  const getInfoDelete = (bannerID) => {
    setidBanner(bannerID);
    setShowDlt(true);
  };

  //* Completed: Search User Name
  const [searchSlider, setSearchSlider] = useState("");
  const getInfoSlider = (e) => {
    setSearchSlider(() => e.target.value);

    if (e.target.value == "") {
      getDataSlider();
    } else {
      Api.get("/listSlider")
        .then((response) => response.data)
        .then((slider) => {
          setSlider([
            ...slider.filter((item) => {
              if (
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
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

  //* Completed: Active
  const activeUser = (SLIDER, e) => {
    SLIDER.actived = e.target.checked;
    Api.put(`/listSlider/${SLIDER.id}`, SLIDER).catch((err) => {
      console.error(err);
    });

    getDataSlider();
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Banner</CCardHeader>
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
                    placeholder="Username"
                    aria-label="Type String..."
                    aria-describedby="basic-addon1"
                    value={searchSlider}
                    onChange={getInfoSlider}
                  />
                </div>
              </div>

              <div className="tableParent">
                <Table responsive="sm">
                  <thead style={{ backgroundColor: "rgba(60, 75, 100,0.5)" }}>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Content</th>
                      <th>Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slider.map((slider, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{slider.name}</td>
                        <td id="td_image">
                          {slider.image.slice(0, 6) === "Slider" ? (
                            <img
                              src={require(`../../assets/${slider.image}`)}
                              alt={slider.image}
                            ></img>
                          ) : (
                            slider.image
                          )}
                        </td>
                        <td>{slider.content}</td>
                        <td>
                          <CFormSwitch
                            checked={slider.actived}
                            onChange={(e) => activeUser(slider, e)}
                          />
                        </td>
                        <td className="tdAction">
                          <span>
                            <FontAwesomeIcon
                              icon={faPen}
                              className="icon pen"
                              onClick={() => getInfoEdit(slider)}
                            />
                          </span>
                          <span>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="icon trash"
                              onClick={() => getInfoDelete(slider.id)}
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
      <AddAndEditBanner
        addVisible={addVisible}
        setAddVisible={setAddVisible}
        slider={slider}
        setSlider={setSlider}
        objUser={objUser}
        setObjUser={setObjUser}
        idBanner={idBanner}
        getDataSlider={getDataSlider}
      />

      {/* Completed: Modal Confirm Delete */}
      <DeleteBanner
        showDlt={showDlt}
        setShowDlt={setShowDlt}
        idBanner={idBanner}
        slider={slider}
        setSlider={setSlider}
        getDataSlider={getDataSlider}
      />
    </>
  );
};

export default Banner;
