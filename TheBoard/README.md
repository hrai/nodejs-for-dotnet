# TheBoard

## MongoDB docker

- docker pull mongo
- cd "/mnt/e/nodejs-for-dotnet/TheBoard"
- docker volume create --name=mongodata
- docker run --name mongodb -v mongodata:/data/db -d -p 27017:27017 mongo
