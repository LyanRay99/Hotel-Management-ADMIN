//* Library
import React, { useEffect, useState } from "react";
import Api from "src/Api/axiosConfig";

//* Components
import { AddAndEditNews } from "./Modal/Add&Edit_News";
import { DeleteNews } from "./Modal/delete_News";

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

const News = () => {
  const [news, setNews] = useState([]);
  //* Call Api to set and binding data
  useEffect(() => {
    Api.get("/news_recent")
      .then((response) => response.data)
      .then((data) => {
        setNews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //* Function GET data News
  const getDataNews = () => {
    Api.get("/news_recent")
      .then((response) => response.data)
      .then((data) => {
        setNews(data);
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
    time: "",
    date: "",
    month: "",
    monthNumber: "",
    year: "",
    image: "",
    imageMain: "",
    imageSup: "",
    author: "",
    tags: [],
    content: [""],
    comment: [],
  });

  //* Completed: Get info to Edit News
  const [indexNews, setIndexNews] = useState(0);
  const getInfoEdit = (news, index) => {
    //* Open Modal
    setAddVisible(true);

    // //* Get index item
    setIndexNews(index);

    //* Binding data of user to edit
    setObjUser({
      id: news.id,
      name: news.name,
      time: news.time.slice(0, 5),
      date: news.date,
      month: news.month,
      monthNumber: news.monthNumber,
      year: news.year,
      image: news.image,
      imageMain: news.imageMain,
      imageSup: news.imageSup,
      author: news.author,
      tags: news.tags,
      content: news.content,
      comment: news.comment,
    });
  };

  //* Completed: Get info to Delete News
  const [showDlt, setShowDlt] = useState(false);
  const getInfoDelete = (newsIndex) => {
    setIndexNews(newsIndex);
    setShowDlt(true);
  };

  //* Completed: Active
  const activeNews = (NEWS, e) => {
    NEWS.actived = e.target.checked;
    Api.put(`/news_recent/${NEWS.id}`, NEWS)
      .then(() => {
        getDataNews();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Completed: Search News
  const [searchNews, setSearchNews] = useState("");
  const getInfoNews = (e) => {
    setSearchNews(() => e.target.value);

    if (e.target.value == "") {
      getDataNews();
    } else {
      Api.get("/news_recent")
        .then((response) => response.data)
        .then((news) => {
          setNews([
            ...news.filter((item) => {
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

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>List News & Events</CCardHeader>
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
                    placeholder="News..."
                    aria-label="Type String..."
                    aria-describedby="basic-addon1"
                    onChange={getInfoNews}
                  />
                </div>
              </div>

              <div className="tableParent">
                <Table responsive="sm">
                  <thead style={{ backgroundColor: "rgba(60, 75, 100,0.5)" }}>
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Time</th>
                      <th>Date</th>
                      <th>Author</th>
                      <th>Tags</th>
                      <th>Image</th>
                      <th>Content</th>
                      <th>Actived</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {news.map((news, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{news.name}</td>
                        <td>{news.time.slice(0, 5)}</td>
                        <td>
                          {news.date}/{news.monthNumber}/{news.year}
                        </td>
                        <td>{news.author}</td>
                        <td>
                          {news.tags.map((item, index) =>
                            index ? (
                              <span key={index}> - {item}</span>
                            ) : (
                              <span key={index}>{item}</span>
                            )
                          )}
                        </td>
                        <td>
                          {news.image.slice(0, 5) === "Event" ? (
                            <img
                              src={require(`../../assets/${news.image}`)}
                              alt={news.image}
                            ></img>
                          ) : (
                            news.image
                          )}
                        </td>
                        <td>{news.content[0]}</td>
                        <td>
                          <CFormSwitch
                            checked={news.actived}
                            onChange={(e) => activeNews(news, e)}
                          />
                        </td>
                        <td className="tdAction">
                          <span>
                            <FontAwesomeIcon
                              icon={faPen}
                              className="icon pen"
                              onClick={() => getInfoEdit(news, index)}
                            />
                          </span>
                          <span>
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="icon trash"
                              onClick={() => getInfoDelete(index)}
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
      <AddAndEditNews
        addVisible={addVisible}
        setAddVisible={setAddVisible}
        news={news}
        setNews={setNews}
        objUser={objUser}
        setObjUser={setObjUser}
        getDataNews={getDataNews}
        indexNews={indexNews}
      />

      {/* Completed: Modal Confirm Delete */}
      <DeleteNews
        showDlt={showDlt}
        setShowDlt={setShowDlt}
        news={news}
        getDataNews={getDataNews}
        indexNews={indexNews}
      />
    </>
  );
};

export default News;
