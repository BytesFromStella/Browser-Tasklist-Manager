from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
# Username: taskManager |  Password: InsecurePassword132
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://taskManager:InsecurePassword132@localhost/taskData?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# CORS(app, resources={r"/*": {"origins":"*"}})
CORS(
    app, resources={r"/*": {
     "origins": ["http://localhost:3000", "http://localhost:5000", "http://127.0.0.1:5500", "http://127.0.0.1:5501"], 
     "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
     "allow_headers": ["Content-Type", "Authorization"]}})


db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run(debug=True)
 #CORS causes Flask to stop running due to security policies

# This will make CRUD operations easier by assigning classes to the input data from the frontend.

class Task(db.Model):
    taskID = db.Column(db.String, primary_key=True) 
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=True)
    completed = db.Column(db.Boolean, default=False)
    deadline = db.Column(db.DateTime, nullable=True) 
    priority = db.Column(db.String, nullable=True)
    completionDate = db.Column(db.DateTime, default=None)
# The first thing we should do is attempt to create the table if it doesn't already exist
with app.app_context():
    db.create_all()


# Send data to the database
@app.route('/saveTask/<taskID>', methods=["POST", "OPTIONS"])
def save_task():
    data = request.json # Define the function/method list or context manager to use
    taskID = data.get("taskID")
    title = data.get("title")
    description = data.get("description")
    completed = data.get("completed")
    deadline = data.get("deadline") 
    priority = data.get("priority")
    completionDate = data.get("completionDate")

    new_task = Task(
        taskID=taskID,
        title=title,
        description=description,
        completed=completed,
        deadline=deadline,
        priority=priority,
        completionDate=completionDate
    )

    db.session.add(new_task)
    db.session.commit() # Executes the queued modifications
    return jsonify({"message":"Task successfully saved"}), 200

# Retrieve data from the database
@app.route('/retrieveTask/<taskID>', methods=["GET"]) 
def get_task(taskID):
    task= Task.query.get(taskID) # Sends a query to the SQL server
    if task: # If it exists, then:
        return jsonify({
            'taskID': task.taskID,
            'title': task.title,
            'description': task.description,
            'completed': task.completed,
            'deadline': task.deadline.isoformat() if task.deadline else None, # Date value. This can have a false/none value
            'priority': task.priority,
            'completionDate': task.completionDate.isoformat() if task.completionDate else None #Date value. This can also have a false value
        }), 200 # HTTP status code 200 means "OK"
    else:
        return jsonify({'message': 'Task not found when retrieving, or an error occured'}), 404


# Modify existing data from the database
@app.route('/editTask/<taskID>', methods=["PUT"]) 
def edit_task(taskID):
    data = request.json # Define the function/method list or context manager to use
    task = Task.query.get(taskID)
    if not task:
        return jsonify({"message":"Task doesn't exist"}), 404
    task.taskID = data.get("taskID", task.taskID)
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.completed = data.get("completed", task.completed)
    task.deadline = data.get("deadline", task.deadline)
    task.priority = data.get("priority", task.priority)
    task.completionDate = data.get("completionDate", task.completionDate)

    db.session.commit()
    return jsonify({"message":"Task updated successfully"}), 200


# Delete data from the database
@app.route('/deleteTask/<taskID>', methods=["DELETE"]) 
def delete_task(taskID):
    params = Task.data.get("parameter")
    if params.get("DeleteAll") == "true":
        db.session.query(Task).delete() 
        db.session.commit() 
        return jsonify({"Message":"ALL tasks deleted successfully"}), 200
    task = Task.query.get(taskID)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message":"Task deleted successfully"}), 200
    return jsonify({"message":"Task not found when deleting, or an error occured" }), 404