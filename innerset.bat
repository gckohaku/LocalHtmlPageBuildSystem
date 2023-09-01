if exist %cd%\%outRelativeDir%\%scriptFile% del %cd%\%outRelativeDir%\%scriptFile%
if exist %cd%\%outRelativeDir%\%styleFile% del %cd%\%outRelativeDir%\%styleFile%
if exist %cd%\%outRelativeDir%\%htmlFile% del %cd%\%outRelativeDir%\%htmlFile%

if not exist %outRelativeDir% mkdir %outRelativeDir%

for /f "delims=" %%a in (%downloadDir%\%scriptFile%) do (
	set line=%%a
	set line=!line:{__hash__}=#!
	echo.!line!>> %cd%\%outRelativeDir%\%scriptFile%
)
del %downloadDir%\%scriptFile%

for /f "delims=" %%a in (%downloadDir%\%styleFile%) do (
	set line=%%a
	set line=!line:{__hash__}=#!
	echo.!line!>> %cd%\%outRelativeDir%\%styleFile%
)
del %downloadDir%\%styleFile%

for /f "delims=" %%a in (%downloadDir%\%htmlFile%) do (
	set line=%%a
	set line=!line:{__hash__}=#!
	echo.!line!>> %cd%\%outRelativeDir%\%htmlFile%
)
del %downloadDir%\%htmlFile%

for %%a in (%copyFiles%) do (
	set file=%%a
	copy %cd%\!file! %cd%\%outRelativeDir%
)

exit /b