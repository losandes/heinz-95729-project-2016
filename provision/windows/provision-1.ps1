# With a little help from: http://www.developerfusion.com/article/145913/apt-windows-lets-get-chocolatey-part-2-multiple-installs-and-package-creation/

# TO RUN THIS FILE
# 1. Make sure your powershell execution policy allows running scripts
#       (a) Run Powershell as Administrator
#       (b) > $currentPolicy = Get-ExecutionPolicy
#       (c) > Set-ExecutionPolicy RemoteSigned
#       (d) When you're done, you can reset your execution policy (which is probably: restricted)
#       (e) Set-ExecutionPolicy $currentPolicy
# 2. Run Powershell as Administrator
# 3. Navigate to the directory where "provision-1.ps1" is
# 4. > ./provision-1
# 5. Run Powershell as Administrator
# 6. Navigate to the directory where "provision-2.ps1" is
# 7. > ./provision-2
# 8. Answer Y(es) to install the default dnvm runtime

Write-Host "___  ___  _______   ___  ________   ________" -foregroundcolor Cyan
Write-Host "|\  \|\  \|\  ___ \ |\  \|\   ___  \|\_____  \" -foregroundcolor Cyan
Write-Host "\ \  \\\  \ \   __/|\ \  \ \  \\ \  \\|___/  /|" -foregroundcolor Cyan
Write-Host " \ \   __  \ \  \_|/_\ \  \ \  \\ \  \   /  / /" -foregroundcolor Cyan
Write-Host "  \ \  \ \  \ \  \_|\ \ \  \ \  \\ \  \ /  /_/__" -foregroundcolor Cyan
Write-Host "   \ \__\ \__\ \_______\ \__\ \__\\ \__\\________\" -foregroundcolor Cyan
Write-Host "    \|__|\|__|\|_______|\|__|\|__| \|__|\|_______|" -foregroundcolor Cyan
Write-Host " "
Write-Host " "
Write-Host "________  ________   ________   _______  ________" -foregroundcolor Cyan
Write-Host "|\  ___  \|\   ____\ |\_____  \ /  ___  \|\  ___  \" -foregroundcolor Cyan
Write-Host "\ \____   \ \  \___|_ \|___/  //__/|_/  /\ \____   \" -foregroundcolor Cyan
Write-Host "\|____|\  \ \_____  \    /  / /__|//  / /\|____|\  \" -foregroundcolor Cyan
Write-Host "    __\_\  \|____|\  \  /  / /    /  /_/__   __\_\  \" -foregroundcolor Cyan
Write-Host "   |\_______\____\_\  \/__/ /    |\________\|\_______\" -foregroundcolor Cyan
Write-Host "   \|_______|\_________\__|/      \|_______|\|_______|" -foregroundcolor Cyan
Write-Host "            \|_________|" -foregroundcolor Cyan
Write-Host " "
Write-Host " "

. ./provision-shared.ps1

if (ConfirmStep  "Before running this script, you need to install Node.js manually. You need to run this as an administrator. You should also review this script and comment out apps that you already have installed. Click 'Yes', if you already have." 20000) {
    echo Installing choclatey
    Invoke-Expression ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))

    echo Installing choclatey packages
    choco install -y python2
    choco install -y curl
    # choco install -y git.install
    choco install -y cmder
    choco install -y atom
    choco install -y nuget.commandline

    if (ConfirmStep  "Do you want to install Visual Studio Community (It takes a while)?" 20000) {
        choco install visualstudio2015community
    }

    if (ConfirmStep  "Provision-1 complete. This window will close. You need to start a new powershell session as an Administrator and execute ./provision-2" 30) {
        stop-process -Id $PID
    }
}
