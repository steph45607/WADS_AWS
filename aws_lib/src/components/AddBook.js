import React ,{useState}  from "react";
import Navbar from "./navbar";
import "../styles/addBook.css"
import axios from "axios";

function AddBook(){
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [file, setFile] = useState(null);
    const [valid, setValid] = useState(0);

    const handleSubmit = async (e) => {
        console.log("here")
        e.preventDefault();
        setFile(e.target.files);
        console.log(file)

        const data ={
            id: id,
            title : title,
            author : author,
            file : file
        }

        axios
            .post("http://127.0.0.1:8000/addBook", data,  {
                headers:{
                    "accept" : "application/json",
                    "Content-Type": "multipart/form-data"
                }
            })

            .then((response) => {
                // window.localStorage.setItem("access_token", response.data.access_token)
                // console.log(response.data.access_token)
                // navigate("/dashboard")
                setValid(1)
                console.log("there")
                console.log(response)
            })
            .catch(function(error) {
              console.log(error);
            })
        }


    return(
        <div>
            <Navbar></Navbar>
            <div className="addContainer">
                <h1>Add Book</h1>
                { valid ? (
                    <p className="warning">Book is added to database</p>
                ):(
                    <p className="warning">Error, book is not added to database :(</p>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="inputContainer">
                        <h4>Book ID: </h4>
                        <input type="text" value={id} className="textBox" onChange={(e) => setId(e.target.value)} placeholder="Insert number here"/>
                    </div>
                    <div className="inputContainer">
                        <h4>Title: </h4>
                        <input type="text" value={title} className="textBox" onChange={(e) => setTitle(e.target.value)} placeholder="Insert title here"/>
                    </div>
                    <div className="inputContainer">
                        <h4>Author: </h4>
                        <input type="text" value={author} className="textBox" onChange={(e) => setAuthor(e.target.value)} placeholder="Insert author here"/>
                    </div>
                    <div className="inputContainer">
                        <h4>Image File: </h4>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <div>
                        <button className="btn" type="submit" value="Upload">+ Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
};
    // const [file, setFile] = useState(null);

    // const handleUpload = (event) => {
    //     setFile(event.target.files[0]);
    // };

    // return (
    //     <div>
    //     <AddBook
    //         id="upload-file"
    //         label="Upload File"
    //         accept="image/*"
    //         onUpload={handleUpload}
    //     />
    //     {file && (
    //         <div>
    //         File name: {file.name}
    //         File size: {file.size}
    //         </div>
    //     )}
    //     </div>
    // );


export default AddBook;