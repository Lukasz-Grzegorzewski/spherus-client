# this step just fetch node_modules, do not launch this step
FROM node:18.18.2-alpine3.18 as deps
WORKDIR /app
COPY package.json package.json
RUN npm i

# this step start the project with ts-node-dev, with dev dependencies (ts) and livereload
FROM node:18.18.2-alpine3.18 AS dev
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules node_modules
EXPOSE 5173
CMD npm run dev

# this step only compile the app (ts to js), do not launch this step
FROM node:18.18.2-alpine3.18 AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules node_modules 
RUN npm run build

# this step launch the app in a prod mode, with only js files and useful deps
FROM node:18.18.2-alpine3.18 AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist