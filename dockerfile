# Base image
FROM node:18

# Install supervisor
RUN apt-get update && \
    apt-get install -y supervisor

# Set working directory for backend
WORKDIR /app

# Copy both backend and frontend source code
COPY backend /app/backend
COPY frontend /app/frontend

# Copy backend and frontend package.json files and install dependencies
COPY backend/package*.json /app/backend/
COPY frontend/package*.json /app/frontend/
RUN cd /app/backend && npm install
RUN cd /app/frontend && npm install

# Build backend and frontend
RUN cd /app/backend && npm run build
RUN cd /app/frontend && npm run build

# Copy supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose application ports
EXPOSE 3003
EXPOSE 3000

# Start supervisor
CMD ["/usr/bin/supervisord"]
