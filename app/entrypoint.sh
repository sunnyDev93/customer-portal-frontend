#!/bin/bash

echo "Frontend Entrypoint Script Started" &&

echo "npm install" &&
npm install &&

echo "npm run start-https" &&
npm run start-https
