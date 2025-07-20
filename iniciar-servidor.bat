@echo off
setlocal

:: ===== CONFIGURACIÓN =====
set PORT=3000
set NODE_PATH=backend\server.js

:: Obtiene la IP local
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /R "IPv4"') do (
    for /f "tokens=*" %%B in ("%%A") do set LOCAL_IP=%%B
)

:: Limpia espacios
set LOCAL_IP=%LOCAL_IP: =%

:: ===== CREA REGLA DE FIREWALL SI NO EXISTE =====
netsh advfirewall firewall show rule name="Node Puerto %PORT%" >nul 2>&1
if %errorlevel% neq 0 (
    echo Agregando regla de firewall para permitir el puerto %PORT%...
    netsh advfirewall firewall add rule name="Node Puerto %PORT%" dir=in action=allow protocol=TCP localport=%PORT%
) else (
    echo Regla de firewall ya existe.
)

:: ===== INICIA EL SERVIDOR =====
echo Iniciando servidor en %LOCAL_IP%:%PORT%...
start http://%LOCAL_IP%:%PORT%
node %NODE_PATH%

endlocal
pause
