. ./provision-shared.ps1

echo "Installing atom packages"
apm install linter
apm install linter-jshint
apm install todo-show

echo "Installing global NPM modules"
npm install -g bower
npm install -g grunt-cli
npm install -g nodemon
npm install -g node-inspector
npm install -g less
npm install -g yo
npm install -g generator-hilary
npm install -g mocha
npm install -g jshint

if (ConfirmStep  "Provision-2 complete. This window will close. You need to start a new powershell session as an Administrator and execute ./provision-3" 30) {
    stop-process -Id $PID
}
