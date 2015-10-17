echo "Installing atom packages"
apm install language-csharp
apm install omnisharp-atom
apm install linter
apm install linter-jshint
apm install todo-show

echo "Installing the .NET Version Manager (DNVM)"
$Branch='dev'
iex ((new-object net.webclient).DownloadString('https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.ps1'))

echo "Installing global NPM modules"
npm install -g bower
npm install -g grunt-cli
npm install -g nodemon
npm install -g node-inspector
npm install -g less
npm install -g yo
npm install -g generator-hilary
npm install -g generator-aspnet
npm install -g http-server
npm install -g json-server
npm install -g mocha
npm install -g jshint
