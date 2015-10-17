. ./provision-shared.ps1

$commandsFolder = "C:\tools\commands"

function MakeCommandsFolder {
    $PATH = [Environment]::GetEnvironmentVariable("PATH")

    # commandsFolder
    if ((test-path $commandsFolder) -eq $FALSE) {
        md $commandsFolder
    }

    # Add the commands folder to the path
    if( $PATH -notlike "*"+$commandsFolder+"*" ){
        [Environment]::SetEnvironmentVariable("PATH", "$PATH;$commandsFolder", "Machine")
    }

    return $commandsFolder
}

echo "Installing the .NET Execution Environment (DNX)"
dnvm upgrade -r coreclr
# not sure why, but you have to `dnvm upgrade` to get it working on Windows
dnvm upgrade
# dnvm upgrade -r clr # use this instead, if you want to install the full .NET framework

echo "Installing MongoDb"
MakeCommandsFolder

$mongoVersion = '3.0.6'
$tempDir = "C:\install"
$installDir = "C:\tools\mongodb"
$binDir = join-path $installDir "\bin"
$dataDir = join-path $installDir "\data"
$logDir = join-path $installDir "\log"
$logPath = join-path $logDir "\mongod.log"
$confSourcePath = join-path $PSScriptRoot "mongod.conf"
$confDestPath = join-path $commandsFolder "\mongod.conf"
$batSourcePath = join-path $PSScriptRoot "\mongod.bat"
$batDestPath = join-path $commandsFolder "\mongod.bat"

# download mongo
$webclient = New-Object System.Net.WebClient
$url = "https://fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-$mongoVersion-signed.msi" # ?_ga=1.47481380.2000977652.1433349861
$filePath = "$tempDir\mongodb-$mongoVersion-signed.msi"

if ((test-path $tempDir) -eq $FALSE) {
    md $tempDir
}
$webclient.DownloadFile($url, $filePath)

# install mongo
msiexec.exe /q /i $filePath INSTALLLOCATION=$installDir
#  ADDLOCAL=MonitoringTools,ImportExportTools,MiscellaneousTools

# make data and log directories
if ((test-path $dataDir) -eq $FALSE) {
    md $dataDir
}

if ((test-path $logDir) -eq $FALSE) {
    md $logDir
    # New-Item $logPath -type file
}

# copy the batch file for starting mongod to the mongodb folder
If ((Test-Path $batDestPath) -eq $false) {
    New-Item -ItemType File -Path $batDestPath -Force
}

Copy-Item -Path $batSourcePath -Destination $batDestPath

# copy the conf file to the mongodb folder
If ((Test-Path $confDestPath) -eq $false) {
    New-Item -ItemType File -Path $confDestPath -Force
}

Copy-Item -Path $confSourcePath -Destination $confDestPath

if (ConfirmStep  "Provision-3 complete. This window will now close." 30) {
    stop-process -Id $PID
}
