FROM node:18-alpine

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image
COPY . .

# # Clean install all node modules
# RUN npm ci

# # Build SvelteKit app
# RUN npm run build

ENV PORT 3000
EXPOSE 3000
EXPOSE 3010






