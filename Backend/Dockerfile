# 1. Use official Node.js base image (like saying "start with a ready Node.js box")
FROM node:18

# 2. Set the working directory inside the container to /app
WORKDIR /app

# 3. Copy everything from your local server folder to /app in the container
COPY . .

# 4. Install all the dependencies listed in package.json
RUN npm install

# 5. Optional: Run tests when building image (you can move this to Jenkins instead)
# RUN npm test

# 6. Start the app by default when container runs
CMD ["node", "app.js"]
