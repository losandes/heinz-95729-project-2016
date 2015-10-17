#!/usr/bin/env bash
echo "___   ___  _______   ___  ________  ________"
echo "|\\  \\|\\  \\|\\  ___ \\ |\\  \\|\\   ___ \\|\\_____  \\"
echo "\\ \\  \\\\\\   \\ \\   __/|\\ \\  \\ \\  \\\\ \\  \\\\|___/  /|"
echo " \\ \\   __  \\ \\  \\_|/_\\ \\  \\ \\  \\\\ \\  \\   /  / /"
echo "  \\ \\  \\ \\  \\ \\  \\_|\\ \\ \\  \\ \\  \\\\ \\  \\ /  /_/__"
echo "   \\ \\__\\ \\__\\ \\_______\\ \\__\\ \\__\\\\ \\__\\\\________\\"
echo "    \\|__|\\|__|\\|_______|\\|__|\\|__|\\|__|________|"
echo ""
echo ""
echo "________   ________   ________   _______  ________"
echo "|\\  ___  \\|\\   ____\\ |\\_____  \\ /  ___  \\|\\  ___  \\"
echo "\\ \\____   \\ \\  \\___|_ \\|___/  //__/|_/  /\\ \\____   \\"
echo " \\|____|\\  \\ \\_____  \\    /  / /__|//  / /\\|____|\\  \\"
echo "     __\\_\\  \\|____|\\  \\  /  / /    /  /_/__   __\\_\\  \\"
echo "    |\\_______\\____\\_\\  \\/__/ /    |\\________\\|\\_______\\"
echo "    \\|_______|\\_________\\__|/      \\|_______|\\|_______|"
echo "             \\|_________|"
echo ""
echo ""

echo Install Homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

echo Install Node Version Manager
brew install nvm
source $(brew --prefix nvm)/nvm.sh

echo Install Node.js
nvm install 4.0.0
nvm install 4.2.1

echo Update user path and install git
export PATH=/usr/local/bin:$PATH
brew install git

echo Install caskroom
echo All apps will be installed into this location
echo Find shortcut to apps in HD/Users/Name/Applications
brew install caskroom/cask/brew-cask

echo Install mono
brew install mono

echo Install Atom
brew cask install atom

apm install language-csharp
apm install omnisharp-atom
apm install linter
apm install linter-jshint
apm install todo-show

echo Install ASP.NET 5
curl -sSL https://raw.githubusercontent.com/aspnet/Home/dev/dnvminstall.sh | DNX_BRANCH=dev sh && source ~/.dnx/dnvm/dnvm.sh
brew install icu4c
dnvm upgrade -r coreclr
dnvm upgrade -r mono

echo Install MongoDB
brew install mongodb

# NPM Registry
echo Install global NPM modules
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
