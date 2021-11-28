import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
CLI = False
mycursor = None
username = None

#start backend flask thing
app = Flask(__name__)
CORS(app)

#Log into DBMS with account. If true, login successful and HTML can change
#If can't log in, indicate with false
@app.route("/login")
def login():
    global mycursor
    global username
    if CLI:
        username = input("Username: ")
        passwrd = input("Password: ")
        try:
            mydb = mysql.connector.connect(
                host='18.220.211.136',
                user=username,
                password=passwrd,
                database="subscription_db" 
            )
            mycursor = mydb.cursor
            return True
        except Exception:
            return False
            
    else:
        username = request.form['username']
        passwrd = request.form['password']
        try:
            mydb = mysql.connector.connect(
                user=username,
                password=passwrd,
                database="test" #change this
            )
        except Exception:
            return False
        mycursor = mydb.cursor()
        return True

#get all subscriptions
@app.route("/getAll")
def getAll():
    pass

#update subscription by the subscriptions ID
#params not at thing in Flask, so they'll just be pulled off of the request
@app.route("/update")
def update():
    pass

#Get all subscriptions where some properties are true
#Certainly gonna be the most complex function. 
@app.route("/getWhere")
def getWhere():
    #Incoming JSON message in form like: 
    # {
    #   Platform: Any
    #   Payment Method: {card number=1234 5352 5345 6929}
    #   Invoice: {start_date=11-27-2021 or after, amount due=$10 or greater}
    #   etc etc etc
    # }
    pass


#Create a new subscription based on properties specified 
@app.route("/create")
def create():
    pass


def getInput():
    print("here")
    while True:
        pass

if __name__ == '__main__':
    print(sys.argv[1])
    print(sys.argv[1])

    print(sys.argv[1])

    if len(sys.argv) == 2 and sys.argv[1] == "CLI":
        CLI = True
        if login():
            getInput()
        else:
            print("Invalid credentials")
    else:
        app.run(host='0.0.0.0', port=5000)
