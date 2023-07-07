import { useEffect, useRef, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Button, FloatingLabel, Form, ModalTitle } from "react-bootstrap";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import api from "~/api/api";

function AddUser({ cx, styles, setUsers }) {
  const [show, setShow] = useState(false);
  const nameInputRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", image);

    if (!name || !email || !phone || !image) {
      setErrorMessage("Please enter all information!");
      return;
    }

    try {
      const response = await api.post("/admin/add-user", formData);
      // setNewUser({});
      setShow(false);
      setName("");
      setEmail("");
      setPhone("");
      setImage(null);
      setErrorMessage("");

      // Gọi lại API để lấy danh sách người dùng và cập nhật state
      const getUsersResponse = await api.get("/users");
      setUsers(getUsersResponse.data);

      toast.success("User added successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      // setErrorMessage('Failed to add user');
      toast.error("Error adding user!");
      console.error(error);
    }
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    // setNewUser({});
    setName("");
    setEmail("");
    setPhone("");
    setImage(null);
    setErrorMessage("");
  };

  useEffect(() => {
    if (show) {
      nameInputRef.current.focus();
    }
  }, [show]);

  const addUserForm = [
    {
      label: (
        <>
          User Name{" "}
          <span
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: "*" }}
          />
        </>
      ),
      type: "text",
      id: "name",
      value: name,
      onChange: handleNameChange,
    },
    {
      label: (
        <>
          User Email{" "}
          <span
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: "*" }}
          />
        </>
      ),
      type: "email",
      id: "email",
      value: email,
      onChange: handleEmailChange,
    },
    {
      label: (
        <>
          User Phone Number{" "}
          <span
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: "*" }}
          />
        </>
      ),
      type: "number",
      id: "phone",
      value: phone,
      onChange: handlePhoneChange,
    },
    {
      label: (
        <>
          Avatar{" "}
          <span
            style={{ color: "red" }}
            dangerouslySetInnerHTML={{ __html: "*" }}
          />
        </>
      ),
      type: "file",
      id: "image",
      onChange: handleImageChange,
    },
  ];

  return (
    <>
      <Button
        size="lg"
        variant="primary"
        className={"mb-4"}
        onClick={handleShow}
      >
        <IoMdAddCircle className={cx("icon-action")} />
      </Button>

      <Modal show={show} backdrop={"static"} centered onHide={handleClose}>
        <Modal.Header closeButton>
          <ModalTitle>Add User</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          {errorMessage && <p className={"text-danger"}>{errorMessage}</p>}
          {/*{successMessage && <p>{successMessage}</p>}*/}

          <Form inline="true" className={cx("form-user")}>
            {addUserForm.map((form, index) => (
              <FloatingLabel
                key={index}
                label={form.label}
                className="mr-sm-2 mb-2"
              >
                <Form.Control
                  ref={form.id === "name" ? nameInputRef : null}
                  type={form.type}
                  id={form.id}
                  value={form.value}
                  onChange={form.onChange}
                  size="lg"
                  style={{ minHeight: "40px" }}
                  required
                />
              </FloatingLabel>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddUser;

// <form onSubmit={handleSubmit}>
//     <div>
//         <label htmlFor="name">Name</label>
//         <input type="text" id="name" value={name} onChange={handleNameChange}/>
//     </div>
//     <div>
//         <label htmlFor="email">Email</label>
//         <input type="email" id="email" value={email} onChange={handleEmailChange}/>
//     </div>
//     <div>
//         <label htmlFor="phone">Phone</label>
//         <input type="text" id="phone" value={phone} onChange={handlePhoneChange}/>
//     </div>
//     <div>
//         <label htmlFor="image">Image</label>
//         <input type="file" id="image" onChange={handleImageChange}/>
//     </div>
//     <button type="submit">Add User</button>
// </form>
