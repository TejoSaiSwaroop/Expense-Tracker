#!/bin/bash

# Navigate to the project folder
cd D:\Projects\Expense Tracker

# Add all changes
git add .

# Commit the changes with a message
git commit -m "Auto-commit: $(date)"

# Push changes to the repository
git push origin main
