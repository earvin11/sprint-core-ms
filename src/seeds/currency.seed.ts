import { Model } from 'mongoose';
import { CurrencyEntity } from 'src/currencies/domain/currency.entity';

export async function seedCurrencies(currencyModel: Model<CurrencyEntity>) {
  await currencyModel.deleteMany({});

  const currencies = [
    {
      name: 'Dólar Estadounidense',
      short: 'USD',
      symbol: '$',
      usdExchange: 1,
      exchangeApi: false,
      status: true,
    },
    {
      name: 'Euro',
      short: 'EUR',
      symbol: '€',
      usdExchange: 1.07,
      exchangeApi: true,
      status: true,
    },
    {
      name: 'Peso Mexicano',
      short: 'MXN',
      symbol: '$',
      usdExchange: 0.058,
      exchangeApi: true,
      status: true,
    },
    {
      name: 'Real Brasileño',
      short: 'BRL',
      symbol: 'R$',
      usdExchange: 0.18,
      exchangeApi: true,
      status: true,
    },
    {
      name: 'Peso Colombiano',
      short: 'COP',
      symbol: '$',
      usdExchange: 0.00025,
      exchangeApi: true,
      status: true,
    },
  ];

  await currencyModel.insertMany(currencies);
  console.log('Monedas creadas');
}
