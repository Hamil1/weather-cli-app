const {
  leerInput,
  inquirerMenu,
  pause,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("dotenv").config();

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const termino = await leerInput("Ciudad: ");
        const lugares = await busquedas.ciudad(termino);
        const id = await listarLugares(lugares);
        const lugarSel = lugares.find((lugar) => lugar.id === id);

        if (id === "0") continue;

        busquedas.agregarHistorial(lugarSel.nombre);

        const { nombre, lng, lat } = lugarSel;

        const { desc, min, temp } = await busquedas.climaLugar(lat, lng);
        console.clear();
        console.log("\nInformacion de la ciudad\n".green);
        console.log("Ciudad: ", nombre);
        console.log("Lat: ", lat);
        console.log("Lng: ", lng);
        console.log("Temperatura: ", temp);
        console.log("Minima: ", min);
        console.log("El clima esta: ", desc.green);
        break;
      case 2:
        busquedas.historialCapitalizado?.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
    }
    console.log(opt);

    await pause();
  } while (opt !== 0);
};

main();
