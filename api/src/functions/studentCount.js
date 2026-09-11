const { app } = require('@azure/functions');
const sql = require('mssql');

app.http('studentCount', {
    methods: ['GET'],
    authLevel: 'anonymous',

    handler: async (request, context) => {
        const config = {
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            server: process.env.SQL_SERVER,
            database: process.env.SQL_DATABASE,
            options: {
                encrypt: true
            }
        };

        try {
            await sql.connect(config);

            const result = await sql.query(
                'SELECT Country, COUNT(*) AS StudentCount FROM Students GROUP BY Country'
            );

            return {
                jsonBody: result.recordset
            };

        } catch (err) {
            return {
                status: 500,
                body: err.message
            };
        }
    }
});