import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.food.createMany({
        data: [
            {
                nome: 'Temaki Filadélfia',
                descricao: 'Cone de alga nori crocante recheado com arroz japonês temperado (shari), salmão fresco, cream cheese e cebolinha.',
                preco: 24.46,
                categoria: 'Frutos do Mar',
                avaliacao: true,
            },

            {
                nome: 'Lasanha de Frango',
                descricao: 'Massa de lasanha fresca com frango desfiado e molho bechamel.',
                preco: 18.50,
                categoria: 'Massas',
                avaliacao: true,
            },

            {
                nome: 'Hambúrguer ',
                descricao: 'Hambúrguer artesanal de costela bovina, queijo cheddar e salada.',
                preco: 20.00,
                categoria: 'Lanches',
                avaliacao: true,
            },

            {
                nome: 'Pizza de Calabresa',
                descricao: 'Massa de pizza caseira com calabresa fatiada, molho de tomate e queijo mussarela.',
                preco: 35.90,
                categoria: 'Massa',
                avaliacao: true,
            },

            {
                nome: 'Torta de Morango',
                descricao: 'Torta de morango fresco com creme de leite e massa crocante.',
                preco: 11.00,
                categoria: 'Sobremesas',
                avaliacao: true,
            },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
