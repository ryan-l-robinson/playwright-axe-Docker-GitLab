# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# Copy playwright files, including tests
RUN mkdir /opt/playwright
WORKDIR /opt/playwright
COPY / /opt/playwright/

# Install required plugins
RUN npm install @axe-core/playwright fsp-xml-parser
# Run npm install to install any dependencies in the package json
RUN npm install