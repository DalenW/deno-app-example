# Deno App Example

This is an example of a web app written for deno with ServerSide rendering (with partials and layouts), static files, a proper router, and logging. Documentation is lacking when it comes to this stuff so hopefully this helps someone else. The `--unstable` flag is required by https://github.com/alosaur/handlebars so go blame them.

* Port 8000

* Commands
	* `deno run --allow-net --allow-read --unstable app.ts` This runs the app
	* `deno run --allow-net --allow-read --unstable --inspect app.ts` with inspection