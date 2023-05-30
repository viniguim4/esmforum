const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando get pergunta', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const perguntas_aux = modelo.listar_perguntas(); 
  const pergunta_got = modelo.get_pergunta(perguntas_aux[0].id_pergunta); 
  expect(pergunta_got.texto).toBe('1 + 1 = ?');
});

test('Testando cadastro de respsota', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  const perguntas_aux = modelo.listar_perguntas(); 
  modelo.cadastrar_resposta(perguntas_aux[0].id_pergunta, "1 + 1 = 2");
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas[0].num_respostas).toBe(1);
});

test('Testando get resposta', () => {
  modelo.cadastrar_pergunta('2 + 2 = ?');
  const perguntas_aux = modelo.listar_perguntas(); 
  modelo.cadastrar_resposta(perguntas_aux[0].id_pergunta, "2 + 2 = 4");
  const respostas_resul = modelo.get_respostas(perguntas_aux[0].id_pergunta);
  expect(respostas_resul[0].texto).toBe('2 + 2 = 4');
});