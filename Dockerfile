FROM node:18-alpine
LABEL authors="bruno szilagyi"

WORKDIR /ontology-form-generator-admin-front/

COPY public/ /ontology-form-generator-admin-front/public
COPY src/ /ontology-form-generator-admin-front/src
COPY package.json /ontology-form-generator-admin-front/

RUN npm install --force

CMD ["npm", "start"]