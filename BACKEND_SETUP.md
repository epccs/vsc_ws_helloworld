# Task Manager Backend Setup (Python Flask + Docker)

This guide will help you set up a simple REST API backend for your Task Manager using Python Flask and Docker on Ubuntu 25.04.

## Prerequisites

To install Docker on Ubuntu 25.04 desktop, first update the apt package index to use the official Docker repository (in ca-certificates) to allow apt to use a repository over HTTPS

```bash
# Update the apt package index to use the official Docker repository (in ca-certificates) 
# to allow apt to use a repository over HTTPS
sudo apt-get update
sudo apt install ca-certificates curl apt-transport-https software-properties-common lsb-release
# Add Docker's GPG key:
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# Now, add the Docker repository to your apt sources
printf "deb [arch=%s signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu %s stable\n" "$(dpkg --print-architecture)" "$(. /etc/os-release && echo "$VERSION_CODENAME")" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# update the apt package index again
sudo apt-get update
# check the version
apt show docker-ce -a
# now we are cooking, just need to install the official Docker packages
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# Verify Docker Installation
sudo docker run hello-world
```

## 1. Create Backend Files

### a. Create a new folder for the backend

```bash
mkdir backend
cd backend
```

### b. Create `app.py` (Flask API)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)
DATA_FILE = 'tasks.json'

def load_tasks():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return []

def save_tasks(tasks):
    with open(DATA_FILE, 'w') as f:
        json.dump(tasks, f)

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(load_tasks())

@app.route('/tasks', methods=['POST'])
def add_task():
    tasks = load_tasks()
    task = request.json
    tasks.append(task)
    save_tasks(tasks)
    return jsonify(task), 201

@app.route('/tasks/<int:idx>', methods=['PUT'])
def update_task(idx):
    tasks = load_tasks()
    tasks[idx] = request.json
    save_tasks(tasks)
    return jsonify(tasks[idx])

@app.route('/tasks/<int:idx>', methods=['DELETE'])
def delete_task(idx):
    tasks = load_tasks()
    tasks.pop(idx)
    save_tasks(tasks)
    return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### c. Create `requirements.txt`

```TEXT
flask
flask-cors
```

### d. Create `Dockerfile`

```TEXT
FROM python:3.11-slim
WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]
```

## 2. Build and Run the Backend

```bash
cd backend
sudo docker build -t taskmanager-backend .
sudo docker run -d -p 5000:5000 --name taskmanager-backend taskmanager-backend
```

## 3. Test the API

- Visit `http://localhost:5000/tasks` in your browser (should return an empty list)
- Use tools like Postman or `curl` to test POST/PUT/DELETE requests

## 4. Connect Frontend

- Update your frontend JavaScript to use `fetch` calls to `http://localhost:5000/tasks` instead of localStorage.
- Example:

```js
fetch('http://localhost:5000/tasks')
  .then(res => res.json())
  .then(tasks => { /* render tasks */ })
```

## 5. Stop and Remove the Backend

```bash
sudo docker stop taskmanager-backend
sudo docker rm taskmanager-backend
```

---
For Django or advanced features (auth, users, database), ask for a more detailed guide!
