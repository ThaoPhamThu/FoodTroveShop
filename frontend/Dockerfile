 # Dockerfile  
FROM node:18
WORKDIR /app  
COPY package.json /app  
RUN yarn add node-sass
RUN yarn
COPY . /app  
EXPOSE 3000  
CMD npm start