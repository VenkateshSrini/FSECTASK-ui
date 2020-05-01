# FSECTASK-ui
This is the task UI. This has a dependency on the FSE PMO API. The api needs to be available in port 5500. 
If not follow the below instruction
1) Download the UI code. 
2) In the \ClientApp\src\components\constants\index.js change the URL of API service for  PRJCT_SERVICE_URL and USR_SERVICE_URLbased on port in which API is running
3) Use npm start from comand prompt from the ClientApp folder

The project is also built using Azure pipeline.
