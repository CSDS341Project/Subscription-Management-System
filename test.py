import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS

#start backend flask thing
app = Flask(__name__)
CORS(app)

#if we try to connect to http://18.219.202.94:5000/test, execute this function
@app.route("/test")
def test():
    #connect to DB as root locally on this PC
    mydb = mysql.connector.connect(
        user="root",
        password="CSDS341",
        database="test"
    )
    mycursor = mydb.cursor()

    #get all data from it 
    mycursor.execute("SELECT * FROM relation")
    l = []
    for x in mycursor:
        l.append(x)
    return str(l)

#indefinitely run app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
