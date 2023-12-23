import React from "react";
export function capitalize(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatRupiah = (number:any) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
};


export const formatWithoutRupiah = (number:any) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
};