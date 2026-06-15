FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# npm ci runs postinstall → `playwright install chromium`
RUN npm ci

# Install system libraries required by Playwright's Chromium
RUN npx playwright install-deps chromium

COPY . .

RUN npm run build

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["npm", "start"]
