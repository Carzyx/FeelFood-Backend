FROM node:8.5.0

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm update
RUN npm install

COPY ../../NessemuT/Desktop/backend /usr/src/app

EXPOSE 3001

CMD ["node", "index.js"]