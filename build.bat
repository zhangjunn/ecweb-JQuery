@echo off
rem BUILD_ID=DONTKILLME
rem ��ȡ��������ԱȨ��
%1 %2
ver|find "5.">nul&&goto :st
mshta vbscript:createobject("shell.application").shellexecute("%~s0","goto :st","","runas",1)(window.close)&goto :eof
:st

if exist E:\gdgqtc\nginx-1.14.2 (

rem ɾ�������
rd /s /q E:\gdgqtc\nginx-1.14.2\ecweb
mkdir E:\gdgqtc\nginx-1.14.2\ecweb
xcopy "%WORKSPACE%\*" E:\gdgqtc\nginx-1.14.2\ecweb\ /e /a
) else (
mkdir E:\gdgqtc\nginx-1.14.2\ecweb
xcopy "%WORKSPACE%\*" E:\gdgqtc\nginx-1.14.2\ecweb\ /e /a)
rem ����ɹ� )
echo ��Ŀ����ɹ�����������
exit