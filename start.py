import xml.etree.ElementTree as ET
from flask import Flask, request, render_template, redirect, url_for

app = Flask(__name__)
file_name = "users.xml"

def create_xml_file(file_name):
    root = ET.Element("users")
    tree = ET.ElementTree(root)
    tree.write(file_name)

def add_user(file_name, username, password):
    tree = ET.parse(file_name)
    root = tree.getroot()
    
    user = ET.Element("user")
    user.set("username", username)
    user.set("password", password)
    
    root.append(user)
    tree.write(file_name)

def read_users(file_name):
    tree = ET.parse(file_name)
    root = tree.getroot()
    
    users = []
    for user in root.findall('user'):
        username = user.get('username')
        password = user.get('password')
        users.append({'username': username, 'password': password})
    
    return users

def update_user(file_name, username, new_password):
    tree = ET.parse(file_name)
    root = tree.getroot()
    
    for user in root.findall('user'):
        if user.get('username') == username:
            user.set('password', new_password)
            tree.write(file_name)
            return True
    
    return False

def delete_user(file_name, username):
    tree = ET.parse(file_name)
    root = tree.getroot()
    
    for user in root.findall('user'):
        if user.get('username') == username:
            root.remove(user)
            tree.write(file_name)
            return True
    
    return False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    users = read_users(file_name)
    
    for user in users:
        if user['username'] == username and user['password'] == password:
            return "Успешный вход"
    
    return "Неправильный логин или пароль"

if __name__ == '__main__':
    create_xml_file(file_name)
    add_user(file_name, "user1", "password1")
    app.run(debug=True)
