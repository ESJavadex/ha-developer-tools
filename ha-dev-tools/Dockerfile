ARG BUILD_FROM
FROM ${BUILD_FROM}

# Install system dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    py3-aiohttp \
    py3-yaml \
    nodejs \
    npm \
    nginx \
    curl \
    jq

# Create app directory
WORKDIR /opt/ha-dev-tools

# Copy backend requirements and install
COPY backend/requirements.txt ./backend/
RUN pip3 install --no-cache-dir -r backend/requirements.txt

# Copy backend source
COPY backend/ ./backend/

# Copy pre-built frontend (built during CI or locally)
COPY frontend/dist/ ./frontend/dist/

# Copy nginx configuration
COPY rootfs/etc/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy startup script
COPY run.sh /run.sh
RUN chmod +x /run.sh

# Expose port
EXPOSE 8099

CMD ["/run.sh"]
