import React, { useEffect, useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import faqsData from "../../Data/faqs.json";

const FAQs = (props) => {
  //* Binding data
  const [faqs, setFaqs] = useState(faqsData.listFaqs);

  //* Open + Close Modal
  const [addVisible, setAddVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [renameVisible, setRenameVisible] = useState(false);
  // const [editVisible, setEditVisible] = useState(false)

  //* Completed: Add UI input to write Question + Answer
  const [addQuestion, setAddQuesTion] = useState([{}]);

  const AddQuestion = () => {
    var Question = {};
    setAddQuesTion([...addQuestion, Question]);
    // console.log(addQuestion)
  };

  //* Completed: Add
  //* Create state
  const [addData, setAddData] = useState({
    title: "",
    content: [
      {
        question: "",
        answer: "",
      },
    ],
  });

  //* Get info to Add title
  const getInfo = (e) => {
    setAddData({
      title: e.target.value,
      content: addData.content,
    });
  };

  const getInfoQuesTion = (e) => {
    setAddData({
      title: addData.title,
      content: [
        {
          question: e.target.value,
          answer: addData.content[0].answer,
        },
      ],
    });
  };

  const getInfoAnswer = (e) => {
    setAddData({
      title: addData.title,
      content: [
        {
          question: addData.content[0].question,
          answer: e.target.value,
        },
      ],
    });
  };

  //* Add title
  const addTitle = () => {
    //* check text input có bị trùng với 1 trong các todo đã có hay ko
    var checkTodoText = true;
    var SttTodo = 0;
    faqs.map((faqs, index) => {
      if (faqs.title === addData.title) {
        checkTodoText = false;
        SttTodo = index + 1;
      }
    });

    console.log(addData);
    //* Check text input có phải toàn space hay ko
    var checkSpaceText = addData.title.replace(/\s/g, "").length;
    var checkQuestion = addData.content[0].question.replace(/\s/g, "").length;
    var checkAnswer = addData.content[0].answer.replace(/\s/g, "").length;

    if (
      addData.title !== "" &&
      checkTodoText &&
      checkSpaceText &&
      checkQuestion &&
      checkAnswer
    ) {
      setFaqs([...faqs, addData]);

      //* Reset state
      setAddData({
        title: "",
        content: [
          {
            question: "",
            answer: "",
          },
        ],
      });

      //* Close Modal Add
      setAddVisible(false);
    }

    //* Hiển thị thông báo khi User thêm title todo bị trùng hoặc chỉ chứa toàn dấu space
    if (
      addData.title === "" ||
      checkSpaceText === 0 ||
      checkQuestion === 0 ||
      checkAnswer === 0
    ) {
      alert("Vui lòng nhập title bạn cần làm vào ô dưới");
    } else if (checkTodoText === false) {
      alert(`Tiêu đề của bạn hiện đang bị trùng tại dòng thứ ${SttTodo}`);
    }
  };

  //TODO: Edit
  const [editContent, setEditContent] = useState({
    id: "",
    title: "",
    content: [],
  });

  //* Open modal Edit + setstate editTitle
  const editTitle = (item, index) => {
    setEditVisible(!editVisible);
    setEditContent({
      id: index,
      title: item.title,
      content: item.content,
    });
  };

  //* Get title
  const getTitle = (e) => {
    setEditContent({
      id: editContent.id,
      title: e.target.value,
      content: editContent.content,
    });
  };

  //* Rename Title
  const renameTitle = () => {
    setFaqs(
      faqs.filter((item, index) => {
        if (index === editContent.id) {
          item.title = editContent.title;
        }
        return faqs;
      })
    );

    setEditVisible(false);
  };

  //* Completed: Delete
  const deleteTitle = (itemIndex) => {
    setFaqs([
      ...faqs.filter((title, index) => {
        return index !== itemIndex;
      }),
    ]);
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
          <Button className="btnAdd" onClick={() => setAddVisible(!addVisible)}>
            Add Title <FontAwesomeIcon icon={faPlus} />
          </Button>
        </CCardHeader>

        <CCardBody>
          <CRow className="termOfService">
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
                        onClick={() => editTitle(item, index)}
                      >
                        Edit Title <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>{" "}
                      <Button
                        className="btnDelete"
                        onClick={() => deleteTitle(index)}
                      >
                        Delete Title <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </div>

                  {item.content.map((content, index) => (
                    <CAccordionBody key={index}>
                      <p>
                        <strong>{content.question}</strong>
                      </p>
                      <p>{content.answer}</p>
                    </CAccordionBody>
                  ))}
                </CAccordionItem>
              ))}
            </CAccordion>
          </CRow>
        </CCardBody>
      </CCard>

      {/* Completed: Modal to add FAQs */}
      <CModal
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
      </CModal>

      {/* Completed: Modal to Edit FAQs */}
      <CModal
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
      </CModal>

      {/* Completed: Modal to Rename */}
      <CModal
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
      </CModal>
    </>
  );
};

export default FAQs;
