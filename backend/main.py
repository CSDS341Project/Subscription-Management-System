import mysql.connector
from mysql.connector import Error
from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
CLI = False
mycursor = None
username = None
mydb = None

#start backend flask thing
app = Flask(__name__)
CORS(app)

#Log into DBMS with account. If true, login successful and HTML can change
#If can't log in, indicate with false
@app.route("/login")
def login():
    global mycursor
    global username
    global mydb
    if CLI:
        username = input("Username: ")
        passwrd = input("Password: ")
        try:
            mydb = mysql.connector.connect(
                host='18.220.211.136',
                user=username,
                password=passwrd,
                database="subscription_db_new" 
            )
        except Exception:
            return False     
        mycursor = mydb.cursor()
        return True

    else:
        username = request.form['username']
        passwrd = request.form['password']
        try:
            mydb = mysql.connector.connect(
                user=username,
                password=passwrd,
                database="subscription_db_new" 
            )
        except Exception:
            return False
        mycursor = mydb.cursor()
        return True

#get all subscriptions
@app.route("/getAll")
def getAll():
    operation = ("SELECT * FROM Subscription")
    try:
        mycursor.execute(operation)
        result = mycursor.fetchall()
        print(result)
    except Error as e:
        print(f"The error '{e}' occurred")

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
@app.route("/insert")
def insert():
    pass


def getInput():
    print("Successfully entered SMS. Inputs are separated by a new line. Please see manual for instructions.")
    while True:
        data = input()
        executeCommand(data.split()[0], data.split()[1:])

        
def executeCommand(command, args):
    if command == 'SHOW':
        if len(args) == 0 or args[0] == 'ALL':
            getAll()
    elif command == 'INSERT':
        pass #insert logic here, make elifs for any other command
    else:
        print("*Error*: Unknown/Unsupported command")



        

if __name__ == '__main__':
    if len(sys.argv) == 2 and sys.argv[1] == "CLI":
        CLI = True
        if login():
            getInput()
        else:
            print("Invalid credentials, aborting.")
    else:
        app.run(host='0.0.0.0', port=5000)
