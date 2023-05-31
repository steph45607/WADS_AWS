from datetime import datetime, timedelta
import io
from typing import Union
from fastapi import Depends, FastAPI, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import base64
from PIL import Image

conn = mysql.connector.connect(
    host="35.238.148.78",
    user="staniswinata",
    password="staniswinata07",
    database="AWSLibrary",
    auth_plugin="mysql_native_password",
)

global cursor
cursor = conn.cursor()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def decode_blob(blob: str):
    # image = base64.b16decode(blob)
    print("here")
    decoded_image = base64.b64decode(blob)
    print("decoded", decoded_image)
    print("there")
    return decoded_image
    
def insert_book_details(book_id: int, title: str, author: str, image_data: str):
    # base64_image = base64.b64encode(image_data).decode("utf-8")

    cursor.execute(
        "INSERT INTO Books VALUES (%s, %s, %s, %s, %s)",
        (book_id, title, author, image_data, "available")
    )
    conn.commit()

@app.get("/displayBook")
def display_book():
    cursor.execute("SELECT * FROM Books")
    books = cursor.fetchall()
    # print(books)
    # print(books[0])
    # print(books[0][3])
    image = decode_blob(books[0][3])
    # decoded_image = Image.open(io.BytesIO(base64.b64decode(blob)))
    # print(image)
    # print(type(image))
    img = Image.frombytes("RGB",(85,85) , image)
    img.save("test.png")
    # print(image)
    return 0

@app.post("/addBook")
async def add_book_to_database(id: int, title: str, author: str, file: UploadFile):
    # response = requests.get(imageLink)

    # with open(imageLink, "wb") as f:
    #     f.write(response.content)
    with Image.open("./aws_lib/src/assets/" + file.filename) as f:
        encode_image = base64.b64encode(f.tobytes())
        f.write(file.file.read())

    insert_book_details(id, title, author, encode_image)
    
    
    return "submitted"