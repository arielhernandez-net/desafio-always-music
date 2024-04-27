const estudiantes = require('./estudiantes');

async function main() {
  const [command, ...args] = process.argv.slice(2);

  switch (command) {
    case 'nuevo':
        await estudiantes.nuevo(...args);
        break;
    case 'rut':
        await estudiantes.rut(...args);
        break;
    case 'consulta':
        await estudiantes.consulta(...args);
        break;
    case 'editar':
        await estudiantes.editar(...args);
        break;
    case 'eliminar':
        await estudiantes.eliminar(...args);
        break; 
    default:
      console.error('Comando inválido. Los comandos válidos son: nuevo, rut, consulta.');
      process.exit(1); 
  }
}

main().catch(error => console.error('Error en el programa:', error));
