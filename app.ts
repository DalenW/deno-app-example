import {
	Application,
	Router,
	Status,
	Context
} from 'https://deno.land/x/oak/mod.ts';
import logger from "https://deno.land/x/oak_logger/mod.ts";
import { Handlebars, HandlebarsConfig } from 'https://deno.land/x/handlebars/mod.ts';

const port = 8000;

const app = new Application();
const router = new Router();

const handle = new Handlebars();

// LOGGER
app.use(logger.logger);
app.use(logger.responseTime);

// error handler
app.use(async (context, next) => {
	try {
		await next();
	} catch (err) {
		console.log(err);
	}
});









// -------- CONTROLLERS --------

const indexController = async (context: any) => {
	context.response.type = "text/html";
	context.response.body = await handle.renderView('index', { name: 'Alosaur' });
};

const nameController = async (context: any) => {
	context.response.type = "text/html";
	context.response.body = await handle.renderView('name', { name: context.params.name });
};












// -------- ROUTES --------

router.get("/", indexController);
router.get("/n/:name", nameController);


router.get('/error', context => {
	throw new Error('an error has been thrown');
});











app.use(router.routes())
app.use(router.allowedMethods())

// static content
app.use(async (context, next) => {
	const root = `${Deno.cwd()}/static`;
	try {
		await context.send({
			root
		})
	} catch {
		next();
	}
})

// page not found
app.use(async context => {
	context.response.status = Status.NotFound;
	context.response.body = `"${context.request.url}" not found`;
});

app.addEventListener("listen", ({
	port
}) => console.log(`Listening on port: ${port}`));

await app.listen({
	port
});