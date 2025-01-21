from flask import Flask, request, jsonify
from flask_sqlalchemy import sqlalchemy

app = Flask(__name__)
# Username: taskManager |  Password: InsecurePassword132
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pyodbc://taskManager:InsecurePassword132@localhost/taskData?driver=ODBC+Driver+17+for+SQL+Server'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = sqlalchemy(app)

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
@app.route('/update', methods=["POST"])
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

# Retrieve data from the database
@app.route('/getTask/<task_id>', methods=["GET"]) 
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
        return jsonify({'message': 'Task not found'}), 404

        
# Delete data from the database
@app.route('/getTask/<task_id>', methods=["DELETE"]) 
def delete_task(taskID):
    params = Task.data.get("parameter")
    if params
    task = Task.query.get(taskID)
    if task:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message:" "Task deleted successfully"})

# Modify existing data from the database
@app.route('/getTask/<task_id>', methods=["PUT"]) 