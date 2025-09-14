/// <reference types="cypress" />

function uniqueEmail(prefix = 'qa.ebac', domain = 'example.com') {
  const ts  = Date.now();
  const rnd = Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
  return `${prefix}.${ts}.${rnd}@${domain}`;
}

function uniquePhone(ddd = '11') {
  const nineDigits = Math.floor(1e8 + Math.random() * 9e8);
  return `${ddd}${nineDigits}`;
}

const LOWER   = 'abcdefghijklmnopqrstuvwxyz';
const UPPER   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS  = '0123456789';
const SYMBOLS = '@#$%*?!';

function randomFirstName() {
  const pool = ['Ana','Bruno','Carla','Diego','Eva','Fábio','Gabi','Hugo','Iris','João','Karla','Léo','Maya','Nina','Otávio','Paula','Rafa','Sara','Téo','Vini'];
  return pool[Math.floor(Math.random() * pool.length)];
}

function randomLastName() {
  const pool = ['Silva','Souza','Oliveira','Santos','Pereira','Lima','Gomes','Ribeiro','Carvalho','Almeida','Ferreira','Araujo','Rocha','Barbosa','Mendes'];
  return pool[Math.floor(Math.random() * pool.length)];
}

function uniquePassword(length = 12) {
  const req = [
    LOWER[Math.floor(Math.random() * LOWER.length)],
    UPPER[Math.floor(Math.random() * UPPER.length)],
    DIGITS[Math.floor(Math.random() * DIGITS.length)],
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
  ];
  const all = LOWER + UPPER + DIGITS + SYMBOLS;

  while (req.length < length) {
    req.push(all[Math.floor(Math.random() * all.length)]);
  }
  for (let i = req.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [req[i], req[j]] = [req[j], req[i]];
  }
  return req.join('');
}

module.exports = {
  uniqueEmail,
  uniquePhone,
  randomFirstName,
  randomLastName,
  uniquePassword,
};