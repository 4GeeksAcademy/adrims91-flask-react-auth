"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Task
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import re
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if not data['email'] or not data['password']:
        return jsonify({"error": "Datos obligatorios vacíos"}), 422
    
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if not re.match(email_regex, data['email']):
        return jsonify({"error": "Email informado no cumple formato correcto"}), 400
    if len(data['password']) < 8:
        return jsonify({"error": "La contraseña debe tener al menos 8 caracteres"}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({"error": "El usuario ya existe"}), 409
    hashed_password = generate_password_hash(data['password'])
    new_user = User(email=data['email'], password=hashed_password, is_active=True)
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"user": new_user.email, "id": new_user.id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    if not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Contraseña incorrecta"}), 401
    token = create_access_token(identity=user.email)
    return jsonify({"token": token, "id": user.id, "user": user.email})

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({"usuario": user.email, "id": user.id})
@api.route('/users')
def get_users():
    users = User.query.all()
    users = list(map(lambda x: x.serialize(), users))
    if not users:
        return jsonify({"error": "No hay usuarios creados."})
    return jsonify({"Usuarios": users})
@api.route('/users/<int:id>')
def get_user(id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "Usuario no encontrado."}), 404
    return jsonify({"Usuario": user.serialize()})
@api.route('/users/<int:id>/tasks', methods=['GET'])
def get_tasks(id):
    user = User.query.get(id)
    tasks = Task.query.filter_by(user_id=id)
    tasks = list(map(lambda x: x.serialize(), tasks))
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({"tasks": tasks})
@api.route('users/<int:id>/tasks', methods=['POST'])
def add_task(id):
    data = request.get_json()
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    if not data['description']:
        return jsonify({"error": "No puedes crear una tarea vacía."}), 400
    new_task = Task(description=data['description'], is_done=False, user_id=id)
    try:
        db.session.add(new_task)
        db.session.commit()
        return jsonify({"task": new_task.serialize(), "id": new_task.id})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)})
@api.route('users/<int:id>/tasks/<int:task_id>', methods=['GET'])
def get_task(id,task_id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "usuario no encontrado"}), 404
    task = Task.query.get(task_id)
    if not task or task.user_id != id:
        return jsonify({"error": "Tarea no encontrada o no pertenece al usuario."}), 404
    return jsonify({"tasks": task.serialize()})
@api.route('users/<int:id>/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(id,task_id):
    user = User.query.get(id)
    if not user:
        return jsonify({"error": "usuario no encontrado"}), 404
    task = Task.query.get(task_id)
    if not task or task.user_id != id:
        return jsonify({"error": "Tarea no encontrada o no pertenece al usuario."}), 404
    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Tarea eliminada satisfactoriamente."}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500