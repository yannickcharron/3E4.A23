import 'dotenv-flow/config';
import chalk from 'chalk';

import app from './src/app.js';

const PORT = process.env.PORT;

app.listen(PORT, err => {

    //Nous avons une erreur
    if(err) {
        console.log(chalk.red(err));
        process.exit(1);
    }

    console.log(chalk.green.bold(`👍 Serveur en fonction sur le port ${PORT} 👍`))

});
