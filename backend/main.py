import mysql.connector
from mysql.connector import Error
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import sys
CLI = False
mycursor = None
username = None
mydb = None
subid = 17
platid = 1

#start backend flask thing
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')


#Log into DBMS with account. If true, login successful and HTML can change
#If can't log in, indicate with false
#json=None bc it may not be provided for CLI
def login(json=None):
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
                database="test"
            )
        except Exception:

            return False
        mycursor = mydb.cursor()
        return True

    else:
        username = json['username']
        passwrd = json['password']
        try:
            mydb = mysql.connector.connect(
                user=username,
                password=passwrd,
                database="test"
            )
        except Exception as ex:
            print(ex)
            emit('message', {'login': 'failed'})
            return False

        mycursor = mydb.cursor()
        print("here")
        socketio.emit('message', {'login': 'successful'})
        return True


#get all subscriptions
def getAll():
    operation = (f"SELECT p.name FROM Platform p NATURAL JOIN Subscription s NATURAL JOIN DB_Account_Information a WHERE db_username = '{username}'")
    try:
        mycursor.execute(operation)
        result = mycursor.fetchall()
        print(result)
    except Error as e:
        print(f"The error '{e}' occurred")

def getSubsByCardNum(cardNum):
    operation = (f"SELECT p.name FROM Platform p, Payment_Method pm, Subscription s, hasBillingInfo hb WHERE s.platform_id = p.platform_id AND hb.subscription_id = s.subscription_id AND hb.invoice_id = pm.invoice_id AND pm.card_number= {cardNum} AND s.db_username = '{username}'")
    try:
        mycursor.execute(operation)
        result = mycursor.fetchall()
        print(result)
    except Error as e:
        print(f"The error '{e}' occurred")

def getComparison(comparator, num):
    operation = (f"SELECT p.name, i.billing_freq FROM Invoice i, Subscription s, Platform p WHERE s.platform_id = p.platform_id AND s.subscription_id = i.subscription_id AND i.amount_due {comparator} {num} AND s.db_username = '{username}'")
    try:
        mycursor.execute(operation)
        result = mycursor.fetchall()
        print(result)
    except Error as e:
        print(f"The error '{e}' occurred")

def getByFrequency(freq):
    operation = (f"SELECT p.name FROM Invoice i, Subscription s, Platform p WHERE s.platform_id = p.platform_id AND s.subscription_id = i.subscription_id AND i.billing_freq = '{freq}' AND s.db_username = '{username}'")
    try:
        mycursor.execute(operation)
        result = mycursor.fetchall()
        print(result)
    except Error as e:
        print(f"The error '{e}' occurred")

def insertSubscription(args):
    global subid
    platform_name = 'NULL'
    platform_id = 'NULL'
    subscription_type = 'NULL'
    sb_username = 'NULL'
    sb_password = 'NULL'
    email = 'NULL'
    address_id = 'NULL'

    for x in range(len(args) - 1):
        if args[x] == '-p':
            platform_name = args[x + 1]
            x += 1
        elif args[x] == '-t':
            subscription_type = args[x + 1]
            x += 1
        elif args[x] == '-u':
            sb_username = args[x + 1]
            x += 1
        elif args[x] == '-p':
            sb_password = args[x + 1]
            x += 1
        elif args[x] == '-e':
            email = args[x + 1]
            x += 1

    if platform_name != 'NULL':
        getplatforms = (f"SELECT platform_id FROM Platform WHERE name = {platform_name}")

        try:
            mycursor.execute(getplatforms)
            result = mycursor.fetchall()
            if len(result) > 0:
                platform_id = result[0][0]
            else:
                platform_id = platid
        except Error as e:
            print(f"The error '{e}' occurred")

    print(f"""This is the subscription to be added:
    Platform name: {platform_name}
    Subscription type: {subscription_type}
    Subscription username: {sb_username}
    Subscription password: {sb_password}
    Email: {email}
    """)

    confirm = input("Is this the subscription you would like to add? ('y' for yes, any other key for no)")

    if confirm == 'y' or confirm == 'Y':
        operation = (f"INSERT INTO Subscription (subscription_id, platform_id, subscription_type, sb_username, sb_password, email, address_id, db_username) VALUES ({subid}, {platform_id}, {subscription_type}, {sb_username}, {sb_password}, {email}, {address_id}, {username})")
        try:
            mycursor.execute(operation)
            print("Your subscription has been added :)")      
        except Error as e:
            print(f"The error '{e}' occurred")
        subid += 1

        if platform_id == platid:
            hasparentcomp = input("This platform doesn't seem to exist in our database. Do you know which company sells this subscription? ('y' for yes, any other key for no)")
            if hasparentcomp == 'y' or hasparentcomp == 'Y':
                parent = input("Great! What's the company?")
                confirmparent = input(f"Is '{parent}' the correct name? ('y' for yes, any other key for no)")
                count = 0
                while (confirmparent != 'y' or confirmparent != 'Y') and count < 3:
                    parent = input("Okay, please enter a new name:")
                    confirmparent = input(f"Is '{parent}' the correct name? ('y' for yes, any other key for no)")
                    count += 1
            
            if confirmparent == 'y' or confirmparent == 'Y':
                addplatform = (f"INSERT INTO Platform (platform_id, name, parent_company) VALUES ({platform_id}, {platform_name}, {parent})")
                try:
                    mycursor.execute(addplatform)
                    print("Great! This platform has also been added :)") 
                    platid += 1     
                except Error as e:
                    print(f"The error '{e}' occurred")

    else:
        print("Okay, please try the insert command again with the correct information.")
    

#update subscription by the subscriptions ID
#params not at thing in Flask, so they'll just be pulled off of the request
def update():
    pass

#Get all subscriptions where some properties are true
#Certainly gonna be the most complex function. 
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
        elif args[0] == 'CARDNUM':
            if len(args) >= 2:
                getSubsByCardNum(args[1])
            else:
                print("Please specify a card number.")
        elif args[0] == '<' or args[0] == '>' or args[0] == '=':
            if len(args) >= 2:
                getComparison(args[0], args[1])
            else:
                print("Please provide an additional argument.")
        elif args[0] == 'FREQUENCY':
            if len(args) >= 2:
                getByFrequency(args[1])
            else:
                print("Please specify a frequency.")
    elif command == 'INSERT':
        if len(args) == 0:
            print("Additional argument required. Please specify what you would like to insert")
        elif args[0] == 'SUBSCRIPTION':
            insertSubscription(args)
    else:
        print("*Error*: Unknown/Unsupported command")


@socketio.on('json')
def handleRemoteMessage(json):
    command = json['command']
    print(command)
    if command == 'login':
        login(json)


if __name__ == '__main__':
    if len(sys.argv) == 2 and sys.argv[1] == "CLI":
        CLI = True
        if login():
            getInput()
        else:
            print("Invalid credentials, aborting.")
    else:
        socketio.run(app, host='0.0.0.0', port=5000)
