# Configurable Workflow Decision Platform

## Description
This project implements a simple workflow decision engine that processes requests, evaluates rules, executes workflow stages, records audit logs, and handles failures.

## Features
- Configurable workflow stages
- Rule-based decision engine
- Request state management
- Audit logging
- Failure handling and retry
- Duplicate request protection

## Workflow

Request Received  
→ Validation  
→ Rule Evaluation  
→ Decision



python workflow_engine.py

3. Enter request details when prompted.

## Example

Request ID: 101  
Name: Rahul  
Amount: 70000  

Decision: MANUAL_REVIEW