
import { useState , useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

import { getDatabase, ref, set, push , onValue, remove , update} from "firebase/database";

function App() {
  const db = getDatabase();

  let [taskadd, setTaskAdd] = useState("");
  let [taskdescription, setTaskDescription] = useState("");
  // taskerror
  let [taskadderror, setTaskAddError] = useState("");
  let [taskdescriptionerror, setTaskDescriptionError] = useState("");
  
  // get data
  let [taskarr, setTaskArr] = useState([]);
  let [change, setChange] = useState(true);

  // model show
  let [modal, setModal] = useState(false);

    // setTaskEdit
    let [taskaddedit, setTaskAddEdit] = useState("");
    let [taskdescribetionedit, setTaskDescriptionEdit] = useState("");
    // get id
    let [editid, setEditId] = useState("");


  let submitHandler = (e) => {
    e.preventDefault();

    if (taskadd === "") {
      setTaskAddError('Please Input Task Name');
    }
    else if (taskdescription === "") {
      setTaskDescriptionError('Please Input Task Description');
    }
    else {
      set(push(ref(db, 'test')), {
        id: Date.now(),
        taskadd: taskadd,
        taskdescription: taskdescription,
      }).then(() => {
        setChange(!change);
      });
      setTaskAddError("");
      setTaskDescriptionError("");
    }
  }

  let handleDelete = (keyId) => {
    const taskRef = ref(db, 'test/' + keyId);
    remove(taskRef).then(() => {
      setChange(!change);
    });
  }

  const editTaskModal = (item) => {
    console.log()
    setTaskAddEdit(item.taskadd);
    setTaskDescriptionEdit(item.taskdescription);
    setEditId(item.keyId);
    setModal(true);
  }

  const setUpdateAction = () => {
    const todoRef = ref(db, 'test/' + editid);
    update(todoRef, {
      taskadd : taskaddedit,
      taskdescription : taskdescribetionedit,
    });
    setModal(false);
    setChange(!change);
  }


  useEffect(() => {
    const taskRef = ref(db, 'test');
    let arr = [];
    onValue(taskRef, (snapshot) => {
      snapshot.forEach((item) => {
        let taskinfo = {
          keyId: item.key,
          taskadd: item.val().taskadd,
          taskdescription: item.val().taskdescription
        }
        arr.push(taskinfo);
      });
      setTaskArr(arr);
    });
  }, [change]);

  return (
    <>
      <Container>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Name</Form.Label>
              <Form.Control onChange={(e) => setTaskAdd(e.target.value)} type="text" placeholder="Task Name" />
              {taskadderror && <Form.Text className="text-danger">{taskadderror}</Form.Text>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Task Description</Form.Label>
              <Form.Control onChange={(e) => setTaskDescription(e.target.value)} type="text" placeholder="Task Description" />
              {taskdescriptionerror && <Form.Text className="text-danger">{taskdescriptionerror}</Form.Text>}
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitHandler}>
              Submit
            </Button>
          </Form>
        </Row>


        <Row className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SL No</th>
                <th>task-name</th>
                <th>task-description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {taskarr.map((item) => (
                 <tr>
                 <td key= {item.id}>{item.id}</td>
                 <td>{item.taskadd}</td>
                 <td>{item.taskdescription}</td>
                 <td>
                   <ButtonGroup aria-label="Basic example">
                   <Button variant="primary" onClick = {() => editTaskModal(item)} >Edit</Button>
                    <Button variant="danger" onClick={() => handleDelete(item.keyId)}>Delete</Button>
                   </ButtonGroup>
                 </td>
               </tr>
              ))}
              
            </tbody>
          </Table>


            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control value = {taskaddedit} type="text" onChange = {(e) => setTaskAddEdit(e.target.value)} placeholder="Enter task" />
                        </Form.Group>
                    </Form>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control value = {taskdescribetionedit} type="text" onChange = {(e) => setTaskDescriptionEdit(e.target.value)} placeholder="Enter task" />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => setModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => setUpdateAction()}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>



        </Row>
      </Container>
    </>
  );
}

export default App;
