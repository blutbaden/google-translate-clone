# ----------------------------
# build from source
# ----------------------------
FROM node:20-alpine AS build

ARG NG_APP_GOOGLE_TRANSLATE_API_KEY
ARG NG_APP_GOOGLE_TRANSLATE_API_HOST

ENV NG_APP_GOOGLE_TRANSLATE_API_KEY=$NG_APP_GOOGLE_TRANSLATE_API_KEY
ENV NG_APP_GOOGLE_TRANSLATE_API_HOST=$NG_APP_GOOGLE_TRANSLATE_API_HOST

WORKDIR /app

COPY package*.json .
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# ----------------------------
# run with nginx
# ----------------------------
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build /app/dist/translator/browser /usr/share/nginx/html

EXPOSE 80
