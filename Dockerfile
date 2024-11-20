# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /technolgap

# Copy package files first to install dependencies
COPY technolgap/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY technolgap/ .

# State Environment variables
ENV CONTENTFUL_SPACE_ID=33d3d7kdmbg5
ENV CONTENTFUL_DELIVERY_TOKEN=00BZSByF4Gmh1S-vDtMfsmOLIdqrC8fyV404sOfIwzM
ENV CONTENTFUL_PREVIEW_TOKEN=reAc314zP9uHWBFq6_dFCHaVn1k0P26DH7FefZuulrw

# Build the Astro project
RUN npm run build

# Expose port 80 for the web server
EXPOSE 4321

CMD ["npm", "run", "start", "--", "--host"]
