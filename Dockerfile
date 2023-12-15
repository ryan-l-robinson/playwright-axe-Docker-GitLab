# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

# mkdir for the application tests 
RUN mkdir /opt/playwright
WORKDIR /opt/playwright

# Copy playwright files, including tests
COPY / /opt/playwright/

# Install required plugins
RUN npm install @axe-core/playwright
# Run npm install to install any dependencies in the package json
RUN  npm install