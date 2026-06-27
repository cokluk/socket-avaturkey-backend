'use strict';

function formatGameDate(date = new Date()) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getDateParts(date = new Date()) {
  return {
    date: String(date.getDate()).padStart(2, '0'),
    month: String(date.getMonth() + 1).padStart(2, '0'),
    year: date.getFullYear(),
  };
}

module.exports = { formatGameDate, getDateParts };
