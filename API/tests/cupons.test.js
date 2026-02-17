const request = require('supertest');
const baseURL = 'http://localhost';

describe('US-0003 - API de Cupons', () => {
  const auth = {
    user: 'admin_ebac',
    pass: '@admin!&b@c!2022'
  };

    it('CT-011 - Deve listar todos os cupons (GET)', async () => {
        const response = await request(baseURL)
        .get('/wp-json/wc/v3/coupons')
        .auth(auth.user, auth.pass);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        if (response.body.length > 0) {
        const cupom = response.body[0];

        expect(cupom).toHaveProperty('id');
        expect(cupom).toHaveProperty('code');
        expect(cupom).toHaveProperty('amount');
        expect(cupom).toHaveProperty('discount_type');
        }

  });

    it('CT-012 - Deve criar um cupom válido (POST)', async () => {
        const codigo = `CupomTeste${Date.now()}`;

        const novoCupom = {
            code: codigo,
            amount: "10.00",
            discount_type: "fixed_product",
            description: "Cupom de teste automatizado"
        };

        const response = await request(baseURL)
            .post('/wp-json/wc/v3/coupons')
            .auth(auth.user, auth.pass)
            .send(novoCupom);

        expect(response.status).toBe(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.code).toBe(codigo.toLowerCase());
        expect(response.body.amount).toBe("10.00");
        expect(response.body.discount_type).toBe("fixed_product");

    });

    it('CT-013 - Não deve permitir criar cupom duplicado', async () => {
        const codigoDuplicado = `CupomDuplicado${Date.now()}`;

        const novoCupom = {
            code: codigoDuplicado,
            amount: "15.00",
            discount_type: "fixed_product",
            description: "Cupom duplicado teste"
        };

        await request(baseURL)
            .post('/wp-json/wc/v3/coupons')
            .auth(auth.user, auth.pass)
            .send(novoCupom);

        const response = await request(baseURL)
            .post('/wp-json/wc/v3/coupons')
            .auth(auth.user, auth.pass)
            .send(novoCupom);

        expect(response.status).toBe(400);

        expect(response.body).toHaveProperty('code');
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('status', 400);

});
});