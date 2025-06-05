# Backend Task Manager API

A simple RESTful API built with Node.js and Express to manage tasks.

## Features

- Get all tasks
- Add a new task
- Mark a task as completed
- Delete a task

## Endpoints

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| GET    | /api/tasks     | Retrieve all tasks       |
| POST   | /api/tasks     | Add a new task           |
| PUT    | /api/tasks/:id | Mark a task as completed |
| DELETE | /api/tasks/:id | Delete a task            |

## Data Storage

Tasks are stored in a local JSON file (`tasks.json`).

## Getting Started

1. Clone the repo:

   ```bash
   git clone https://github.com/sumeya-ak/backend
   cd Backend
   ```
