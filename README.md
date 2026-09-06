# TIET NExus

> **YOUR CAMPUS. YOUR NExus.**

TIET NExus is a campus intelligence platform that centralizes student societies, events, opportunities, registrations, and campus information into one platform.

## Features

- 🏛️ Society discovery with search and category filters
- 📅 Campus events and event registration
- 🔐 User signup/login with JWT authentication
- 📖 Individual society profiles and recruitment information
- 🤖 AI Guide for campus-related queries
- 🎨 Minimal dark-tech UI with animations and 3D elements
- 🔎 Planned RAG-powered campus assistant

## Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Python
- FastAPI
- SQLAlchemy
- REST API
- JWT Authentication
- PBKDF2 Password Hashing

**Database**
- SQLite

**AI**
- LLM
- Retrieval-Augmented Generation (RAG)
- Embeddings
- Vector Search

**Deployment**
- Vercel — Frontend
- Render — Backend

## Architecture

```text
Student
   ↓
Frontend (HTML/CSS/JS)
   ↓
FastAPI REST API
   ↓
SQLAlchemy
   ↓
SQLite
   ↓
Societies / Events / Users / Registrations

AI Guide
   ↓
FastAPI
   ↓
RAG + LLM
   ↓
Campus Information
