# Dockerfile

# Build backend
FROM node:14 as backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend ./
RUN npm run build
EXPOSE 3002

# Build frontend
FROM node:14 as frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build
EXPOSE 3000

# Create final image
FROM node:14
WORKDIR /app
COPY --from=backend /app/backend .
COPY --from=frontend /app/frontend .
CMD ["npm", "run", "start"]