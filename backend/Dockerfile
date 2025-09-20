# backend/Dockerfile

# Use an official, slim Python image
FROM python:3.11-slim

# Set a working directory inside the container
WORKDIR /app

# Install system dependencies as ROOT
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    libgl1 \
    libglib2.0-0 \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install Python packages as ROOT
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Now, create a non-root user and set up permissions
RUN useradd -ms /bin/bash appuser && chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Copy the rest of your application's code as the non-root user
COPY . .

# Expose the port the app runs on
EXPOSE 8000