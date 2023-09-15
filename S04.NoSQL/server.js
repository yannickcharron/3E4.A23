//const chalk = require('chalk'); Ancienne méthode d'import de bibliothèque
//server.js => fichier de démarrage => équivalent au main
import chalk from 'chalk';

import app from './src/app.js';

const PORT = 3000;

app.listen(PORT, err => {

    //Nous avons une erreur
    if(err) {
        console.log(chalk.red(err));
        process.exit(1);
    }

    console.log(chalk.green.bold(`👍 Serveur en fonction sur le port ${PORT} 👍`))


});

console.log(chalk.blue.bgGreenBright.bold('😍 Bonjour en couleur'));