"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import re
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/register', methods=['POST'])
def create_user():
    data = request.get_json()
    if "email" not in data or "password" not in data:
        return jsonify({"error": "Faltan datos obligatorios"}), 422
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if not re.match(email_regex, data['email']):
        return jsonify({"error": "Email informado no cumple formato correcto"}), 400
    
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
    return jsonify({"token": token, "id": user.id})