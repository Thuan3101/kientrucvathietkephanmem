@echo off
echo Starting all microservices...

start "assessment_service" cmd /k "cd /d .\assessment-service && title assessment_service && npm run dev"
start "inquiry_service" cmd /k "cd /d .\inquiry-service && title inquiry_service && npm run dev"
start "user_service" cmd /k "cd /d .\user-service && title user_service && npm run dev"
start "api_gateway" cmd /k "cd /d .\gateway && title api_gateway && npm run dev"
:: Add more services as needed

echo All microservices started.
