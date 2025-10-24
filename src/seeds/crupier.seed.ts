import { Model } from 'mongoose';
import { CrupierEntity } from 'src/crupiers/domain/crupier.entity';

export async function seedCrupiers(crupierModel: Model<CrupierEntity>) {
  await crupierModel.deleteMany({});

  const crupiers = [
    {
      name: 'Carlos Méndez',
      serialId: 'CRP-001',
      photoUrl: 'https://example.com/photos/carlos.jpg',
    },
    {
      name: 'Ana López',
      serialId: 'CRP-002',
      photoUrl: 'https://example.com/photos/ana.jpg',
    },
    {
      name: 'Javier Ruiz',
      serialId: 'CRP-003',
    },
    {
      name: 'María Gómez',
    },
  ];

  await crupierModel.insertMany(crupiers);
  console.log('Crupieres Creados');
}
