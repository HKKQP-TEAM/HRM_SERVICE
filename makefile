run:
	yarn dev

generate:
	yarn prisma:generate

drop-db:
	yarn prisma:reset

push-db:
	yarn prisma:push

seed:
	yarn prisma:seed

re-generate:
	make drop-db
	make generate
	make push-db

re-generate-seed:
	make re-generate
	make seed