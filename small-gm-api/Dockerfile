FROM alpine:latest
RUN apk add --no-cache python3 && pip3 install --upgrade pip
WORKDIR /app
COPY . /app
RUN pip --no-cache install -r requirements.txt
RUN chmod 644 app.py
RUN adduser -D whaler
USER whaler
CMD ["python3", "app.py"]