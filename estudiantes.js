const { conectarBD, desconectarBD } = require('./db');

async function nuevo(nombre, rut, curso, nivel) {
  const client = await conectarBD();

  try {
    const query = `
        INSERT INTO estudiantes (nombre, rut, curso, nivel)
        VALUES ($1, $2, $3, $4)
    `;

    const values = [nombre, rut, curso, nivel];
    await client.query(query, values);

    console.log('Estudiante registrado correctamente.');
  } catch (error) {
    console.error('Error al registrar estudiante:', error);
  } finally {
    await desconectarBD();
  }
}

async function rut(rut) {
  const client = await conectarBD();

  try {
    const query = `
        SELECT nombre, rut, curso, nivel
        FROM estudiantes
        WHERE rut = $1
    `;

    const values = [rut];
    const result = await client.query(query, values);

    if (result.rows.length === 0) {
      console.log('Estudiante no encontrado.');
      return null;
    }

    console.table(result.rows);
  } catch (error) {
    console.error('Error al obtener estudiante por rut:', error);
    return null;
  } finally {
    await desconectarBD();
  }
}

async function consulta() {
  const client = await conectarBD();

  try {
    const query = 'SELECT * FROM estudiantes';
    const result = await client.query(query);

    if (result.rows.length === 0) {
      console.log('No hay estudiantes registrados.');
      return;
    }

    console.table(result.rows);
  } catch (error) {
    console.error('Error al listar estudiantes:', error);
  } finally {
    await desconectarBD(client);
  }
}

async function editar(nuevoNombre, rut, nuevoCurso, nuevoNivel) {
  const client = await conectarBD();

  try {
    const query = `
      UPDATE estudiantes
      SET nombre = $1, curso = $2, nivel = $3
      WHERE rut = $4
    `;

    const values = [nuevoNombre, nuevoCurso, nuevoNivel, rut];
    const result = await client.query(query, values);

    if (result.rowCount > 0) {
      console.log('Estudiante actualizado correctamente.');
    } else {
      console.log('Estudiante no encontrado para actualizar.');
    }
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
  } finally {
    await desconectarBD(client);
  }
}

async function eliminar(rut) {
  const client = await conectarBD();

  try {
    const query = `
      DELETE FROM estudiantes
      WHERE rut = $1
    `;

    const values = [rut];
    const result = await client.query(query, values);

    if (result.rowCount > 0) {
      console.log('Estudiante eliminado correctamente.');
    } else {
      console.log('Estudiante no encontrado para eliminar.');
    }
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
  } finally {
    await desconectarBD(client);
  }
}

module.exports = {
  nuevo,
  rut,
  consulta,
  eliminar,
  editar,
};
