//* Library
import React, { useEffect, useState } from "react";
import Api from "src/Api/axiosConfig";

//* Components
import { AddAndEditFaqs } from "./Modal_Faqs/Add&Edit_faqs";
import { DeleteFaqs } from "./Modal_Faqs/delete_faqs";

//* CORE UI + React Bootstrap
import {
  CRow,
  CCard,
  CCardHeader,
  CCardBody,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
import { Button } from "react-bootstrap";

//* Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const FAQs = () => {
  //* Binding data
  const [faqs, setFaqs] = useState([]);

  //* Call Api to binding data
  useEffect(() => {
    Api.get("/listFaqs")
      .then((response) => response.data)
      .then((data) => {
        setFaqs(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //* Function GET data Faqs
  const getDataFaqs = () => {
    Api.get("/listFaqs")
      .then((response) => response.data)
      .then((data) => {
        setFaqs(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //* Modal Add and Edit Faqs
  const [addVisible, setAddVisible] = useState(false);

  //* Completed: Create Object empty to handle Add + Edit User
  const [objUser, setObjUser] = useState({
    id: 0,
    title: "",
    content: [
      {
        question: "",
        answer: "",
      },
    ],
  });

  //* Completed: Get info to Edit User
  const getInfoEdit = (FAQS, index) => {
    //* Open Modal
    setAddVisible(true);

    //* Get index item
    // setindexUser(index);

    //* Binding data of user to edit
    setObjUser({
      id: FAQS.id,
      title: FAQS.title,
      content: [
        {
          question: FAQS.content[0].question,
          answer: FAQS.content[0].answer,
        },
      ],
    });
  };

  //* Completed: Get info to Delete User
  const [showDlt, setShowDlt] = useState(false);
  const [idFaqs, setIdFaqs] = useState(0);
  const getInfoDelete = (faqsID) => {
    setIdFaqs(faqsID);
    setShowDlt(true);
  };

  //* Completed: Search User Name
  const [searchTitle, setSearchTitle] = useState("");
  const getInfoTitle = (e) => {
    setSearchTitle(() => e.target.value);

    if (e.target.value == "") {
      getDataFaqs();
    } else {
      Api.get("/listFaqs")
        .then((response) => response.data)
        .then((FAQS) => {
          setFaqs([
            ...FAQS.filter((item) => {
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

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          FAQs
        </CCardHeader>

        <CCardBody>
          <CRow className="termOfService">
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
                  placeholder="Title..."
                  aria-label="Type String..."
                  aria-describedby="basic-addon1"
                  value={searchTitle}
                  onChange={getInfoTitle}
                />
              </div>
            </div>

            <CAccordion activeItemKey={0}>
              {faqs.map((item, index) => (
                <CAccordionItem itemKey={index + 1} key={index}>
                  <div className="termOfService__header">
                    <CAccordionHeader className="termOfService__header__title">
                      <strong>{item.title}</strong>
                    </CAccordionHeader>

                    <div className="termOfService__header__custom">
                      <Button
                        className="btnEdit"
                        onClick={() => getInfoEdit(item, index)}
                      >
                        Edit Title <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>{" "}
                      <Button
                        className="btnDelete"
                        onClick={() => getInfoDelete(item.id)}
                      >
                        Delete Title <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>

                  {/* Binding Content */}
                  {item.content.map((content, index) => (
                    <CAccordionBody key={index}>
                      <p>
                        <strong>
                          {index + 1}. {content.question}
                        </strong>
                      </p>
                      <p>- {content.answer}</p>
                    </CAccordionBody>
                  ))}
                </CAccordionItem>
              ))}
            </CAccordion>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Completed: Modal Add + Edit*/}
      <AddAndEditFaqs
        addVisible={addVisible}
        setAddVisible={setAddVisible}
        faqs={faqs}
        setFaqs={setFaqs}
        objUser={objUser}
        setObjUser={setObjUser}
        idFaqs={idFaqs}
        getDataFaqs={getDataFaqs}
      />

      {/* Completed: Modal to confirm delete FAQs */}
      <DeleteFaqs
        showDlt={showDlt}
        setShowDlt={setShowDlt}
        faqs={faqs}
        setFaqs={setFaqs}
        idFaqs={idFaqs}
        getDataFaqs={getDataFaqs}
      />

      {/* Completed: Modal to add FAQs */}
      {/* <CModal
        scrollable
        visible={addVisible}
        backdrop="static"
        size="xl"
        onClose={() => setAddVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Add FAQs Title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div className="FAQs__add">
            <div className="FAQs__add__title">
              <label>TITLE</label>
              <input
                type="text"
                value={addData.title}
                onChange={getInfo}
              ></input>
            </div>

            {addQuestion.map((question, index) => (
              <div className="FAQs__add__content" key={index}>
                <label>Question {index + 1}</label>
                <input type="text" onChange={getInfoQuesTion}></input>
                <label>Answer {index + 1}</label>
                <input type="text" onChange={getInfoAnswer}></input>
              </div>
            ))}

            <div>
              <CButton className="btnCancel" onClick={() => AddQuestion()}>
                Add Question
              </CButton>
            </div>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            className="btnCancel"
            onClick={() => setAddVisible(false)}
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            className="btnAdd"
            onClick={() => addTitle()}
          >
            Add
          </CButton>
        </CModalFooter>
      </CModal> */}

      {/* Completed: Modal to Edit FAQs */}
      {/* <CModal
        scrollable
        visible={editVisible}
        backdrop="static"
        size="xl"
        onClose={() => setEditVisible(false)}
      >
        <CModalHeader>
          <CModalTitle>Edit FAQs</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <div>
            <div className="faqs__header">
              <p className="faqs__header__title">{editContent.title}</p>

              <div>
                <CButton
                  className="btnCancel"
                  onClick={() => setRenameVisible(true)}
                >
                  Rename
                </CButton>{" "}
                <CButton className="btnAdd">Add Question</CButton>
              </div>
            </div>

            {editContent.content.map((item, index) => (
              <React.Fragment key={index}>
                <p>
                  <strong>
                    {index + 1}. {item.question}
                  </strong>
                </p>
                <p>- {item.answer}</p>

                <div style={{ margin: "0px 0px 3% 0px" }}>
                  <CButton className="btnEdit">Edit</CButton>{" "}
                  <CButton className="btnDelete">Delete</CButton>
                </div>
              </React.Fragment>
            ))}
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="secondary"
            className="btnCancel"
            onClick={() => setEditVisible(false)}
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            className="btnAdd"
            onClick={() => renameTitle()}
          >
            Aplly
          </CButton>
        </CModalFooter>
      </CModal> */}

      {/* Completed: Modal to Rename */}
      {/* <CModal
        scrollable
        visible={renameVisible}
        backdrop="static"
        size="xl"
        onClose={() => setRenameVisible(false)}
      >
        <CModalBody>
          <div>
            <input
              type="text"
              style={{ width: "100%" }}
              value={editContent.title}
              onChange={getTitle}
            ></input>
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="primary"
            className="btnAdd"
            onClick={() => setRenameVisible(false)}
          >
            Aplly
          </CButton>
        </CModalFooter>
      </CModal> */}
    </>
  );
};

export default FAQs;
