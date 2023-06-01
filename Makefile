install:
	npm ci
build:
	npm run build
lint-frontend:
	make -C frontend lint
start-frontend:
	make -C frontend start
start-backend:
	npm start
start:
	make start-backend & make start-frontend