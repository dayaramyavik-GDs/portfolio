---
title: Assessment Tracker — Hybrid Mobile App
area: app
type: Personal Project
status: In Progress
problem: "Students need one place to track assessments and plan the grades they need."
contribution: "Built the mobile front end and the authenticated API, and deployed and tested both."
tech: ["JavaScript", "Cordova", "Node.js", "Express", "MongoDB Atlas", "Docker", "Render"]
repo: https://github.com/dayaramyavik-GDs/assessment-tracker
date: "Aug 2026 – present"
featured: true
order: 20
published: true
---

## What I built

A hybrid mobile app for tracking assessments and planning grades, with a Node.js and Express API and data stored in MongoDB Atlas.

## Security choices

- Passwords are hashed before they are stored.
- Sign-in uses JWT authentication.
- Input validation on user-submitted data.
- GitHub Actions runs automated tests and security checks on changes.

## Deployment and troubleshooting

The backend runs in Docker on Render. Getting the app and API working together meant diagnosing and fixing:

- CORS errors between the mobile app and the API
- connectivity and database configuration problems
- Android build issues

## Testing

- 48 automated API tests.
- Tested the Android release build on a physical device.

## Status

In active development.
